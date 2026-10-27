import { Check, ChevronDown } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import { useLocale } from "@/i18n/useLocale";
import { cn } from "@/lib/cn";
import { LOCALES, localeNames, type Locale } from "@/locales";

interface FlagProps {
  locale: Locale;
  // Empty when the language name is already given another way (aria-label).
  alt?: string;
}

const Flag = ({ locale, alt = localeNames[locale].name }: FlagProps): ReactElement => (
  <img src={localeNames[locale].flag} alt={alt} width={20} height={20} />
);

// Desktop: a button showing the current language's flag that opens a menu of
// all of them. Keyboard: arrows/Home/End move, Escape closes, Tab leaves.
export const LanguageMenu = (): ReactElement => {
  const { locale, setLocale, content } = useLocale();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();

  // While open: focus the current language, and close on a press outside.
  useEffect(() => {
    if (!isOpen) return;

    itemRefs.current[LOCALES.indexOf(locale)]?.focus();

    const handlePointerDown = (event: PointerEvent): void => {
      if (!containerRef.current?.contains(event.target as Node))
        setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return (): void =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, locale]);

  const close = (): void => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const choose = (next: Locale): void => {
    setLocale(next);
    close();
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const items = itemRefs.current;
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    const focusAt = (index: number): void => {
      items[(index + items.length) % items.length]?.focus();
    };

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusAt(current + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusAt(current - 1);
        break;
      case "Home":
        event.preventDefault();
        focusAt(0);
        break;
      case "End":
        event.preventDefault();
        focusAt(items.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={content.ui.nav.languageButton(localeNames[locale].name)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 items-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
      >
        <Flag locale={locale} alt="" />
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {/* load the diferent local flags */}
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          onKeyDown={handleMenuKeyDown}
          className="panel absolute right-0 top-full z-10 mt-2 min-w-22 rounded-xl p-1 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.8)] animate-fade-in is-visible"
        >
          {LOCALES.map((option, idx) => {
            const isCurrent = option === locale;

            return (
              <button
                key={option}
                ref={(element) => {
                  itemRefs.current[idx] = element;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={isCurrent}
                lang={option}
                tabIndex={-1}
                onClick={() => choose(option)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground focus-visible:bg-surface-raised focus-visible:text-foreground focus-visible:outline-none",
                  isCurrent && "text-foreground",
                )}
              >
                <Flag locale={option} />
                {isCurrent && (
                  <Check className="size-4 text-accent" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface LanguageButtonsProps {
  className?: string;
}

// Mobile menu: every language as its own button, no second menu to open.
export const LanguageButtons = ({
  className,
}: LanguageButtonsProps): ReactElement => {
  const { locale, setLocale, content } = useLocale();

  return (
    <div
      role="group"
      aria-label={content.ui.nav.language}
      className={cn("flex gap-2", className)}
    >
      {LOCALES.map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          aria-pressed={option === locale}
          onClick={() => setLocale(option)}
          className={cn(
            "flex flex-1 justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
            option === locale
              ? "border-accent/60 bg-surface text-foreground"
              : "border-border text-muted-foreground hover:bg-surface hover:text-foreground",
          )}
        >
          <Flag locale={option} />
        </button>
      ))}
    </div>
  );
};

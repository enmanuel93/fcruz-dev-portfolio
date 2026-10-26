import { useState, type ReactElement } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { cn } from "@/lib/cn";
import type { Skill } from "@/types/content";

// Time one card takes to slide past; with no autoplay delay the row never stops.
const MARQUEE_SPEED_MS = 3500;
const GAP_PX = 12;
// Swiper's loop moves slides from one end to the other as the row advances. With
// two copies that always happens off-screen, so the row never jumps or rewinds.
const LOOP_COPIES = 2;

// Same column count as the old grid at each width, so the cards keep their size.
const BREAKPOINTS = {
  640: { slidesPerView: 4 },
  768: { slidesPerView: 9 },
  1024: { slidesPerView: 9 },
  1280: { slidesPerView: 10 },
};

interface SkillsMarqueeProps {
  skills: readonly Skill[];
}

export const SkillsMarquee = ({ skills }: SkillsMarqueeProps): ReactElement => {
  // Swiper cancels pointerdown, so the browser never fires mousedown on the
  // slides; its touchStart/touchEnd events cover mouse, pen and touch instead.
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);

  return (
    <div className="animate-fade-in animation-delay-100">
      {/* No pause on hover: stopping mid-transition breaks the constant flow. */}
      <Swiper
        modules={[Autoplay]}
        loop
        speed={MARQUEE_SPEED_MS}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        slidesPerView={3}
        spaceBetween={GAP_PX}
        breakpoints={BREAKPOINTS}
        wrapperTag="ul"
        onTouchStart={() => setIsGrabbing(true)}
        onTouchEnd={() => setIsGrabbing(false)}
        className={cn("skills-marquee py-1", isGrabbing ? "cursor-grabbing" : "cursor-grab")}
      >
        {Array.from({ length: LOOP_COPIES }, (_, copy) =>
          skills.map(({ name, icon: Icon, color }) => (
            <SwiperSlide
              key={`${name}-${copy}`}
              // The second copy only fills the loop; screen readers hear each skill once.
              aria-hidden={copy > 0 || undefined}
              tag="li"
              className="panel group flex! mt-1 h-auto! flex-col items-center justify-center gap-3 rounded-xl px-2 py-5 text-center transition-[border-color,transform,background-color] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-raised"
            >
              <Icon
                className="size-8 transition-transform duration-300 group-hover:scale-110"
                style={{ color }}
                aria-hidden="true"
              />
              <span className="text-xs font-medium leading-tight text-muted-foreground transition-colors group-hover:text-foreground">
                {name}
              </span>
            </SwiperSlide>
          )),
        )}
      </Swiper>
    </div>
  );
};

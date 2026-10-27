import { useContext } from "react";
import { LocaleContext, type LocaleContextValue } from "./LocaleContext";

// The current language, its content, and a way to switch it.
export const useLocale = (): LocaleContextValue => useContext(LocaleContext);

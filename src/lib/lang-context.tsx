"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "fr" | "en";

interface LangContextType {
  lang: Lang;
  toggle: () => void;
  t: (fr: string, en: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "fr",
  toggle: () => {},
  t: (fr) => fr,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  const toggle = () => setLang((l) => (l === "fr" ? "en" : "fr"));
  const t = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

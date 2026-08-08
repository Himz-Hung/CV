import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Lang, Translation } from './types'
import { vi } from './vi'
import { en } from './en'

export type { Lang, Translation } from './types'

const dictionaries: Record<Lang, Translation> = { vi, en }

type I18nContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translation
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({
  children,
  initialLang = 'en',
}: {
  children: ReactNode
  initialLang?: Lang
}) {
  // Language lives in memory only — it is NOT persisted, so every fresh visit
  // starts from the welcome gate and the visitor picks a language again.
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = (next: Lang) => {
    setLangState(next)
    document.documentElement.lang = next
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider')
  return ctx
}

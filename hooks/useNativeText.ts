import { useMemo, useState } from "react"

export type Language = 'ru' | 'en'

export type AllTexts = 'welcome' | 'thisIsMyUniWork'

const texts: Record<AllTexts, Record<Language, string>> = {
  welcome: {
    ru: 'Привет!',
    en: 'Welcome!'
  },
  thisIsMyUniWork: {
    ru: 'Это мой университетский проект',
    en: 'This is my university project'
  }
}

export const useNativeText = () => {
  const [language, setLanguage] = useState<Language>('ru')
  const processedTexts: Record<AllTexts, string> =
    useMemo(() =>
      Object.fromEntries(Object.entries(texts)
        .map(([k, v]) => [k, v[language]])) as Record<AllTexts, string>, [language])
  return {
    ...processedTexts,
    language,
    setLanguage
  }
}

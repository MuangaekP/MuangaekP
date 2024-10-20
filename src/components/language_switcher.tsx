import React from 'react'
import { useRouter } from 'next/router'
import { Button } from "@material-tailwind/react"

const LocaleSwitcher: React.FC = () => {
  const router = useRouter()
  const { locales } = router
  const activeLocale = typeof window !== 'undefined' && window.localStorage.getItem('locale') || 'th'
  const otherLocales = (locales || []).filter(
    (locale) => locale !== activeLocale
  )

  const changeLanguage = (locale: string) => {
    window.localStorage.setItem("locale", locale)
    router.push(router.pathname)
  }

  return (
    <div>
      <div>
        {otherLocales.map((locale) => (
          <Button
            key={locale}
            onClick={() => changeLanguage(locale)}
            style={{
              fontWeight: locale === activeLocale ? 'bold' : 'normal',
              margin: '0 5px',
              padding: '5px 10px',
              cursor: 'pointer',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: locale === activeLocale ? '#eee' : 'transparent',
            }}
          >
            {locale.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default LocaleSwitcher
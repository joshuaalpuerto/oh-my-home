/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import sgLocaleData from 'react-intl/locale-data/sg'

import { DEFAULT_LOCALE } from '../app/containers/App/constants'

import enTranslationMessages from './translations/en.json'
import sgTranslationMessages from './translations/sg.json'

addLocaleData(enLocaleData)
addLocaleData(sgLocaleData)

export const appLocales = [
  'en',
  'sg'
]

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key]
    return Object.assign(formattedMessages, { [key]: formattedMessage })
  }, {})
}

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  sg: formatTranslationMessages('sg', sgTranslationMessages)
}

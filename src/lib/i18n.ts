/* eslint-disable import/no-named-as-default, import/no-named-as-default-member */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/i18n/locales/en.json";
import fr from "@/i18n/locales/fr.json";

const resources = {
  en: { common: en },
  fr: { common: fr },
};

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
  });
}

export { i18n };

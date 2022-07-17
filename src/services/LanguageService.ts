import languagesAndCountries from 'assets/data/languages-countries.json';
import { IResult } from 'model/Format';
import Subtitle from '../model/Subtitle';

type LanguageCountry = {
  bcp47: string;
  iso3166: string;
  language: string;
}

export function bcp47ToIso3166 (bcp47: string): string {
  for (let i = 0; i < languagesAndCountries.length; i++) {
    if (languagesAndCountries[i].bcp47 === bcp47) {
      return languagesAndCountries[i].iso3166;
    }
  }
  return '';
}

export function getLanguage (bcp47: string): Subtitle {
  for (let i = 0; i < languagesAndCountries.length; i++) {
    if (languagesAndCountries[i].bcp47.toLowerCase() === bcp47.toLowerCase()) {
      return new Subtitle(languagesAndCountries[i].language.split(';')[0], languagesAndCountries[i].bcp47);
    }
  }
  return new Subtitle('unknown', 'unknown');
}

export function getMostSpokenLanguages (): Subtitle[] {
  const mostSpokenBcp47: string[] = [
    'en',
    'zh',
    'hi',
    'es',
    'fr'
  ]
  const res: Subtitle[] = []
  for (const language of mostSpokenBcp47) {
    res.push(getLanguage(language));
  }
  return res;
}

export function getAllLanguages (): Subtitle[] {
  let res: Subtitle[] = [];
  for (let i = 0; i < languagesAndCountries.length; i++) {
    if (languagesAndCountries[i].iso3166 !== '') {
      res.push(new Subtitle(languagesAndCountries[i].language.split(';')[0], languagesAndCountries[i].bcp47));
    }
  }
  return res;
} 
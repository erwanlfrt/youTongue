import languagesAndCountries from 'assets/data/languages-countries.json';
import Subtitle from '../model/Subtitle';

type LanguageCountry = {
  bcp47: string;
  iso3166: string;
}

export function bcp47ToIso3166 (bcp47: string): string {
  for (let i = 0; i < languagesAndCountries.length; i++) {
    if (languagesAndCountries[i].bcp47 === bcp47) {
      return languagesAndCountries[i].iso3166;
    }
  }
  return '';
}

export function getAllLanguages (): Subtitle[] {
  let res: Subtitle[] = [];
  for (let i = 0; i < languagesAndCountries.length; i++) {
    res.push(new Subtitle(languagesAndCountries[i].language, languagesAndCountries[i].bcp47))
  }
  return res;
} 
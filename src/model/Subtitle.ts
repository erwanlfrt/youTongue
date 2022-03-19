import { ISubtitle } from "./Format";
import { bcp47ToIso3166 } from 'services/LanguageService';

class Subtitle {
  private _language: string;
  private _bcp47: string;
  private _flag: string;
  

  constructor(language: string, bcp47: string) {
    this._language = language;
    this._bcp47 = bcp47;
    this._flag = "https://flagcdn.com/w320/" + bcp47ToIso3166(this.bcp47).toLowerCase() + ".png"
  }

  public getInfo(): ISubtitle {
    return {
      language: this.language,
      bcp47: this.bcp47,
      flag: this.flag
    }
  }

  public get language () {
    return this._language;
  }

  public set language (language: string) {
    this._language = language;
  }

  public get bcp47 () {
    return this._bcp47;
  }

  public set bcp47 (bcp47: string) {
    this._bcp47 = bcp47;
  }

  public get flag () {
    return this._flag;
  }

  public set flag (flag: string) {
    this._flag = flag;
  }
}

export default Subtitle;
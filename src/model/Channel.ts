import { IChannel } from "./Format";

class Channel {
  private _picture: string;
  private _name: string;
  private _certified: boolean;

  constructor (channelPicture: string, name: string, certified: boolean) {
    this.picture = channelPicture;
    this.name = name;
    this.certified = certified;
  }

  public getInfo (): IChannel {
    return {
      name: this.name,
      channelPicture: this.picture,
      certified: this.certified
    }
  }

  public get picture () {
    return this._picture;
  }

  public set picture (picture: string) {
    this._picture = picture;
  }

  public get name () {
    return this._name;
  }

  public set name (name: string) {
    this._name = name;
  }

  public get certified () {
    return this._certified;
  }

  public set certified (certified: boolean) {
    this._certified = certified;
  }


}

export default Channel;
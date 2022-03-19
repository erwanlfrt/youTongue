
interface ISubtitle {
  language: string,
  bcp47: string,
  flag: string
}


interface IResult {
  title: string,
  channel: IChannel,
  thumbnail: string,
  description: string,
  subtitles: ISubtitle[],
  duration: number;
  views: number;
  date: Date;

}

interface IChannel {
  name: string,
  channelPicture: string,
  certified: boolean
}

export type {ISubtitle, IResult, IChannel};
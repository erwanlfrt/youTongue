import Channel from "./Channel";
import { IResult, ISubtitle } from "./Format";
import Subtitle from "./Subtitle";

class Result {
  private id: string;
  private title: string;
  private thumbnail: string;
  private description: string;
  private channel: Channel;
  private subtitles: Subtitle[];
  private duration: Date;
  private views: number;
  private date: Date;


  public Result(id: string, title: string, channel: Channel, thumbnail: string, description: string, subtitles: Subtitle[], duration: Date, views: number, date: Date) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.channel = channel;
    this.description = description;
    this.subtitles = subtitles;
    this.duration = duration;
    this.views = views;
    this.date = date;
  }

  public getInfo(): IResult {
    let subtitles: ISubtitle[] = [];
    this.subtitles.forEach(sub => {
      subtitles.push(sub.getInfo());
    })
    
    return {
      id: this.id,
      title: this.title,
      channel: this.channel.getInfo(),
      thumbnail: this.thumbnail,
      description: this.description,
      subtitles: subtitles,
      duration: this.duration,
      views: this.views,
      date: this.date
    }
  }
}

export default Result;
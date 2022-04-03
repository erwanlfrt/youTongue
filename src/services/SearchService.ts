import Channel from "model/Channel";
import { IResult, ISubtitle, IChannel } from "../model/Format";
import { getLanguage } from '../services/LanguageService';
import Subtitle from '../model/Subtitle';

type VideoInfo = {
  duration: Date,
  views: number
}

class SearchService {
  private MAX_REQUEST = 1;
  private youtubeAPIKey = "AIzaSyD7N92-iFT6uEixwqNFRcXhZ8CZUgJjyWc";
  private urlSearchRequest = "https://www.googleapis.com/youtube/v3/search?maxResults=" + this.MAX_REQUEST +"&type=video&part=snippet&q=";
  private urlCaptionsRequest = "https://www.googleapis.com/youtube/v3/captions?";
  private urlVideoRequest = "https://www.googleapis.com/youtube/v3/videos?";
  private results: IResult[] = [];
  

  public async search(query: string, languages_bcp47: string []): Promise<void>{
    query = query.replaceAll(' ', '+');
    
    // YouTube search
    let results: IResult[] = [];
    
    if (query.length < 5) return;
    
    let queryResponse = await fetch(this.urlSearchRequest + query + '&key=' + this.youtubeAPIKey);
    let searchDatas = await queryResponse.json();
    if(searchDatas.items) {
      for (const result of searchDatas.items) {
        let videoInfo = await this.getVideoInfo(result.id.videoId);
        let fetchCaptions = await fetch(this.urlCaptionsRequest + 'key=' + this.youtubeAPIKey + '&videoId='+result.id.videoId+"&part=snippet");
        let subtitles: ISubtitle[] = [];
        

        await fetchCaptions.json().then((captions)=> {
          if (this.videoConcerned(captions, languages_bcp47)) {
            for(let caption of captions.items) {
              const sub: Subtitle = getLanguage(caption.snippet.language);
              if (!this.isSubtitle(subtitles, sub.language)) {
                subtitles.push({
                  language: sub.language,
                  bcp47: sub.bcp47,
                  flag: sub.flag
                });
              }
            }
            let dateString = result.snippet.publishTime.split('T')[0];
            let timeString = result.snippet.publishTime.split('T')[1];
            dateString = dateString.split('-');
            const date = new Date(parseInt(dateString[0], 10), parseInt(dateString[1], 10) - 1 , parseInt(dateString[2], 10));
            timeString = timeString.split(':');
            date.setHours(parseInt(timeString[0], 10));
            date.setMinutes(parseInt(timeString[1], 10));
            date.setSeconds(parseInt(timeString[2], 10));

            results.push({
              id: result.id.videoId,
              title: result.snippet.title,
              channel: result.snippet.channelTitle,
              thumbnail: result.snippet.thumbnails.medium.url,
              description: result.snippet.description,
              subtitles: subtitles,
              duration: videoInfo.duration,
              views: videoInfo.views,
              date: date
            });
        }
        });
      }
    }
    this.results = results;
    const searchEvent = new CustomEvent('search', { detail: {results: results } });
    document.dispatchEvent(searchEvent);
  }

  private isSubtitle (subtitles: ISubtitle[], language: string): boolean {
    for (const sub of subtitles) {
      if (sub.language === language ) {
        return true;
      }
    }
    return false;
  }

  private videoConcerned (captions: any, languages_bcp47: string[]): boolean {
    if (captions.length === 0) return false;
    if (languages_bcp47.length === 0) return true;
    const bcp47 = [];
    for(let caption of captions.items) {
      bcp47.push(caption.snippet.language);
    }
    return bcp47.some((r: string) => languages_bcp47.indexOf(r) >= 0)
  }
  private async getVideoInfo (id: string): Promise<VideoInfo> {
    const url = this.urlVideoRequest + 'id=' + id + "&key=" + this.youtubeAPIKey + "&part=statistics, contentDetails";
    let videoInfoRequest = await fetch(url);
    const videoInfo = await videoInfoRequest.json();

    const timeString = videoInfo.items[0].contentDetails.duration.split('PT')[1];
    const time = new Date();
    const minutes = parseInt(timeString.split('M')[0], 10);
    let seconds = 0;
    if (minutes === undefined || minutes === 0) {
      seconds = parseInt(timeString.split('S')[0], 10);
    } else {
      seconds = parseInt(timeString.split('M')[1].split('S')[0], 10);
    }
    if (isNaN(seconds)) {
      seconds = 0;
    }
    // console.log('M: ', minutes, ' S: ', seconds);
    time.setMinutes(minutes)
    time.setSeconds(seconds);

    return {
      duration: time,
      views: videoInfo.items[0].statistics.viewCount
    };
  }


}

const mustardChannel: IChannel = {
  name: 'Mustard',
  channelPicture: 'https://yt3.ggpht.com/ytc/AKedOLT702UGekRPyvRDdy1rKqhUamCaLADdSm9RVlPY0A=s176-c-k-c0x00ffffff-no-rj-mo',
  certified: true
};

const FICTITIOUS_RESULT = 
[
  {
      "title": "Why Airbus Nearly Didn’t Happen: The A300 Story",
      "channel": "Mustard",
      "thumbnail": "https://i.ytimg.com/vi/ln-ffJM9sJc/mqdefault.jpg",
      "description": "Watch over 2400 documentaries for free for a month by signing up at: http://CuriosityStream.com/mustard and using the code ...",
      "subtitles": [
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "German",
              "bcp47": "de",
              "flag": "https://flagcdn.com/w320/de.png"
          },
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "Latin American Spanish",
              "bcp47": "es-419",
              "flag": "https://flagcdn.com/w320/es.png"
          },
          {
              "language": "Spanish;\nCastilian",
              "bcp47": "es",
              "flag": "https://flagcdn.com/w320/es.png"
          },
          {
              "language": "French",
              "bcp47": "fr",
              "flag": "https://flagcdn.com/w320/fr.png"
          },
          {
              "language": "Croatian",
              "bcp47": "hr",
              "flag": "https://flagcdn.com/w320/hr.png"
          },
          {
              "language": "Indonesian",
              "bcp47": "id",
              "flag": "https://flagcdn.com/w320/id.png"
          },
          {
              "language": "Italian",
              "bcp47": "it",
              "flag": "https://flagcdn.com/w320/it.png"
          },
          {
              "language": "Korean",
              "bcp47": "ko",
              "flag": "https://flagcdn.com/w320/kr.png"
          },
          {
              "language": "Malay (macrolanguage)",
              "bcp47": "ms",
              "flag": "https://flagcdn.com/w320/my.png"
          },
          {
              "language": "Portuguese",
              "bcp47": "pt",
              "flag": "https://flagcdn.com/w320/pt.png"
          },
          {
              "language": "Russian",
              "bcp47": "ru",
              "flag": "https://flagcdn.com/w320/ru.png"
          },
          {
              "language": "Chinese Hong-Kong",
              "bcp47": "zh-hk",
              "flag": "https://flagcdn.com/w320/hk.png"
          },
          {
              "language": "Chinese Taïwan",
              "bcp47": "zh-tw",
              "flag": "https://flagcdn.com/w320/tw.png"
          }
      ],
      "duration": "2022-03-24T11:11:25.719Z",
      "views": "3004181",
      "date": "2019-08-12T21:39:50.000Z"
  },
  {
      "title": "A Commercial Failure: The Dassault Mercure Story",
      "channel": "Mustard",
      "thumbnail": "https://i.ytimg.com/vi/ZXXHsPrasx0/mqdefault.jpg",
      "description": "Support Mustard on Patreon: https://www.patreon.com/MustardChannel Mustard Merchandise: ...",
      "subtitles": [
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "Latin American Spanish",
              "bcp47": "es-419",
              "flag": "https://flagcdn.com/w320/es.png"
          },
          {
              "language": "Spanish;\nCastilian",
              "bcp47": "es",
              "flag": "https://flagcdn.com/w320/es.png"
          },
          {
              "language": "French",
              "bcp47": "fr",
              "flag": "https://flagcdn.com/w320/fr.png"
          },
          {
              "language": "Portuguese Brazil",
              "bcp47": "pt-br",
              "flag": "https://flagcdn.com/w320/br.png"
          },
          {
              "language": "Chinese Taïwan",
              "bcp47": "zh-tw",
              "flag": "https://flagcdn.com/w320/tw.png"
          }
      ],
      "duration": "2022-03-24T11:10:00.954Z",
      "views": "1808696",
      "date": "2018-02-04T14:35:40.000Z"
  },
  {
      "title": "This Plane Could Even Land Itself: Why Did The L-1011 Fail?",
      "channel": "Mustard",
      "thumbnail": "https://i.ytimg.com/vi/jkFYD7R_Xig/mqdefault.jpg",
      "description": "Support Mustard on Patreon: https://www.patreon.com/MustardChannel Mustard Merchandise: ...",
      "subtitles": [
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "Spanish;\nCastilian",
              "bcp47": "es",
              "flag": "https://flagcdn.com/w320/es.png"
          },
          {
              "language": "French",
              "bcp47": "fr",
              "flag": "https://flagcdn.com/w320/fr.png"
          },
          {
              "language": "Hungarian",
              "bcp47": "hu",
              "flag": "https://flagcdn.com/w320/hu.png"
          },
          {
              "language": "Indonesian",
              "bcp47": "id",
              "flag": "https://flagcdn.com/w320/id.png"
          },
          {
              "language": "Korean",
              "bcp47": "ko",
              "flag": "https://flagcdn.com/w320/kr.png"
          },
          {
              "language": "Portuguese",
              "bcp47": "pt",
              "flag": "https://flagcdn.com/w320/pt.png"
          },
          {
              "language": "Vietnamese",
              "bcp47": "vi",
              "flag": "https://flagcdn.com/w320/vn.png"
          },
          {
              "language": "Chinese Taïwan",
              "bcp47": "zh-tw",
              "flag": "https://flagcdn.com/w320/tw.png"
          }
      ],
      "duration": "2022-03-24T11:08:28.195Z",
      "views": "3850957",
      "date": "2017-10-24T18:05:13.000Z"
  },
  {
      "title": "What Happened To The World&#39;s Largest Plane? The Antonov An-225 Mriya",
      "channel": "Mustard",
      "thumbnail": "https://i.ytimg.com/vi/twwDv7jjjfw/mqdefault.jpg",
      "description": "Get an entire year of both CuriosityStream and Nebula for just for less than $1 a month here (42% off the regular price): ...",
      "subtitles": [
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          }
      ],
      "duration": "2022-03-24T11:10:25.426Z",
      "views": "2149166",
      "date": "2021-02-25T11:54:29.000Z"
  },
  {
      "title": "This Jet Terrified the West: The MiG-25 Foxbat",
      "channel": "Mustard",
      "thumbnail": "https://i.ytimg.com/vi/W1L1sU0uI0o/mqdefault.jpg",
      "description": "Get an entire year of both CuriosityStream and Nebula for just $14.79 here: http://CuriosityStream.com/mustard Support Mustard ...",
      "subtitles": [
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          }
      ],
      "duration": "2022-03-24T11:13:11.674Z",
      "views": "5424632",
      "date": "2021-11-19T18:19:30.000Z"
  },
  {
      "title": "How This Plane Earned A Dangerous Reputation: The DC-10 Story",
      "channel": "Mustard",
      "thumbnail": "https://i.ytimg.com/vi/l-085TjhUPo/mqdefault.jpg",
      "description": "Support Mustard on Patreon: https://www.patreon.com/MustardChannel Mustard Merchandise: ...",
      "subtitles": [
          {
              "language": "Arabic",
              "bcp47": "ar",
              "flag": "https://flagcdn.com/w320/sa.png"
          },
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "Latin American Spanish",
              "bcp47": "es-419",
              "flag": "https://flagcdn.com/w320/es.png"
          },
          {
              "language": "Spanish;\nCastilian",
              "bcp47": "es",
              "flag": "https://flagcdn.com/w320/es.png"
          },
          {
              "language": "French",
              "bcp47": "fr",
              "flag": "https://flagcdn.com/w320/fr.png"
          },
          {
              "language": "Korean",
              "bcp47": "ko",
              "flag": "https://flagcdn.com/w320/kr.png"
          },
          {
              "language": "Malay (macrolanguage)",
              "bcp47": "ms",
              "flag": "https://flagcdn.com/w320/my.png"
          },
          {
              "language": "Portuguese Brazil",
              "bcp47": "pt-br",
              "flag": "https://flagcdn.com/w320/br.png"
          },
          {
              "language": "Chinese Taïwan",
              "bcp47": "zh-tw",
              "flag": "https://flagcdn.com/w320/tw.png"
          }
      ],
      "duration": "2022-03-24T11:10:30.918Z",
      "views": "5292907",
      "date": "2018-09-28T15:26:38.000Z"
  },
  {
      "title": "The Strangest Aircraft Ever Built: The Soviet Union&#39;s VVA-14",
      "channel": "Mustard",
      "thumbnail": "https://i.ytimg.com/vi/UD7xiWWs-bs/mqdefault.jpg",
      "description": "Get an entire year of both CuriosityStream and Nebula for just for less than $1 a month here (42% off the regular price): ...",
      "subtitles": [
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          }
      ],
      "duration": "2022-03-24T11:11:21.126Z",
      "views": "7055402",
      "date": "2021-07-16T17:40:33.000Z"
  },
  {
      "title": "Trying To Fly To America Before It Was Possible: The Caproni Transaero",
      "channel": "Mustard",
      "thumbnail": "https://i.ytimg.com/vi/uYn6fyGNg7c/mqdefault.jpg",
      "description": "Get an entire year of both CuriosityStream and Nebula for just for less than $1 a month here (42% off the regular price): ...",
      "subtitles": [
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          }
      ],
      "duration": "2022-03-24T11:08:27.345Z",
      "views": "2557704",
      "date": "2020-10-30T11:13:17.000Z"
  },
  {
      "title": "A Plane Without Wings: The Story of The C.450 Coléoptère",
      "channel": "Mustard",
      "thumbnail": "https://i.ytimg.com/vi/unz6mfjS4ws/mqdefault.jpg",
      "description": "Get an entire year of both CuriosityStream and Nebula for just for less than $1 a month here (42% off the regular price): ...",
      "subtitles": [
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          }
      ],
      "duration": "2022-03-24T11:08:20.595Z",
      "views": "3961917",
      "date": "2020-12-21T13:25:47.000Z"
  },
  {
      "title": "Why The Vertical Takeoff Airliner Failed: The Rotodyne Story",
      "channel": "Mustard",
      "thumbnail": "https://i.ytimg.com/vi/dkJOm1V77Xg/mqdefault.jpg",
      "description": "Sign up for an annual CuriosityStream subscription and you'll also get a free Nebula subscription (the new streaming platform ...",
      "subtitles": [
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "English",
              "bcp47": "en",
              "flag": "https://flagcdn.com/w320/gb.png"
          },
          {
              "language": "Latin American Spanish",
              "bcp47": "es-419",
              "flag": "https://flagcdn.com/w320/es.png"
          },
          {
              "language": "Korean",
              "bcp47": "ko",
              "flag": "https://flagcdn.com/w320/kr.png"
          },
          {
              "language": "Portuguese Brazil",
              "bcp47": "pt-br",
              "flag": "https://flagcdn.com/w320/br.png"
          },
          {
              "language": "Russian",
              "bcp47": "ru",
              "flag": "https://flagcdn.com/w320/ru.png"
          },
          {
              "language": "Vietnamese",
              "bcp47": "vi",
              "flag": "https://flagcdn.com/w320/vn.png"
          },
          {
              "language": "Chinese Taïwan",
              "bcp47": "zh-tw",
              "flag": "https://flagcdn.com/w320/tw.png"
          }
      ],
      "duration": "2022-03-24T11:10:08.814Z",
      "views": "7866619",
      "date": "2019-10-23T17:28:32.000Z"
  }
]

const searchService = new SearchService();

export default searchService;
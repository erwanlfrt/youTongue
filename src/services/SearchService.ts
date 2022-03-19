import Channel from "model/Channel";
import { IResult, ISubtitle, IChannel } from "../model/Format";

class SearchService {
  private youtubeAPIKey = "AIzaSyCFEkYX-a3igJUYB7Uuj6cDcIyyl4j_uhE";
  private urlVideoRequest = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=mustard&type=video&";
  private urlCaptionsRequest = "https://www.googleapis.com/youtube/v3/captions?"
  public SearchService() {

  }

  public async search(): Promise<IResult[]>{
    //YouTube search
    let results: IResult[] = [];
    /*
    let queryResponse = await fetch(this.urlVideoRequest + '&key=' + this.youtubeAPIKey);
    let searchDatas = await queryResponse.json();

    if(searchDatas.items) {
      for (const result of searchDatas.items) {
        let fetchCaptions = await fetch(this.urlCaptionsRequest + 'key=' + this.youtubeAPIKey + '&videoId='+result.id.videoId+"&part=snippet");
        let subtitles: ISubtitle[] = [];
        await fetchCaptions.json().then((captions)=> {
          for(let caption of captions.items) {
            subtitles.push({
              language: caption.snippet.language,
              bcp47: caption.snippet.language,
              flag: "insert a flag here"
            });
          }
          results.push({
            title: result.snippet.title,
            channel: result.snippet.channelTitle,
            thumbnail: result.snippet.thumbnails.high.url,
            description: result.snippet.description,
            subtitles: subtitles
          });
        });
      }
    }

    */

    return FICTITIOUS_RESULT;
  }

}

const mustardChannel: IChannel = {
  name: 'Mustard',
  channelPicture: 'https://yt3.ggpht.com/ytc/AKedOLT702UGekRPyvRDdy1rKqhUamCaLADdSm9RVlPY0A=s176-c-k-c0x00ffffff-no-rj-mo',
  certified: true
};

const FICTITIOUS_RESULT: IResult[] = [
  {
    title: 'What Happened To The Antarctic Snow Cruiser?',
    channel: mustardChannel,
    thumbnail: 'https://i.ytimg.com/vi/pW0eZRoQ86g/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCaATquT-nDdpbQs2V5-Wj1C5zzoA',
    description: 'Get an entire year of both CuriosityStream and Nebula for just $14.79 here: http://CuriosityStream.com/mustard',
    duration: 180,
    views: 6000000,
    date: new Date('September 22, 2018 15:00:00'),
    subtitles: [
      {
        language: 'english',
        bcp47: 'en',
        flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png'
      },
      {
        language: 'french',
        bcp47: 'fr',
        flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png'
      }
    ]
  },
  {
    title: 'The Strangest Aircraft Ever Built: The Soviet Union\'s VVA-14',
    channel: mustardChannel,
    thumbnail: 'https://i.ytimg.com/vi/UD7xiWWs-bs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCzqXiXbQcCCyN8aUWssU-Jlo9VRA',
    description: 'As an aircraft designer, physicist, astronomer, philosopher, painter and musician, Robert Bartini is often described as a genius ahead of his time. Throughout his life, he designed over 60 aircraft and made significant contributions to Soviet aviation. Although most of Bartini’s aircraft designs never left the drawing board, many of his aeronautical innovations were incorporated into production aircraft.',
    duration: 180,
    views: 6000000,
    date: new Date('September 22, 2018 15:00:00'),
    subtitles: [
      {
        language: 'english',
        bcp47: 'en',
        flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png'
      },
      {
        language: 'french',
        bcp47: 'fr',
        flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png'
      }
    ]
  }
]

export default SearchService;
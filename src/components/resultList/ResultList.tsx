import Channel from 'model/Channel';
import Subtitle from 'model/Subtitle';
import React from 'react';
import { IResult, ISubtitle } from '../../model/Format';
import SearchService from '../../services/SearchService';
import Item from '../item/Item';
import './result-list.css'
import Context from '../../services/Context';

type ResultProps = {
  results: IResult[]
}

class ResultList extends React.Component {
  private results: IResult[];
  private searchService: SearchService;
  public state: any;
  static contextType = Context;

  constructor(props: any) {
    super(props);
    this.state= {
      results: []
    }
    this.searchService = new SearchService();
    
  }

  componentDidMount() {
    this.searchService.search().then(res => {
      this.results = res;
      this.setState({results: res});
    });
  }

  render() {
    return <div id="result-list">
        {this.state.results.map((result: IResult) => {
            const channel = new Channel(result.channel.channelPicture, result.channel.name, result.channel.certified);
            let subtitles: Subtitle[] = [];
            for (const sub of result.subtitles) {
              subtitles.push(new Subtitle(sub.language, sub.bcp47 ))
            }

            return (
              <Item
                title={result.title}
                description={result.description}
                thumbnail={result.thumbnail} 
                duration={result.duration}
                views={result.views}
                date={result.date}
                channel={channel}
                subtitles={subtitles}
              ></Item>
            )
          })}
      </div>
  }
}
export default ResultList;
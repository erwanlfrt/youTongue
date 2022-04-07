import Channel from 'model/Channel';
import Subtitle from 'model/Subtitle';
import React from 'react';
import { IResult, ISubtitle } from '../../model/Format';
import searchService from '../../services/SearchService';
import Item from '../item/Item';
import './result-list.css'
import Context from '../../services/Context';
import Loader from '../loader/Loader';

type ResultProps = {
  results: IResult[],
  loading: boolean
}

class ResultList extends React.Component {
  private results: IResult[];
  public state: any;
  static contextType = Context;

  constructor(props: any) {
    super(props);
    this.state= {
      results: [],
      loading: false
    }
    
  }

  componentDidMount() {
    this.loadEvents();
  }

  private loadEvents (): void {
    document.addEventListener('search', (e) => {
      this.results = (e as CustomEvent).detail.results;
      for (let i = 0; i < 5 ; i++) {
        this.results = this.results.concat(this.results);
      }
      this.setState({results: this.results, loading: false});
    });

    document.addEventListener('search_start', () => {
      this.setState({loading: true});
    });
  }

  render() {
    if (this.state.loading) {
      return <Loader></Loader>
    }
    if (this.state.results.length === 0) {
      return <div id="empty-message-wrapper">
        <span id="empty-message">Videos will appear here.</span>
        </div>
    }
    return <div id="result-list">
        
        {this.state.results.map((result: IResult) => {
            const channel = new Channel(result.channel.channelPicture, result.channel.name, result.channel.certified);
            let subtitles: Subtitle[] = [];
            for (const sub of result.subtitles) {
              subtitles.push(new Subtitle(sub.language, sub.bcp47 ));
            }
            return (
              <Item
                id={result.id}
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
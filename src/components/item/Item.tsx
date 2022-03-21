import Channel from 'model/Channel';
import React from 'react';
import './item.css'
import verifiedIcon  from '../../assets/icons/check_circle_outline_black_24dp.svg';
import Subtitle from 'model/Subtitle';
import Language from 'components/language/Language';


type ItemProps = {
  title: string,
  description: string
  thumbnail: string,
  duration: Date,
  views: number,
  date: Date,
  channel: Channel,
  subtitles: Subtitle[]
}

class Item extends React.Component<ItemProps>{
  private duration: string;
  private stringDate: string;
  private views: string;

  constructor (props: ItemProps) {
    super(props);

    // this.duration = this.props.duration / 60 + ':' + (this.props.duration % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    this.duration = this.props.duration.getMinutes() + ':' + this.props.duration.getSeconds();
    this.stringDate = ((new Date()).getFullYear() - this.props.date.getFullYear()) + ' years ago';
    this.views = this.props.views / 1000000 + 'M views';
    
  }


  render() {
    let certifIcon;
    if (this.props.channel.certified) {
      certifIcon = <img className="item-channel-certified" src={verifiedIcon} alt=""/>;
    }
    return(
      <div className="item">
        <div className="thumbnail" style={{backgroundImage : 'url("' + this.props.thumbnail +'")'}}>
          <span className="duration">{this.duration}</span>
        </div>
        <div className="item-info"> 
          <div className="item-uper">
            <span className="item-title">{this.props.title}</span>
            <span>{this.views} · {this.stringDate}</span>
          </div>
          <div className="item-channel">
            <img className="item-channel-picture" src={this.props.channel.picture} alt="" />
            <span className="item-channel-name">{this.props.channel.name}</span>
            {certifIcon}
          </div>
          <p className="item-description">{this.props.description}</p>

          <div className="item-subtitles">
            {
              this.props.subtitles.map((subtitle) => {
                return (
                  <Language flag={subtitle.flag} language={subtitle.language} bcp47={subtitle.bcp47}></Language>
                )
              })
            }
          </div>
        </div>
        
      </div>
    )
  }
}

export default Item;
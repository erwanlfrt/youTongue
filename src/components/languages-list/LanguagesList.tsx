import React from 'react';
import './languages-list.css'
import ArrowDown from '../../assets/icons/arrow-down.svg'
import Subtitle from 'model/Subtitle';
import { getMostSpokenLanguages } from 'services/LanguageService';
import LanguageOption from 'components/language-option/LanguageOption';

type LanguagesListState = {
  listOpen: boolean;
}

type props = {
  handlePopupDisplay: any
}

class LanguagesList extends React.Component<props, LanguagesListState> {
  private headerList: React.RefObject<HTMLDivElement>;
  private subtitles: Subtitle[];

  constructor(props: any) {
    super(props);
    this.headerList = React.createRef<HTMLDivElement>();
    this.state = {
      listOpen: false
    };
    this.subtitles = getMostSpokenLanguages();
    this.subtitles.push(new Subtitle('other...', 'unknown'))
  }

  componentDidMount() {
    this.loadEvents();
  }


  private loadEvents() {
    this.headerList.current?.addEventListener('click', () => {
      this.setState({
        listOpen: !this.state.listOpen
      });
    })
  }
  

  render() {
    let languagesList = null
    if (this.state.listOpen) {
      languagesList = (
        <div className="languages-list-core">
          {
              this.subtitles.map((subtitle) => 
                <LanguageOption key={subtitle.bcp47} handlePopupDisplay={this.props.handlePopupDisplay} flag={subtitle.flag} language={subtitle.language} bcp47={subtitle.bcp47} ></LanguageOption>
              )
            }
        </div>
      )
    }
    return(
      <div className="language-list">
        <div className="languages-list-upper" ref={this.headerList}>
          <span className="noselect">Select languages</span>
          <span className="noselect-flag">?</span>
          <img className="arrow-down" src={ArrowDown} alt="" />
        </div>
        {languagesList}
      </div>
    )
  }
}

export default LanguagesList;
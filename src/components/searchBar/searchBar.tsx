import React from 'react';
import './search-bar.css';
import MagnifyingGlass from '../../assets/icons/search_black_24dp.svg'
import Subtitle from '../../model/Subtitle';
import { getAllLanguages } from '../../services/LanguageService';
import Language from '../language/Language';
import MoreButton from '../more-button/MoreButton';
import LanguagesPopup from 'components/languages-popup/LanguagesPopup';

type SearchBarState = {
  displayPopup: boolean;
}


class SearchBar extends React.Component<any, SearchBarState> {

  private subtitles: Subtitle[];
  private more: React.RefObject<HTMLDivElement>;

  state = {
    displayPopup: false
  };

  handlePopupDisplay = (displayPopup: boolean) => {
    this.setState({displayPopup});
  }

  constructor (props: any) {
    super(props);
    this.more = React.createRef<HTMLDivElement>();
    this.subtitles = getAllLanguages().slice(0,5);
  }

  componentDidMount () {
    this.loadEvents();
  }

  private loadEvents () {
    const more = this.more.current;
    if (more !== null && more !== undefined) {
      more.addEventListener('click', () => {
        this.setState({displayPopup: true});
      });
    }
  }

  render() {
    let popup = null;
    if (this.state.displayPopup) {
        popup = <LanguagesPopup handlePopupDisplay={this.handlePopupDisplay}></LanguagesPopup>
    }

    return(
      <div id="search-bar-container">
        {popup}
        <div id="search-bar-wrapper">
          <form id="search-bar">
            <input id="search-bar-input-text" type="text" placeholder="Search"></input>
            <button id="search-bar-input-submit" type="submit" >
              <img src={MagnifyingGlass} alt="" />
            </button>
          </form>
          <div id="search-bar-language-section">
          {
            this.subtitles.map((subtitle) => {
              return (
                <Language flag={subtitle.flag} language={subtitle.language} ></Language>
              )
            })
          }
          <MoreButton innerRef={this.more}></MoreButton>
          </div>
        </div>
      </div>
     
      
    )
  }
}

export default SearchBar;
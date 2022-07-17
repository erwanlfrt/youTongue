import React from 'react';
import './search-bar.css';
import MagnifyingGlass from '../../assets/icons/search_black_24dp.svg'
import Subtitle from '../../model/Subtitle';
import { getMostSpokenLanguages } from '../../services/LanguageService';
import Language from '../language/Language';
import MoreButton from '../more-button/MoreButton';
import LanguagesPopup from 'components/languages-popup/LanguagesPopup';
import LogoText from '../../assets/logo/youtongue_text.svg';
import Logo from '../../assets/logo/youtongue.svg';
import searchService from '../../services/SearchService';
import Context from '../../services/Context';


type SearchBarState = {
  displayPopup: boolean;
  waitForSearch: number;
  displayWelcomeScreen: boolean;
}


class SearchBar extends React.Component<any, SearchBarState> {

  private subtitles: Subtitle[];
  private more: React.RefObject<HTMLDivElement>;
  private input: React.RefObject<HTMLInputElement>;
  static contextType = Context;

  state = {
    displayPopup: false,
    waitForSearch: -1,
    displayWelcomeScreen: true
  };

  handlePopupDisplay = (displayPopup: boolean) => {
    this.setState({displayPopup});
  }

  constructor (props: any) {
    super(props);
    this.more = React.createRef<HTMLDivElement>();
    this.input = React.createRef<HTMLInputElement>();
    this.subtitles = getMostSpokenLanguages();
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

    this.input.current?.addEventListener('click', () => {
      this.animateWelcomeScreen();
    });

    this.input.current?.addEventListener('input', () => {
      clearTimeout(this.state.waitForSearch);
      this.context.loading = true;
      const event = new CustomEvent('search_start');
      document.dispatchEvent(event);
      this.setState({waitForSearch: window.setTimeout(() => {
          searchService.search(this.input.current?.value as string, this.context.languages_bcp47);
          this.setState({waitForSearch: -1});
          this.context.loading = false;
        }, 500)
      });
    });
  }

  private animateWelcomeScreen () {
    if (this.state.displayWelcomeScreen) {
      this.setState({displayWelcomeScreen: false});
      const event = new CustomEvent('input-click');
      document.dispatchEvent(event);
    }
  }

  render() {
    let popup = null;
    let content = null;
    let header = null
    if (this.state.displayPopup) {
        popup = <LanguagesPopup handlePopupDisplay={this.handlePopupDisplay}></LanguagesPopup>
    }
    if (true) {
      header = 
        <div id="welcome-header-wrapper"  className={`${this.state.displayWelcomeScreen ? "welcome-header-wrapper-display" : "welcome-header-wrapper-hidden"}`}>
          <div id="welcome-header">
            <div id="welcome-header-text-wrapper">
              <div id="welcome-header-text">
                <h1>Looking for YouTube videos with captions ?</h1>
                <span>Search YouTube videos according to languages you want.</span>
              </div>
            </div>
            <div id="welcome-header-logo-wrapper">
              <img src={Logo} alt="" id="welcome-header-logo" />
            </div>
          </div>
        </div>
        
    }
    return(
      <div id="search-bar-container" className={`${this.state.displayWelcomeScreen ? "search-bar-container-zoom-in" : "search-bar-container-zoom-out"}`}>
        {popup}
        <div id="search-bar-wrapper">
          <div id="logo-wrapper">
            <img src={LogoText} alt="" id="logo" />
          </div>
          {header}
          <div id="lower-search-bar" className={`${this.state.displayWelcomeScreen ? "" : "lower-search-bar-zoom-out"}`}>
            <div id="search-bar" className={`${this.state.displayWelcomeScreen ? "search-bar-zoom-in" : "search-bar-zoom-out"}`}>
              <input id="search-bar-input-text" type="text" placeholder="Search" autoComplete="off" ref={this.input}></input>
              <button id="search-bar-input-submit" type="submit" >
                <img src={MagnifyingGlass} alt="" />
              </button>
            </div>
            <div id="search-bar-language-section">
            {
              this.subtitles.map((subtitle) => {
                return (
                  <Language flag={subtitle.flag} language={subtitle.language} bcp47={subtitle.bcp47} ></Language>
                )
              })
            }
            <MoreButton innerRef={this.more}></MoreButton>
            </div>
          </div>
        </div>
      </div>
     
      
    )
  }
}

export default SearchBar;
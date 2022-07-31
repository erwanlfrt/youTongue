import React from 'react';
import './search-bar.css';
import MagnifyingGlass from '../../assets/icons/search_black_24dp.svg'
import LanguagesPopup from 'components/languages-popup/LanguagesPopup';
import LogoText from '../../assets/logo/youtongue_text.svg';
import searchService from '../../services/SearchService';
import Context from '../../services/Context';
import LanguagesList from 'components/languages-list/LanguagesList';
import SelectedLanguages from 'components/selected-languages/SelectedLanguages';


type SearchBarState = {
  displayPopup: boolean;
  waitForSearch: number;
  displayWelcomeScreen: boolean;
}


class SearchBar extends React.Component<any, SearchBarState> {

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
    if (displayPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible'
    }
  }

  constructor (props: any) {
    super(props);
    this.more = React.createRef<HTMLDivElement>();
    this.input = React.createRef<HTMLInputElement>();
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
    if (this.state.displayPopup) {
        popup = <LanguagesPopup handlePopupDisplay={this.handlePopupDisplay}></LanguagesPopup>
    }
    return(
      <div id="search-bar-container" className={`${this.state.displayWelcomeScreen ? "search-bar-container-zoom-in" : "search-bar-container-zoom-out"}`}>
        {popup}
        <div id="search-bar-wrapper">
          <div id="logo-wrapper">
            <img src={LogoText} alt="" id="logo" />
          </div>
          <div id="lower-search-bar" className={`${this.state.displayWelcomeScreen ? "" : "lower-search-bar-zoom-out"}`}>
            <div id="search-bar" className={`${this.state.displayWelcomeScreen ? "search-bar-zoom-in" : "search-bar-zoom-out"}`}>
              <input id="search-bar-input-text" type="text" placeholder="Search" autoComplete="off" ref={this.input}></input>
              <LanguagesList handlePopupDisplay={this.handlePopupDisplay}></LanguagesList>
              <button id="search-bar-input-submit" type="submit" >
                <img src={MagnifyingGlass} alt="" />
              </button>
            </div>
            <SelectedLanguages></SelectedLanguages>
          </div>
        </div>
      </div>
     
      
    )
  }
}

export default SearchBar;
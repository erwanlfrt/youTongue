import React from 'react';
import './languages-popup.css';
import Subtitle from '../../model/Subtitle';
import { getAllLanguages } from '../../services/LanguageService';
import Language from '../language/Language';
import CloseIcon from '../../assets/icons/close_black_24dp.svg';
import Scrollbar from '../scrollbar/Scrollbar';

type PopupState = {
  show: boolean,
  subtitles: Subtitle[]
}

type PopupProps = {
  handlePopupDisplay: any
}

class LanguagesPopup extends React.Component<PopupProps, PopupState> {
  private subtitles: Subtitle[];
  private allSubtitles: Subtitle[];
  private closeButton: React.RefObject<HTMLButtonElement>;
  private inputField: React.RefObject<HTMLInputElement>;


  constructor (props: PopupProps) {
    super(props);
    this.closeButton = React.createRef<HTMLButtonElement>();
    this.inputField = React.createRef<HTMLInputElement>();
    this.subtitles = getAllLanguages();
    this.allSubtitles = this.subtitles;
    this.state = {
      show: true,
      subtitles: this.subtitles
    };
  }

  componentDidMount () {
    this.loadEvents();
  }

  private loadEvents (): void {
    const closeButton = this.closeButton.current;
    const inputField = this.inputField.current;
    if (closeButton !== null && closeButton !== undefined) {
      closeButton.addEventListener('click', () => {
        this.props.handlePopupDisplay(false)
      });
    }

    if (inputField) {
      inputField.addEventListener('input', this.searchLanguages.bind(this))
    }
  }

  private searchLanguages (e: any) {
    const tmp: Subtitle[] = [];
    for (const sub of this.allSubtitles) {
      if (sub.language.toLowerCase().startsWith(e.target?.value.toLowerCase())) {
        tmp.push(sub);
      }
    }
    this.subtitles = tmp;
    this.setState({subtitles: tmp});

  }

  render () {
    if (this.state.show) {
      return(
        <div id="languages-popup-background">
          <div id="languages-popup">
            <div id="languages-popup-header">
              <input type="text" placeholder="Search languages..." id="languages-popup-search" ref={this.inputField} />
              <button id="languages-popup-close-button" ref={this.closeButton}><img src={CloseIcon} alt="" /></button>
            </div>
            <div id="languages-popup-list-wrapper">
              <div id="languages-popup-list">
                {
                  this.state.subtitles.map((subtitle) => {
                    return (
                      <Language flag={subtitle.flag} language={subtitle.language} bcp47={subtitle.bcp47} ></Language>
                      
                    )
                  })
                }
              </div>
              <Scrollbar></Scrollbar>
            </div>
            
          </div>
        </div>
        
      )
    }
    return null;
   
  }
}

export default LanguagesPopup;
import React from 'react';
import './languages-popup.css';
import Subtitle from '../../model/Subtitle';
import { getAllLanguages } from '../../services/LanguageService';
import Language from '../language/Language';
import CloseIcon from '../../assets/icons/close_black_24dp.svg'

type PopupState = {
  show: boolean
}

type PopupProps = {
  handlePopupDisplay: any
}

class LanguagesPopup extends React.Component<PopupProps, PopupState> {
  private subtitles: Subtitle[];
  private closeButton: React.RefObject<HTMLButtonElement>;

  constructor (props: PopupProps) {
    super(props);
    this.closeButton = React.createRef<HTMLButtonElement>();
    this.subtitles = getAllLanguages()
    this.subtitles = this.subtitles.concat(this.subtitles);
    this.subtitles = this.subtitles.concat(this.subtitles);
    this.subtitles = this.subtitles.concat(this.subtitles);
    this.state = {
      show: true
    };
  }

  componentDidMount () {
    this.loadEvents();
  }

  private loadEvents (): void {
    const closeButton = this.closeButton.current;
    if (closeButton !== null && closeButton !== undefined) {
      closeButton.addEventListener('click', () => {
        console.log('close');
        this.props.handlePopupDisplay(false)
      });
    }
  }

  render () {
    if (this.state.show) {
      return(
        <div id="languages-popup-background">
          <div id="languages-popup">
            <div id="languages-popup-header">
              <h1>Select languages...</h1>
              <button id="languages-popup-close-button" ref={this.closeButton}><img src={CloseIcon} alt="" /></button>
            </div>
            <div id="languages-popup-list">
              {
                this.subtitles.map((subtitle) => {
                  return (
                    <Language flag={subtitle.flag} language={subtitle.language} ></Language>
                    
                  )
                })
              }
            </div>
          </div>
        </div>
        
      )
    }
    return null;
   
  }
}

export default LanguagesPopup;
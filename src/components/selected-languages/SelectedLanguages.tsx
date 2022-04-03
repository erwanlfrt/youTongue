import Subtitle from 'model/Subtitle';
import React from 'react';
import './selected-languages.css';
import Context from '../../services/Context';
import Language from 'components/language/Language';
import { getLanguage } from 'services/LanguageService';

type SelectedLanguagesState = {
  subtitles: Subtitle[],
  displayAll: boolean
}

class SelectedLanguages extends React.Component<any, SelectedLanguagesState> {
  static contextType = Context;
  private list: React.RefObject<HTMLDivElement>;
  private listWrapper: React.RefObject<HTMLDivElement>;
  private shift = 0;
  private step = 3;
  private previousX = -1;

  private mouseMoveListener = (e: MouseEvent) => {

      this.shift += (e.clientX - this.previousX);
      if (this.list.current) {
        if (this.shift > 0) this.shift = 0;
        if (this.shift < -this.getMaxShift()) this.shift = -this.getMaxShift();
        this.list.current.style.transform = 'translateX(' + this.shift + 'px)';
      }
      this.previousX = e.clientX;
  }


  constructor (props: any) {
    super(props);
    this.state = {
      subtitles: [],
      displayAll: false
    }
    this.list = React.createRef<HTMLDivElement>();
    this.listWrapper = React.createRef<HTMLDivElement>();
  }

  componentDidMount (): void {
    this.loadEvents();
  }

  private getMaxShift (): number {
    if (!this.list.current) return -1;
    let listLength = 0;
    for (let i = 0; i < this.list.current.children.length - 1; i++) {
      listLength += (this.list.current.children[i].clientWidth);
    }
    const maxShift = listLength - this.list.current.clientWidth;
    if (maxShift < 0) return 0;
    return maxShift;
  }
  
  private loadEvents (): void {
    document.addEventListener('languages_update', () => {
      if (this.context !== undefined) {
        const subtitles = [];
        for (const bcp47 of this.context.languages_bcp47) {
          subtitles.push(getLanguage(bcp47))
        }
        this.setState({subtitles: subtitles});
        
      }
    });
    this.listWrapper.current?.addEventListener('mousedown', (e: MouseEvent) => {
      this.previousX = e.clientX;
      this.listWrapper.current?.addEventListener('mousemove', this.mouseMoveListener);
    });
    this.listWrapper.current?.addEventListener('mouseup', () => {
      this.listWrapper.current?.removeEventListener('mousemove', this.mouseMoveListener);
    });
    this.listWrapper.current?.addEventListener('mouseleave', () => {
      this.listWrapper.current?.removeEventListener('mousemove', this.mouseMoveListener);
    })
    
  }

  render () {
    let message = <span className="existingMessage">Selected languages</span>
    if (this.context.languages_bcp47.length === 0) {
      message = <span className="nothingMessage">No language selected</span>
    }
    const subtitles = [];
    for (const bcp47 of this.context.languages_bcp47) {
      subtitles.push(getLanguage(bcp47))
    }
    return (
      <div id="selected-languages"  ref={this.listWrapper}>
        {message}
        <div id="selected-languages-list" ref={this.list}>
          {
            subtitles.map((subtitle) => {
            return (
              <Language flag={subtitle.flag} language={subtitle.language} bcp47={subtitle.bcp47} ></Language>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default SelectedLanguages;
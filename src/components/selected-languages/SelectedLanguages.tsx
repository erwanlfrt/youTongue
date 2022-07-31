import Subtitle from 'model/Subtitle';
import React from 'react';
import './selected-languages.css';
import Context from '../../services/Context';
import Language from 'components/language/Language';
import { getLanguage } from 'services/LanguageService';
import ArrowRight from 'assets/icons/arrow-right.svg';
import ArrowLeft from 'assets/icons/arrow-left.svg';

type SelectedLanguagesState = {
  subtitles: Subtitle[],
  displayAll: boolean
}

class SelectedLanguages extends React.Component<any, SelectedLanguagesState> {
  static contextType = Context;
  private list: React.RefObject<HTMLDivElement>;
  private listWrapper: React.RefObject<HTMLDivElement>;
  private slideIndex = 0;
  private previousShift = 0;
  private numberOfItems = 0;

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
    if (!this.list.current || this.list.current.children.length === 0) return -1;
    let listLength = 0;
    let widthLanguage = this.outerWidth(this.list.current.children[0] as HTMLElement);
    for (let i = 0; i < this.list.current.children.length; i++) {
      listLength += widthLanguage
    }
    const maxShift = listLength - this.list.current.clientWidth;
    if (maxShift < 0) return 0;
    return maxShift;
  }

  private outerWidth(el: HTMLElement) {
    var width = el.offsetWidth;
    var style = getComputedStyle(el);
  
    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    return width;
  }
  
  private loadEvents (): void {
    document.addEventListener('languages_update', () => {
      if (this.context !== undefined) {
        const subtitles = [];
        for (const bcp47 of this.context.languages_bcp47) {
          subtitles.push(getLanguage(bcp47))
        }
        this.setState({subtitles: subtitles});
        if (subtitles.length < this.numberOfItems) {
          this.slideRight();
          this.slideIndex--;
        }
        this.numberOfItems = subtitles.length;
      }
    });
  }

  private slideLeft() {
    if (!this.list.current || this.list.current.children.length === 0) return;
    this.slideIndex--;
    if (this.slideIndex < 0) this.slideIndex = 0;
    const widthLanguage = this.outerWidth(this.list.current.children[0] as HTMLElement);
    this.slide(this.slideIndex * widthLanguage);
    
  }

  private slideRight() {
    if (!this.list.current || this.list.current.children.length === 0) return;
    this.slideIndex++;
    const widthLanguage = this.outerWidth(this.list.current.children[0] as HTMLElement);
    let maxShift = this.getMaxShift()
    let shift = this.slideIndex * widthLanguage;
    if (shift > maxShift) {
      shift = maxShift;
      if (shift === this.previousShift) {
        this.slideIndex--;
      }
    }
    this.slide(shift);
    
  }

  private slide(shift: number) {
    if (!this.list.current || this.list.current.children.length === 0) return;
    this.list.current.style.transform = `translateX(-${shift}px)`
    this.previousShift = shift;
  }
  
  render () {
    let subtitles = [];
    for (const bcp47 of this.context.languages_bcp47) {
      subtitles.push(getLanguage(bcp47))
    }

    let arrowLeft = null;
    let arrowRight = null;
    if (this.getMaxShift() > 0) {
      arrowLeft = <img className="arrows arrow-left" src={ArrowLeft} alt="" onClick={this.slideLeft.bind(this)}/>
      arrowRight = <img className="arrows arrow-right" src={ArrowRight} alt="" onClick={this.slideRight.bind(this)}/>
    }
    if (subtitles.length > 0) {
      return (
        <div id="selected-languages"  ref={this.listWrapper}>
          { arrowLeft }
          <div id="selected-languages-list-wrapper">
            <div id="selected-languages-list" ref={this.list}>
              {
                subtitles.map((subtitle) => 
                  <Language key={subtitle.bcp47} flag={subtitle.flag} language={subtitle.language} bcp47={subtitle.bcp47} ></Language>
                )
              }
            </div>
          </div>
          
          { arrowRight }
          {/* <button onClick={() => {this.context.languages_bcp47.push('en');const event = new CustomEvent('languages_update');document.dispatchEvent(event);}}>TO REMOVE</button> */}
        </div>
        
      )
    } else {
      return (
        <div></div>
      )
    }
    
  }
}

export default SelectedLanguages;
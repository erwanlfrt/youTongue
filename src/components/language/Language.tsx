import React from 'react';
import './language.css'
import Context from '../../services/Context';
import Cross from 'assets/icons/close_white.svg';

type LanguageProps = {
  language: string,
  flag: string,
  bcp47: string
}

class Language extends React.Component<LanguageProps> {
  private element: React.RefObject<HTMLDivElement>;
  private flag: React.RefObject<HTMLImageElement>;
  private flagWrapper: React.RefObject<HTMLDivElement>;
  private text: React.RefObject<HTMLSpanElement>;
  static contextType = Context;
  
  constructor (props: LanguageProps) {
    super(props);
    this.element = React.createRef<HTMLDivElement>();
    this.flag = React.createRef<HTMLImageElement>();
    this.text = React.createRef<HTMLSpanElement>();
    this.flagWrapper = React.createRef<HTMLDivElement>();
  }

  componentDidMount () {
    this.loadEvents();
    this.loadStyle();
  }

  render () {
    return (
      <div className="item-subtitle" ref={this.element}>
        <div className="item-subtitle-flag-wrapper" ref={this.flagWrapper} >
          <img className="item-subtitle-flag" src={this.props.flag} alt="" ref={this.flag} />
        </div>
        <span className="item-subtitle-language" ref={this.text}>{this.props.language}</span>
      </div>
    )
  }

  private loadEvents (): void {
    const el = this.element.current;
    if (el !== null && el !== undefined) {
      el.addEventListener('click', () => {
        if (el.classList.contains('selected')) {
          this.context.languages_bcp47 =this.context.languages_bcp47.filter((item: string) => item !== this.props.bcp47)
        } else {
          if (!this.context.languages_bcp47.includes(this.props.bcp47)) {
            this.context.languages_bcp47.push(this.props.bcp47);
          }
        }
        const event = new CustomEvent('languages_update');
        document.dispatchEvent(event);
      });

      const flag = this.flag.current;
      const text = this.text.current;
      const flagWrapper = this.flagWrapper.current;
      el.addEventListener('mouseenter', () => {
        if (flag && text && flagWrapper && el.classList.contains('selected')) {
          el.style.backgroundColor  = '#eb5454';
          text.innerText = 'remove';
          text.style.color = 'white';
          flag.src = Cross;
          flagWrapper.style.width = '35px';
        }
      })

      el.addEventListener('mouseleave', () =>  {
        if (flag && text && flagWrapper) {
          el.style.backgroundColor  = '#96e02f';
          text.style.color = 'black';
          text.innerText = this.props.language;
          flag.src = this.props.flag;
          flagWrapper.style.width = 'auto';
        }
      })

      document.addEventListener('languages_update', () => {
        this.loadStyle();
        if (flag && text && flagWrapper) {
          el.style.backgroundColor  = '#96e02f';
          text.style.color = 'black';
          text.innerText = this.props.language;
          flag.src = this.props.flag;
          flagWrapper.style.width = 'auto';
        }
      });
    }
    
  }

  private loadStyle (): void {
    const el = this.element.current;
    if (el) {
      if (this.context.languages_bcp47.includes(this.props.bcp47)) {
        el.classList.add('selected');
      } else  {
        el.classList.remove('selected');
      }
    }
  }
}

export default Language;
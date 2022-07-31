import React from 'react';
import './language-option.css'
import Context from '../../services/Context';

type LanguageOptionProps = {
  language: string,
  flag: string,
  bcp47: string,
  handlePopupDisplay: any
}


class LanguageOption extends React.Component<LanguageOptionProps> {
  private element: React.RefObject<HTMLDivElement>;
  static contextType = Context;
  
  constructor (props: LanguageOptionProps) {
    super(props);
    this.element = React.createRef<HTMLDivElement>();

  }

  componentDidMount () {
    this.loadEvents();
    this.loadStyle();
  }

  render () {

    let flag = <img className="option-subtitle-flag" src={this.props.flag} alt="" />
    if (this.props.bcp47 === 'unknown') {
      flag = <div className="unknown-flag option-subtitle-flag">?</div>
    }
    return (
      <div className="option-subtitle" ref={this.element}>
        { flag }
        <span className="option-subtitle-language">{this.props.language}</span>
      </div>
    )
  }

  private loadEvents (): void {
    const el = this.element.current;
    if (el !== null && el !== undefined) {
      el.addEventListener('click', () => {
        if (this.props.bcp47 !== 'unknown') {
          if (el.classList.contains('selected')) {
            this.context.languages_bcp47 =this.context.languages_bcp47.filter((item: string) => item !== this.props.bcp47)
          } else {
            if (!this.context.languages_bcp47.includes(this.props.bcp47)) {
              this.context.languages_bcp47.push(this.props.bcp47);
            }
          }
          const event = new CustomEvent('languages_update');
          document.dispatchEvent(event);
        } else {
          // open the languages panel
          this.props.handlePopupDisplay(true)
        }
      });

      // if not the 'other' option
      if (this.props.bcp47 !== 'unknown') {
        document.addEventListener('languages_update', () => {
          this.loadStyle();
        });
      }
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

export default LanguageOption;
import React from 'react';
import './language.css'
import Context from '../../services/Context';

type LanguageProps = {
  language: string,
  flag: string,
  bcp47: string
}

class Language extends React.Component<LanguageProps> {
  private element: React.RefObject<HTMLDivElement>;
  static contextType = Context;
  
  constructor (props: LanguageProps) {
    super(props);
    this.element = React.createRef<HTMLDivElement>();

  }

  componentDidMount () {
    this.loadEvents();
    this.loadStyle();


  }

  render () {
    return (
      <div className="item-subtitle" ref={this.element}>
        <img className="item-subtitle-flag" src={this.props.flag} alt="" />
        <p className="item-subtitle-language">{this.props.language}</p>
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

      document.addEventListener('languages_update', () => {
        this.loadStyle();
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
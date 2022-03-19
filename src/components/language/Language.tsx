import React from 'react';
import './language.css'

type LanguageProps = {
  language: string,
  flag: string
}

class Language extends React.Component<LanguageProps> {
  private element: React.RefObject<HTMLDivElement>;
  
  constructor (props: LanguageProps) {
    super(props);
    this.element = React.createRef<HTMLDivElement>();
  }

  componentDidMount () {
    this.loadEvents();
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
          this.element.current?.classList.remove('selected');
        } else {
          this.element.current?.classList.add('selected');
        }
      });
    }
    
  }
}

export default Language;
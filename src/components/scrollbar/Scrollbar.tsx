import React from 'react';
import './scrollbar.css';

class Scrollbar extends React.Component {
  private wrapper: React.RefObject<HTMLDivElement>;
  private scrollbar: React.RefObject<HTMLDivElement>;

  private y: number = -1;

  constructor (props: any) {
    super(props);
    this.wrapper = React.createRef<HTMLDivElement>();
    this.scrollbar = React.createRef<HTMLDivElement>();
  }

  componentDidMount () {
    this.loadEvents();
    this.loadStyle();
  }

  private loadEvents () {
    const listener =  this.onMouseMove.bind(this);
    this.wrapper.current?.addEventListener('mousedown', (e: MouseEvent) => {
      this.wrapper.current?.addEventListener('mousemove', listener);
    });
    window.addEventListener('mouseup',  (e: MouseEvent) => {
      this.wrapper.current?.removeEventListener('mousemove',listener);
    });
  }

  private onMouseMove (e: MouseEvent) {
    const wrapper =  this.wrapper.current as HTMLDivElement;
    const scrollbar  = this.scrollbar.current as HTMLDivElement;
    const style = window.getComputedStyle(this.scrollbar.current as HTMLDivElement);
    const marginTop = style.getPropertyValue('margin-top'); 
    if (this.y !== -1) {
      if (scrollbar) {
        const newMargin = parseInt(marginTop, 10)+ (e.clientY - this.y);
        if (newMargin >= 0 && newMargin <= wrapper.clientHeight - scrollbar.clientHeight) {
          scrollbar.style.marginTop = parseInt(marginTop, 10)+ (e.clientY - this.y) + 'px';
          this.updateList(newMargin / wrapper.clientHeight);
        }
      }
    }
    this.y = e.clientY;
  }

  private loadStyle () {
    const popup = document.getElementById('languages-popup') as HTMLDivElement;
    const header  = document.getElementById('languages-popup-header') as HTMLDivElement;
    const height = (popup.clientHeight - header.clientHeight) * 0.9;
    const marginTop = (popup.clientHeight - header.clientHeight) * 0.05;
    if (this.wrapper.current) {
      this.wrapper.current.style.height = height + 'px';
      this.wrapper.current.style.marginTop = marginTop + 'px'; 
    }
  }

  private updateList (coeff: number): void {
    const list  = document.getElementById('languages-popup-list') as HTMLDivElement;
    list.style.transform = 'translateY(' + -coeff * list.clientHeight + 'px)';
  }

  render () {
    return (
      <div className="scrollbar-wrapper" ref={this.wrapper}>
        <div className="scrollbar" ref={this.scrollbar}>
        </div>
      </div>
    )
  }
}

export default Scrollbar;
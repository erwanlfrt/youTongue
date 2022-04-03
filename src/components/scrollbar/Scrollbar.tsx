import React from 'react';
import './scrollbar.css';

class Scrollbar extends React.Component {
  private wrapper: React.RefObject<HTMLDivElement>;
  private wrapperWrapper: React.RefObject<HTMLDivElement>;
  private scrollbar: React.RefObject<HTMLDivElement>;

  private y: number = -1;

  private wheelListener =  ((e: WheelEvent) => {
    e.preventDefault();
    this.scroll(e.deltaY, 20, true);
    this.y += e.deltaY
  });

  constructor (props: any) {
    super(props);
    this.wrapper = React.createRef<HTMLDivElement>();
    this.scrollbar = React.createRef<HTMLDivElement>();
    this.wrapperWrapper = React.createRef<HTMLDivElement>();
  }

  componentDidMount () {
    this.loadEvents();
    this.loadStyle();
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.wheelListener);
  }

  private loadEvents () {
    const listener =  this.onMouseMove.bind(this);
    this.wrapperWrapper.current?.addEventListener('mousedown', (e: MouseEvent) => {
      this.wrapperWrapper.current?.addEventListener('mousemove', listener);
    });
    window.addEventListener('mouseup',  (e: MouseEvent) => {
      this.wrapperWrapper.current?.removeEventListener('mousemove',listener);
    });
    
    window.addEventListener('wheel', this.wheelListener, { passive:false });
  }

  private onMouseMove (e: MouseEvent) {
    this.scroll (e.clientY, (e.clientY - this.y), false);
    this.y = e.clientY;
  }

  private scroll (yIndex: number, shift: number, checkDirection: boolean): void {
    const wrapper =  this.wrapper.current as HTMLDivElement;
    const scrollbar  = this.scrollbar.current as HTMLDivElement;
    const style = window.getComputedStyle(this.scrollbar.current as HTMLDivElement);
    const marginTop = style.getPropertyValue('margin-top'); 
    if ( yIndex < 0 && checkDirection) {
      shift = -shift;
    }
    let newMargin = parseInt(marginTop, 10) + shift;
    if (newMargin < 0) newMargin = 0;
    if (newMargin >  wrapper.clientHeight - scrollbar.clientHeight) {
      newMargin =  wrapper.clientHeight - scrollbar.clientHeight;
    } 
    scrollbar.style.marginTop = newMargin + 'px';
    this.updateList(newMargin / wrapper.clientHeight);
  }

  private loadStyle () {
    const popup = document.getElementById('languages-popup') as HTMLDivElement;
    const header  = document.getElementById('languages-popup-header') as HTMLDivElement;
    const list = document.getElementById('languages-popup-list') as HTMLDivElement;
    const item = document.querySelector('#languages-popup-list .item-subtitle');
    const listStyle = window.getComputedStyle(list);
    const listRowGap = parseInt(listStyle.getPropertyValue('row-gap'),10);
    const height = (popup.clientHeight - header.clientHeight) * 0.9;
    const marginTop = (popup.clientHeight - header.clientHeight) * 0.05;
    if (this.wrapper.current) {
      this.wrapper.current.style.height = height + 'px';
      this.wrapper.current.style.marginTop = marginTop + 'px'; 
    }
    if (list && this.scrollbar.current) {
      const heightScrollbar = (  (popup.clientHeight - header.clientHeight)/ list.scrollHeight) * 100;
      this.scrollbar.current.style.height = heightScrollbar + '%';
    }
  }

  private updateList (coeff: number): void {
    const list  = document.getElementById('languages-popup-list') as HTMLDivElement;
    list.style.transform = 'translateY(' + -coeff * list.clientHeight + 'px)';
  }

  render () {
    return (
      <div className="scrollbar-wrapper-wrapper" ref={this.wrapperWrapper}>
        <div className="scrollbar-wrapper" ref={this.wrapper}>
          <div className="scrollbar" ref={this.scrollbar}>
          </div>
        </div>
      </div>
    )
      
  }
}

export default Scrollbar;
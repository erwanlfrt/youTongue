import React from 'react';
import './scrollbar.css';

class Scrollbar extends React.Component {
  private wrapper: React.RefObject<HTMLDivElement>;
  private wrapperWrapper: React.RefObject<HTMLDivElement>;
  private scrollbar: React.RefObject<HTMLDivElement>;

  private y: number = -1;
  private previousScrollY: number = 0;
  private touchThrottle: number | null = null;

  private wheelListener =  ((e: WheelEvent) => {
    e.preventDefault();
    this.scroll(e.deltaY, 20, true);
    this.y += e.deltaY
  });

  private scrollListener = ((e: TouchEvent) => {
    if (this.touchThrottle === null) {
      this.touchThrottle = window.setTimeout(() => {
        const deltaY = this.previousScrollY - e.touches[0].clientY;
        this.scroll(deltaY, 5, true);
        this.previousScrollY = e.touches[0].clientY;
        this.touchThrottle = null;
      }, 0)
    }
    
  })

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
    window.removeEventListener('touchmove', this.scrollListener);

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
    window.addEventListener('touchmove', this.scrollListener, { passive: false});

    window.addEventListener('touchend', () => this.previousScrollY = 0);

    document.addEventListener('search_language', () => {
      const scrollbar  = this.scrollbar.current as HTMLDivElement;
      if (scrollbar) {
        scrollbar.style.marginTop = '0px';
        this.updateList(0);
        this.loadStyle();
      }
    });
  }

  private onMouseMove (e: MouseEvent) {
    if (this.y !== -1) {
      let gap = e.clientY - this.y;
      this.scroll (e.offsetY, gap, false);
    }
    this.y = e.clientY;
  }

  private scroll (yIndex: number, shift: number, isShift: boolean): void {
    const wrapper =  this.wrapper.current as HTMLDivElement;
    const scrollbar  = this.scrollbar.current as HTMLDivElement;
    const style = window.getComputedStyle(this.scrollbar.current as HTMLDivElement);
    const marginTop = style.getPropertyValue('margin-top'); 
    if ( yIndex < 0 && isShift) {
      shift = -shift;
    }
    let newMargin = parseInt(marginTop, 10) + shift;

    if (newMargin < 0) newMargin = 0;
    if (scrollbar.clientHeight !== 0) {
      if (newMargin >  wrapper.clientHeight - scrollbar.clientHeight) {
        newMargin =  wrapper.clientHeight - scrollbar.clientHeight;
      } 
    }
    scrollbar.style.marginTop = newMargin + 'px';
    this.updateList(newMargin / Math.floor(this.getRenderedHeightList()*0.9));
  }

  private loadStyle () {
    const popup = document.getElementById('languages-popup') as HTMLDivElement;
    const header  = document.getElementById('languages-popup-header') as HTMLDivElement;
    const list = document.getElementById('languages-popup-list') as HTMLDivElement;
    const items = document.querySelectorAll('#languages-popup-list .item-subtitle');
    const nbRows = Math.floor(items.length / 5);
    const listStyle = window.getComputedStyle(list);
    const listRowGap = parseInt(listStyle.getPropertyValue('row-gap'),10);
    let itemHeight = 0;
    if (items[0]) {
      itemHeight = (items[0].clientHeight + listRowGap);
    }
    const height = (popup.clientHeight - header.clientHeight) * 0.9;
    const marginTop = (popup.clientHeight - header.clientHeight) * 0.05;
    if (this.wrapper.current) {
      this.wrapper.current.style.height = height + 'px';
      this.wrapper.current.style.marginTop = marginTop + 'px'; 
    }
    if (list && this.scrollbar.current) {
      let heightScrollbar = (  (popup.clientHeight - header.clientHeight)/ (nbRows * itemHeight)) * 100;
      if (heightScrollbar > 100) {
        heightScrollbar = 100;
      }
      this.scrollbar.current.style.height = heightScrollbar + '%';
    }
  }

  private updateList (coeff: number): void {
    const list  = document.getElementById('languages-popup-list') as HTMLDivElement;
    if (coeff*list.clientHeight > list.clientHeight - this.getRenderedHeightList() ) {
      if (list.clientHeight - this.getRenderedHeightList() > 0) {
        coeff =  (list.clientHeight - this.getRenderedHeightList()) / list.clientHeight;
      } else {
        coeff = 0;
      }
    }
    list.style.transform = 'translateY(' + -coeff * list.clientHeight + 'px)';
  }

  private getRenderedHeightList (): number {
    const popup = document.getElementById('languages-popup') as HTMLDivElement;
    const header  = document.getElementById('languages-popup-header') as HTMLDivElement;
    return popup.clientHeight - header.clientHeight;
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
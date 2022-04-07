import React from 'react';
import './more-button.css';
import AddIcon from '../../assets/icons/add_circle_outline_black_24dp.svg';

type MoreButtonProps = {
  innerRef: React.RefObject<HTMLDivElement> | null
}

class MoreButton extends React.Component<MoreButtonProps>{

  render () {
    return(
      <div className="more-button" ref={this.props.innerRef}>
        <img src={AddIcon} alt="" />
        <div className="more-button-text-wrapper">
          <span className="more-button-text">more</span>
        </div>
      </div>
    )
  }
}

export default MoreButton;
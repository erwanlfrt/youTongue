import React from 'react';
import './more-button.css';
import AddIcon from '../../assets/icons/add_circle_outline_black_24dp.svg';

type MoreButtonProps = {
  innerRef: React.RefObject<HTMLDivElement>
}

class MoreButton extends React.Component<MoreButtonProps>{

  render () {
    return(
      <div className="more-button" ref={this.props.innerRef}>
        <img src={AddIcon} alt="" />
        <span className="more-button-text">more</span>
      </div>
    )
  }
}

export default MoreButton;
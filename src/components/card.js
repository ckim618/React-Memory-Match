import React, { Component } from 'react';
import '../assets/css/app.css';
import back_card from '../assets/css/images/cardback.png';


class Card extends Component {
    
    constructor(props) {
        super(props);
        this.card_clicked = this.card_clicked.bind(this);
    }


    card_clicked() {
        if(this.props.info.matched) {
            return;
        }
        this.props.info.index = this.props.index;
        this.props.info.visibility =true;
        this.props.onClick(this.props.index);
    }

 
    render() {
        return (
            <div className={`card ${this.props.info.visibility ? 'reveal flipped' : ''}`} onClick={this.card_clicked}>
                <div className="front">
                    <img src={this.props.info[0].card} />
                </div>
                <div className="back">
                    <img src={back_card} alt="back card" />
                </div>
            </div>
        )
    }
}

export default Card;

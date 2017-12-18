import React, { Component } from 'react';
import '../assets/css/app.css';
import back_card from '../assets/css/images/cardback.gif';
import back_card2 from '../assets/css/images/cardback2.gif';



class Card extends Component {
    
    constructor(props) {
        super(props);
        this.card_clicked = this.card_clicked.bind(this);
    }


    card_clicked() {

        const { info } = this.props;
        if(info.matched) {
            return;
        }
        info.index = this.props.index;
        info.visibility =true;
        this.props.onClick(this.props.index);
    }

 
    render() {

        const { info } = this.props;
        
        return (
            <div className={`card ${info.visibility ? 'reveal flipped' : ''}`} onClick={this.card_clicked}>
                <div className="front">
                    <img src={info[0].card} />
                </div>
                <div className="back">
                    <img src={this.props.playerTurn ? back_card : back_card2} alt="back card" />
                </div>
            </div>
        )
    }
}

export default Card;

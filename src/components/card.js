import React, { Component } from 'react';
import '../assets/css/app.css';
import back_card from '../assets/css/images/cardback.png';


class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_clicked_index: null,
            second_clicked_index: null
        }

        this.card_clicked = this.card_clicked.bind(this);
    }


    card_clicked(event) {
        if(this.props.info.matched) {
            console.log('Clicked a matched  card');
            return;
        }
        this.props.info.cardClass = event.currentTarget;
        this.props.info.visibility =true;
        console.log(this.props);
        if(this.state.first_clicked_index === null) {
            console.log(this.props)
            this.setState({
                first_clicked_index: this.props.info.index
            });
        } else {
            this.setState({
                second_clicked_index: this.props.index
            });
        }
        console.log(this.state.first_clicked_index)
        this.props.onClick(this.props.index);
    }

    render() {
        return (
            <div className={`card ${this.props.info.visibility ? 'reveal flipped' : ''}`} onClick={this.card_clicked}>
                <div className="front">
                    <img src={this.props.info.card} />
                </div>
                <div className="back">
                    <img src={back_card} alt="back card" />
                </div>
            </div>
        )
    }
}

export default Card;

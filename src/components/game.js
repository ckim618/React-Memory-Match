import React, { Component } from 'react';
import Stats from './stats';
import Card from './card';
import '../assets/css/app.css';
import archmage from '../assets/css/images/archmage.png';
import aldor_peacekeeper from '../assets/css/images/aldor_peacekeeper.png';
import azure from '../assets/css/images/azure.png';
import boar from '../assets/css/images/boar.png';
import holy_champion from '../assets/css/images/holy_champion.png';
import mountain_giant from '../assets/css/images/mountain_giant.png';
import northshire_cleric from '../assets/css/images/northshire_cleric.png';
import patches from '../assets/css/images/patches.png';
import silver_hand_recruit from '../assets/css/images/silver_hand_recruit.png';

const initialCardState = [
    {
        id: 'archmage',
        card: archmage,
        cardClass: null,
        index: null,
        visibility: false,
        matched: false
    },
    {
        id: 'archmage',
        card: archmage,
        cardClass: null,
        index: null,  
        visibility: false,
        matched: false                    
    },
    {
        id: 'aldor_peacekeeper',
        card: aldor_peacekeeper,
        cardClass: null,
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'aldor_peacekeeper',
        card: aldor_peacekeeper,
        cardClass: null,
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'azure',
        card: azure,
        cardClass: null,
        index: null, 
        visibility: false, 
        matched: false                    
    },
    {
        id: 'azure',
        card: azure,
        cardClass: null,
        index: null,
        visibility: false,  
        matched: false                    
    },
    {
        id: 'boar',
        card: boar,
        cardClass: null,
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'boar',
        card: boar,
        cardClass: null,
        index: null, 
        visibility: false,
        matched: false                    
    },
    {
        id: 'holy_champion',
        card: holy_champion,
        cardClass: null,
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'holy_champion',
        card: holy_champion,
        cardClass: null,
        index: null, 
        visibility: false, 
        matched: false                    
    },
    {
        id: 'mountain_giant',
        card: mountain_giant,
        cardClass: null,
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'mountain_giant',
        card: mountain_giant,
        cardClass: null,
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'northshire_cleric',
        card: northshire_cleric,
        cardClass: null,
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'northshire_cleric',
        card: northshire_cleric,
        cardClass: null,
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'patches',
        card: patches,
        cardClass: null,
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'patches',
        card: patches,
        cardClass: null,
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'silver_hand_recruit',
        card: silver_hand_recruit,
        cardClass: null,
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'silver_hand_recruit',
        card: silver_hand_recruit,
        cardClass: null,
        index: null, 
        visibility: false, 
        matched: false                    
    }
]

export default class Cards extends Component {

    componentWillMount() {
        let randomCards = [];
        const card_array_copy = initialCardState.slice();        
        const cardFrontImages = card_array_copy;
        while (cardFrontImages.length > 0) {
            let randomIndex = Math.floor(Math.random() * cardFrontImages.length);
            let pickedCard = cardFrontImages.splice(randomIndex, 1);
            randomCards.push(pickedCard);
        }
        this.state.cardFrontImages = randomCards;
    }

    constructor(props) {
        super(props);

        this.state = {
            first_card_clicked: null,
            first_card_clicked_index: null,
            first_card_clicked_class: null,
            second_card_clicked: null,
            second_card_clicked_index: null,
            second_card_clicked_class: null,
            matches: 0,
            attempts: 0,
            accuracy: 0,
            games_played: 0,
            cardFrontImages: null

        }
        this.card_clicked = this.card_clicked.bind(this);
        this.changeCardComponentState = this.changeCardComponentState.bind(this);
        this.checkMatch = this.checkMatch.bind(this);
        this.checkAccuracy = this.checkAccuracy.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    card_clicked(cardIndex) {
        console.log('Card Clicked', this.state.cardFrontImages[cardIndex]);
        let cardClicked = this.state.cardFrontImages[cardIndex];
        console.log(cardClicked);
        if(this.state.first_card_clicked === null) {
            this.setState({
                first_card_clicked: cardClicked[0].id,
                first_card_clicked_index: cardClicked.index,
            });
            return;
        } else {
            //Checks if second card clicked is the same card that was first clicked so check matches does not happen if you click the same card
            if(this.state.first_card_clicked_index === cardClicked.index) {
                console.log('same card clicked');
                return;
            }
            //used anonymous function as a call back so second_card_clicked was updated before checking match function is called
            this.setState({
                second_card_clicked: cardClicked[0].id,
                second_card_clicked_index: cardClicked.index
            },() => {
                this.checkMatch();                
            });
        }
    }

    checkMatch() {
        
        console.log(this.state)
        const first_card = this.state.cardFrontImages[this.state.first_card_clicked_index];
        const second_card = this.state.cardFrontImages[this.state.second_card_clicked_index];
   
        console.log('check these cards ', this.state.first_card_clicked)
        if (this.state.first_card_clicked === this.state.second_card_clicked) {
            console.log('it matches');
            this.state.attempts = this.state.attempts += 1
            this.state.matches = this.state.matches += 1;
            first_card.matched = true;
            second_card.matched = true;
            this.setState({
                first_card_clicked: null,
                first_card_clicked_index: null,
                second_card_clicked: null
            });
        } else {
            console.log('not a match');
            this.state.attempts = this.state.attempts += 1
            //Need help trying to get state update so card will flip back if not a match and not after another card gets clicked
            setTimeout(() => {
                this.setState({
                    first_card_clicked: null,
                    first_card_clicked_class: null,
                    first_card_clicked_index: null,
                    second_card_clicked: null,
                    second_card_clicked_class: null,
                    second_card_clicked_index: null
                });
            }, 1000);
            first_card.visibility = false;
            second_card.visibility = false;
           
          
        }
        if(this.state.matches === 9) {
            setTimeout(() => {
                alert('You Won!');                
            }, 750);
        }
        this.checkAccuracy();
    }

    checkAccuracy() {
        this.state.accuracy = Math.floor((this.state.matches / this.state.attempts * 100)) + '%';                    
    }

    changeCardComponentState() {
        this.setState({
            first_card_clicked_index: null,
            second_card_clicked_index: null
        });
        console.log('changed', this);        
    }
    
    resetGame() {
        console.log('RESET GAME')
        console.log(this.state.cardFrontImages)
        // this.state.cardFrontImages[this.state.second_card_clicked_index]        
        this.setState({
            first_card_clicked: null,
            first_card_clicked_index: null,
            first_card_clicked_class: null,
            second_card_clicked: null,
            second_card_clicked_index: null,
            second_card_clicked_class: null,
            matches: 0,
            attempts: 0,
            accuracy: 0,
            games_played: 0,
            cardFrontImages: initialCardState
        });
        this.changeCardComponentState();
    }


    render() {
     
        const cards = this.state.cardFrontImages.map((value, index) => {
            return <Card key={index} 
                         index={index}
                         info={value}
                         onClick={this.card_clicked} 
                         changeState = {this.changeCardComponentState}
                        />
        });

        return (
            <div className="layer">
                <header>
                    <div id="game_title">Tavern Brawl</div>
                    <a className="links" onClick={this.resetGame}>Reset Game</a>
                </header>
                <Stats games_played={this.state.games_played} attempts={this.state.attempts} accuracy={this.state.accuracy} />
                <section id="game_area">{cards}</section>
            </div>
        )
    }
}


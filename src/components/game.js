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
        index: null,
        visibility: false,
        matched: false
    },
    {
        id: 'archmage',
        card: archmage,
        index: null,  
        visibility: false,
        matched: false                    
    },
    {
        id: 'aldor_peacekeeper',
        card: aldor_peacekeeper,
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'aldor_peacekeeper',
        card: aldor_peacekeeper,
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'azure',
        card: azure,
        index: null, 
        visibility: false, 
        matched: false                    
    },
    {
        id: 'azure',
        card: azure,
        index: null,
        visibility: false,  
        matched: false                    
    },
    {
        id: 'boar',
        card: boar,
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'boar',
        card: boar,
        index: null, 
        visibility: false,
        matched: false                    
    },
    {
        id: 'holy_champion',
        card: holy_champion,
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'holy_champion',
        card: holy_champion,
        index: null, 
        visibility: false, 
        matched: false                    
    },
    {
        id: 'mountain_giant',
        card: mountain_giant,
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'mountain_giant',
        card: mountain_giant,
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'northshire_cleric',
        card: northshire_cleric,
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'northshire_cleric',
        card: northshire_cleric,
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'patches',
        card: patches,
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'patches',
        card: patches,
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'silver_hand_recruit',
        card: silver_hand_recruit,
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'silver_hand_recruit',
        card: silver_hand_recruit,
        index: null, 
        visibility: false, 
        matched: false                    
    }
]

export default class Cards extends Component {

    componentWillMount() {
        this.randomizeCards()
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
        this.randomizeCards = this.randomizeCards.bind(this);
    }

    card_clicked(cardIndex) {
        const { first_card_clicked, first_card_clicked_index } = this.state;
        let cardClicked = this.state.cardFrontImages[cardIndex];

        if(first_card_clicked === null) {
            this.setState({
                first_card_clicked: cardClicked[0].id,
                first_card_clicked_index: cardClicked.index,
            });
            return;
        } else {
            //Checks if second card clicked is the same card that was first clicked so check matches does not happen if you click the same card
            if(first_card_clicked_index === cardClicked.index) {
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
        
        let{ attempts, cardFrontImages,first_card_clicked, first_card_clicked_index, second_card_clicked, second_card_clicked_index,matches, } = this.state;
        const first_card = cardFrontImages[first_card_clicked_index];
        const second_card = cardFrontImages[second_card_clicked_index];
   
        if (first_card_clicked === second_card_clicked) {
            console.log('it matches');
            attempts = attempts += 1
            matches = matches += 1;
            first_card.matched = true;
            second_card.matched = true;
            this.setState({
                first_card_clicked: null,
                first_card_clicked_index: null,
                second_card_clicked: null
            });
        } else {
            attempts = attempts += 1
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
        let { accuracy, attempts, matches } = this.state;
        accuracy = Math.floor((matches / attempts * 100)) + '%';                    
    }

    changeCardComponentState() {
        this.setState({
            first_card_clicked_index: null,
            second_card_clicked_index: null
        });
    }

    randomizeCards() {

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



    render() {

        const { accuracy, attempts, games_played, cardFrontImages } = this.state;
        const cards = cardFrontImages.map((value, index) => {
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
                </header>
                <Stats games_played={games_played} attempts={attempts} accuracy={accuracy} />
                <section id="game_area">{cards}</section>
            </div>
        )
    }
}


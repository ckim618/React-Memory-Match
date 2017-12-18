import React, { Component } from 'react';
import Stats from './stats';
import Card from './card';
import '../assets/css/app.css';
import archmage from '../assets/css/images/archmage.png';
import aldor_peacekeeper from '../assets/css/images/aldor_peacekeeper.png';
import azure from '../assets/css/images/azure.png';
import leeroy_jenkins from '../assets/css/images/leeroy_jenkins.png';
import holy_champion from '../assets/css/images/holy_champion.png';
import mountain_giant from '../assets/css/images/mountain_giant.png';
import obsidian_statue from '../assets/css/images/obsidian_statue.png';
import patches from '../assets/css/images/patches.png';
import deathwing from '../assets/css/images/deathwing.png';

const initialCardState = [
    {
        id: 'archmage',
        card: archmage,
        hp: 5,        
        index: null,
        visibility: false,
        matched: false
    },
    {
        id: 'archmage',
        card: archmage,
        hp: 5,        
        index: null,  
        visibility: false,
        matched: false                    
    },
    {
        id: 'aldor_peacekeeper',
        card: aldor_peacekeeper,
        hp: 3,        
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'aldor_peacekeeper',
        card: aldor_peacekeeper,
        hp: 3,        
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'azure',
        card: azure,
        hp: 4,        
        index: null, 
        visibility: false, 
        matched: false                    
    },
    {
        id: 'azure',
        card: azure,
        hp: 4,        
        index: null,
        visibility: false,  
        matched: false                    
    },
    {
        id: 'leeroy_jenkins',
        card: leeroy_jenkins,
        hp: 6,        
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'leeroy_jenkins',
        card: leeroy_jenkins,
        hp: 6,        
        index: null, 
        visibility: false,
        matched: false                    
    },
    {
        id: 'holy_champion',
        card: holy_champion,
        hp: 3,        
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'holy_champion',
        card: holy_champion,
        hp: 3,        
        index: null, 
        visibility: false, 
        matched: false                    
    },
    {
        id: 'mountain_giant',
        card: mountain_giant,
        hp: 8,
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'mountain_giant',
        card: mountain_giant,
        hp: 8,        
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'obsidian_statue',
        card: obsidian_statue,
        hp: 4,        
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'obsidian_statue',
        card: obsidian_statue,
        hp: 4,        
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'patches',
        card: patches,
        hp: 1,        
        index: null,
        visibility: false,
        matched: false                    
    },
    {
        id: 'patches',
        card: patches,
        hp: 1,        
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'deathwing',
        card: deathwing,
        hp: 12,        
        index: null,
        visibility: false, 
        matched: false                    
    },
    {
        id: 'deathwing',
        card: deathwing,
        hp: 12,        
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
            cardFrontImages: null,
            p1_health: 30,
            p2_health: 30,
            p1_turn: true

        }
        this.card_clicked = this.card_clicked.bind(this);
        this.changeCardComponentState = this.changeCardComponentState.bind(this);
        this.checkMatch = this.checkMatch.bind(this);
        this.checkAccuracy = this.checkAccuracy.bind(this);
        this.randomizeCards = this.randomizeCards.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    card_clicked(cardIndex) {
        const { cardFrontImages, first_card_clicked, first_card_clicked_index } = this.state;
        let cardClicked = cardFrontImages[cardIndex];

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
        
        const { cardFrontImages,first_card_clicked, first_card_clicked_index, second_card_clicked, second_card_clicked_index } = this.state;
        const first_card = cardFrontImages[first_card_clicked_index];
        const second_card = cardFrontImages[second_card_clicked_index];
   
        if (first_card_clicked === second_card_clicked) {
            console.log('it matches');
            first_card.matched = true;
            second_card.matched = true;
            if(this.state.p1_turn) {
                console.log(first_card);
                this.setState({
                    p2_health: this.state.p2_health - first_card[0].hp
                    
                });
            } else {
                this.setState({
                    p1_health: this.state.p1_health - first_card[0].hp
                    
                });
            }
            this.setState({
                first_card_clicked: null,
                first_card_clicked_index: null,
                second_card_clicked: null
            });
        } else {
            this.state.attempts = this.state.attempts += 1
            //Need help trying to get state update so card will flip back if not a match and not after another card gets clicked
            setTimeout(() => {
                this.setState({
                    first_card_clicked: null,
                    first_card_clicked_class: null,
                    first_card_clicked_index: null,
                    second_card_clicked: null,
                    second_card_clicked_class: null,
                    second_card_clicked_index: null,
                    p1_turn: !this.state.p1_turn
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

    resetGame() {
        console.log('Game was reset');
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
            games_played: this.state.games_played += 1,
            cardFrontImages: null
        }, () => {
            console.log('Component is starting to mount')
            this.componentWillMount();
        });
    }



    render() {

        //Could not deconstruct accuracy because state changed too often
        const { cardFrontImages, p1_turn } = this.state;
        const cards = cardFrontImages.map((value, index) => {
            return <Card 
                        key={index} 
                        index={index}
                        info={value}
                        playerTurn={p1_turn}
                        onClick={this.card_clicked} 
                        changeState = {this.changeCardComponentState}
                    />
        });

        return (
            <div className="layer">
                <header>
                    <div className="player_title">P1: {`${this.state.p1_health} HP`}</div>
                </header>
                <section id="game_area">{cards}</section>
                <footer>
                    <div className="player_title">P2: {`${this.state.p2_health} HP`}</div>
                </footer>
            </div>
        )
    }
}


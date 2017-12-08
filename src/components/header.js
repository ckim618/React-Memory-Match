import React, { Component } from 'react';
export default class Header extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <header>
                <div id="game_title">Tavern Brawl</div>
                <a className="links">Reset Game</a>
            </header>
           )
        }
    }
   
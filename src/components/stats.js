import React from 'react';
import '../assets/css/app.css';

export default (props) => {
    return (
        <section id="stats_container">
            <div className="games_played">
                <div className="label">Games Played:</div>
                <div className="value">{props.games_played}</div>
            </div>
            <div className="attempts">
                <div className="label">Attempts:</div>
                <div className="value">{props.attempts}</div>
            </div>
            <div className="accuracy">
                <div className="label">Accuracy:</div>
                <div className="value">{props.accuracy}</div>
            </div>
        </section>
    );
}
import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBtn from '../error-btn';
import ErrorIndicator from '../error-indicator';
import PeoplePage from "../people-page";

import './app.css';

export default class App extends React.Component {
    state = {
        showRandomPlanet: true,
        hasError: false
    };

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const planet = this.state.showRandomPlanet
            ? <RandomPlanet/>
            : null;

        return (
            <div>
                <Header />
                { planet }

                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>

                <ErrorBtn />

                <PeoplePage />
            </div>
        );
    }
};

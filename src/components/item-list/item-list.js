import React, { Component } from 'react';
import SwapiService from './../../services/swapi-service';

import './item-list.css';
import Spinner from "../spinner";

export default class ItemList extends Component {

    swapi = new SwapiService();

    state = {
        peopleList: null,
    };

    componentDidMount() {
        this.swapi
            .getAllPeople()
            .then((peopleList) => {
                this.setState({
                    peopleList,
                })
            });
    }

    renderItems(arr) {
        return arr.map(({ id, name }) => {
            return (
                <li
                    className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelect(id)}>
                    { name }
                </li>
            );
        })
    }

    render() {
        const { peopleList } = this.state;

        if (!peopleList) return <Spinner/>;

        const items = this.renderItems(peopleList);

        return (
            <ul className="item-list list-group">
                { items }
            </ul>
        );
    }
}

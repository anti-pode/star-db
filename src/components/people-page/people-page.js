import React from 'react';

import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import ErrorBtn from "../error-btn";

export default class PeoplePage extends React.Component {
    state = {
        selectedPerson: 7,
    };

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

    onPersonSelect = (id) => {
        this.setState({
            selectedPerson: id,
            hasError: false
        })
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        return (
            <div className="row mb2 people-page">
                <div className="col-md-6">
                    <ItemList onItemSelect={ this.onPersonSelect }/>
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson}/>
                    <ErrorBtn />
                </div>
            </div>
        )
    }
}

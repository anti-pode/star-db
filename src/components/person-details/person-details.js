import React from 'react';
import SwapiService from './../../services/swapi-service';
import Spinner from './../spinner/spinner';

import './person-details.css';

export default class PersonDetails extends React.Component {
    swapi = new SwapiService();

    state = {
        person: null,
        loading: false,
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.setState({ loading: false });
            this.updatePerson();
        }
    }

    updatePerson = () => {
        const { personId } = this.props;
        if (!personId) return;

        this.swapi
            .getPerson(personId)
            .then((person) => {
                this.setState({
                    person,
                    loading: true
                });
            });
    };

    render() {
        if (!this.state.person) {
            return <span>Select a person from the list</span>
        }

        const content = !this.state.loading ? <Spinner /> : <PersonView person={this.state.person} />;

        return (
            <div className="person-details card">
                { content }
            </div>
        )
    }
}

const PersonView = ({ person }) => {
    const { id, name, gender, birthYear, eyeColor } = person;

    return (
        <React.Fragment>
            <img className="person-image"
                 src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

            <div className="card-body">
                <h4>{ name }</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{ gender }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{ birthYear }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{ eyeColor }</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
};

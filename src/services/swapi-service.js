export default class SwapiService {

    _apiBase = 'https://swapi.co/api';

    _extractId({ url }) {
        const idRegExp = /\/([0-9]*)\/$/;
        return url.match(idRegExp)[1];
    }

    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter,
        };
    };

    _transformPeople = (people) => {
        return {
            id: this._extractId(people),
            name: people.name,
            gender: people.gender,
            birthYear: people.birth_year,
            eyeColor: people.eye_color,
        };
    };

    _transformSpaceships = (spaceship) => {
        return {
            id: this._extractId(spaceship),
            model: spaceship.model,
            manufactures: spaceship.manufactures,
            costInCredits: spaceship.cost_in_credits,
            length: spaceship.length,
            crew: spaceship.crew,
            passengers: spaceship.passengers,
            cargoCapacity: spaceship.cargo_capacity,
        };
    };

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPeople);
    }

    async getPerson(id) {
        const people = await this.getResource(`/people/${id}/`);

        return this._transformPeople(people);
    }

    async getAllPlanets() {
        const res = await this.getResource(`/planets/`);
        return res.results.map(this._transformPlanet);
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}/`);

        return this._transformPlanet(planet);
    }

    async getAllStarships() {
        const res = await this.getResource(`/starships/`);
        return res.results.map(this._transformSpaceships);
    }

    async getStarship(id) {
        const spaceships = await this.getResource(`/starships/${id}/`);
        return this._transformSpaceships(spaceships)
    }
}

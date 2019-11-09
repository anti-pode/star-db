import React from 'react'

import './error-btn.css';

export default class ErrorBtn extends React.Component {
    state = {
      renderError: false,
    };

    render() {
        if (this.state.renderError) {
            this.lololo.undo = null;
        }

        return (
            <button
                className="error-btn btn btn-danger btn-lg"
                onClick={() => this.setState({renderError: true})}
            >
                Throw Error
            </button>
        )
    }
}

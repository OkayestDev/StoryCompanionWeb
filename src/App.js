import React, { Component } from 'react';

export default class App extends Component {
    componentWillMount() {
        if (localStorage.getItem("AppStore") !== null) {
            this.props.history.push("/stories");
        }
        else {
            this.props.history.push("/login");
        }
    }

    render() {
        return (
            <div/>
        );
    }
}
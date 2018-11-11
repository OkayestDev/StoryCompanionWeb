import React, { Component } from 'react';
import AppStore from '../store/AppStore.js';

export default class StoryCompanion extends Component {
    constructor(props) {
        super(props);
        this.AppStore = new AppStore();
        this.state = {
            showGlobalAlert: false,
            globalAlertMessage: "",
            globalAlertType: "",
        }
    }

    componentWillMount() {
        let loadedAppStore = localStorage.getItem('AppStore');
        if (loadedAppStore !== null) {
            this.AppStore.setValue(JSON.parse(loadedAppStore));
        }
    }

    selectStory = (storyId) => {

    }

    isUserLoggedIn = () => {
        if (this.AppStore.email !== null && this.AppStore.email !== '') {
            return true;
        }
        return false;
    }

    updateAppStore = (newAppStore) => {
        this.AppStore = newAppStore;
        localStorage.setItem('apiKey', newAppStore.apiKey);
        localStorage.setItem('AppStore', JSON.stringify(newAppStore));
    }

    showAlert = (message, type) => {
        this.setState({
            showGlobalAlert: true,
            globalAlertMessage: message,
            globalAlertType: type,
        });
        // Automatically close alert after 10 seconds
        setTimeout(() => this.closeAlert(), 10000);
    }

    closeAlert = () => {
        this.setState({showGlobalAlert: false});
    }

    // Required function of Component
    render() { return null }
}
import { Component } from 'react';
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
            this.AppStore = JSON.parse(loadedAppStore);
        }
    }

    updateAppStore = (newAppStore) => {
        this.AppStore = newAppStore;
        localStorage.setItem('AppStore', JSON.stringify(newAppStore));
    }

    showAlert = (message, type) => {
        this.setState({
            showGlobalAlert: true,
            globalAlertMessage: message,
            globalAlertType: type,
        });
    }

    closeAlert = () => {
        this.setState({showGlobalAlert: false});
    }

    // Required function of Component
    render() { return null }
}
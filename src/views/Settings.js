import React from 'react';
import StoryCompanion from '../utils/StoryCompanion';
import '../css/Settings.css';

export default class Settings extends StoryCompanion {
    logout = () => {
        localStorage.clear();
        this.props.history.push("/login");
    }
    
    render() {
        return (
            <div className="full settingsContainer">
                <div className="settings">
                    <div
                        onClick={() => this.logout()}
                        className="button"
                    >
                        Logout
                    </div>
                </div>
            </div>
        );
    }
}
import React from 'react';
import StoryCompanion from '../utils/StoryCompanion';

export default class Settings extends StoryCompanion {
    logout = () => {
        localStorage.clear();
        this.props.history.push("/login");
    }
    
    render() {
        return (
            <div className="full settingsContainer">
                <div
                    onClick={() => this.logout()}
                    className="button"
                >
                    Logout
                </div>
            </div>
        );
    }
}
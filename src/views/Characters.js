import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import CharacterRequests from '../utils/CharacterRequests.js';

export default class Character extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.CharacterRequests = new CharacterRequests();
    }

    render() {
        return (
            <div>
                I am Character
            </div>
        )
    }
}
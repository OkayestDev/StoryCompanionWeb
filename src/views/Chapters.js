import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';

export default class Chapters extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
        }
    }

    render() {
        return (
            <div>
                I am chapters
            </div>
        )
    }
}
import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import TagRequests from '../utils/TagRequests.js';
import { connect } from 'react-redux';
import { showAlert, setTags } from './store/Actions.js';

class Tags extends StoryCompanion {
    constructor(props) {
        super(props);
        this.TagRequests = new TagRequests();
        this.getTags();
    }

    renderTags = () => {};

    render() {
        <div />;
    }
}

function mapStateToProps(state) {
    return {
        tags: state.tags,
        userId: state.userId,
        apiKey: state.apiKey,
    };
}

const mapDispatchToProps = {
    showAlert,
    setTags,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tags);

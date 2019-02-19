import React from 'react';
import TagsUtils from './components/TagsUtils.js';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa';
import { connect } from 'react-redux';
import { showAlert } from '../../actions/Actions.js';
import * as tagActions from '../../actions/TagActions.js';
import EditEntityModal from '../../components/EditEntityModal.js';
import uuid from 'uuid';
import '../../css/Tags.css';

const TAG_TYPES = ['Story', 'Character'];

class Tags extends TagsUtils {
    constructor(props) {
        super(props);
    }

    oneLineInputs = () => [
        {
            name: 'Tag Name',
            value: this.props.name,
            onChange: this.props.handleNameChanged,
            type: 'default',
        },
    ];

    multiLineInputs = () => [
        {
            name: 'Description',
            value: this.props.description,
            onChange: this.props.handleDescriptionChanged,
        },
    ];

    renderTags = () => {
        if (!this.props.tags) {
            return null;
        }
        const tagIds = Object.keys(this.props.tags);
        if (tagIds.length > 0) {
            let renderedTags = [];
            tagIds.forEach(id => {
                renderedTags.push(
                    <div
                        className="tagContainer"
                        onClick={() => this.props.selectTag(id)}
                        key={uuid.v4()}
                    >
                        <div className="tagName">{this.props.tags[id].name}</div>
                        <div className="tagType">{this.props.tags[id].type}</div>
                        <div className="tagDescription">{this.props.tags[id].description}</div>
                    </div>
                );
            });
            return renderedTags;
        } else {
            return (
                <div className="noEntityContainer">
                    <div className="noEntityText">
                        <div>Looks like you haven't created any tags yet.</div>
                        <div>
                            Press on the &nbsp;
                            <Icon icon={plus} size={30} />
                            &nbsp; to create a new character.
                        </div>
                    </div>
                </div>
            );
        }
    };

    render() {
        return (
            <div className="full">
                <Icon
                    className="icon floatRight"
                    icon={plus}
                    size={28}
                    onClick={this.props.newTag}
                    data-tip="Create a new tag"
                />
                <EditEntityModal
                    isEntityModalOpen={this.props.isTagModalOpen}
                    selectedId={this.props.selectedTagId}
                    onRequestClose={this.props.closeTagModal}
                    objectName="Tag"
                    title={this.props.selectedTagId === null ? 'Create a Tag' : 'Edit Tag'}
                    oneLineInputs={this.oneLineInputs()}
                    multiLineInputs={this.multiLineInputs()}
                    dropdown={this.props.type}
                    dropdownList={TAG_TYPES}
                    dropdownOnChange={this.props.handleTypeChanged}
                    dropdownName="Type"
                    onSave={() =>
                        this.props.selectedTagId === null ? this.createTag() : this.editTag()
                    }
                    onDelete={this.deleteTag}
                    showAlert={this.props.showAlert}
                    saveButtonText={this.props.selectedTagId === null ? 'Create Tag' : 'Edit Tag'}
                    deleteButtonText="Delete Tag"
                    confirmationAction="Delete Tag?"
                />
                <div className="entityContainer">{this.renderTags()}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.tagStore,
        userId: state.appStore.userId,
        apiKey: state.appStore.apiKey,
    };
}

const mapDispatchToProps = {
    ...tagActions,
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tags);

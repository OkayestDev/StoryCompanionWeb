import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import TagRequests from '../utils/TagRequests.js';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa';
import { connect } from 'react-redux';
import { showAlert, setTags } from '../store/Actions.js';
import EditEntityModal from '../components/EditEntityModal.js';

const TAG_TYPES = ['Story', 'Character'];

class Tags extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            type: '',
            selectedTagId: null,
            isTagModalOpen: false,
        };
        this.TagRequests = new TagRequests();
        this.getTags();
    }

    defaultState = () => {
        return {
            name: '',
            description: '',
            type: '',
            selectedTagId: null,
        };
    };

    editTag = () => {
        if (this.props.userId !== null) {
            const paramsObject = this.createParamsObject();
            this.TagRequests.editTag(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        let tempTags = this.props.tags;
                        tempTags[this.state.selectedTagId] = res.success;
                        this.props.setTags(tempTags);
                        this.setState({
                            isTagModalOpen: false,
                            selectedTagId: null,
                        });
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to create tag at this time', 'danger');
                });
        }
    };

    deleteTag = () => {
        if (this.props.userId !== null) {
            const paramsObject = this.createParamsObject();
            this.TagRequests.deleteTag(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        let tempTags = this.props.tags;
                        delete tempTags[this.state.selectedTagId];
                        this.props.setTags(tempTags);
                        this.setState({
                            isTagModalOpen: false,
                            selectedTagId: null,
                        });
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to delete tag at this time', 'danger');
                });
        }
    };

    createTag = () => {
        if (this.props.userId !== null) {
            const paramsObject = this.createParamsObject();
            this.TagRequests.createTag(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        this.props.setTags(res.success);
                        this.setState({
                            selectedTagId: null,
                            isTagModalOpen: false,
                        });
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to create tag at this time', 'danger');
                });
        }
    };

    newTag = () => {
        this.setState({
            ...this.defaultState(),
            isTagModalOpen: true,
        });
    };

    selectTagForEdit = id => {
        this.setState({
            ...this.props.tag[id],
            selectedTagId: id,
        });
    };

    renderTags = () => {
        if (this.props.tags === null) {
            return null;
        }

        const tagIds = Object.keys(this.props.tags);
        if (tagIds.length > 0) {
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
                    onClick={this.newTag}
                    data-tip="Create a new tag"
                />
                <EditEntityModal
                    isEntityModalOpen={this.state.isTagModalOpen}
                    selectedId={this.state.selectedTagId}
                    onRequestClose={() => this.setState({ isTagModalOpen: false })}
                    objectName="Tag"
                    title={this.state.selectedTagId === null ? 'Create a Tag' : 'Edit Tag'}
                    name={this.state.name}
                    nameOnChange={newName => this.setState({ name: newName })}
                    description={this.state.description}
                    descriptionOnChange={newDescription =>
                        this.setState({ description: newDescription })
                    }
                    dropdown={this.state.type}
                    dropdownList={TAG_TYPES}
                    dropdownOnChange={newType => this.setState({ type: newType })}
                    dropdownPlaceholder="Type..."
                    onSave={() =>
                        this.state.selectedTagId === null ? this.createTag() : this.editTag()
                    }
                    onDelete={this.deleteTag}
                    showAlert={this.props.showAlert}
                    saveButtonText={this.state.selectedTagId === null ? 'Create Tag' : 'Edit Tag'}
                    deleteButtonText="Delete Tag"
                    confirmationAction="Delete Tag?"
                />
                <div className="full">{this.renderTags()}</div>
            </div>
        );
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

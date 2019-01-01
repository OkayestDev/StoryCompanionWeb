import React from 'react';
import TagsUtils from './components/TagsUtils.js';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa';
import { connect } from 'react-redux';
import { showAlert, setTags } from '../../store/Actions.js';
import EditEntityModal from '../../components/EditEntityModal.js';
import '../../css/Tags.css';

const TAG_TYPES = ['Story', 'Character'];

class Tags extends TagsUtils {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            type: '',
            selectedTagId: null,
            isTagModalOpen: false,
        };
    }

    defaultState = () => {
        return {
            name: '',
            description: '',
            type: '',
            selectedTagId: null,
        };
    };

    newTag = () => {
        this.setState({
            ...this.defaultState(),
            isTagModalOpen: true,
        });
    };

    selectTagForEdit = id => {
        this.setState({
            name: this.props.tags[id].name,
            type: this.props.tags[id].type,
            description: this.props.tags[id].description,
            selectedTagId: id,
            isTagModalOpen: true,
        });
    };

    renderTags = () => {
        const tags = this.props.tags;
        if (tags === null) {
            return null;
        }
        const tagIds = Object.keys(tags);
        if (tagIds.length > 0) {
            let renderedTags = [];
            tagIds.forEach(id => {
                renderedTags.push(
                    <div className="tagContainer" onClick={() => this.selectTagForEdit(id)}>
                        <div className="tagName">{tags[id].name}</div>
                        <div className="tagType">{tags[id].type}</div>
                        <div className="tagDescription">{tags[id].description}</div>
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
                <div className="entityContainer">{this.renderTags()}</div>
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

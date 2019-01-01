import React from 'react';
import CharactersUtils from './components/CharactersUtils.js';
import ReactTooltip from 'react-tooltip';
import EditEntityModal from '../../components/EditEntityModal.js';
import Icon from 'react-icons-kit';
import { plus, caretUp, caretDown } from 'react-icons-kit/fa';
import { connect } from 'react-redux';
import { showAlert } from '../../store/Actions.js';
import '../../css/Characters.css';

class Characters extends CharactersUtils {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            image: '',
            attribute: '',
            number: 0,
            selectedTagId: null,
            isCharacterModalOpen: false,
            characters: null,
            selectedCharacterId: null,
        };
    }

    newCharacter = () => {
        this.setState({
            image: '',
            attribute: '',
            name: '',
            description: '',
            selectedTagId: '',
            number: 0,
            isCharacterModalOpen: true,
            selectedCharacterId: null,
        });
    };

    selectCharacterForEdit = id => {
        this.setState({
            isCharacterModalOpen: true,
            selectedCharacterId: id,
            name: this.state.characters[id].name,
            description: this.state.characters[id].description,
            attribute: this.state.characters[id].attribute,
            image: this.state.characters[id].image,
            selectedTagId: this.state.characters[id].tag,
            number: this.state.characters[id].number,
        });
    };

    handleCharacterUpClicked = (event, id) => {
        event.stopPropagation();
        this.moveCharacterUp(id);
    };

    handleCharacterDownClicked = (event, id) => {
        event.stopPropagation();
        this.moveCharacterDown(id);
    };

    renderCharacters = () => {
        if (this.state.characters === null) {
            return null;
        }

        let characterIds = this.sortEntitiesByNumber(this.state.characters);
        characterIds.reverse();
        if (characterIds.length > 0) {
            let renderedIds = [];
            characterIds.forEach(id => {
                renderedIds.push(
                    <div
                        key={id}
                        className="character"
                        onClick={() => this.selectCharacterForEdit(id)}
                    >
                        <div className="characterInfo">
                            <div className="trueCenter">
                                {this.state.characters[id].image !== '' ? (
                                    <div>
                                        <img
                                            className="characterImage"
                                            src={this.state.characters[id].image}
                                            alt=""
                                        />
                                    </div>
                                ) : (
                                    <div className="noCharacterImage">
                                        <b>No Image</b>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="characterName">
                                    {this.state.characters[id].name}
                                </div>
                                <div className="characterLabelContainer">
                                    <div className="characterLabel">Description:</div>
                                    <div className="characterContent">
                                        {this.state.characters[id].description}
                                    </div>
                                </div>
                                <div className="characterLabelContainer">
                                    <div className="characterLabel">Attributes:</div>
                                    <div className="characterContent">
                                        {this.state.characters[id].attribute}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="characterUpAndDownContainer">
                            <Icon
                                icon={caretUp}
                                size={42}
                                className="icon"
                                onClick={event => this.handleCharacterUpClicked(event, id)}
                            />
                            <div className="characterNumber">
                                {this.state.characters[id].number}
                            </div>
                            <Icon
                                icon={caretDown}
                                size={42}
                                className="icon"
                                onClick={event => this.handleCharacterDownClicked(event, id)}
                            />
                        </div>
                    </div>
                );
            });
            return renderedIds;
        } else {
            return (
                <div className="noEntityContainer">
                    <div className="noEntityText">
                        <div>Looks like you haven't created any characters yet.</div>
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
        if (this.props.selectedStoryId !== null) {
            return (
                <div className="full">
                    <ReactTooltip delay={500} />
                    <EditEntityModal
                        isEntityModalOpen={this.state.isCharacterModalOpen}
                        selectedId={this.state.selectedCharacterId}
                        onRequestClose={() => this.setState({ isCharacterModalOpen: false })}
                        objectName="Character"
                        title={
                            this.state.selectedCharacterId === null
                                ? 'Create a Character'
                                : 'Edit Character'
                        }
                        image={this.state.image}
                        imageOnChange={newImage => this.setState({ image: newImage })}
                        name={this.state.name}
                        nameOnChange={newName => this.setState({ name: newName })}
                        description={this.state.description}
                        descriptionOnChange={newDescription =>
                            this.setState({ description: newDescription })
                        }
                        dropdown={this.state.selectedTagId}
                        dropdownList={this.filterTagsByType('Character')}
                        dropdownOnChange={newTag => this.setState({ selectedTagId: newTag })}
                        dropdownPlaceholder="Tag..."
                        attribute={this.state.attribute}
                        attributeOnChange={newAttribute =>
                            this.setState({ attribute: newAttribute })
                        }
                        onSave={() =>
                            this.state.selectedCharacterId === null
                                ? this.createCharacter()
                                : this.editCharacter()
                        }
                        onDelete={() => this.deleteCharacter()}
                        showAlert={this.props.showAlert}
                        saveButtonText={
                            this.state.selectedCharacterId === null
                                ? 'Create Character'
                                : 'Edit Character'
                        }
                        deleteButtonText="Delete Character"
                        confirmationAction="Delete Character?"
                    />
                    <Icon
                        className="icon floatRight"
                        icon={plus}
                        size={28}
                        onClick={() => this.newCharacter()}
                        data-tip="Create a new character"
                    />
                    <div className="entityContainer">{this.renderCharacters()}</div>
                </div>
            );
        } else {
            return (
                <div className="editComponentsText">
                    Edit Components of a story to begin creating characters
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        selectedStoryId: state.selectedStoryId,
        userId: state.userId,
        apiKey: state.apiKey,
        tags: state.tags,
    };
}

const mapDispatchToProps = {
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Characters);

import React from 'react';
import CharactersUtils from './components/CharactersUtils.js';
import ReactTooltip from 'react-tooltip';
import EditEntityModal from '../../components/EditEntityModal.js';
import Icon from 'react-icons-kit';
import { plus, caretUp, caretDown } from 'react-icons-kit/fa';
import { connect } from 'react-redux';
import { showAlert } from '../../actions/Actions.js';
import * as characterActions from '../../actions/CharacterActions.js';
import EditComponentsNotice from '../../components/EditComponentsNotice.js';
import '../../css/Characters.css';

class Characters extends CharactersUtils {
    constructor(props) {
        super(props);
    }

    oneLineInputs = () => [
        {
            name: 'Character Name',
            value: this.props.name,
            onChange: this.props.handleNameChanged,
            type: 'default',
        },
        {
            name: 'Age',
            value: this.props.age,
            onChange: this.props.handleAgeChanged,
            type: 'numeric',
        },
        {
            name: 'Story Role',
            value: this.props.storyRole,
            onChange: this.props.handleStoryRoleChanged,
            type: 'default',
        },
    ];

    multiLineInputs = () => [
        {
            name: 'Goal',
            value: this.props.goal,
            onChange: this.props.handleGoalChanged,
        },
        {
            name: 'Description',
            value: this.props.description,
            onChange: this.props.handleDescriptionChanged,
        },
        {
            name: 'Attributes',
            value: this.props.attribute,
            onChange: this.props.handleAttributeChanged,
        },
    ];

    handleCharacterUpClicked = (event, id) => {
        event.stopPropagation();
        this.moveCharacterUp(id);
    };

    handleCharacterDownClicked = (event, id) => {
        event.stopPropagation();
        this.moveCharacterDown(id);
    };

    renderCharacters = () => {
        if (!this.props.characters) {
            return null;
        }

        let characterIds = this.sortEntitiesByNumber(this.props.characters);
        characterIds.reverse();
        if (characterIds.length > 0) {
            let renderedIds = [];
            characterIds.forEach(id => {
                renderedIds.push(
                    <div
                        key={id}
                        className="character"
                        onClick={() => this.props.selectCharacter(id)}
                    >
                        <div className="characterInfo">
                            <div className="trueCenter">
                                {this.props.characters[id].image !== '' ? (
                                    <div>
                                        <img
                                            className="characterImage"
                                            src={this.props.characters[id].image}
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
                                    {this.props.characters[id].name}
                                </div>
                                <div className="characterLabelContainer">
                                    <div className="characterLabel">Description:</div>
                                    <div className="characterContent">
                                        {this.props.characters[id].description}
                                    </div>
                                </div>
                                <div className="characterLabelContainer">
                                    <div className="characterLabel">Attributes:</div>
                                    <div className="characterContent">
                                        {this.props.characters[id].attribute}
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
                                {this.props.characters[id].number}
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
                        isEntityModalOpen={this.props.isCharacterModalOpen}
                        selectedId={this.props.selectedCharacterId}
                        onRequestClose={this.props.resetCharacter}
                        objectName="Character"
                        title={
                            this.props.selectedCharacterId === null
                                ? 'Create a Character'
                                : 'Edit Character'
                        }
                        image={this.props.image}
                        imageOnChange={this.props.handleImageChanged}
                        oneLineInputs={this.oneLineInputs()}
                        multiLineInputs={this.multiLineInputs()}
                        dropdown={this.props.selectedTagId}
                        dropdownList={this.filterTagsByType('Character')}
                        dropdownOnChange={this.props.handleTagChanged}
                        dropdownName="Tag"
                        attribute={this.props.attribute}
                        attributeOnChange={this.props.handleAttributeChanged}
                        onSave={() =>
                            this.props.selectedCharacterId === null
                                ? this.createCharacter()
                                : this.editCharacter()
                        }
                        onDelete={() => this.deleteCharacter()}
                        showAlert={this.props.showAlert}
                        saveButtonText={
                            this.props.selectedCharacterId === null
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
                        onClick={this.props.newCharacter}
                        data-tip="Create a new character"
                    />
                    <div className="entityContainer">{this.renderCharacters()}</div>
                </div>
            );
        } else {
            return <EditComponentsNotice objectName="character" />;
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.characterStore,
        selectedStoryId: state.storyStore.selectedStoryId,
        userId: state.appStore.userId,
        apiKey: state.appStore.apiKey,
        tags: state.tagStore.tags,
    };
}

const mapDispatchToProps = {
    ...characterActions,
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Characters);

import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import CharacterRequests from '../utils/CharacterRequests.js';
import ReactTooltip from 'react-tooltip';
import EditEntityModal from '../components/EditEntityModal.js';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa';
import { connect } from 'react-redux';
import { Actions } from '../store/Actions.js';
import '../css/Characters.css';

class Characters extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            image: '',
            attribute: '',
            isCharacterModalOpen: false,
            characters: null,
            selectedCharacterIdForEdit: null,
            selectedStoryId: null,
        }
        this.CharacterRequests = new CharacterRequests();
        this.getCharacters();
    }

    componentWillReceiveProps(props) {
        if (this.state.selectedStoryId !== props.AppStore.selectedStoryId) {
            this.getCharacters();
        }
    }

    getCharacters = () => {
        if (this.props.AppStore.selectedStoryId !== null) {
            this.CharacterRequests.getCharacters(this.props.AppStore.selectedStoryId).then((res) => {
                if ('error' in res) {
                    this.props.showAlert(res.error, "warning");
                }
                else {
                    this.setState({
                        characters: res.success,
                        selectedStoryId: this.props.AppStore.selectedStoryId,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert("Unable to fetch Characters at this time", "danger");
            })
        }
    }

    createCharacter = async () => {
        var image = "";
        if (this.state.image.includes("data:image") && this.state.image.includes("base64")) {
            image = await this.uploadToS3(this.state.image, "character", this.props.AppStore.userId);
        }
        else {
            image = this.state.image;
        }

        // Upload image failed. Show alert and reset image
        if (typeof image === "undefined") {
            image = "";
            this.props.showAlert("Unable to upload image at this time", "warning");
        }

        let paramsObject = {
            story: this.props.AppStore.selectedStoryId,
            name: this.state.name,
            description: this.state.description,
            attribute: this.state.attribute,
            image: image,
        };
        this.CharacterRequests.createCharacter(paramsObject).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.setState({
                    isCharacterModalOpen: false,
                    characters: res.success,
                });
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to create character at this time", "danger");
        });
    }

    editCharacter = async () => {
        var image = "";
        if (this.state.image.includes("data:image") && this.state.image.includes("base64")) {
            image = await this.uploadToS3(this.state.image, "character", this.props.AppStore.userId);
        }
        else {
            image = this.state.image;
        }

        // Upload image failed. Show alert and reset image
        if (typeof image === "undefined") {
            image = "";
            this.props.showAlert("Unable to upload image at this time", "warning");
        };

        let paramsObject = {
            character: this.state.selectedCharacterIdForEdit,
            name: this.state.name,
            description: this.state.description,
            attribute: this.state.attribute,
            image: image,
        };
        this.CharacterRequests.editCharacter(paramsObject).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                let tempCharacters = this.state.characters;
                tempCharacters[this.state.selectedCharacterIdForEdit] = res.success;
                this.setState({
                    characters: tempCharacters,
                    selectedCharacterIdForEdit: null,
                    isCharacterModalOpen: false,
                });
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to edit character at this time", "warning");
        })
    }

    deleteCharacter = (id) => {
        this.CharacterRequests.deleteCharacter(id).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                let tempCharacters = this.state.characters;
                delete tempCharacters[id];
                this.setState({
                    isCharacterModalOpen: false,
                    characters: tempCharacters,
                    selectedCharacterIdForEdit: null,
                })
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to delete character at this time", "danger");
        })
    }

    newCharacter = () => {
        this.setState({
            image: '',
            attribute: '',
            name: '',
            description: '',
            isCharacterModalOpen: true,
            selectedCharacterIdForEdit: null,
        });
    }

    selectCharacterForEdit = (id) => {
        this.setState({
            isCharacterModalOpen: true,
            selectedCharacterIdForEdit: id,
            name: this.state.characters[id].name,
            description: this.state.characters[id].description,
            attribute: this.state.characters[id].attribute,
            image: this.state.characters[id].image,
        })
    }

    renderCharacters = () => {
        if (this.state.characters === null) {
            return null;
        }

        let characterIds = Object.keys(this.state.characters);
        if (characterIds.length > 0) {
            let renderedIds = [];
            characterIds.forEach((id) => {
                renderedIds.push(
                    <div 
                        key={id}
                        className="character"
                        onClick={() => this.selectCharacterForEdit(id)}
                    >
                        <div className="trueCenter">
                            {
                                this.state.characters[id].image !== ''
                                ?
                                <div>
                                    <img
                                        className="characterImage"
                                        src={this.state.characters[id].image}
                                        alt=""
                                    />
                                </div>
                                :
                                <div className="noCharacterImage">
                                    <b>No Image</b>
                                </div>
                            }
                        </div>
                        <div>
                            <div className="characterName">
                                {this.state.characters[id].name}
                            </div>
                            <div className="characterLabelContainer">
                                <div className="characterLabel">
                                    Description:
                                </div>
                                <div className="characterContent">
                                    {this.state.characters[id].description}
                                </div>
                            </div>
                            <div className="characterLabelContainer">
                                <div className="characterLabel">
                                    Attributes:
                                </div>
                                <div className="characterContent">
                                    {this.state.characters[id].attribute}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
            return renderedIds;
        }
        else {
            return (
                <div className="noEntityContainer">
                    <div className="noEntityText">
                        <div>
                            Looks like you haven't created any characters yet.
                        </div>
                        <div>
                            Press on the
                            &nbsp;
                            <Icon
                                icon={plus}
                                size={30}
                            />
                            &nbsp;
                            to create a new character.
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        if (this.props.AppStore.selectedStoryId !== null) {
            return (
                <div className="full">
                    <ReactTooltip delay={500}/>
                    <EditEntityModal
                        isEntityModalOpen={this.state.isCharacterModalOpen}
                        selectedId={this.state.selectedCharacterIdForEdit}
                        onRequestClose={() => this.setState({isCharacterModalOpen: false})}
                        objectName="Character"
                        title={this.state.selectedCharacterIdForEdit === null ? "Create a Character" : "Edit Character"}
                        image={this.state.image}
                        imageOnChange={(newImage) => this.setState({image: newImage})}
                        name={this.state.name}
                        nameOnChange={(newName) => this.setState({name: newName})}
                        description={this.state.description}
                        descriptionOnChange={(newDescription) => this.setState({description: newDescription})}
                        attribute={this.state.attribute}
                        attributeOnChange={(newAttribute) => this.setState({attribute: newAttribute})}
                        onSave={() => this.state.selectedCharacterIdForEdit === null ? this.createCharacter() : this.editCharacter()}
                        onDelete={() => this.deleteCharacter(this.state.selectedCharacterIdForEdit)}
                        showAlert={this.props.showAlert}
                        saveButtonText={this.state.selectedCharacterIdForEdit === null ? "Create Character" : "Edit Character"}
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
                    <div className="full">
                        {this.renderCharacters()}
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
}

export default connect(Actions.mapStateToProps, Actions.mapDispatchToProps)(Characters);
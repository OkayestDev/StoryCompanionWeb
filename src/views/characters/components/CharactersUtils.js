import StoryCompanion from '../../../utils/StoryCompanion.js';
import CharacterRequests from '../../../utils/CharacterRequests.js';

export default class CharacterUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.CharacterRequests = new CharacterRequests();
        this.getCharacters(props);
    }

    componentWillReceiveProps(props) {
        if (this.props.selectedStoryId !== props.selectedStoryId) {
            this.getCharacters(props);
        }
    }

    getCharacters = props => {
        if (props.selectedStoryId !== null) {
            const paramsObject = this.createParamsObject(props);
            this.CharacterRequests.getCharacters(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        this.setState({
                            characters: res.success,
                        });
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to fetch Characters at this time', 'danger');
                });
        }
    };

    createCharacter = async () => {
        var image = '';
        if (this.state.image.includes('data:image') && this.state.image.includes('base64')) {
            image = await this.uploadToS3(this.state.image, 'character', this.props.userId);
        } else {
            image = this.state.image;
        }

        // Upload image failed. Show alert and reset image
        if (typeof image === 'undefined') {
            image = '';
            this.props.showAlert('Unable to upload image at this time', 'warning');
        }

        let paramsObject = this.createParamsObject();
        paramsObject['image'] = image;
        this.CharacterRequests.createCharacter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.setState({
                        isCharacterModalOpen: false,
                        characters: res.success,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to create character at this time', 'danger');
            });
    };

    editCharacter = async () => {
        var image = '';
        if (this.state.image.includes('data:image') && this.state.image.includes('base64')) {
            image = await this.uploadToS3(this.state.image, 'character', this.props.userId);
        } else {
            image = this.state.image;
        }

        // Upload image failed. Show alert and reset image
        if (typeof image === 'undefined') {
            image = '';
            this.props.showAlert('Unable to upload image at this time', 'warning');
        }

        let paramsObject = this.createParamsObject();
        paramsObject['image'] = image;
        this.CharacterRequests.editCharacter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempCharacters = this.state.characters;
                    tempCharacters[this.state.selectedCharacterId] = res.success;
                    this.setState({
                        characters: tempCharacters,
                        selectedCharacterId: null,
                        isCharacterModalOpen: false,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit character at this time', 'warning');
            });
    };

    deleteCharacter = () => {
        const paramsObject = this.createParamsObject();
        this.CharacterRequests.deleteCharacter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempCharacters = this.state.characters;
                    delete tempCharacters[this.state.selectedCharacterId];
                    this.setState({
                        isCharacterModalOpen: false,
                        characters: tempCharacters,
                        selectedCharacterId: null,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to delete character at this time', 'danger');
            });
    };

    moveCharacterUp = id => {
        const paramsObject = {
            apiKey: this.props.apiKey,
            character: id,
        };
        this.CharacterRequests.moveCharacterUp(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempCharacters = this.state.characters;
                    tempCharacters[id] = res.success;
                    this.setState({
                        characters: tempCharacters,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to move character up at this time', 'danger');
            });
    };

    moveCharacterDown = id => {
        const paramsObject = {
            apiKey: this.props.apiKey,
            character: id,
        };
        this.CharacterRequests.moveCharacterDown(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempCharacters = this.state.characters;
                    tempCharacters[id] = res.success;
                    this.setState({ characters: tempCharacters });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to move character down at this time', 'danger');
            });
    };
}

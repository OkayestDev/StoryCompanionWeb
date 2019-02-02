import CharacterRequests from '../../../utils/CharacterRequests.js';
import StoryCompanion from '../../../utils/StoryCompanion.js';

export default class CharactersUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.CharacterRequests = new CharacterRequests();
    }

    componentDidUpdate(nextProps) {
        if (
            this.props.selectedStoryId !== null &&
            nextProps.selectedStoryId !== this.props.selectedStoryId
        ) {
            this.props.resetCharacter();
            this.getCharacters();
        }
    }

    componentDidMount() {
        this.props.resetCharacter();
        if (this.props.selectedStoryId !== null) {
            this.getCharacters();
            this.getTags();
        }
    }

    newCharacter = () => {
        this.setNavigationActions(this.resetCharacter, this.createCharacter, null);
        this.props.newCharacter();
    };

    selectCharacter = id => {
        this.setNavigationActions(
            this.resetCharacter,
            this.editCharacter,
            this.props.openConfirmation
        );
        this.props.selectCharacter(id);
    };

    moveCharacterDown = id => {
        const paramsObject = {
            character: id,
            apiKey: this.props.apiKey,
        };
        this.CharacterRequests.moveCharacterDown(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempCharacters = this.props.characters;
                    tempCharacters[id] = res.success;
                    this.props.setCharacters(tempCharacters);
                    this.forceUpdate();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to move character up at this time', 'danger');
            });
    };

    moveCharacterUp = id => {
        const paramsObject = {
            character: id,
            apiKey: this.props.apiKey,
        };
        this.CharacterRequests.moveCharacterUp(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert('Unable to move character up at this time', 'warning');
                } else {
                    let tempCharacters = this.props.characters;
                    tempCharacters[id] = res.success;
                    this.props.setCharacters(tempCharacters);
                    this.forceUpdate();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to move character up at this time', 'danger');
            });
    };

    getCharacters = () => {
        let paramsObject = this.createParamsObject();
        this.CharacterRequests.getCharacters(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.setCharacters(res.success);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    createCharacter = async () => {
        var image = '';
        if (this.props.image.includes('data:image') && this.props.image.includes('base64')) {
            image = await this.uploadToS3(this.props.image, 'character', this.props.userId);
        } else {
            image = this.props.image;
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
                    this.props.setCharacters(res.success);
                    this.props.resetCharacter();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    editCharacter = async () => {
        var image = '';
        if (this.props.image.includes('data:image') && this.props.image.includes('base64')) {
            image = await this.uploadToS3(this.props.image, 'character', this.props.userId);
        } else {
            image = this.props.image;
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
                    let tempCharacters = this.props.characters;
                    tempCharacters[this.props.selectedCharacterId] = res.success;
                    this.props.setCharacters(tempCharacters);
                    this.props.resetCharacter();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    deleteCharacter = () => {
        let paramsObject = this.createParamsObject();
        this.CharacterRequests.deleteCharacter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempCharacters = this.props.characters;
                    delete tempCharacters[this.props.selectedCharacterId];
                    this.props.setCharacters(tempCharacters);
                    this.props.resetCharacter();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };
}

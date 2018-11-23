import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import CharacterRequests from '../utils/CharacterRequests.js';
import ReactTooltip from 'react-tooltip';
import EditEntityModal from '../components/EditEntityModal.js';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa';
import '../css/Characters.css';

export default class Character extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            image: '',
            isCharacterModalOpen: false,
            characters: null,
            selectedCharacterIdForEdit: null,
            selectedStoryId: null,
        }
        this.CharacterRequests = new CharacterRequests();
        this.getChapters();
    }

    componentWillReceiveProps(props) {
        if (this.state.selectedStoryId !== props.AppStore.selectedStoryId) {
            this.getChapters();
        }
    }

    getChapters = () => {
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

    newCharacter = () => {

    }

    renderCharacters = () => {

    }

    render() {
        return (
            <div className="full">
                <ReactTooltip delay={500}/>
                <Icon
                    className="icon floatRight"
                    icon={plus}
                    size={28}
                    onClick={() => this.newPlot()}
                    data-tip="Create a new chapter"
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
}
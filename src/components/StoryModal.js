import React from 'react';
import Modal from 'react-modal';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/fa';
import ReactTooltip from 'react-tooltip';
import StoryCompanion from '../utils/StoryCompanion.js';
import StoryRequests from '../utils/StoryRequests.js';
import '../css/StoryModal.css';

// Stops console errors
Modal.setAppElement('body');

const modalStyle = {
    content : {
        top: '45%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height:  '400px',
        overflow: 'visible',
        padding: '0px',
        borderRadius: '8px',
        borderColor: '#CCCCCC',
        borderWidth: '3px'
    }
};

export default class StoryModal extends StoryCompanion {
    constructor(props) {
        super(props);
        this.StoryRequests = new StoryRequests();
        this.state = {
            ...this.state,
            name: '',
            description: '',
            image: '',
        }
    }

    createStory = () => {
        let paramsObject = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
        }
        this.StoryRequests.createStory(paramsObject).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.props.showAlert("Successfully created new story, " + this.state.name, "success");
                this.props.onRequestClose();
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to create story at this time", "danger");
        });
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isStoryModalOpen}
                onRequestClose={() => this.props.onRequestClose()}
                style={modalStyle}
                contentLabel="Story Modal"
                shouldCloseOnOverlayClick={true}
            >
                <div className="modalHeader">
                    <div className="modalTitle">
                        Creating A Story
                    </div>
                    <div className="modalIconContainer">
                        <Icon
                            className="modalCloseIcon hover"
                            icon={close}
                            size={35}
                            onClick={() => this.props.onRequestClose()}
                            data-tip="Close Story Modal"
                        />
                    </div>
                </div> 
                <div className="modalContent">
                    <div className="inputAndLabelContainer">
                        <div className="inputLabel">
                            Story Name
                        </div>
                        <input
                            className="input"
                            onChange={(newStoryName) => this.setState({name: newStoryName.target.value})}
                        />
                    </div>
                    <div className="inputAndLabelContainer">
                        <textarea
                            type="textarea"
                            placeholder="Description..."
                            className="description"
                            onChange={(newStoryName) => this.setState({name: newStoryName.target.value})}
                        />
                    </div>
                    <div
                        className="button createStoryButton"
                        onClick={() => this.createStory()}
                    >
                        Create Story
                    </div>
                </div>
                <ReactTooltip/>
            </Modal> 
        )
    }
}
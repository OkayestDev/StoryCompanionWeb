import React from 'react';
import Modal from 'react-modal';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/fa';
import ReactTooltip from 'react-tooltip';
import StoryCompanion from '../utils/StoryCompanion.js';
import $ from 'jquery';
import Confirmation from './Confirmation.js';
import '../css/EditEntityModal.css';

const supportedUploadFileTypes = [
    'png',
    'jpeg',
    'jpg',
    'gif'
];

// Stops console errors
Modal.setAppElement('body');

const modalStyle = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '550px',
        height:  'auto',
        overflow: 'visible',
        padding: '0px',
        borderRadius: '8px',
        borderColor: '#CCCCCC',
        borderWidth: '3px'
    }
};

export default class EditEntityModal extends StoryCompanion {
    constructor() {
        super();
        this.state = {
            isConfirmationOpen: false,
        }
    }

    uploadImage = () => {
        let reader = new FileReader();
        reader.readAsDataURL(this.uploadedFile.files[0]);
        reader.onload = (file, fileProperties = this.uploadedFile.files[0]) => {
            if (supportedUploadFileTypes.includes(fileProperties.type.split("/")[1])) {
                this.props.imageOnChange(file.currentTarget.result);
            }
            else {
                this.props.showAlert("Unsupported file type. We support " + supportedUploadFileTypes.join(", ") + " for file uploads", "warning");
            }
        }
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isEntityModalOpen}
                    onRequestClose={() => this.props.onRequestClose()}
                    style={modalStyle}
                    contentLabel="Story Modal"
                    shouldCloseOnOverlayClick={true}
                >
                    <div className="modalHeader">
                        <div className="modalTitle">
                            {this.props.title}
                        </div>
                        <div className="modalIconContainer">
                            <Icon
                                className="modalCloseIcon hover"
                                icon={close}
                                size={35}
                                onClick={() => this.props.onRequestClose()}
                            />
                        </div>
                    </div> 
                    <div className="modalContent">
                    {
                        'image' in this.props &&
                        <div className="entityImageContainer">
                            <div 
                                className="entityImage hover"
                                onClick={() => $('#entityImage').click()}
                            >
                            {
                                'image' in this.props && this.props.image !== ''
                                ?
                                <img
                                    className="entityImage"
                                    src={this.props.image}
                                    alt=""
                                />
                                :
                                <span className="noImage">
                                    Add Image
                                </span>
                            }
                            </div>
                            <input
                                ref={(ref) => this.uploadedFile = ref}
                                type="file"
                                hidden
                                id="entityImage"
                                onChange={() => this.uploadImage()}
                            />
                        </div>
                    }
                        <div className="inputAndLabelContainer">
                            <div className="inputLabel">
                                {this.props.objectName} Name
                            </div>
                            <input
                                value={this.props.name}
                                className="input"
                                onChange={(newName) => this.props.nameOnChange(newName.target.value)}
                            />
                        </div>
                    {
                        'numberOnChange' in this.props &&
                        <div className="inputAndLabelContainer">
                            <div className="inputLabel">
                                {this.props.objectName} Number
                            </div>
                            <input
                                value={this.props.number}
                                className="input"
                                onChange={(newNumber) => this.props.numberOnChange(newNumber.target.value)}
                            />
                        </div>    
                    }
                    {
                        'descriptionOnChange' in this.props &&
                        <div className="inputAndLabelContainer">
                            <textarea
                                value={this.props.description}
                                type="textarea"
                                placeholder="Description..."
                                className="description"
                                onChange={(newDescription) => this.props.descriptionOnChange(newDescription.target.value)}
                            />
                        </div>
                    }
                    {
                        'attributesOnChange' in this.props &&
                        <div className="inputAndLabelContainer">
                            <textarea
                                value={this.props.attribute}
                                type="textarea"
                                placeholder="Attributes..."
                                className="description"
                                onChange={(newDescription) => this.props.descriptionOnChange(newDescription.target.value)}
                            />
                        </div>
                    }
                        <div
                            className="button createEntityButton"
                            onClick={() => this.props.onSave()}
                        >
                            {this.props.saveButtonText}
                        </div>
                    {
                        this.props.selectedId === null
                        ?
                        null
                        :
                        <div
                            className="button deleteEntityButton"
                            onClick={() => {
                                this.setState({isConfirmationOpen: true});
                            }}
                        >
                            {this.props.deleteButtonText}
                        </div>
                    }
                    </div>
                    <ReactTooltip delayShow={500}/>
                </Modal>
                <Confirmation
                    isOpen={this.state.isConfirmationOpen}
                    action={this.props.confirmationAction} 
                    onConfirm={() => {
                        this.setState({isConfirmationOpen: false})
                        this.props.onDelete()
                    }}
                    onCancel={() => this.setState({isConfirmationOpen: false})}
                />
            </div> 
        )
    }
}
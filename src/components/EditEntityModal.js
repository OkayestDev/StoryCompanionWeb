import React from 'react';
import Modal from 'react-modal';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/fa';
import ReactTooltip from 'react-tooltip';
import StoryCompanion from '../utils/StoryCompanion.js';
import $ from 'jquery';
import Confirmation from './Confirmation.js';
import '../css/EditEntityModal.css';
import Dropdown from './Dropdown.js';
import uuid from 'uuid';

const supportedUploadFileTypes = ['png', 'jpeg', 'jpg', 'gif'];

// Stops console errors
Modal.setAppElement('body');

export default class EditEntityModal extends StoryCompanion {
    constructor() {
        super();
        this.state = {
            isConfirmationOpen: false,
        };
    }

    uploadImage = () => {
        let reader = new FileReader();
        reader.readAsDataURL(this.uploadedFile.files[0]);
        reader.onload = (file, fileProperties = this.uploadedFile.files[0]) => {
            if (supportedUploadFileTypes.includes(fileProperties.type.split('/')[1])) {
                this.props.imageOnChange(file.currentTarget.result);
            } else {
                this.props.showAlert(
                    'Unsupported file type. We support ' +
                        supportedUploadFileTypes.join(', ') +
                        ' for file uploads',
                    'warning'
                );
            }
        };
    };

    renderOneLineInputs = () => {
        let renderedInputs = [];
        this.props.oneLineInputs.forEach(input => {
            renderedInputs.push(
                <div className="entityModalInputAndLabelContainer" key={input.name}>
                    <div className="entityModalInputLabel">{input.name}</div>
                    <input
                        value={input.value}
                        placeholder={input.name + '...'}
                        className="editEntityOneLineInput"
                        onChange={value => input.onChange(value.target.value)}
                    />
                </div>
            );
        });
        return renderedInputs;
    };

    renderMultiLineInputs = () => {
        let renderedInputs = [];
        this.props.multiLineInputs.forEach(input => {
            renderedInputs.push(
                <div className="entityModalInputAndLabelContainer" key={input.name}>
                    <div className="entityModalInputLabel">{input.name}</div>
                    <textarea
                        value={input.value}
                        type="textarea"
                        placeholder={input.name + '...'}
                        className="entityModalMultiLineInput"
                        onChange={value => input.onChange(value.target.value)}
                    />
                </div>
            );
        });
        return renderedInputs;
    };

    render() {
        return (
            <div>
                <Modal
                    closeTimeoutMS={400}
                    isOpen={this.props.isEntityModalOpen}
                    onRequestClose={this.props.onRequestClose}
                    className="editEntityModalContainer"
                    contentLabel="Story Modal"
                    shouldCloseOnOverlayClick={true}
                >
                    <div className="modalHeader">
                        <div className="modalTitle">{this.props.title}</div>
                        <div className="modalIconContainer">
                            <Icon
                                className="modalCloseIcon hover"
                                icon={close}
                                size={35}
                                onClick={this.props.onRequestClose}
                            />
                        </div>
                    </div>
                    <div className="editEntityModalContent">
                        {'image' in this.props && (
                            <div className="entityImageContainer">
                                <div
                                    className="entityImage hover"
                                    onClick={() => $('#entityImage').click()}
                                >
                                    {'image' in this.props && this.props.image !== '' ? (
                                        <img
                                            className="entityImage"
                                            src={this.props.image}
                                            alt=""
                                        />
                                    ) : (
                                        <span className="noImage">Add Image</span>
                                    )}
                                </div>
                                <input
                                    ref={ref => (this.uploadedFile = ref)}
                                    type="file"
                                    hidden
                                    id="entityImage"
                                    onChange={() => this.uploadImage()}
                                />
                            </div>
                        )}
                        {this.renderOneLineInputs()}
                        {'dropdown' in this.props && (
                            <div className="entityModalInputAndLabelContainer">
                                <div className="entityModalInputLabel">
                                    {this.props.dropdownName}
                                </div>
                                <Dropdown
                                    selectedValue={this.props.dropdown}
                                    list={this.props.dropdownList}
                                    onChange={this.props.dropdownOnChange}
                                    placeholder={this.props.dropdownName + '...'}
                                />
                            </div>
                        )}
                        {this.renderMultiLineInputs()}
                        <div
                            className="button createEntityButton"
                            onClick={() => this.props.onSave()}
                        >
                            {this.props.saveButtonText}
                        </div>
                        {this.props.selectedId === null ? null : (
                            <div
                                className="button deleteEntityButton"
                                onClick={() => {
                                    this.setState({ isConfirmationOpen: true });
                                }}
                            >
                                {this.props.deleteButtonText}
                            </div>
                        )}
                    </div>
                    <ReactTooltip delayShow={500} />
                </Modal>
                <Confirmation
                    isOpen={this.state.isConfirmationOpen}
                    action={this.props.confirmationAction}
                    onConfirm={() => {
                        this.setState({ isConfirmationOpen: false });
                        this.props.onDelete();
                    }}
                    onCancel={() => this.setState({ isConfirmationOpen: false })}
                />
            </div>
        );
    }
}

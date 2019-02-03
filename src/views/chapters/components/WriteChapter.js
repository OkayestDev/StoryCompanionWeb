import React, { Component } from 'react';
import Modal from 'react-modal';
import Icon from 'react-icons-kit';
import { close, check } from 'react-icons-kit/fa';
import '../../../css/WriteChapterModal.css';

export default class WriteChapter extends Component {
    render() {
        return (
            <div>
                <Modal
                    closeTimeoutMS={400}
                    isOpen={this.props.isOpen}
                    onRequestClose={this.props.onRequestClose}
                    className="modalContainer writeChapterModal"
                    contentLabel="Story Modal"
                >
                    <div className="modalHeader">
                        <div className="modalTitle">
                            {this.props.chapterNumber}. {this.props.chapterName}
                        </div>
                        <div className="modalIconContainer">
                            <Icon
                                className="modalCloseIcon hover writeChapterSave"
                                icon={check}
                                size={35}
                                onClick={this.props.writeChapter}
                            />
                            <Icon
                                className="modalCloseIcon hover"
                                icon={close}
                                size={35}
                                onClick={this.props.onRequestClose}
                            />
                        </div>
                    </div>
                    <div className="contentContainer">
                        <textarea
                            className="textarea contentTextArea"
                            placeholder="Chapter Content"
                            value={this.props.chapterContent}
                            onChange={value => this.props.handleContentChanged(value.target.value)}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

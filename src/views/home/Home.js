import React, { Component } from 'react';
import { mobileScreenshots, webScreenshots } from './components/Screenshots.js';
import { Icon } from 'react-icons-kit';
import { chevronRight, chevronLeft } from 'react-icons-kit/fa';
import Slideshow from './components/Slideshow.js';
import '../../css/Home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileScreenshotPage: 0,
            mobileScreenshotsPerPage: 3,
            webScreenshotPage: 0,
            webScreenshotsPerPage: 1,
        };
    }

    handleMobileSlideshowLeftClicked = () => {
        if (this.state.mobileScreenshotPage === 0) {
            return;
        }
        this.setState({ mobileScreenshotPage: this.state.mobileScreenshotPage - 1 });
    };

    handleMobileSlideshowRightClicked = () => {
        const currentPage = this.state.mobileScreenshotPage;
        const perPage = this.state.mobileScreenshotsPerPage;
        // We only need to check if the first index of screenShots exists
        if (typeof mobileScreenshots[(currentPage + 1) * perPage] === 'undefined') {
            // Loop back to beginning of slideshow
            this.setState({
                mobileScreenshotPage: 0,
            });
        } else {
            this.setState({
                mobileScreenshotPage: currentPage + 1,
            });
        }
    };

    handleWebSlideshowLeftClicked = () => {
        if (this.state.webScreenshotPage === 0) {
            return;
        }
        this.setState({ webScreenshotPage: this.state.webScreenshotPage - 1 });
    };

    handleWebSlideshowRightClicked = () => {};

    renderMobileScreenshots = () => {};

    renderWebScreenshots = () => {};

    render() {
        return (
            <div className="homeContainer">
                <div className="sectionContainer">
                    <div>Introducing Story Companion</div>
                    <div>A Fully cross platform solution for story writers</div>
                </div>
                <div className="sectionContainer">
                    <div>Web App Slideshow</div>
                    <div className="slideShowContainer">
                        <Icon
                            className="icon"
                            icon={chevronLeft}
                            size={80}
                            onClick={this.handleMobileSlideshowLeftClicked}
                        />
                        <Icon
                            className="icon"
                            icon={chevronRight}
                            size={80}
                            onClick={this.handleMobileSlideshowRightClicked}
                        />
                    </div>
                </div>
                <div className="sectionContainer">
                    <div>Mobile App Slideshow</div>
                    <div className="slideShowContainer">
                        <Icon
                            className="icon"
                            icon={chevronLeft}
                            size={80}
                            onClick={this.handleMobileSlideshowLeftClicked}
                        />
                        <Slideshow
                            slides={mobileScreenshots}
                            currentPage={this.state.mobileScreenshotPage}
                            perPage={this.state.mobileScreenshotsPerPage}
                            slideClassName="mobileScreenShot"
                        />
                        <Icon
                            className="icon"
                            icon={chevronRight}
                            size={80}
                            onClick={this.handleMobileSlideshowRightClicked}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

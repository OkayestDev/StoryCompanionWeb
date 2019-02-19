import React, { Component } from 'react';
import { mobileScreenshots, webScreenshots } from './components/Screenshots.js';
import { Icon } from 'react-icons-kit';
import { chevronCircleRight, chevronCircleLeft } from 'react-icons-kit/fa';
import Slideshow from './components/Slideshow.js';
import Features from './components/Features.js';
import '../../css/Home.css';

const appleAppStoreUrl = 'https://itunes.apple.com/us/app/story-companion/id1439693042?ls=1&mt=8';
const googlePlayStoreUrl =
    'https://play.google.com/store/apps/details?id=com.isjustgame.storycompanion&hl=en';

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
                    <div className="logoAndIntroductionContainer">
                        <img src="./logo.png" className="homeLogo" />
                        <div>
                            <div className="sectionLabel">Introducing Story Companion</div>
                            <div className="description">
                                A fully cross platform solution for story writers
                            </div>
                            <div className="mainAppStoreButtonContainer">
                                <a href={appleAppStoreUrl}>
                                    <img
                                        className="appStoreButton"
                                        src="./blue_appstore_button.png"
                                    />
                                </a>
                                <a href={googlePlayStoreUrl}>
                                    <img
                                        className="appStoreButton"
                                        src="./blue_playstore_button.png"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sectionContainer">
                    <div className="sectionLabel">Mobile App</div>
                    <div className="description">
                        Available for free on
                        <a className="storeLink" href={appleAppStoreUrl}>
                            iOS
                        </a>
                        and
                        <a className="storeLink" href={googlePlayStoreUrl}>
                            Android
                        </a>
                    </div>
                    <div className="slideShowContainer">
                        <Icon
                            className="icon"
                            icon={chevronCircleLeft}
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
                            icon={chevronCircleRight}
                            size={80}
                            onClick={this.handleMobileSlideshowRightClicked}
                        />
                    </div>
                </div>
                <div className="sectionContainer">
                    <div className="sectionLabel">Features</div>
                    <Features />
                </div>
                <div className="sectionContainer">
                    <div className="sectionLabel">Web App</div>
                    <div />
                    <div className="slideShowContainer">
                        <Icon
                            className="icon"
                            icon={chevronCircleLeft}
                            size={80}
                            onClick={this.handleWebSlideshowLeftClicked}
                        />
                        <Icon
                            className="icon"
                            icon={chevronCircleRight}
                            size={80}
                            onClick={this.handleWebSlideshowRightClicked}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

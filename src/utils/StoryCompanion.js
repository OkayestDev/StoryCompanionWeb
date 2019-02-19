import { Component } from 'react';
import TagRequests from './TagRequests.js';
import StoryRequests from './StoryRequests.js';
import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
});
const s3 = new AWS.S3();

export default class StoryCompanion extends Component {
    constructor(props) {
        super(props);
        this.TagRequests = new TagRequests();
        this.StoryRequests = new StoryRequests();
    }

    /**
     * Creates a file object with name, filename, from a base64 data string
     * @param {string} dataURL a data*base64 file string of the file to create
     * @param {string} filename name of the file to be read from base64 string
     */
    dataURLtoFile = (dataURL, filename) => {
        let arr = dataURL.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    uploadToS3 = async (data, objectName, userId) => {
        let now = new Date();
        let filename = userId + '-' + objectName + '-' + now.getTime();
        let file = this.dataURLtoFile(data, filename);
        let extension = file.type.split('/');
        extension = extension[1];
        let params = {
            ACL: 'public-read',
            Body: file,
            Bucket: process.env.REACT_APP_AWS_BUCKET,
            ContentTye: file.type,
            Key: `${filename}.${extension}`,
        };
        return s3
            .upload(params)
            .promise()
            .then(res => {
                return res.Location;
            })
            .catch(error => {
                console.info('Unable to upload image to S3', error);
            });
    };

    isUserLoggedIn = () => {
        if (
            this.props.userId !== null &&
            this.props.apiKey !== null &&
            typeof this.props.userId !== 'undefined' &&
            typeof this.props.apiKey !== 'undefined'
        ) {
            return true;
        }
        return false;
    };

    getSelectedStoryId = () => {
        if ('selectedStoryIdForEdit' in this.props && this.props.selectedStoryIdForEdit !== null) {
            return this.props.selectedStoryIdForEdit;
        } else if ('selectedStoryId' in this.props && this.props.selectedStoryId !== null) {
            return this.props.selectedStoryId;
        } else {
            return '';
        }
    };

    createParamsObject = () => {
        if (this.state === null || typeof this.state === 'undefined') {
            this.state = {};
        }

        return {
            plot: 'selectedPlotId' in this.props ? this.props.selectedPlotId : '',
            plotParent: 'plotParent' in this.props ? this.props.plotParent : '',
            draft: 'selectedDraftId' in this.props ? this.props.selectedDraftId : '',
            note: 'selectedNoteId' in this.props ? this.props.selectedNoteId : '',
            character: 'selectedCharacterId' in this.props ? this.props.selectedCharacterId : '',
            chapter: 'selectedChapterId' in this.props ? this.props.selectedChapterId : '',
            number: 'number' in this.props ? this.props.number : '',
            content: 'content' in this.props ? this.props.content : '',
            user: 'userId' in this.props ? this.props.userId : '',
            story: this.getSelectedStoryId(),
            genre: 'genre' in this.props ? this.props.genre : '',
            tag: 'selectedTagId' in this.props ? this.props.selectedTagId : '',
            type: 'type' in this.props ? this.props.type : '',
            description: 'description' in this.props ? this.props.description : '',
            attribute: 'attribute' in this.props ? this.props.attribute : '',
            name: 'name' in this.props ? this.props.name : '',
            age: 'age' in this.props ? this.props.age : '',
            storyRole: 'storyRole' in this.props ? this.props.storyRole : '',
            goal: 'goal' in this.props ? this.props.goal : '',
            email:
                'email' in this.props
                    ? this.props.email
                    : 'email' in this.state
                    ? this.state.email
                    : '',
            confirmEmail: 'confirmEmail' in this.state ? this.state.confirmEmail : '',
            password:
                'password' in this.props
                    ? this.props.password
                    : 'password' in this.state
                    ? this.state.password
                    : '',
            confirmPassword:
                'confirmPassword' in this.props
                    ? this.props.confirmPassword
                    : 'confirmPassword' in this.state
                    ? this.state.confirmPassword
                    : '',
            apiKey: 'apiKey' in this.props ? this.props.apiKey : '',
        };
    };

    getStories = () => {
        let paramsObject = this.createParamsObject();
        this.StoryRequests.getStories(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.setStories(res.success);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get response from server', 'warning');
            });
    };

    getTags = () => {
        // Instance of array means tags is empty
        if (this.props.tags === null || this.props.tags instanceof Array) {
            let paramsObject = this.createParamsObject();
            this.TagRequests.getTags(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert('Unable to fetch tags at this time', 'danger');
                    } else {
                        this.props.setTags(res.success);
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to fetch tags at this time', 'danger');
                });
        }
    };

    filterTagsByType = type => {
        if (this.props.tags === null || typeof this.props.tags === 'undefined') {
            return [];
        }

        let tagIds = Object.keys(this.props.tags);
        let tagByType = {};
        tagIds.forEach(id => {
            if (this.props.tags[id].type === type) {
                tagByType[id] = this.props.tags[id];
            }
        });
        return tagByType;
    };

    sortEntitiesByNumber = entities => {
        if (typeof entities === 'undefined') {
            return [];
        }

        let entityIds = Object.keys(entities);
        entityIds.sort(function(a, b) {
            return entities[a].number - entities[b].number;
        });
        return entityIds;
    };

    // Required function of Component
    render() {
        return null;
    }
}

import { Component } from 'react';
import TagRequests from './TagRequests.js';
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
        if (this.props.userId !== null && this.props.apiKey !== null) {
            return true;
        }
        return false;
    };

    createParamsObject = (props = null) => {
        const propsObject = props === null ? this.props : props;
        return {
            plot: 'selectedPlotId' in this.state ? this.state.selectedPlotId : '',
            plotParent: 'plotParent' in this.state ? this.state.plotParent : '',
            draft: 'selectedDraftId' in this.state ? this.state.selectedDraftId : '',
            note: 'selectedNoteId' in this.state ? this.state.selectedNoteId : '',
            character: 'selectedCharacterId' in this.state ? this.state.selectedCharacterId : '',
            chapter: 'selectedChapterId' in this.state ? this.state.selectedChapterId : '',
            number: 'number' in this.state ? this.state.number : '',
            user:
                'userId' in this.state
                    ? this.state.userId
                    : 'userId' in propsObject
                    ? propsObject.userId
                    : '',
            story:
                'selectedStoryId' in this.state
                    ? this.state.selectedStoryId
                    : 'selectedStoryId' in propsObject
                    ? propsObject.selectedStoryId
                    : '',
            tag: 'selectedTagId' in this.state ? this.state.selectedTagId : '',
            type: 'type' in this.state ? this.state.type : '',
            description: 'description' in this.state ? this.state.description : '',
            attribute: 'attribute' in this.state ? this.state.attribute : '',
            name: 'name' in this.state ? this.state.name : '',
            email:
                'email' in this.state
                    ? this.state.email
                    : 'email' in propsObject
                    ? propsObject.email
                    : '',
            confirmEmail: 'confirmEmail' in this.state ? this.state.confirmEmail : '',
            password: 'password' in this.state ? this.state.password : '',
            confirmPassword: 'confirmPassword' in this.state ? this.state.confirmPassword : '',
            apiKey: propsObject.apiKey,
        };
    };

    getTags = () => {
        // Instance of array means tags is empty
        if (this.props.tags === null || this.props.tags instanceof Array) {
            let paramsObject = this.createParamsObject();
            this.TagRequests.getTags(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.setState({
                            globalAlertVisible: true,
                            globalAlertType: 'danger',
                            globalAlertMessage: 'Unable to fetch tags at this time',
                        });
                    } else {
                        this.props.setTags(res.success);
                    }
                })
                .catch(() => {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: 'Unable to fetch tags at this time',
                    });
                });
        }
    };

    filterTagsByType = type => {
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

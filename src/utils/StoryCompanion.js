import { Component } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
});
const s3 = new AWS.S3();

export default class StoryCompanion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGlobalAlert: false,
            globalAlertMessage: "",
            globalAlertType: "",
        }
    }

    /**
     * Creates a file object with name, filename, from a base64 data string
     * @param {string} dataURL a data*base64 file string of the file to create
     * @param {string} filename name of the file to be read from base64 string
     */
    dataURLtoFile = (dataURL, filename) => {
        let arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    uploadToS3 = async (data, objectName, userId) => {
        let now = new Date();
        let filename = userId + "-" + objectName + "-" + now.getTime(); 
        let file = this.dataURLtoFile(data, filename);
        let extension = file.type.split("/");
        extension = extension[1];
        let params = {
            ACL: "public-read",
            Body: file,
            Bucket: process.env.REACT_APP_AWS_BUCKET,
            ContentTye: file.type,
            Key: `${filename}.${extension}`
        }
        return s3.upload(params).promise().then((res) => {
            return res.Location;
        })
        .catch((error) => {
            console.info("Unable to upload image to S3", error);
        });
    }

    showAlert = (message, type) => {
        this.setState({
            showGlobalAlert: true,
            globalAlertMessage: message,
            globalAlertType: type,
        });
        // Automatically close alert after 10 seconds
        setTimeout(() => this.closeAlert(), 6000);
    }

    closeAlert = () => {
        this.setState({showGlobalAlert: false});
    }

    // Required function of Component
    render() { return null }
}
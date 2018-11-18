import { 
    postRequestWithFormData,
} from './HelperFunctions.js';

export default class StoryRequests {
    getStories = (userId) => {
        let paramsObject = {
            user: userId
        };
        return postRequestWithFormData(paramsObject, 'story/view', {}).then(res => res);
    }

    createStory = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'story/creation', {}).then(res => res);
    }

    editStory = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'story/edit', {}).then(res => res);
    }

    deleteStory = (storyId) => {
        let paramsObject = {
            story: storyId
        };
        return postRequestWithFormData(paramsObject, 'story/delete', {}).then(res => res);
    }
}
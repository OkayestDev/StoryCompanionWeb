import { postRequestWithFormData } from './HelperFunctions.js';

export default class PromptRequests {
    getPrompt = paramsObject => {
        return postRequestWithFormData(paramsObject, 'prompt/view', {}).then(res => res);
    };

    downVotePrompt = paramsObject => {
        return postRequestWithFormData(paramsObject, 'prompt/down_vote', {}).then(res => res);
    };

    createPrompt = paramsObject => {
        return postRequestWithFormData(paramsObject, 'prompt/creation', {}).then(res => res);
    };

    promptToStory = paramsObject => {
        return postRequestWithFormData(paramsObject, 'prompt/to_story', {}).then(res => res);
    };
}

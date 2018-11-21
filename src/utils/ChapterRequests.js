import { 
    postRequestWithFormData,
} from './HelperFunctions.js';

export default class ChapterRequests {
    options = {
        keyPrefix: "",
        bucket: "story-companion",
        region: "us-east-1",
        accessKey: "AKIAJXWONLPYBWQPEAKQ",
        secretKey: "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",
        successActionStatus: 201
    }

    getChapters = (storyId) => {
        let paramObject = {
            story: storyId
        };
        return postRequestWithFormData(paramObject, 'chapter/view', {}).then(res => res);
    }

    createChapter = (paramObject) => {
        return postRequestWithFormData(paramObject, 'chapter/creation', {}).then(res => res);
    }

    editChapter = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'chapter/edit', {}).then(res => res);
    }

    deleteChapter = (chapterId) => {
        let paramObject = {
            chapter: chapterId
        };
        return postRequestWithFormData(paramObject, 'chapter/delete', {}).then(res => res);
    }
}
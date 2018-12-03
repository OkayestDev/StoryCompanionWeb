import { 
    postRequestWithFormData,
} from './HelperFunctions.js';

export default class ChapterRequests {
    getChapters = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'chapter/view', {}).then(res => res);
    }

    createChapter = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'chapter/creation', {}).then(res => res);
    }

    editChapter = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'chapter/edit', {}).then(res => res);
    }

    deleteChapter = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'chapter/delete', {}).then(res => res);
    }
}
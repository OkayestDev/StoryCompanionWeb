import { 
    postRequestWithFormData,
} from './HelperFunctions.js';

// Character is referred to as Person in the back-end. Character is a reserved word in mysql
export default class CharacterRequests {
    getCharacters = (storyId) => {
        let paramsObject = {
            story: storyId
        };
        return postRequestWithFormData(paramsObject, 'person/view', {}).then(res => res);
    }

    createCharacter = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'person/creation', {}).then(res => res);
    }

    editCharacter = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'person/edit', {}).then(res => res);
    }

    deleteCharacter = (character) => {
        let paramsObject = {
            character: character
        };
        return postRequestWithFormData(paramsObject, 'person/delete', {}).then(res => res);
    }
}
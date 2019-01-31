import { createStore } from 'redux';

const INITIAL_STATE = {
    selectedTagId: null,
    name: '',
    description: '',
    type: '',
    tags: null,
    isTagModalOpen: false,
    isConfirmationModalOpen: false,
};

export const tagReducer = (state = INITIAL_STATE, action) => {
    let newState = state;
    switch (action.type) {
        case 'HANDLE_TAG_NAME_CHANGED':
            newState = {
                ...state,
                name: action.payload,
            };
            break;
        case 'HANDLE_TAG_DESCRIPTION_CHANGED':
            newState = {
                ...state,
                description: action.payload,
            };
            break;
        case 'HANDLE_TAG_TYPE_CHANGED':
            newState = {
                ...state,
                type: action.payload,
            };
            break;
        case 'OPEN_TAG_MODAL':
            newState = {
                ...state,
                isTagModalOpen: true,
            };
            break;
        case 'CLOSE_TAG_MODAL':
            newState = {
                ...state,
                isTagModalOpen: false,
            };
            break;
        case 'RESET_TAG':
            newState = {
                ...state,
                selectedTagId: null,
                name: '',
                description: '',
                type: '',
                isTagModalOpen: false,
            };
            break;
        case 'SELECT_TAG':
            let id = action.payload;
            newState = {
                ...state,
                selectedTagId: id,
                name: state.tags[id].name,
                description: state.tags[id].description,
                type: state.tags[id].type,
                isTagModalOpen: true,
            };
            break;
        case 'SET_TAGS':
            newState = {
                ...state,
                tags: action.payload,
            };
            break;
        case 'NEW_TAG':
            newState = {
                ...state,
                selectedTagId: null,
                isTagModalOpen: true,
            };
            break;
        case 'OPEN_TAG_CONFIRMATION':
            newState = {
                ...state,
                isConfirmationModalOpen: true,
            };
            break;
        case 'CLOSE_TAG_CONFIRMATION':
            newState = {
                ...state,
                isConfirmationModalOpen: false,
            };
            break;
        default:
            newState = state;
            break;
    }
    return newState;
};

export const tagStore = createStore(tagReducer);

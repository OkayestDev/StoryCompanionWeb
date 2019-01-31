import { createStore } from 'redux';

const INITIAL_STATE = {
    name: '',
    description: '',
    image: '',
    genre: '',
    selectedTagId: null,
    selectedStoryId: null,
    selectedStoryIdForEdit: null,
    isStoryModalOpen: false,
    isStoryListOpen: true,
    stories: null,
    isConfirmationModalOpen: false,
};

export const storyReducer = (state = INITIAL_STATE, action) => {
    let newState = state;
    switch (action.type) {
        case 'HANDLE_STORY_NAME_CHANGED':
            newState = {
                ...state,
                name: action.payload,
            };
            break;
        case 'HANDLE_STORY_GENRE_CHANGED':
            newState = {
                ...state,
                genre: action.payload,
            };
            break;
        case 'HANDLE_STORY_DESCRIPTION_CHANGED':
            newState = {
                ...state,
                description: action.payload,
            };
            break;
        case 'HANDLE_STORY_IMAGE_CHANGED':
            newState = {
                ...state,
                image: action.payload,
            };
            break;
        case 'HANDLE_STORY_TAG_CHANGED':
            newState = {
                ...state,
                selectedTagId: action.payload,
            };
            break;
        case 'OPEN_STORY_MODAL':
            newState = {
                ...state,
                isStoryModalOpen: true,
            };
            break;
        case 'CLOSE_STORY_MODAL':
            newState = {
                ...state,
                isStoryModalOpen: false,
                selectedStoryIdForEdit: null,
            };
            break;
        case 'TOGGLE_IS_STORY_LIST_OPEN':
            newState = {
                ...state,
                isStoryListOpen: !state.isStoryListOpen,
            };
            break;
        case 'RESET_STORY':
            newState = {
                ...state,
                name: '',
                description: '',
                image: '',
                genre: '',
                selectedTagId: null,
                selectedStoryIdForEdit: null,
                selectedStoryId: null,
            };
            break;
        case 'NEW_STORY':
            newState = {
                ...state,
                selectedStoryIdForEdit: null,
                isStoryModalOpen: true,
            };
            break;
        case 'SELECT_STORY':
            let story = state.stories[action.payload];
            newState = {
                ...state,
                name: story.name,
                image: story.image,
                genre: story.genre,
                description: story.description,
                selectedTagId: story.tag,
                selectedStoryId: action.payload,
            };
            break;
        case 'SELECT_STORY_FOR_EDIT':
            let storyToEdit = state.stores[action.payload];
            newState = {
                ...state,
                name: storyToEdit.name,
                image: storyToEdit.image,
                genre: storyToEdit.genre,
                description: storyToEdit.description,
                selectedTagId: storyToEdit.tag,
                selectedStoryIdForEdit: action.payload,
                isStoryModalOpen: true,
            };
            break;
        case 'SET_STORIES':
            newState = {
                ...state,
                stories: action.payload,
            };
            break;
        case 'OPEN_STORY_CONFIRMATION':
            newState = {
                ...state,
                isConfirmationModalOpen: true,
            };
            break;
        case 'CLOSE_STORY_CONFIRMATION':
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

export const storyStore = createStore(storyReducer);

import { createStore } from 'redux';

const INITIAL_STATE = {
    name: '',
    description: '',
    plotParent: null,
    selectedPlotId: null,
    isPlotModalOpen: false,
    plots: null,
    isConfirmationModalOpen: false,
};

export const plotReducer = (state = INITIAL_STATE, action) => {
    let newState = state;
    switch (action.type) {
        case 'HANDLE_PLOT_NAME_CHANGED':
            newState = {
                ...state,
                name: action.payload,
            };
            break;
        case 'HANDLE_PLOT_DESCRIPTION_CHANGED':
            newState = {
                ...state,
                description: action.payload,
            };
            break;
        case 'RESET_PLOT':
            newState = {
                ...state,
                name: '',
                description: '',
                plotParent: null,
                selectedPlotId: null,
                isPlotModalOpen: false,
            };
            break;
        case 'NEW_PLOT':
            newState = {
                ...state,
                selectedPlotId: null,
                isPlotModalOpen: true,
            };
            break;
        case 'SELECT_PLOT':
            let plot = state.plots[action.payload];
            newState = {
                ...state,
                selectedPlotId: action.payload,
                plotParent: plot.plot,
                name: plot.name,
                description: plot.description,
                isPlotModalOpen: true,
            };
            break;
        case 'OPEN_PLOT_MODAL':
            newState = {
                ...state,
                isPlotModalOpen: true,
            };
            break;
        case 'CLOSE_PLOT_MODAL':
            newState = {
                ...state,
                isPlotModalOpen: false,
            };
            break;
        case 'SET_PLOTS':
            newState = {
                ...state,
                plots: action.payload,
            };
            break;
        case 'ADD_CHILD_PLOT':
            newState = {
                ...state,
                plotParent: action.payload,
                name: '',
                description: '',
                selectedPlotId: null,
                isPlotModalOpen: true,
            };
            break;
        case 'OPEN_PLOT_CONFIRMATION':
            newState = {
                ...state,
                isConfirmationModalOpen: true,
            };
            break;
        case 'CLOSE_PLOT_CONFIRMATION':
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

export const plotStore = createStore(plotReducer);

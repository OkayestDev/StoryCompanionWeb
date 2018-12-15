export const login = payload => ({
    type: 'LOGIN',
    payload: payload,
});

export const setStories = payload => ({
    type: 'SET_STORIES',
    payload: payload,
});

export const editStoryComponents = payload => ({
    type: 'EDIT_COMPONENTS',
    payload: payload,
});

export const setTags = payload => ({
    type: 'SET_TAGS',
    payload: payload,
});

export const logout = () => ({ type: 'LOGOUT' });

export const showAlert = (message, type) => ({
    type: 'SHOW_ALERT',
    payload: {
        globalAlertMessage: message,
        globalAlertType: type,
    },
});

export const closeAlert = () => ({ type: 'CLOSE_ALERT' });

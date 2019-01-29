export const handleDescriptionChanged = payload => ({
    type: 'HANDLE_SETTINGS_DESCRIPTION_CHANGED',
    payload,
});

export const handlePasswordChanged = payload => ({
    type: 'HANDLE_SETTINGS_PASSWORD_CHANGED',
    payload,
});

export const handleConfirmPasswordChanged = payload => ({
    type: 'HANDLE_SETTINGS_CONFIRM_PASSWORD_CHANGED',
    payload,
});

export const submittingFeature = () => ({
    type: 'SUBMITTING_FEATURE',
});

export const submittingBug = () => ({
    type: 'SUBMITTING_BUG',
});

export const changingPassword = () => ({
    type: 'CHANGING_PASSWORD',
});

export const resetSettings = () => ({
    type: 'RESET_SETTINGS',
});

export const openConfirmation = () => ({
    type: 'OPEN_SETTINGS_CONFIRMATION',
});

export const closeConfirmation = () => ({
    type: 'CLOSE_SETTINGS_CONFIRMATION',
});

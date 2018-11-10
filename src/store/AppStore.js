import { LOGS } from '../config/Logs.js';

export default class AppStore {
    email = '';
    userId = null;
    selectedStoryId = null;
    apiKey = '';

    setValue(params) {
        Object.assign(this, params);
    }
}
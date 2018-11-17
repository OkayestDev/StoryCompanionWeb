export default class AppStore {
    email = '';
    userId = null;
    selectedStoryId = null;
    apiKey = '';
    stories = {};
    chapters = {};
    plots = {};
    characters = {};
    draft = null;
    notes = {};


    setValue(params) {
        if ('id' in params) {
            this.userId = params.id;
        }
        Object.assign(this, params);
    }
}
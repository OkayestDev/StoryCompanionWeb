export default class AppStore {
    email = '';
    userId = null;
    selectedStoryId = null;
    apiKey = '';
    stories = {};

    setValue(params) {
        if ('id' in params) {
            this.userId = params.id;
        }
        Object.assign(this, params);
    }
}
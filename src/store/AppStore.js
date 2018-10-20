export default class AppStore {
    email = '';
    apiKey = '';

    setValue(params) {
        Object.assign(this, params);
    }
}
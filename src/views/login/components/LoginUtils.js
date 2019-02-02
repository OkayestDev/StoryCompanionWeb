import StoryCompanion from '../../../utils/StoryCompanion.js';
import UserRequests from '../../../utils/UserRequests';

export default class LoginUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.UserRequests = new UserRequests();
        window.addEventListener('keydown', this.handleEnterKey);
    }

    handleEnterKey = event => {
        if (event.key === 'Enter') {
            this.login();
        }
    };

    componentWillMount() {
        if (this.isUserLoggedIn()) {
            this.props.history.push('/chapters');
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleEnterKey);
    }

    login = () => {
        let paramsObject = this.createParamsObject();
        this.UserRequests.login(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.login(res.success);
                    paramsObject = this.createParamsObject();
                    this.getStories(paramsObject);
                    this.getTags(paramsObject);
                    this.props.history.push('/chapters');
                }
            })
            .catch(error => {
                console.info(error);
                this.props.showAlert('Unable to login at this time', 'danger');
            });
    };
}

import StoryCompanion from '../../../utils/StoryCompanion.js';
import UserRequests from '../../../utils/UserRequests.js';

export default class CreateAccountUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.UserRequests = new UserRequests();
    }

    createAccount = () => {
        const paramsObject = this.createParamsObject();
        this.UserRequests.createAccount(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert(
                        'Successfully created account. Logging you in now!',
                        'success'
                    );
                    setTimeout(() => {
                        this.UserRequests.login(this.state.email, this.state.password)
                            .then(res => {
                                if ('error' in res) {
                                    this.props.showAlert(res.error, 'warning');
                                } else {
                                    this.props.AppStore.setValue(res.success);
                                    this.props.updateAppStore(this.AppStore);
                                    this.props.history.push('/chapters');
                                }
                            })
                            .catch(() => {
                                this.props.showAlert('Unable to login at this time', 'danger');
                            });
                    }, 2000);
                }
            })
            .catch(error => {
                this.props.showAlert('Unable to create account at this time', 'danger');
            });
    };
}

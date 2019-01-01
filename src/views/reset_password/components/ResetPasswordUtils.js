import UserRequests from '../../../utils/UserRequests.js';
import StoryCompanion from '../../../utils/StoryCompanion.js';

export default class ResetPasswordUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.UserRequests = new UserRequests();
    }

    resetPassword = () => {
        this.UserRequests.passwordReset(this.state.email)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert(
                        `Successfully sent temporary password to ${this.state.email}`,
                        'success'
                    );
                    this.setState({ email: '' });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to reset password at this time', 'danger');
            });
    };
}

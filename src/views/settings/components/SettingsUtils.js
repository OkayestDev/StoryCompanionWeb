import StoryCompanion from '../../../utils/StoryCompanion';
import SettingsRequest from '../../../utils/SettingsRequests.js';

export default class SettingsUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.SettingsRequest = new SettingsRequest();
    }

    sendBug = () => {
        let paramsObject = {
            user: this.props.userId,
            description: this.state.message,
        };
        this.SettingsRequests.bug(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert('Successfully sent bug. Thank you!', 'success');
                    this.setState({
                        message: '',
                        isEmailModalOpen: false,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to submit bug at this time', 'danger');
            });
    };

    sendFeatureRequest = () => {
        let paramsObject = {
            user: this.props.userId,
            description: this.state.message,
        };
        this.SettingsRequests.feature(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert(
                        'Successfully sent feature request. Thank you!',
                        'success'
                    );
                    this.setState({
                        message: '',
                        isEmailModalOpen: false,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to submit feature at this time', 'danger');
            });
    };

    logout = () => {
        this.props.logout();
        this.props.history.push('/login');
    };
}

import PromptUtils from './components/PromptUtils.js';
import { connect } from 'react-redux';
import { showAlert } from '../../actions/Actions.js';
import { setStories } from '../../actions/StoryActions.js';
import Icon from 'react-icons-kit';
import EditEntityModal from '../../components/EditEntityModal.js';
import { plus, pencil, envelope } from 'react-icons-kit/fa';
import * as promptAction from '../../actions/PromptActions.js';
import '../../css/Prompt.css';

class Prompt extends PromptUtils {
    oneLineInputs = () => [
        {
            name: 'Prompt Name',
            value: this.props.name,
            onChange: this.props.handleNameChanged,
            type: 'default',
        },
    ];

    multiLineInputs = () => [
        {
            name: 'Description',
            value: this.props.description,
            onChange: this.props.handleDescriptionChanged,
        },
    ];
}

function mapStateToProps(state) {
    return {
        ...state.promptStore,
        userId: state.appStore.userId,
        apiKey: state.appStore.apiKey,
    };
}

const mapDispatchToProps = {
    ...promptActions,
    showAlert,
    setStories,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Prompt);

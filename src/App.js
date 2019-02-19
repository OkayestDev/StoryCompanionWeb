import { Component } from 'react';
import { connect } from 'react-redux';
import { showAlert } from './actions/Actions.js';

class App extends Component {
    componentDidMount() {
        if (this.props.userId !== null && this.props.apiKey !== null) {
            this.props.history.push('/chapters');
        } else {
            this.props.history.push('/home');
        }
    }

    // Required function of Component
    render() {
        return null;
    }
}

function mapStateToProps(state) {
    return {
        userId: state.appStore.userId,
        apiKey: state.appStore.apiKey,
    };
}

const mapDispatchToProps = {
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

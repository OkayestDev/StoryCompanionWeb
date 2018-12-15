import { Component } from 'react';
import { connect } from 'react-redux';
import { showAlert } from './store/Actions.js';

class App extends Component {
    componentWillMount() {
        if (this.props.userId !== null) {
            this.props.history.push('/chapters');
        } else {
            this.props.history.push('/login');
        }
    }

    // Required function of Component
    render() {
        return null;
    }
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
    };
}

const mapDispatchToProps = {
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

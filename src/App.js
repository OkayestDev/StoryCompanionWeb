import { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from './store/Actions.js';

class App extends Component {
    componentWillMount() {
        if (localStorage.getItem("AppStore") !== null) {
            this.props.history.push("/chapters");
        }
        else {
            this.props.history.push("/login");
        }
    }

    // Required function of Component
    render() { return null }
}

export default connect(Actions.mapStateToProps, Actions.mapDispatchToProps)(App);
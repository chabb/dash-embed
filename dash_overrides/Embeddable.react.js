/* global document:true */
import {connect} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import APIController from './APIController.react';
import DocumentTitle from './components/core/DocumentTitle.react';
import Loading from './components/core/Loading.react';
import Toolbar from './components/core/Toolbar.react';
import Reloader from './components/core/Reloader.react';
import {setHooks, setConfig} from './actions/index';
import {type} from 'ramda';
import initializeStore from "dash-renderer/dash-renderer/src/store";
import {Provider} from 'react-redux';

class UnconnectedAppContainer extends React.Component {
    constructor(props) {
        super(props);
        if (
            props.hooks.request_pre !== null ||
            props.hooks.request_post !== null
        ) {
            props.dispatch(setHooks(props.hooks));
        }
    }

    componentWillMount() {
        const {dispatch} = this.props;
        // if no configuration is passed, check if some configuration was generated by dash
        const config = this.props.dashConfig ? this.props.dashConfig : JSON.parse(
            document.getElementById('_dash_config').textContent
        );


        // preset common request params in the config
        config.fetch = {
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        dispatch(setConfig(config));
    }

    render() {
        const {config} = this.props;
        if (type(config) === 'Null') {
            return <div className="_dash-loading">Loading...</div>;
        }
        const {show_undo_redo} = config;
        return (
            <React.Fragment>
                {show_undo_redo ? <Toolbar /> : null}
                <APIController />
                <DocumentTitle />
                <Loading />
                <Reloader />
            </React.Fragment>
        );
    }
}

UnconnectedAppContainer.propTypes = {
    hooks: PropTypes.object,
    dispatch: PropTypes.func,
    config: PropTypes.object,
    dashConfig: PropTypes.object
};

const AppContainer = connect(
    state => ({
        history: state.history,
        config: state.config,
    }),
    dispatch => ({dispatch})
)(UnconnectedAppContainer);

const store = initializeStore();

const AppProvider = ({hooks, dashConfig}) => {
    return (
        <Provider store={store}>
            <AppContainer dashConfig={dashConfig} hooks={hooks} />
        </Provider>
    );
};

AppProvider.propTypes = {
    dashConfig: PropTypes.object, // the dash config that is originally in the script tag
    hooks: PropTypes.shape({
        request_pre: PropTypes.func,
        request_post: PropTypes.func,
    }),
};

AppProvider.defaultProps = {
    hooks: {
        request_pre: null,
        request_post: null,
    },
};

window.AppProvider = AppProvider;




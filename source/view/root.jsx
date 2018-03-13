import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { changeTheme, changeLoadingScreen, changeVideoPlayer, changeErrorScreen, changeIdleScreen } from './actions';
import { App } from './app';

const mapStateToProps = state => ({
    theme: state.theme,
    screens: state.screens,
});

const mapDispatchToProps = dispatch => ({
    dispatchThemeChange: (theme) => {
        dispatch(changeTheme(theme));
    },
    dispatchLoadingScreenChange: (newState) => {
        dispatch(changeLoadingScreen(newState));
    },
    dispatchVideoPlayerChange: (newState) => {
        dispatch(changeVideoPlayer(newState));
    },
    dispatchErrorScreenChange: (newState) => {
        dispatch(changeErrorScreen(newState));
    },
    dispatchIdleScreenChange: (newState) => {
        dispatch(changeIdleScreen(newState));
    },
});

const Root = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default hot(module)(Root);

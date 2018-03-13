import React from 'react';
import Loader from './components/Loader/index';
import IdleScreen from './components/IdleScreen/index';
import MeisterPlayer from './components/MeisterPlayer/index';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.toggleLoadingScreen = this.toggleLoadingScreen.bind(this);
        this.toggleVideoPlayer = this.toggleVideoPlayer.bind(this);
        this.toggleErrorScreen = this.toggleErrorScreen.bind(this);
        this.toggleIdleScreen = this.toggleIdleScreen.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
    }

    state = {
        counter: 0,
    }

    componentDidMount() {
        this.intervalId = setInterval(this.increment, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    increment = () => this.setState(state => ({
        counter: state.counter + 1,
    }))

    toggleTheme() {
        const newTheme = this.props.theme === 'light' ? 'dark' : 'light';
        this.props.dispatchThemeChange(newTheme);
    }

    toggleLoadingScreen() {
        const newState = !this.props.screens.loadingScreen;
        this.props.dispatchLoadingScreenChange(newState);
    }

    toggleVideoPlayer() {
        const newState = !this.props.screens.videoPlayer;
        this.props.dispatchVideoPlayerChange(newState);
    }

    toggleErrorScreen() {
        const newState = !this.props.screens.errorScreen;
        this.props.dispatchErrorScreenChange(newState);
    }

    toggleIdleScreen() {
        const newState = !this.props.screens.idleScreen;
        this.props.dispatchIdleScreenChange(newState);
    }

    render() {
        return (
            <div id="main" className={this.props.theme}>
                <h1>Chromecast V2</h1>

                <Loader />
                <IdleScreen />

                <button onClick={this.toggleLoadingScreen}>
                    Loading screen
                </button>

                <button onClick={this.toggleVideoPlayer}>
                    Video player
                </button>

                <button onClick={this.toggleErrorScreen}>
                    Error Screen
                </button>

                <button onClick={this.toggleIdleScreen}>
                    Idle Screen
                </button>

                <button onClick={this.toggleTheme}>
                    Change the Theme
                </button>

                <p>counter: {this.state.counter}</p>
+               <button onClick={this.increment}>increment</button>

                <MeisterPlayer />
            </div>
        );
    }
}

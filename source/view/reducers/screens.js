const initialState = {
    loadingScreen: false,
    videoPlayer: false,
    errorScreen: false,
    idleScreen: false,
};

class GlobalActions {
    constructor(state, action) {
        this.state = state;
        this.action = action;
    }

    changeLoadingScreen() {
        return {
            ...this.state,
            loadingScreen: this.action.loadingScreen,
        };
    }

    changeVideoPlayer() {
        return {
            ...this.state,
            videoPlayer: this.action.videoPlayer,
        };
    }

    changeErrorScreen() {
        return {
            ...this.state,
            errorScreen: this.action.errorScreen,
        };
    }

    changeIdleScreen() {
        return {
            ...this.state,
            idleScreen: this.action.idleScreen,
        };
    }
}

const screens = (state = initialState, action) => {
    const actions = new GlobalActions(state, action);

    switch (action.type) {
    case 'CHANGE_LOADING_SCREEN': return actions.changeLoadingScreen();
    case 'CHANGE_VIDEO_PLAYER': return actions.changeVideoPlayer();
    case 'CHANGE_ERROR_SCREEN': return actions.changeErrorScreen();
    case 'CHANGE_IDLE_SCREEN': return actions.changeIdleScreen();
    default: return state;
    }
};

export default screens;

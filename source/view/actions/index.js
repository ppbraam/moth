export const changeTheme = theme => ({
    type: 'CHANGE_THEME',
    theme,
});

export const changeLoadingScreen = loadingScreen => ({
    type: 'CHANGE_LOADING_SCREEN',
    loadingScreen,
});

export const changeVideoPlayer = videoPlayer => ({
    type: 'CHANGE_VIDEO_PLAYER',
    videoPlayer,
});

export const changeErrorScreen = errorScreen => ({
    type: 'CHANGE_ERROR_SCREEN',
    errorScreen,
});

export const changeIdleScreen = idleScreen => ({
    type: 'CHANGE_IDLE_SCREEN',
    idleScreen,
});

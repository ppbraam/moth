import React from 'react';
import { connect } from 'react-redux';
import classnames from '../../../core/utils/classnames';
import styles from './IdleScreen.scss';

// eslint-disable-next-line
class IdleScreen extends React.Component {
    state = {
        active: false,
    }

    componentWillReceiveProps(newProps) {
        let active = false;
        if (newProps.idleScreenActive && !newProps.loadingScreenActive) {
            active = true;
        }

        this.setState({
            active,
        });
    }

    render() {
        const classes = classnames(styles.IdleScreen, {
            [styles['IdleScreen--active']]: this.state.active,
        });

        return (
            <div className={classes}>
                IdleScreen
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        idleScreenActive: state.screens.idleScreen,
        loadingScreenActive: state.screens.loadingScreen,
    };
};

export default connect(
    mapStateToProps,
    null,
)(IdleScreen);

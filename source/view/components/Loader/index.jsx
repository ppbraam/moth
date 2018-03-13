import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from '../../../core/utils/classnames';
import styles from './Loader.scss';

// eslint-disable-next-line
class Loader extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
    }

    static defaultProps = {
        active: false,
    }

    render() {
        const classes = classnames(styles.Loader, {
            [styles['Loader--active']]: this.props.active,
        });

        return (
            <div className={classes}>
                Loading...
            </div>
        );
    }
}

const mapStateToProps = state => ({
    active: state.screens.loadingScreen,
});

export default connect(
    mapStateToProps,
    null,
)(Loader);

import React from 'react';
import Meister from '@meisterplayer/meisterplayer';
import BaseMedia from '@meisterplayer/plugin-basemedia';
import Html5Player from '@meisterplayer/plugin-html5player';
import StandardUi from '@meisterplayer/plugin-standardui';
import styles from './MeisterPlayer.scss';
import classnames from '../../../core/utils/classnames';

export default class MeisterPlayer extends React.Component {
    componentDidMount() {
        this.init();
    }

    // eslint-disable-next-line
    init() {
        // Initialize the meister player
        // Meister uses the querySelector to get the dom element.
        const meisterPlayer = new Meister('#player', {
            global: {
                autoplay: true,
            },
            // Configures Meister player to use these plugin.
            // Uses pluginName as object name to be future proof.
            [BaseMedia.pluginName]: {},
            [Html5Player.pluginName]: {},
            StandardUi: {
                timeToFade: 4, // Now it takes 4 seconds before the UI fades away
            },
        });

        // Configures meister to play the mp4 media item.
        meisterPlayer.setItem({
            src: 'https://www.w3schools.com/html/mov_bbb.mp4',
            type: 'mp4', // Tells meister we will play an mp4 item.
        });

        // Tells meister we are ready to load the player and start playing
        meisterPlayer.load();
    }

    render() {
        const classes = classnames(styles.meister);

        return (
            <div className={classes}>
                <div id="player" />
            </div>
        );
    }
}

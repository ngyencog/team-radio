import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import { withStyles } from 'material-ui/styles';
import withRouter from 'react-router-dom/withRouter';
import classNames from 'classnames';
import { StationSwitcher, NavBar, Footer, TabContainer } from 'Component';
import { joinStation, leaveStation } from 'Redux/api/currentStation/actions';
import {
  muteVideoRequest,
  savePlaylist,
  saveHistory,
} from 'Redux/page/station/actions';
import AddLink from './AddLink';
import Playlist from './Playlist';
import History from './History';
import NowPlaying from './NowPlaying';
import styles from './styles';
import StationSharing from './Sharing';

const STATION_NAME_DEFAULT = 'Station Name';

/* eslint-disable no-shadow */
class StationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: false,
      tabValue: 0,
      playlist: [],
      history: [],
    };

    this._onVolumeClick = this._onVolumeClick.bind(this);
    this._renderTabs = this._renderTabs.bind(this);
    this._handleTabChange = this._handleTabChange.bind(this);
  }

  componentWillMount() {
    // Get station id from react-router
    const {
      match: { params: { stationId } },
      history,
      userId,
      currentStation: { joined },
    } = this.props;
    // Station must be a valid string
    if (stationId) {
      if (
        // Only dispatch if NOT in joining state
        joined.loading === false &&
        joined.success === false
      ) {
        this.props.joinStation({ stationId, userId });
      }
    } else {
      history.replace('/');
    }
  }

  componentWillUnmount() {
    const { match: { params: { stationId } }, userId } = this.props;
    this.props.leaveStation({ stationId, userId });
  }

  componentWillReceiveProps(nextProps) {
    const {
      muteNowPlaying,
      currentStation: {
        playlist,
        // updatedPlaylist,
        // updatedHistory,
        // isUpdatePlaylist,
      },
    } = nextProps;
    this.setState({ muted: muteNowPlaying });
    console.log('props: ', this.props.currentStation.playlist.length);
    console.log('next: ', playlist.length);
    if (this.props.currentStation.playlist.length !== playlist.length) {
      this.setState({
        playlist: playlist.filter(item => item.is_played === false),
        history: playlist.filter(item => item.is_played === true),
      });
    }
    // if (isUpdatePlaylist) {
    //   console.log('is update playlist');
    //   this.setState({ playlist: updatedPlaylist, history: updatedHistory });
    // } else {
    //   console.log('join station');

    //   this.setState({
    //     playlist: playlist.filter(item => item.is_played === false),
    //     history: playlist.filter(item => item.is_played === true),
    //   });
    // }
  }

  componentDidMount() {
    const { muteVideoRequest } = this.props;

    // Handle volume after the page is reloaded
    const volumeStatus = JSON.parse(localStorage.getItem('volumeStatus')) || {};
    muteVideoRequest({
      muteNowPlaying: volumeStatus.muteNowPlaying,
      mutePreview: volumeStatus.mutePreview,
      userDid: volumeStatus.userDid,
    });
  }

  _onVolumeClick() {
    const { muteVideoRequest, muteNowPlaying } = this.props;
    muteVideoRequest({
      muteNowPlaying: !muteNowPlaying,
      userDid: true,
    });
  }

  _handleTabChange(e, value) {
    this.setState({ tabValue: value });
  }

  _renderTabs() {
    const {
      classes,
      // currentStation: {
      //   playlist,
      //   updatedPlaylist,
      //   updatedHistory,
      //   isUpdatePlaylist,
      // },
    } = this.props;
    const { tabValue, playlist, history } = this.state;

    return [
      <Tabs
        key={1}
        fullWidth
        value={tabValue}
        onChange={this._handleTabChange}
        indicatorColor="primary"
      >
        <Tab
          classes={{
            label: classes.tabLabel,
          }}
          label={`Playlist (${
            // !isUpdatePlaylist
            // ? playlist.filter(item => item.is_played === false).length
            // : updatedPlaylist.length
            playlist.length
          })`}
        />
        <Tab
          classes={{
            label: classes.tabLabel,
          }}
          label="History"
        />
      </Tabs>,
      tabValue === 0 && (
        <TabContainer key={2}>
          <Playlist
            className={classNames(classes.content, {
              [classes.emptyPlaylist]: !playlist,
            })}
            playlist={
              // !isUpdatePlaylist
              // ? playlist.filter(item => item.is_played === false)
              // : updatedPlaylist
              playlist
            }
          />
        </TabContainer>
      ),
      tabValue === 1 && (
        <TabContainer key={3}>
          <History
            className={classNames(classes.content, {
              [classes.emptyPlaylist]: !history,
            })}
            history={
              // !isUpdatePlaylist
              //   ? playlist.filter(item => item.is_played === true)
              //   : updatedHistory
              history
            }
          />
        </TabContainer>
      ),
    ];
  }

  render() {
    const {
      classes,
      currentStation: { station, nowPlaying, playlist },
    } = this.props;
    const { muted } = this.state;

    return [
      <NavBar key={1} color="primary" />,
      <Grid
        key={2}
        direction="row"
        container
        className={classes.containerWrapper}
      >
        <Grid item xs={12} className={classes.switcherContainer}>
          <div className={classes.switcherContent}>
            <StationSwitcher />
          </div>
        </Grid>
        <Grid item xs={12} className={classes.container}>
          <Grid container>
            <Grid item xs={12} md={7} xl={8}>
              <Grid container>
                <Grid item xs={12} className={classes.nowPlayingHeader}>
                  <Typography type={'display1'}>
                    {(station && station.station_name) || STATION_NAME_DEFAULT}
                  </Typography>
                  <div className={classes.nowPlayingActions}>
                    {!nowPlaying.url ? null : (
                      <IconButton
                        onClick={this._onVolumeClick}
                        className={classNames({
                          [classes.volume]: nowPlaying.url !== '',
                        })}
                        color="default"
                      >
                        {muted ? 'volume_off' : 'volume_up'}
                      </IconButton>
                    )}
                    <StationSharing />
                  </div>
                </Grid>
                <NowPlaying
                  className={classNames([classes.content, classes.nowPlaying], {
                    [classes.emptyNowPlaying]: !playlist,
                  })}
                  autoPlay={true}
                  muted={muted}
                  nowPlaying={nowPlaying}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={5} xl={4}>
              {this._renderTabs()}
            </Grid>
            <Grid item xs={12}>
              <AddLink />
            </Grid>
          </Grid>
        </Grid>
      </Grid>,
      <Footer key={3} />,
    ];
  }
}

StationPage.propTypes = {
  classes: PropTypes.any,
  joinStation: PropTypes.func,
  leaveStation: PropTypes.func,
  match: PropTypes.any,
  history: PropTypes.any,
  currentStation: PropTypes.any,
  userId: PropTypes.string,
  muteVideoRequest: PropTypes.func,
  muteNowPlaying: PropTypes.bool,
  mutedPreview: PropTypes.bool,
  preview: PropTypes.object,
  savePlaylist: PropTypes.func,
  saveHistory: PropTypes.func,
};

const mapStateToProps = ({ api, page }) => ({
  currentStation: api.currentStation,
  muteNowPlaying: page.station.muteNowPlaying,
  mutedPreview: page.station.mutedPreview,
  preview: page.station.preview,
  userId: api.user.data.userId,
});

const mapDispatchToProps = dispatch => ({
  joinStation: stationId => dispatch(joinStation(stationId)),
  leaveStation: option => dispatch(leaveStation(option)),
  muteVideoRequest: ({ muteNowPlaying, mutePreview, userDid }) =>
    dispatch(muteVideoRequest({ muteNowPlaying, mutePreview, userDid })),
  savePlaylist: playlist => dispatch(savePlaylist(playlist)),
  saveHistory: history => dispatch(saveHistory(history)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(StationPage);

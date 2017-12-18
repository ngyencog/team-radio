import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Player from './Player';
import Playlist from './Playlist';
import AddLink from './AddLink';

// https://www.youtube.com/embed/JGYjKR69M6U?list=PLdlDU6Mx7qmgXsWG3gqXxfrykdaITNeEi&amp;ecver=1
class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      playing: {
        videoId: '7wtfhZwyrcc',
      },
      inputUrl: '',
      itemList: [
        {
          videoId: '645OkDIkKvg',
          title: 'Title',
          singers: 'Singer',
        },
        {
          videoId: 'DDWKuo3gXMQ',
          title: 'Title',
          singers: 'Singer',
        },
        {
          videoId: 'GsPq9mzFNGY',
          title: 'Title',
          singers: 'Singer',
        },
        {
          videoId: '_kBnFgLP8po',
          title: 'Title',
          singers: 'Singer',
        },
        {
          videoId: '645OkDIkKvg',
          title: 'Title',
          singers: 'Singer',
        },
        {
          videoId: 'DDWKuo3gXMQ',
          title: 'Title',
          singers: 'Singer',
        },
        {
          videoId: 'GsPq9mzFNGY',
          title: 'Title',
          singers: 'Singer',
        },
        {
          videoId: '_kBnFgLP8po',
          title: 'Title',
          singers: 'Singer',
        },
      ],
    };

    setInterval(() => {
      if (this.state.itemList.length !== 0) {
        this.updateList();
      }
    }, 10000);
  }

  addLink(e) {
    // let newItemList = this.state.itemList;
    // newItemList.shift();
    const newItem = {
      videoId: this.getId(this.state.inputUrl),
      title: 'new title',
      singers: 'new singer',
    };
    this.setState((prevState, props) => ({
      inputUrl: '',
      itemList: [...prevState.itemList, newItem],
    }));
  }

  updateInputUrl(e) {
    this.setState({
      inputUrl: e.target.value,
    });
  }

  updateList() {
    const newItemList = this.state.itemList;
    const playing = newItemList.shift();
    this.setState((prevState, props) => ({
      playing,
      itemList: newItemList,
    }));
  }

  static getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    }
    return 'error';
  }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={1} />{' '}
          <Grid item xs={6}>
            <Player
              videoId={this.state.playing.videoId}
              startTime={this.state.startTime}
            />{' '}
          </Grid>{' '}
          <Grid item xs={5}>
            {' '}
            {/* <Playlist itemList={this.state.itemList}/> */}{' '}
          </Grid>{' '}
          <Grid item xs={1} />{' '}
          <Grid item xs={10}>
            <AddLink
              inputUrl={this.state.inputUrl}
              addLink={this.addLink.bind(this)}
              updateInputUrl={this.updateInputUrl.bind(this)}
            />{' '}
          </Grid>{' '}
          <Grid item xs={1} /> <Grid item xs={1} />{' '}
          <Grid item xs={10}>
            <Playlist itemList={this.state.itemList} />{' '}
          </Grid>{' '}
        </Grid>{' '}
      </div>
    );
  }
}

export default Station;

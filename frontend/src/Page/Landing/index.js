import React from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import './style.css';
import fixture from '../../Fixture/landing';
import Images from '../../Theme/Images';
import StationSwitcher from '../../Component/StationSwitcher';
import NavBar from '../../Component/NavBar';

const Backdrop = () => (
  <Grid className="backdrop_container" container>
    <Grid className="backdrop_foreground">
      <Grid className="something" item xs>
        <h3 className="backdrop_slogan">{fixture.slogan}</h3>
        <Grid>
          <TextField
            label="Name your station"
            placeholder="Name your station"
            margin="normal"
          />
          <Button raised color="primary">
            CREATE
          </Button>
        </Grid>
      </Grid>
      <img
        src="https://avante.biz/wp-content/uploads/Music-Wallpaper/Music-Wallpaper-001.jpg"
        alt="Team Radio - Cover"
      />
    </Grid>
  </Grid>
);

const PopularStations = () => {
  const stations = [];
  fixture.stations.map((station, index) =>
    stations.push(
      <Grid key={index} className="station_item" item>
        <img
          src={station.avatar}
          alt=""
          className="stations_secondary_avatar"
        />
        <h1 className="station-text--title">{station.name}</h1>
        <span className="subtitle">{station.describe}</span>
      </Grid>,
    ),
  );

  const mainStation = fixture.stations[0];
  return (
    <Grid className="stations_container" container>
      <Grid className="stations_wrapper" item xs={12}>
        <Grid className="stations_primary" item xs>
          <img src={mainStation.avatar} alt="" width="200" height="200" />
          <h1 className="station-text--title">{mainStation.name}</h1>
          <span className="subtitle">{mainStation.describe}</span>
        </Grid>
        <Grid className="stations_secondary" item xs>
          <StationSwitcher stationList={fixture.stations} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const Section = () => (
  <Grid className="section_container" container>
    <Grid className="section_foreground" item xs={12}>
      <Grid className="section_description" item xs>
        <h3 className="section_slogan">Where music happens</h3>
        <span className="section_smalltext subtitle">
          When you needs to share music and your whole team can hear it!
        </span>
        <span className="section_content">
          {`Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.`}
        </span>
      </Grid>
      <Grid item xs>
        <img
          src={Images.drummer}
          alt="Team Radio"
          className="section_largeIcon"
        />
      </Grid>
    </Grid>
  </Grid>
);

const Footer = () => <Grid className="footer_foreground" container />;

const LandingPage = () => (
  <Grid container>
    <NavBar />
    <Backdrop />
    <PopularStations />
    <Section />
    <Footer />
  </Grid>
);

export default LandingPage;

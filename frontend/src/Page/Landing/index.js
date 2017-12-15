import React from 'react';

import './style.css';
import fixture from '../../Fixture/landing';
import Images from '../../Theme/Images';

const NavBar = () => (
  <div className="navbar_container">
    <div className="wrapper">
      <div className="logo">
        <img src={fixture.logo} alt="Team Radio" height="50px" />
        <h1 className="navbar_text logoName">{fixture.name}</h1>
      </div>
      <ul className="navigation">
        <li className="navbar_text">HOME</li>
        <li className="navbar_text">STATIONS</li>
        <li className="navbar_text">LOGIN</li>
      </ul>
    </div>
  </div>
);

const Backdrop = () => (
  <div className="backdrop_container">
    <div className="backdrop_wrapper">
      <div className="backdrop_foreground">
        <div className="something">
          <h3 className="backdrop_slogan">{fixture.slogan}</h3>
        </div>
        <img
          src="https://avante.biz/wp-content/uploads/Music-Wallpaper/Music-Wallpaper-001.jpg"
          alt="Team Radio - Cover"
          height="900"
          width="100%"
        />
      </div>
    </div>
  </div>
);

const PopularStations = () => {
  const stations = [];
  fixture.stations.map((station, index) =>
    stations.push(
      <div key={index} className="station_item">
        <img
          src={station.avatar}
          alt=""
          className="stations_secondary_avatar"
        />
        <h1 className="station-text--title">{station.name}</h1>
        <span className="subtitle">{station.describe}</span>
      </div>,
    ),
  );

  const mainStation = fixture.stations[0];
  return (
    <div className="stations_container">
      <div className="stations_wrapper">
        <div className="stations_primary">
          <img src={mainStation.avatar} alt="" width="200" height="200" />
          <h1 className="station-text--title">{mainStation.name}</h1>
          <span className="subtitle">{mainStation.describe}</span>
        </div>
        <div className="stations_secondary">{stations}</div>
      </div>
    </div>
  );
};

const Section = () => (
  <div className="section_container">
    <div className="section_wrapper">
      <div className="section_foreground">
        <div className="section_description">
          <h3 className="section_slogan">Where music happens</h3>
          <span className="section_smalltext subtitle">
            When you needs to share music and your whole team can hear it!
          </span>
          <span className="section_content">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.{' '}
          </span>
        </div>
        <img
          src={Images.drummer}
          alt="Team Radio"
          className="section_largeIcon"
        />
      </div>
    </div>
  </div>
);

const Footer = () => <div className="footer_foreground" />;

const LandingPage = () => (
  <div>
    <NavBar />
    <Backdrop />
    <PopularStations />
    <Section />
    <Footer />
  </div>
);

export default LandingPage;
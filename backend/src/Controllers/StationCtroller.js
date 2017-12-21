/* eslint-disable */

var mongoose = require('mongoose');
var stationController = {};
var ResponeModel = require('./../Models/ResponeModel').default;
var Station = require('./../Models/Station');
var Song = require('./SongController');
// create a station
stationController.addStation = function(req, res) {
  var station = req.body;

  console.log(station);
  var stationName = station.stationName;
   if(station.stationName = '')
   {
     var error={
       name : 'The name is empty'
     }
    var response = new ResponeModel(false, null,error);
    res.json(response.get());
    res.status(422)
   }
   else{
  //check available of station
    Station.getStationByName(stationName, function(err, mess) {
      if (err) throw err;

      //  console.log(station);
      if (mess == null) {
        // create station
          Station.addStation(station, function(err, stationCallBack) {
          if (err) throw err;
          var response = new ResponeModel(true, stationCallBack, null);
          console.log(stationCallBack);
          res.json(response.get());
        
        });
      } else {
        var error = {
          name: 'The station name available !',
        };
        var response = new ResponeModel(false, null, error);
        res.json(response.get());
        res.status(400);
      }
    });
  }
};

// get a station by name
stationController.getStationByName = function(req, res) {
  var stationName = req.params.stationName;
  Station.getStationByName(stationName, function(err, station) {
    if (err) {
      throw err;
      res.status(400);
    }
    if (station == null) {
      console.log('err : ' + err);
     var error = {
       name : 'Can not find station name.'
     }
      var response = new ResponeModel(false, null, error);
      res.json(response.get());
      res.status(404);
    } else {
      var response = new ResponeModel(true, station, null);
      res.json(response.get());
    }
  });
};
// get list station but can limit if need
stationController.getStations = function(req, res) {
  Station.getStations(function(err, stations) {
    if (err) {
      throw err;
      var response = new ResponeModel(false, null, err);
      res.json(response.get());
      res.status(400);
    } else {
      var response = new ResponeModel(true, stations, null);
      res.json(response.get());
    }
  });
};
/*
// get play list 
stationController.getListVideo.
// add the information the video in db
stationController.addVideo = async function(req,res)
{
    var stationName = req.params.stationName;
    var video = req.body;
    // check url has empty
   if(video.url =='')
    {
      var error = {
        url : 'The url is emply !'
      }
      var response = new ResponeModel(false, null, error);
      res.json(response.get());
    }
    else{
      var result = await Song.addNewSong(video.url);
      // if Song module can not add in collection
      if(result == null)
      {
        var error = {
          name : 'Can not add video in station !'
        }
        var response = new ResponeModel(false, null, error);
        res.json(response.get());
      }
      else{
        // check id of song has playlist
        if()
        {

        }
        else{
          var videoToAddPlayList = {
            songId : video._id
          } 
          Station.addVideo(stationName,videoToAddPlayList,function(err,mess){
            if(err) throw err;
            else res.json(mess);
  
        })
        }
     
      }
     
    }
  
    
}
*/
// add new song at station

module.exports = stationController;

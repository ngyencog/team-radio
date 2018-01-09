export const countOnlineUserOfAllStations = async (stations, io) =>
  Promise.all(
    stations.map(async station => {
      const count = await countOnlineUserOfStation(station.station_id, io);
      return {
        station_id: station.station_id,
        online_count: count,
      };
    }),
  );

export const countOnlineUserOfStation = async (stationId, io) =>
  new Promise(resolve => {
    io
      .of('/')
      .in(stationId)
      .clients((error, clients) => {
        if (error) return resolve(0);
        return resolve(clients.length);
      });
  });
const state = {
  mapOptions: {
    center: {
      lat: -20.455662,
      lng: -54.592933,
    },
    bounds: null,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  zoomSet: {
    zoom: 14,
    minZoom: 13,
    maxZoom: 16,
    options: {
      zoomSnap: 0.5,
      zoomControl: false,
    },
  },
};

export default state;

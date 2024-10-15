'use strict';
import {
  openRouteServiceProfiles,
  elevation_options,
  suggestActionToMarker,
} from './constantIndex.js';
var map = null,
  marker = null,
  followMarker = null,
  geometryObject = null,
  controlElevationList = [];
const ROUTE_WRAPPER = document.getElementById('routeWrapper');
const MY_MODAL = document.getElementById('myModal');
const ROUTE_DETAILS_SUBTITLE = document.getElementById(
  'routeDetailsSubtitleTitle'
);
const MAP = document.getElementById('map');
const LOADER = document.getElementById('loader2');
const getRouteHandler = document.getElementById('getRoute');
const plotHandler = document.getElementById('plot');
const displayCustomRouteHandler = document.getElementById('displayCustomRoute');
// const eraseExistingRouteHandler = document.getElementById('eraseExistingRoute');
const eraseExistingRouteHandler = document.getElementById('eraseRoute');
document.addEventListener('DOMContentLoaded', () => {
  // window.addEventListener('resize', function () {
  //   map.invalidateSize();
  // });

  if (getRouteHandler) {
    getRouteHandler.addEventListener('click', displayRoute);
  }
  if (plotHandler) {
    plotHandler.addEventListener('click', getElevationData);
  }
  if (displayCustomRouteHandler) {
    // displayCustomRouteHandler.addEventListener('click', displayCustomRoute);
    displayCustomRouteHandler.addEventListener(
      'click',
      displayMultipleRoute
      // () => {
      // displayMultipleRoute.then(()=>{}).catch(() => {});
      // }
    );
  }
  if (eraseExistingRouteHandler) {
    eraseExistingRouteHandler.addEventListener('click', eraseHandler);
  }
  // FIXME: overlay-event-handler to be removed..
  // document
  //   .getElementsByClassName('driver-overlay')[0]
  //   .addEventListener('click', () => {
  //     console.log('overlay :>> ');
  //   });
});
const CUSTOM_ROUTE_TBL = document.getElementById('customRouteTBL');
function hideMyModal() {
  MY_MODAL.style = `display:none`;
}
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject('Geolocation is not supported by this browser.');
    }
  });
}
var rotatePane;
// Use the promise to get the current position
getCurrentPosition()
  .then((position) => {
    intilizeMap(position);
  })
  .catch((error) => {
    console.error('Geolocation error:', error);
    // Fallback to a default initial position if geolocation is not available
  
    const data = {
      coords: {
        latitude: 28.4196864, longitude: 
        77.5487488
      }
    }
    intilizeMap(data)
    // Create the map with the default initial position
    // map = L.map('map').setView([initialLat, initialLng], 13);
    // // Add OpenStreetMap tiles to the map
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // }).addTo(map);
  });


function intilizeMap(position) {

  var initialLat = position.coords.latitude;
  var initialLng = position.coords.longitude;
  // Create the map after obtaining the coordinates
  // map = L.map('map').setView([initialLat, initialLng], 8, {
  //   // animate: true,
  //   // duration: 1, // in seconds
  // });
  // map = new L.Map('map', {
  //   mapTypeId: 'topo', // 'street','terrain','satellite'
  //   center: [initialLat, initialLng],
  //   zoom: 7,
  // });
  map = L.map('map').setView([initialLat, initialLng], 9);

  // MAPTILER
  // L.tileLayer(
  //   'https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=QaHh0ZLIE8qRom1dYRWb',
  //   {
  //     attribution:
  //       '&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors',
  //     maxZoom: 18,
  //   }
  // ).addTo(map);

  // MAPBOX
  // L.tileLayer(
  //   `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFodWw5OCIsImEiOiJjbHdweXQ4MW0ydWtqMnFwZjlqNnFjdXdmIn0.KNtlyTnG4CSSMe-YbWo5Hg`,
  //   {
  //     maxZoom: 18,
  //     tileSize: 512,
  //     zoomOffset: -1,
  //     attribution: '© Mapbox © OpenStreetMap',
  //   }
  // ).addTo(map);

  // L.tileLayer(
  //   'http://{s}.tiles.mapbox.com/v3/rbeers.j1mhej3b/{z}/{x}/{y}.png',
  //   {
  //     attribution:
  //       '&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors',
  //     maxZoom: 18,
  //   }
  // ).addTo(map);

  // ESRI-TOPO
  // L.esri.basemapLayer('Topographic').addTo(map);
  L.tileLayer(
    'https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: 'USGS, NOAA',
      attributionUrl: 'https://static.arcgis.com/attribution/World_Topo_Map',
      maxZoom: 16,
      minZoom: 1,
      subdomains: ['server', 'services'],
    }
  ).addTo(map);

  // url="http://{s}.tiles.mapbox.com/v3/rbeers.j1mhej3b/{z}/{x}/{y}.png" noWrap>
  // Map source: <a href="http://www.mapbox.com/about/maps/">Terms &amp; Feedback</a>

  //STAMEN
  // L.tileLayer(
  //   'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png',
  //   {
  //     maxZoom: 18,
  //     attribution:
  //       'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
  //   }
  // ).addTo(map);

  // Terrain
  // L.tileLayer('https://{s}.tile.stamen.com/toner/{z}/{x}/{y}.jpg', {
  //   attribution: '&copy; OpenStreetMap contributors & Stamen Design',
  // }).addTo(map);

  // Define a custom marker icon with an elevation symbol
  var customMarker = L.icon({
    iconUrl: './dist/images/marker.png',
    iconSize: [25, 35], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
  });

  // Create a marker with the custom icon and add it to the map
  marker = L.marker([initialLat, initialLng], {
    icon: customMarker,
    draggable: true,
    //   zIndexOffset: 200,
  }).addTo(map);
  marker.id = `id`;
  // Bind the dragend event to the marker
  marker.on('dragend', (event) => onMarkerDragEnd(event, map, marker));

  // Reposition the modal on zoom or move
  map.on('zoom', (e) => {
    console.log('e :>> zoom move', e);
  });

  // Event listener for when a marker is dropped
  map.on('contextmenu', (e) => markerRelocation(e));
  // displayRoute(L);

  // Add right-click event listener to the marker
  marker.on('click', function (e) {
    // console.log(e.latlng); // Log the latitude and longitude of the click
    pinConvertOnMarkerClick({ ...e.latlng, map, marker });
  });
  map.on('baselayerchange', (event) => {
    console.log('baselayer :>> ', event);
  });
  /** MAP ROTATION LOGIC... */
}


//   Function to handle marker dragend event
function onMarkerDragEnd(event, map, marker, convertMarker) {
  console.log('marker :>> 136', marker);
  var markerDragged = event.target; // Get the marker that was dragged
  var position = markerDragged.getLatLng(); // Get the marker's new position
  // console.log('Marker new position:', position); // Log the new position to the console

  let url = `https://api.openrouteservice.org/elevation/point?api_key=${api_key}&geometry=${position.lng},${position.lat}`;
  fetch(
    url
    // `https://api.open-elevation.com/api/v1/lookup?locations=${position.lat},${position.lng}`
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      // convertToPinMarker(position, map, marker, data.results[0].elevation);
      convertToPinMarker(
        position,
        map,
        marker,
        data.geometry.coordinates[2],
        convertMarker
      );
    })
    .catch((err) => {
      console.log('err :>> ', err);
    });
}
var pinedArray = [],
  plotCoords = [],
  coordinates = [],
  pinnedMarkers = [];
function convertToPinMarker(pos, map, marker, elevation, convertMarker = true) {
  console.log('marker.options :>> ', marker.options);
  var customIcon = L.icon({
    iconUrl: './dist/images/pin-png-39468.png',
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
  });

  // // Create a pin marker at the same coordinates
  let pseudoMarker = L.marker([pos.lat, pos.lng], {
    draggable: true,
    zIndexOffset: 198,
    icon: customIcon,
    //  title: `lat: ${pos.lat}, lng: ${pos.lng}, elevation: ${elevation}`,
  }).addTo(map);
  let index = null;
  if (convertMarker) {
    index = pinedArray.length;
    pseudoMarker.id = index;
    pinedArray.push({
      lat: pos.lat,
      lng: pos.lng,
      elevation: elevation,
      index,
    });
    plotCoords.push([
      pos.lat,
      pos.lng,
      // Number(pos.lat).toFixed(6),
      // Number(pos.lng).toFixed(6),
      index,
    ]);
    coordinates.push([pos.lat, pos.lng, elevation, index]);
    pinnedMarkers.push(pseudoMarker);
  } else {
    index = marker.id;
    marker.remove();
    pseudoMarker.id = index;
    pinnedMarkers[index] = pseudoMarker;
    plotCoords[index] = [
      pos.lat,
      pos.lng,
      // Number(pos.lat).toFixed(6),
      // Number(pos.lng).toFixed(6),
      index,
    ];
    coordinates[index] = [pos.lat, pos.lng, elevation, index];
    console.log('object :>> ', `update the pinnedMarkers,`, pos, elevation);
  }
  pseudoMarker.on('mouseover', (event) => {
    console.log('mouseover-event :>> ', event);
    const { latlng, layerPoint, containerPoint } = event;
    DisplayModalNearMarker({
      latlng,
      containerPoint,
      removePinnedMarker: true,
      elevation,
      pinnedMarkerId: index,
    });
  });
  pseudoMarker.on('mouseout', (e) => {
    // console.log('e :>>mouseout ', e);
    // hideMyModal();
    // Set a small timeout to allow mouse to move to modal
    setTimeout(() => {
      if (!MY_MODAL.matches(':hover')) {
        hideMyModal();
      }
    }, 100);
  });
  pseudoMarker.on('dragend', (event) =>
    onMarkerDragEnd(event, map, pseudoMarker, false)
  );
  // remove the modal from the attached marker
  hideMyModal();
  // // Remove draggable marker from the map

  marker.off('contextmenu');
  // map.removeLayer(marker);

  // marker = null;
  console.log('pinnedMarkers :>> LIST', pinnedMarkers);
  // drawPolylineOLD();
  // displayRoute();
  // // Reset draggable marker to null
}
function updateMarkerOnRemove(id) {
  console.log('hitttt :>> ', id);

  pinnedMarkers.forEach((currentMarker) => {
    console.log('currentMarker :>> ', currentMarker);
    if (currentMarker.id === id) {
      currentMarker.remove();
    }
  });
  pinnedMarkers.splice(id, 1);
  coordinates.splice(id, 1);
  plotCoords.splice(id, 1);
  hideMyModal();
  console.log('polylines :>> ', polylines);
}
var circleMarkerLineList = [];
function drawPolylineOLD(coordsList) {
  console.log(' plotCoords :>> ', coordsList);
  console.log(' pinedArray :>> ', pinedArray);
  if (!coordsList.length) {
    alert('Marked the location');
    return;
  }
  // Assuming `coordinates` is an array of [latitude, longitude] pairs

  // Define colors for different segments of the track
  var colors = ['red', 'green', 'blue'];

  // Create polylines for each segment of the track with different colors
  for (var i = 0; i < coordsList.length - 1; i++) {
    var startPoint = coordsList[i];
    var endPoint = coordsList[i + 1];
    var color = colors[i % colors.length]; // Cycle through colors if there are more segments than colors
    let dist = map.distance(startPoint, endPoint);
    console.log('dist :>> ', dist);
    let newLine = L.polyline([startPoint, endPoint], {
      weight: 3,
      color: 'black',
    }).addTo(map);
    console.log('newLine :>> 213', newLine);
    // Directly ensure the polyline has an ID and add text
    var path = newLine._path;
    newLine.index = circleMarkerList.length;
    circleMarkerLineList.push(newLine);
    path.id = `path-${Date.now()}`;

    addTextToPolyline(newLine, `${metersTOKilometers(dist)}`);
  }
}

function markerRelocation(e) {
  if (e.button === 0) {
  }
  // check the markedPin existing on map
  const isExistingMarker = pinedArray.indexOf((coords) => {
    return coords.lat === e.latlng.lat && coords.lng === e.latlng.lng;
  });

  if (!marker) {
    // create a new marker as its converted to a pin
    console.log('e :>> NEW ', e);
    // Create a draggable marker at the clicked position
    marker = L.marker([e.lat, e.lng], { draggable: true }).addTo(map);

    // Event listener for when marker dragging ends
    marker.on('dragend', convertToPinMarker);
  } else {
    console.log('position :>>EXISTING ', e);

    // set the new positions -- of draggable marker to the clicked position
    marker.setLatLng([e.latlng.lat, e.latlng.lng]);
  }
  // display custom modal near the marker ...
  const { latlng, layerPoint, containerPoint } = e;
  DisplayModalNearMarker({ latlng, containerPoint });
}
function DisplayModalNearMarker({
  latlng,
  containerPoint,
  remove = false,
  removePinnedMarker = false,
  elevation = false,
  pinnedMarkerId = null,
  removeCircleId = null,
  removeCircleType = null,
}) {
  console.log('latlng, :>> ', latlng, ':::containerPoint', containerPoint);
  MY_MODAL.style = `display:flex;top:${containerPoint.y}px;left:${containerPoint.x}px`;

  let node = `<div class="close"><span>&times;</span></div>`;
  let arrayContainer = {};
  console.log('sourceCircleMarker :>> ', sourceCircleMarker);
  if (removePinnedMarker) {
    arrayContainer = suggestActionToMarker['removePinnedMarker'];
  } else if (remove) {
    arrayContainer = suggestActionToMarker['remove'];
  } else if (circleMarkerList.length == 0) {
    arrayContainer = suggestActionToMarker['source'];
  } else if (circleMarkerList.length == 1) {
    arrayContainer = suggestActionToMarker['destination'];
    // if sourceCircleMarker is present then key is destination marker..
  } else if (circleMarkerList.length > 1) {
    // for the intermediate .. markers
    console.log('intermediate :>> ');
    arrayContainer = suggestActionToMarker['intermediate'];
  }

  Array.from(arrayContainer.arr).forEach((item, index) => {
    let content = '';
    if (index === 0) {
      content = `${Number(latlng.lat).toFixed(5)}, ${Number(latlng.lng).toFixed(
        5
      )}`;
    } else {
      if (index === 1 && elevation) {
        content = item + `: ${elevation} m`;
      } else {
        content = item;
      }
    }
    node += `<div class='marker-action' key=${arrayContainer.key}_${index}>
    ${content}
        </div>`;
  });
  let wrapperNode = document.createElement('div'); // node
  wrapperNode.classList.add(`modal-wrapper-${arrayContainer.key}`); // overall node class
  wrapperNode.innerHTML = node; // overall node
  // wrapperNode.append(node);
  MY_MODAL.innerHTML = ``;
  MY_MODAL.appendChild(wrapperNode);

  document.getElementsByClassName('close')[0].addEventListener('click', () => {
    hideMyModal();
  });
  let targetParentNode = document.getElementsByClassName(
    `modal-wrapper-${arrayContainer.key}`
  )[0];
  console.log(
    'targetParentNode :>> ',
    targetParentNode.getElementsByClassName('marker-action')
  );
  const htmlCollection =
    targetParentNode.getElementsByClassName('marker-action');
  Array.from(htmlCollection).forEach((currHtml, key) => {
    currHtml.addEventListener('click', () => {
      let targetDivKey = currHtml.getAttribute('key').split('_')[1];
      if (targetDivKey == 0) {
        // eat 5 star..
      } else if (targetDivKey == 2 && removePinnedMarker) {
        updateMarkerOnRemove(pinnedMarkerId);
      } else if (targetDivKey == 1 && remove) {
        // remove marker action on circleMarker
        console.log('remove :>> ', 302);
        removeCircleMarker(latlng, removeCircleType, removeCircleId);
      } else if (targetDivKey == 1) {
        // pin marker action
        console.log('pin :>> ', 302);
        pinConvertOnMarkerClick({ ...latlng, map, marker });
      } else if (targetDivKey == 4) {
        // TODO: create a new marker
        const action = remove ? 'remove' : 'add';
        addCircleMark(latlng, arrayContainer.key, action);
      }
    });
  });
}
var routingControl;
function displayRoute() {
  if (plotCoords.length < 2) {
    alert('Please select at least two coordinates');
  }
  // plotCoords.forEach((point) => {
  console.log('plotCoords :>> ', plotCoords);
  for (let i = 0; i < plotCoords.length - 1; i++) {
    let source = plotCoords[i];
    let dest = plotCoords[i + 1];
    routingControl = L.Routing.control({
      waypoints: [
        L.latLng(source[0], source[1]), // Starting point coordinates
        L.latLng(dest[0], dest[1]), // Destination point coordinates
      ],
      routeWhileDragging: false,
      createMarker: function () {
        return null;
      }, // Hides the markers
    }).addTo(map);
  }

  // });
}

window.onload = () => {
  // fetch('./20240513070134-64110-data.gpx')
  //   .then((res) => res.text())
  //   .then((data) => {
  //     var gpx = new L.GPX(data, { async: true }); // Parse GPX data
  //     gpx
  //       .on('loaded', function (e) {
  //         map.fitBounds(e.target.getBounds()); // Fit map to GPX track bounds
  //       })
  //       .addTo(map); // Add GPX layer to map
  //   })
  //   .catch((err) => {
  //     console.log('err :>> ', err);
  //   });
};

function AddEraseButton() {
  // Create a new div element
  var newDiv = document.createElement('div');

  // Set attributes if needed
  newDiv.setAttribute('id', 'eraseEvent');
  newDiv.setAttribute(
    'class',
    'leaflet-control-zoom leaflet-bar leaflet-control'
  );
  newDiv.innerHTML = `<label class="search-input" for="searchtext9" style="display: none;"></label><input class="search-input" type="text" size="9" autocomplete="off" autocapitalize="off" placeholder="Search..." role="search" id="searchtext9" style="display: none;"><ul class="search-tooltip" style="display: none;"></ul><a class="search-cancel" href="#" title="Cancel" style="display: none;"><span>⊗</span></a><a class="search-button eraseKar" href="#" title="Erase..." id="eraseKar" style="    color: red;
  font-size: smaller;">erase</a><div class="search-alert" style="display: none;"></div>`;

  // Insert the new div before an existing element with id "existingElement"
  var existingElement = document.getElementsByClassName(
    'leaflet-bottom leaflet-right'
  );

  setTimeout(() => {
    console.log('existingElement :>> 253', existingElement);
    let parentNode = existingElement[1].querySelectorAll('div');
    let refNode = parentNode[2];

    existingElement[1].insertBefore(newDiv, refNode);
    document.getElementById('eraseEvent').addEventListener('click', () => {
      console.log('eraseHandler :>> ');
      //  eraseHandler();
    });
  }, 100);
}
function eraseHandler() {
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      if (layer.id !== 'id') {
        map.removeLayer(layer);
      }
    }
  });

  // remove the route info container (right-side)
  const ROUTE_CONTAINER = document.querySelectorAll('.routeContainer');
  if (ROUTE_CONTAINER.length === 0 || polylines.length === 0) {
    alert('No route found!!');
  }
  if (ROUTE_CONTAINER.length) {
    ROUTE_CONTAINER.forEach((node) => {
      node.style = `display:none`;
    });
  }
  if (routingControl) {
    map.removeControl(routingControl);
    routingControl._container.style.display = 'none';
  }

  if (polylines.length) {
    polylines.forEach(function (polyline) {
      console.log('item :>> ', polyline);
      map.removeLayer(polyline);
    });
    // map.removeLayer(polylines);
  }

  plotCoords = [];
  geometryObject = null;
  // if (controlElevationList.length) {
  //   Array.from(controlElevationList).forEach(function (elev) {
  //     elev.clear();
  //   });
  // }
  removePlotAndPolyline();
  // resetDimensions();
  // remove the plot from the map and follow polylines
}

function removePlotAndPolyline() {
  if (polylines.length > 0) {
    // remove previous plot in-order to merge and remove the previous one
    polylines.forEach(function (polyline) {
      console.log('item :>> 352', polyline);
      map.removeLayer(polyline);
    });
    map.removeLayer(polylines);
    polylines = [];
  }
  // remove the elevation plot
  if (controlElevationList.length) {
    Array.from(controlElevationList).forEach(function (elev) {
      elev.clear();
    });
  }
  resetDimensions();
  // const plotDiv = document.querySelectorAll('.elevation-control');
  // plotDiv.forEach((targetNode) => {
  //   console.log('targetNode :>> ', targetNode);
  //   targetNode.remove();
  // });
}
function pinConvertOnMarkerClick({ lat, lng, map, marker }) {
  console.log('lat, lng ,map,marker :>> ', lat, lng, map, marker);
  let position = { lat: lat, lng: lng };
  let url = `https://api.openrouteservice.org/elevation/point?api_key=${api_key}&geometry=${position.lng},${position.lat}`;
  // fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`)
  fetch(url)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      convertToPinMarker(position, map, marker, data.geometry.coordinates[2]);
    })
    .catch((err) => {
      console.log('err :>> ', err);
    });
}
let elevation_div = document.getElementById('elevation-div');
console.log('elevation_div :>> ', elevation_div);
async function plotElevation(cordsObj) {
  // remove previous elevation plot
  removePlotAndPolyline();
  let jsonData = {
    name: 'demo.geojson',
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: null,
        geometry: {
          // MultiLineString  || LineString
          type: 'LineString',
          // coordinates: coordinates,
          coordinates: cordsObj,
        },
      },
    ],
  };
  // L.geoJSON(jsonData).addTo(map);
  const polyline = L.geoJSON(jsonData).addTo(map);
  polylines.push(polyline);
  let controlElevation = L.control.elevation(elevation_options).addTo(map);
  console.log('leaf-elev :>> ', controlElevation);
  controlElevationList.push(controlElevation);
  controlElevation.load(JSON.stringify(jsonData));
  alterLayoutDimensions();
}
let api_key = `5b3ce3597851110001cf62480750fb1054534d97ac0363d095c6890c`;

function alterLayoutDimensions() {
  MAP.style.height = '70%';
  MAP.style.width = '100%';
  const elevPlot = document.getElementsByClassName('elevation-control')[0];
  elevPlot.style.height = '30%';
  elevPlot.style.width = '100%';
  elevPlot.style.overflow = 'auto';
  map.invalidateSize();
}
function resetDimensions() {
  MAP.style.height = '100%';
  MAP.style.width = '100%';
  const elevPlots = document.getElementsByClassName('elevation-control');
  console.log('elevPlot :>> ', elevPlots);
  if (elevPlots.length) {
    Array.from(elevPlots).forEach((plot) => {
      plot.style.height = '0%';
      plot.style.width = '100%';
      plot.style.overflow = 'auto';
    });
    // elevPlot.style.height = '0%';
    // elevPlot.style.width = '100%';
    // elevPlot.style.overflow = 'auto';
  }
  map.invalidateSize();
}
function displayCustomRoute() {
  // plotCoords
  // TODO:
  // validate the co-ordinates (check routes  available within the Xm radius )
  console.log('plotCoords :>> displayCustomRoute', plotCoords);
  // TODO: show the multi-routes..
  // plotCoords in a iteration  like (0,1),(1,2),(2 ,3),(3,4)...

  if (plotCoords.length < 2) {
    alert('Please select at least 2 points');
    return;
  }
  let [startLat, startLng] = plotCoords[0];
  let [endLat, endLng] = plotCoords[1];

  // startLat = 8.681495;
  // startLng = 49.41461;
  // endLat = 8.687872;
  // endLng = 49.420318;
  // accept reversed coordinates
  // [lan,lat]
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${api_key}&start=${startLng},${startLat}&end=${endLng},${endLat}`;

  fetch(url, {
    method: 'GET',
    headers: {
      Accept:
        'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
    },
  })
    .then((response) => {
      console.log('Status:', response.status);
      response.headers.forEach((value, name) => {
        console.log(`${name}: ${value}`);
      });
      return response.json();
    })
    .then((body) => {
      console.log('Body:', body);
      if ('error' in body) {
        // throw new Error(JSON.stringify(body));
        throw body;
      }
      const { properties, geometry, type } = body.features[0];
      geometryObject = geometry;
      const { segments, summary } = properties;
      const distance = metersTOKilometers(summary.distance);
      // ;  (Number(summary.distance) / 1000).toFixed(2);
      const duration = secondsTOHoursMinutes(summary.duration);
      console.log('duration,distance :>> ', duration, distance);
      ROUTE_DETAILS_SUBTITLE.innerText = `${distance} ${duration}`;
      const { steps } = segments[0];
      let str = ``;
      Array.from(steps).forEach((row, rowId) => {
        // console.log('row____', row);
        const { distance, instruction, duration } = row;
        const dist = metersTOKilometers(distance);
        let directionClass = '';
        if (rowId === 0) {
          directionClass = 'leaflet-routing-icon-depart ';
        } else if (rowId === steps.length - 1) {
          directionClass = 'leaflet-routing-icon-arrive';
        } else {
          directionClass = getDirectionClassName(instruction);
        }
        str += ` <tr class="routeDetailsContent-table-tbody-row">
        <td class='${directionClass}'></td>
        <td>${instruction}</td>
        <td>${dist}</td>
    </tr>`;
      });
      CUSTOM_ROUTE_TBL.innerHTML = str;
      drawPolyline(geometry);
      ROUTE_CONTAINER.style = `display:block`;
      // extract data from body
      // TODO:
      // a. draw ployLine of the road lines..
      //  b. add route details to the route-container -- DONE
    })
    .catch((err) => {
      console.log('error :>> ', err);
      ROUTE_CONTAINER.style = `display:none`;
      const { code, error } = err;
      alert(error.message);
    });
}
// a route that passes through several locations (multi-coordinates )

async function displayMultipleRoute() {
  console.log('displayMultipleRoute :>> ', plotCoords);
  if (plotCoords.length < 2) {
    alert('Please select at least 2 points');
    return;
  }
  const filterArr = plotCoords.filter(([x, y, z], idx) => x);
  const coordinates = await convertLngLatToLatLng(filterArr);
  console.log('coordinates :>>648', coordinates);
  // Prepare the request body
  const requestBody = {
    coordinates: coordinates,
    format: 'geojson',
  };

  const headers = {
    Authorization: api_key,
    'Content-Type': 'application/json',
  };
  const url = `https://api.openrouteservice.org/v2/directions/driving-car`;
  LOADER.style = `display:flex`;
  fetch(url, { method: 'POST', headers, body: JSON.stringify(requestBody) })
    .then((res) => res.json())
    .then((body) => {
      LOADER.style = `display:none`;
      console.log('data :>> ', body);
      if ('error' in body) {
        // throw new Error(JSON.stringify(body));
        throw body;
      }
      const { summary, segments, geometry } = body.routes[0];
      const distance = metersTOKilometers(summary.distance);
      const duration = secondsTOHoursMinutes(summary.duration);
      console.log('distab :>> 569', distance, duration);
      let route = '';
      segments.forEach((segment, index) => {
        const { distance: dist, duration: durs, steps } = segment;
        if (dist == 0 && durs == 0) {
          // SKIP:
          console.log('SKIP :>> ');
        } else {
          const distance = metersTOKilometers(dist);
          const duration = secondsTOHoursMinutes(durs);
          console.log('duration,distance :>> ', duration, distance);
          const newRoute = injectDomRouteWrapper(segment, index);
          route += newRoute;
        }
      });
      ROUTE_WRAPPER.innerHTML = route;

      const decodedPolyline = decodePolyline(geometry);
      console.log('decodedPolyline :>> 536', decodedPolyline);
      geometryObject = decodedPolyline;
      drawPolyline({ coordinates: decodedPolyline, isAlter: false });
      addEventHandler();
    })
    .catch((err) => {
      LOADER.style = `display:none`;
      console.log('error :>> ', err);
      const { code, error } = err;
      alert(error.message);
    });
}

function addEventHandler() {
  const list = document.querySelectorAll('.eraseExistingRoute');

  list.forEach((route) => {
    document.getElementById(route.id).addEventListener('click', () => {
      console.log('eraseExistingRoute :>> ', route.id);
      const routeNo = route.id.split('_')[1];
      // TODO: remove route from the routes;
      // eraseMultiPolyline(routeNo);
    });
  });

  // add event handlers on mouseover to the row(Roads info...);
  document
    .querySelectorAll('.routeDetailsContent-table-tbody-row')
    .forEach((currentNode) => {
      currentNode.addEventListener('mouseover', () => {
        const startIdx = currentNode.getAttribute('way_point');
        const latLng = geometryObject[startIdx];
        // add follow-up marker
        // Define a custom marker icon with an elevation symbol
        var customMarker = L.icon({
          iconUrl: './dist/images/marker.png',
          iconSize: [25, 35], // size of the icon
          iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
        });

        // Create a marker with the custom icon and add it to the map
        followMarker = L.marker(latLng, {
          icon: customMarker,
          draggable: false,
          //   zIndexOffset: 200,
        }).addTo(map);
      });
      currentNode.addEventListener('mouseout', () => {
        const startIdx = currentNode.getAttribute('way_point');
        const latLng = geometryObject[startIdx];
        // remove follow-up marker
        if (followMarker && followMarker.id !== 'id') {
          map.removeLayer(followMarker);
          // marker = null;
        }
      });
    });

  // EVENT HANDLER TO TOGGLE THE ROAD-INFO... BOX..

  const toggleList = document.querySelectorAll('.route-toggle');
  console.log('toggleList :>> ', toggleList);
  Array.from(toggleList).forEach((routeDiv) => {
    routeDiv.addEventListener('click', (e) => {
      e.stopPropagation(); //
      console.log('toggleList :>> ', 813);
      let targetDivKey = routeDiv.getAttribute('id').split('_')[1];
      console.log('targetDivKey :>>815 ', targetDivKey);

      document
        .getElementById(`routeContainer_${targetDivKey}`)
        .classList.toggle('collapsed-div');
    });
  });
}
/**@param {segment} single route  */

function injectDomRouteWrapper(segment, currentRouteIndex) {
  const { distance: dist, duration: durs, steps } = segment;
  const distance = metersTOKilometers(dist);
  const duration = secondsTOHoursMinutes(durs);
  // const routeWrapper = document.createElement('div');
  // routeWrapper.setAttribute('id', 'route-wrapper');
  // routeWrapper.setAttribute('class', 'route-wrapper');
  // document.body.appendChild(routeWrapper);

  let segmentRouteRow = ``;
  Array.from(steps).forEach((row, rowId) => {
    // console.log('row____', row);
    const { distance, instruction, duration, way_points } = row;
    const dist = metersTOKilometers(distance);
    let directionClass = '';
    if (rowId === 0) {
      directionClass = 'leaflet-routing-icon-depart ';
    } else if (rowId === steps.length - 1) {
      directionClass = 'leaflet-routing-icon-arrive';
    } else {
      directionClass = getDirectionClassName(instruction);
    }
    segmentRouteRow += ` <tr class="routeDetailsContent-table-tbody-row" way_point=${way_points[0]}>
  <td class='${directionClass}'></td>
  <td>${instruction}</td>
  <td>${dist}</td>
</tr>`;
  });
  let separatorDIv = '';
  if (currentRouteIndex !== 0) {
    separatorDIv += `<div class="routeSeparator" id="routeSeparator"></div>`;
  }
  let routeDiv = ` ${separatorDIv}
  <div id="routeContainer_${currentRouteIndex}" class="routeContainer">
  <div id="routeDetails" class="routeDetails">
      <div id="routeDetailsHeader" class="routeDetailsHeader" title='Road Route info-${currentRouteIndex + 1
    }'>
          <h1 id="routeDetailsTitle_${currentRouteIndex}" class="routeDetailsTitle-info">Road-info..</h1>
          <h1 id="route-toggle_${currentRouteIndex}" class="route-toggle routeDetailsTitle"><img src='./dist/images/minimize.png' style='height:18px;width:18px'/></h1>
      </div>
      <div class="routeDetailsSubtitle">
          <h2 id="routeDetailsSubtitleTitle_${currentRouteIndex}" class="routeDetailsSubtitleTitle">${distance} km, ${duration} min</h2>
      </div>
      <div id="routeDetailsContent" class="routeDetailsContent">
          <table>
              <colgroup>
                  <col class="routeDetailsContent-table-icon">
                  <col class="routeDetailsContent-table-text">
                  <col class="routeDetailsContent-table-distance">
              </colgroup>
              <tbody id="customRouteTBL_${currentRouteIndex}" class="customRouteTBL">
                  ${segmentRouteRow}
              </tbody>
          </table>
      </div>

  </div>
  <div id="eraseExistingRoute_${currentRouteIndex}" class="eraseExistingRoute">erase
  </div>
</div>`;

  return routeDiv;
}

function secondsTOHoursMinutes(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours} hr ${minutes} min`;
}

function metersTOKilometers(meters) {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  } else {
    return `${parseInt(meters)} m`;
  }
  // let val = (Number(meters) / 1000).toFixed(2);

  // return `${val} km`;
}

function getDirectionClassName(str) {
  const possibleCaseArr = [
    'Turn left',
    'Turn right',
    'roundabout',
    'Continue straight',
    'slight left',
    'slight right',
    'sharp right',
    'sharp left',
    'Keep right',
    'Keep left',
    'via',
    'continue',
  ];
  const possibleCase = possibleCaseArr.find((item) => str.includes(item));

  switch (possibleCase) {
    case 'Turn left':
      return 'leaflet-routing-icon-turn-left';
    case 'Turn right':
      return 'leaflet-routing-icon-turn-right';
    case 'roundabout':
      return 'leaflet-routing-icon-enter-roundabout';
    case 'Continue straight':
      return 'routeDetailsContent-table-tbody-row';
    case 'slight left':
      return 'leaflet-routing-icon-bear-left';
    case 'slight right':
      return 'leaflet-routing-icon-bear-right';
    case 'Keep right':
      return 'leaflet-routing-icon-bear-right';
    case 'Keep left':
      return 'leaflet-routing-icon-bear-left';
    case 'sharp right':
      return 'leaflet-routing-icon-sharp-right';
    case 'sharp left':
      return 'leaflet-routing-icon-sharp-left';
    case 'Arrive':
      return 'routeDetailsContent-table-tbody-row';
    case 'via':
      return 'leaflet-routing-icon-via';
    case 'continue':
      return 'leaflet-routing-icon-continue';
  }
}
var polylines = [];
function drawPolyline({ coordinates, isAlter = true }) {
  let alterCoordinates;
  if (isAlter) {
    alterCoordinates = convertLngLatToLatLng(coordinates);
  } else {
    alterCoordinates = coordinates;
  }
  const polyline = L.polyline(alterCoordinates, { color: 'blue' }).addTo(map);
  polylines.push(polyline);
  // Zoom the map to the polylines
  map.fitBounds(polyline.getBounds());
}
async function convertLngLatToLatLng(coordinates) {
  let res = coordinates.map((coord) => [coord[1], coord[0]]);

  return res;
}

async function getElevationData() {
  try {
    // Example geometry data (LineString)
    if (geometryObject === null || geometryObject === undefined) {
      alert('No route found for plotting!!');
      return;
    }
    let geometryData = {};
    if ('type' in geometryObject) {
      geometryData = geometryObject;
    } else {
      const lngLatElev = await convertLngLatToLatLng(geometryObject);
      Object.assign(geometryData, {
        type: 'LineString',
        coordinates: lngLatElev,
      });
    }
    const geometry = {
      geometry: geometryData,
      format_in: 'geojson',
      format_out: 'geojson',
    };
    let totalCoordinates = geometry.geometry.coordinates.length;
    let totalSeparator = Math.ceil(totalCoordinates / 2000);

    // make totalSeparator api request

    let arr = Array(totalSeparator).fill('orange');

    LOADER.style = `display:flex`;
    let totalData = await getClusterData(totalCoordinates, arr, geometryData);
    console.log('totalData :>> ', totalData);
    await plotElevation(totalData);
    LOADER.style = `display:none`;
    // console.log(JSON.stringify(elevationData, null, 2));
  } catch (error) {
    LOADER.style = `display:none`;
    console.error('Error fetching elevation data:', error);
  }
}

async function getClusterData(totalCoordinates, arr, geometry) {
  console.log('geometry :>>930 ', geometry);
  let clusterData = [];
  let startIdx = 0;
  let endIdx = 2000;
  for (let i = 0; i < arr.length; i++) {
    // arr.forEach(async (item, index) => {
    if (endIdx > totalCoordinates) {
      endIdx = totalCoordinates;
    }
    let coordinates = geometry.coordinates.slice(startIdx, endIdx);
    let geometryData = {};
    Object.assign(geometryData, {
      type: 'LineString',
      coordinates: coordinates,
    });
    const formatGeometry = {
      geometry: geometryData,
      format_in: 'geojson',
      format_out: 'geojson',
    };
    const response = await fetch(
      'https://api.openrouteservice.org/elevation/line',
      {
        method: 'POST',
        headers: {
          Authorization: api_key,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formatGeometry),
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('data :>> 921', data);
    await clusterData.push(...data.geometry.coordinates);
    // Array.prototype.push.apply(clusterData, data.geometry.coordinates);
    startIdx = endIdx + 1;
    endIdx = 2000 * (i + 2);
    // });
  }

  return clusterData;
}

// Polyline decoding function
function decodePolyline(encoded) {
  let points = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push([lat * 1e-5, lng * 1e-5]);
  }

  return points;
}

/**@param {routeNo} id  */
function eraseMultiPolyline(id) {
  console.log('routeNo :>> ', id);
  console.log('geometryObject :>> ', geometryObject);
  // Function to remove a segment from the polyline
  let startIndex = id - 1;
  let endIndex = id;
  //  const removeSegment = (startIndex, endIndex) => {
  const newPolyline = geometryObject
    .slice(0, startIndex)
    .concat(geometryObject.slice(endIndex));
  map.removeLayer(polylines);
  polylines = L.polyline(newPolyline, { color: 'blue' }).addTo(map);
  map.fitBounds(polylines.getBounds());
  // };
}

// Function to rotate the map
// function rotateMap(angle) {
//   console.log('angle :>> 870', angle);
//   // Rotate the marker (used for demonstration)
//   marker.setRotationAngle(angle);

//   // Apply rotation to the map container
//   map.getContainer().style.transform = `rotate(${angle}deg)`;

//   // Adjust the transform-origin to keep the map centered
//   map.getContainer().style.transformOrigin = '50% 50%';
// }

// Variables to track the rotation angle
let currentAngle = 0;
let rotating = false;
function startRotate() {
  console.log('startRotate :>> ');
  rotating = true;
  map.dragging.disable(); // Disable map dragging
}
// Function to rotate the map on mousemove
function rotate(event) {
  console.log('rotate :>> ');
  if (rotating) {
    const movementX = event.movementX;
    currentAngle += movementX * 0.1; // Adjust the multiplier as needed
    rotateMap(currentAngle);
  }
}

function stopRotate() {
  console.log('stopROtate :>> ');
  rotating = false;
  map.dragging.enable(); // Re-enable map dragging
}
// Function to rotate the map container
function rotateMap(angle) {
  const mapContainer = map.getContainer();
  mapContainer.style.transition = 'transform 0.5s';
  mapContainer.style.transform = `rotate(${angle}deg)`;
  // mapContainer.style.transformOrigin = '50% 50%';
  // rotatePane.style.transform = `rotate(${angle}deg)`;
}

/** circle-marker */
var sourceCircleMarker = null,
  destinationCircleMarker = null,
  circleMarkerList = [];

function addCircleMark(latLng, key, action) {
  console.log('addCircleMark :>> ', latLng, key, action);

  if (action === 'remove') {
    console.log('remove the marker... :>> ');
    map.removeLayer(sourceCircleMarker);
    hideMyModal();
    return;
    // remove the circle with polyline attached..
  }

  let usedCircleMark = `${key}CircleMark`;
  usedCircleMark = L.circle(latLng, {
    color: 'black',
    fillColor: '#fff',
    fillOpacity: 0.5,
    radius: 150,
    dashArray: true,
  }).addTo(map);
  // Get the bounds of the circle
  var bounds = usedCircleMark.getBounds();

  // Fit the map to the bounds of the circle
  map.fitBounds(bounds, {
    padding: [50, 50], // Add padding around the bounds
    maxZoom: 10, // Set the maximum zoom level
    animate: true, // Animate the zoom
  });

  usedCircleMark[`index`] = circleMarkerList.length;
  circleMarkerList.push(usedCircleMark);
  let len = circleMarkerList.length;
  if (len === 1) {
    // eat 5 star
  } else if (len > 1) {
    let sourceMarker = circleMarkerList[len - 2];
    let destinationMarker = circleMarkerList[len - 1];
    drawPolylineOLD([sourceMarker['_latlng'], destinationMarker['_latlng']]);
  }
  /**
  switch (key) {
    case 'source': { // 0 length
      sourceCircleMarker = usedCircleMark;
      sourceCircleMarker.key = 'source';
      break;
    }
    case 'destination': { // 1 length
      destinationCircleMarker = usedCircleMark;
      destinationCircleMarker.key = `destination`;
      break;
    }
    case 'intermediate': {
      // sourceCircleMarker = usedCircleMark; eat 5star
      // circleMarkerList = usedCircleMark;
      // circleMarkerList.key = `intermediate`;
      usedCircleMark[`index`] = circleMarkerList.length;
      circleMarkerList.push(usedCircleMark);
      break;
    }
  }
  if (
    sourceCircleMarker !== null &&
    destinationCircleMarker !== null &&
    circleMarkerList.length === 0
  ) {
    // draw line from source to destination

    drawPolylineOLD([
      sourceCircleMarker['_latlng'],
      destinationCircleMarker['_latlng'],
    ]);
  } else if (circleMarkerList.length > 0) {
    let sourceMarker = null,
      destinationMarker = null;
    if (circleMarkerList.length === 1) {
      sourceMarker = destinationCircleMarker;
      destinationMarker = circleMarkerList[0];
    } else {
      let len = circleMarkerList.length;
      console.log('len :>> ', len);
      sourceMarker = circleMarkerList[len - 2];
      destinationMarker = circleMarkerList[len - 1];
    }

    drawPolylineOLD([sourceMarker['_latlng'], destinationMarker['_latlng']]);
  }
  */
  hideMyModal();
  usedCircleMark.on('mouseover', (e) => {
    console.log('over--effect :>> ', e);
    const { latlng, layerPoint, containerPoint } = e;
    DisplayModalNearMarker({
      latlng,
      containerPoint,
      remove: true,
      removeCircleType: key,
      removeCircleId: e.target.index,
    });
  });
  // usedCircleMark.on('mouseout', () => {
  //   console.log('out--effect :>> ', usedCircleMark);
  // });
}

// Function to add text along the polyline
function addTextToPolyline(routeLine, text) {
  let path = routeLine._path;
  let textNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textNode.setAttribute('class', 'routeLine-label');

  let textPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'textPath'
  );
  textPath.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'xlink:href',
    `#${path.id}`
  );
  textPath.setAttribute('startOffset', '20%');
  textPath.setAttribute('text-anchor', 'start');
  textNode.setAttribute('dy', '-5px'); // Add vertical offset
  textPath.textContent = text;

  textNode.appendChild(textPath);
  path.parentNode.appendChild(textNode);
}

function removeCircleMarker(latlng, type, id) {
  console.log('latlng,type,id :>> ', latlng, type, id);
  console.log('circleMarkerList :>> 1315', circleMarkerList);
  Array.from(circleMarkerList).forEach((circleNode, index) => {
    console.log('circleNode :>> ', circleNode, 'index : ', index);
    circleNode.index === id && map.removeLayer(circleNode);
  });
  Array.from(circleMarkerLineList).forEach((lineNode, index) => {
    map.removeLayer(lineNode);
  });
  circleMarkerList.splice(id, 1);
  //re-draw
  for (let i = 0; i < circleMarkerList.length - 1; i++) {
    let source = circleMarkerList[i];
    let destination = circleMarkerList[i + 1];
    drawPolylineOLD([source['_latlng'], destination['_latlng']]);
  }
  hideMyModal();
}

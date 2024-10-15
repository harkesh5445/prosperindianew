export const openRouteServiceProfiles = {
  driving: {
    car: {
      profile: 'driving-car',
      description: 'Routing profile for cars.',
    },
    hgv: {
      profile: 'driving-hgv',
      description: 'Routing profile for heavy goods vehicles.',
    },
  },
  cycling: {
    regular: {
      profile: 'cycling-regular',
      description: 'Routing profile for regular cyclists.',
    },
    road: {
      profile: 'cycling-road',
      description: 'Routing profile for road cyclists.',
    },
    mountain: {
      profile: 'cycling-mountain',
      description: 'Routing profile for mountain biking.',
    },
    electric: {
      profile: 'cycling-electric',
      description: 'Routing profile for electric bikes.',
    },
  },
  foot: {
    walking: {
      profile: 'foot-walking',
      description: 'Routing profile for walking.',
    },
    hiking: {
      profile: 'foot-hiking',
      description: 'Routing profile for hiking.',
    },
  },
  wheelchair: {
    profile: 'wheelchair',
    description: 'Routing profile for wheelchairs.',
  },
};
export const elevation_options = {
  // Default chart colors: theme lime-theme, magenta-theme, ...
  theme: 'lightblue-theme',

  // Chart container outside/inside map container
  detached: true,

  // if (detached), the elevation chart container
  elevationDiv: '#elevation-div',

  // if (!detached) autohide chart profile on chart mouseleave
  autohide: false,

  // if (!detached) initial state of chart profile control
  collapsed: false,

  // if (!detached) control position on one of map corners
  position: 'topright',

  // Autoupdate map center on chart mouseover.
  followMarker: true,

  // Autoupdate map bounds on chart update.
  autofitBounds: true,

  // Chart distance/elevation units.
  imperial: false,

  // [Lat, Long] vs [Long, Lat] points. (leaflet default: [Lat, Long])
  reverseCoords: false,

  // Acceleration chart profile: true || "summary" || "disabled" || false
  acceleration: false,

  // Slope chart profile: true || "summary" || "disabled" || false
  slope: false,

  // Speed chart profile: true || "summary" || "disabled" || false
  speed: false,

  // Display time info: true || "summary" || false
  time: false,

  // Display distance info: true || "summary"
  distance: true,

  // Display altitude info: true || "summary"
  altitude: true,

  // Summary track info style: "inline" || "multiline" || false
  summary: 'multiline',

  // Download link: "link" || false || "modal"
  downloadLink: 'link',

  // Toggle chart ruler filter
  ruler: true,

  // Toggle chart legend filter
  legend: true,

  // Toggle "leaflet-almostover" integration
  almostOver: true,

  // Toggle "leaflet-distance-markers" integration
  distanceMarkers: false,

  // Display track datetimes: true || false
  timestamps: false,

  // Display track waypoints: true || "markers" || "dots" || false
  waypoints: true,

  // Toggle custom waypoint icons: true || { associative array of <sym> tags } || false
  wptIcons: {
    '': L.divIcon({
      className: 'elevation-waypoint-marker',
      html: '<i class="elevation-waypoint-icon"></i>',
      iconSize: [30, 30],
      iconAnchor: [8, 30],
    }),
  },

  // Toggle waypoint labels: true || "markers" || "dots" || false
  wptLabels: true,

  // Render chart profiles as Canvas or SVG Paths
  preferCanvas: true,
};
export const suggestActionToMarker = {
  source: {
    key: 'source',
    arr: [
      'latlng',
      'Pin location',
      'Directions from here',
      'Directions to here',
      'Measure distance',
    ],
  },
  destination: {
    key: 'destination',
    arr: [
      'latlng',
      'Pin location',
      'Directions from here',
      'Directions to here',
      'Distance to here',
    ],
  },
  intermediate: {
    key: 'intermediate',
    arr: [
      'latlng',
      'Pin location',
      // 'Directions from here',
      'Entry..',
      'Directions to here',
      'Distance to here',
    ],
  },
  remove: {
    key: 'remove',
    arr: ['latlng', 'Remove this destination', 'Clear measurement'],
  },
  removePinnedMarker: {
    key: 'removePinnedMarker',
    arr: ['latlng', 'Elevation', 'Remove location'],
  },
};
// conventions for display coordinates
// lat,lng coordinates
// conventions to used for or working
// lng,lat  coordinates (This format being used internally or for specific programming contexts) -- for manipulation..

//TODO:
// a. on hover over the Road info.. div track the polyline track -- DONE
// b. on erase the target Road info.. div should remove the polyline with target Road info div.. -- DONE
// c. Get the road info(route name) heading.. div
//d. on right click also get a information box (contents--- )
// -- contents are
// 1. lat,lng --- display DONE
// 2. Directions from here
// 3.Directions to here
// 4.What's here?
// 5.Search nearby
// 2. road heading
// 3. road length
// 4. road elevation
// 5. road speed
// 6. road slope
// 7. road acceleration
// e. on right click also get a information box (contents--- )

// list of markers existing
// 1. marker (---- --> draggable or default marker)
// 2. pinMarker (---- --> pin marker (generated on left of marker(default marker)))
// 3. followMarker (---- --> on polyline or default follow-marker)
// 3.  (---- --> on polyline or default follow-marker)

// if source circleMarker is already there, then on add-up of destination marker along with destination marker draw polyline
// and give the distance measured from source to destination   ---- // DONE:

// BUG: FIXED: DONE
// on drop of marker(pinned marker) zoom level of map changes due to which the position of attached modal to the movable marker is not the same as...

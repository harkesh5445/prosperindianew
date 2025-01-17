!(function (t) {
  'function' == typeof define && define.amd ? define(t) : t();
})(function () {
  'use strict';
  var t, e, o;
  !(function (t, e) {
    'function' == typeof define && define.amd
      ? define(['leaflet'], t)
      : 'object' == typeof exports &&
        (void 0 !== e && e.L
          ? (module.exports = t(L))
          : (module.exports = t(require('leaflet')))),
      void 0 !== e && e.L && (e.L.Control.Locate = t(L));
  })(function (t) {
    var e = function (e, i, o) {
        (o = o.split(' ')).forEach(function (o) {
          t.DomUtil[e].call(this, i, o);
        });
      },
      i = function (t, i) {
        e('addClass', t, i);
      },
      o = function (t, i) {
        e('removeClass', t, i);
      },
      n = t.Marker.extend({
        initialize: function (e, i) {
          t.Util.setOptions(this, i), (this._latlng = e), this.createIcon();
        },
        createIcon: function () {
          var e = this.options,
            i = '';
          void 0 !== e.color && (i += 'stroke:' + e.color + ';'),
            void 0 !== e.weight && (i += 'stroke-width:' + e.weight + ';'),
            void 0 !== e.fillColor && (i += 'fill:' + e.fillColor + ';'),
            void 0 !== e.fillOpacity &&
              (i += 'fill-opacity:' + e.fillOpacity + ';'),
            void 0 !== e.opacity && (i += 'opacity:' + e.opacity + ';');
          var o = this._getIconSVG(e, i);
          (this._locationIcon = t.divIcon({
            className: o.className,
            html: o.svg,
            iconSize: [o.w, o.h],
          })),
            this.setIcon(this._locationIcon);
        },
        _getIconSVG: function (t, e) {
          var i = t.radius,
            o = i + t.weight,
            n = 2 * o;
          return {
            className: 'leaflet-control-locate-location',
            svg:
              '<svg xmlns="http://www.w3.org/2000/svg" width="' +
              n +
              '" height="' +
              n +
              '" version="1.1" viewBox="-' +
              o +
              ' -' +
              o +
              ' ' +
              n +
              ' ' +
              n +
              '"><circle r="' +
              i +
              '" style="' +
              e +
              '" /></svg>',
            w: n,
            h: n,
          };
        },
        setStyle: function (e) {
          t.Util.setOptions(this, e), this.createIcon();
        },
      }),
      s = n.extend({
        initialize: function (e, i, o) {
          t.Util.setOptions(this, o),
            (this._latlng = e),
            (this._heading = i),
            this.createIcon();
        },
        setHeading: function (t) {
          this._heading = t;
        },
        _getIconSVG: function (t, e) {
          var i = t.radius,
            o = t.width + t.weight,
            n = 2 * (i + t.depth + t.weight),
            s = 'M0,0 l' + t.width / 2 + ',' + t.depth + ' l-' + o + ',0 z';
          return {
            className: 'leaflet-control-locate-heading',
            svg:
              '<svg xmlns="http://www.w3.org/2000/svg" width="' +
              o +
              '" height="' +
              n +
              '" version="1.1" viewBox="-' +
              o / 2 +
              ' 0 ' +
              o +
              ' ' +
              n +
              '" style="' +
              ('transform: rotate(' + this._heading + 'deg)') +
              '"><path d="' +
              s +
              '" style="' +
              e +
              '" /></svg>',
            w: o,
            h: n,
          };
        },
      }),
      a = t.Control.extend({
        options: {
          position: 'topleft',
          layer: void 0,
          setView: 'untilPanOrZoom',
          keepCurrentZoomLevel: !1,
          getLocationBounds: function (t) {
            return t.bounds;
          },
          flyTo: !1,
          clickBehavior: {
            inView: 'stop',
            outOfView: 'setView',
            inViewNotFollowing: 'inView',
          },
          returnToPrevBounds: !1,
          cacheLocation: !0,
          drawCircle: !0,
          drawMarker: !0,
          showCompass: !0,
          markerClass: n,
          compassClass: s,
          circleStyle: {
            className: 'leaflet-control-locate-circle',
            color: '#136AEC',
            fillColor: '#136AEC',
            fillOpacity: 0.15,
            weight: 0,
          },
          markerStyle: {
            className: 'leaflet-control-locate-marker',
            color: '#fff',
            fillColor: '#2A93EE',
            fillOpacity: 1,
            weight: 3,
            opacity: 1,
            radius: 9,
          },
          compassStyle: {
            fillColor: '#2A93EE',
            fillOpacity: 1,
            weight: 0,
            color: '#fff',
            opacity: 1,
            radius: 9,
            width: 9,
            depth: 6,
          },
          followCircleStyle: {},
          followMarkerStyle: {},
          followCompassStyle: {},
          icon: 'fa fa-map-marker',
          iconLoading: 'fa fa-spinner fa-spin',
          iconElementTag: 'span',
          circlePadding: [0, 0],
          metric: !0,
          createButtonCallback: function (e, i) {
            var o = t.DomUtil.create(
              'a',
              'leaflet-bar-part leaflet-bar-part-single',
              e
            );
            return (
              (o.title = i.strings.title),
              { link: o, icon: t.DomUtil.create(i.iconElementTag, i.icon, o) }
            );
          },
          onLocationError: function (t, e) {
            alert(t.message);
          },
          onLocationOutsideMapBounds: function (t) {
            t.stop(), alert(t.options.strings.outsideMapBoundsMsg);
          },
          showPopup: !0,
          strings: {
            title: 'Show me where I am',
            metersUnit: 'meters',
            feetUnit: 'feet',
            popup: 'You are within {distance} {unit} from this point',
            outsideMapBoundsMsg:
              'You seem located outside the boundaries of the map',
          },
          locateOptions: { maxZoom: 1 / 0, watch: !0, setView: !1 },
        },
        initialize: function (e) {
          for (var i in e)
            'object' == typeof this.options[i]
              ? t.extend(this.options[i], e[i])
              : (this.options[i] = e[i]);
          (this.options.followMarkerStyle = t.extend(
            {},
            this.options.markerStyle,
            this.options.followMarkerStyle
          )),
            (this.options.followCircleStyle = t.extend(
              {},
              this.options.circleStyle,
              this.options.followCircleStyle
            )),
            (this.options.followCompassStyle = t.extend(
              {},
              this.options.compassStyle,
              this.options.followCompassStyle
            ));
        },
        onAdd: function (e) {
          var i = t.DomUtil.create(
            'div',
            'leaflet-control-locate leaflet-bar leaflet-control'
          );
          (this._layer = this.options.layer || new t.LayerGroup()),
            this._layer.addTo(e),
            (this._event = void 0),
            (this._compassHeading = null),
            (this._prevBounds = null);
          var o = this.options.createButtonCallback(i, this.options);
          return (
            (this._link = o.link),
            (this._icon = o.icon),
            t.DomEvent.on(this._link, 'click', t.DomEvent.stopPropagation)
              .on(this._link, 'click', t.DomEvent.preventDefault)
              .on(this._link, 'click', this._onClick, this)
              .on(this._link, 'dblclick', t.DomEvent.stopPropagation),
            this._resetVariables(),
            this._map.on('unload', this._unload, this),
            i
          );
        },
        _onClick: function () {
          this._justClicked = !0;
          var t = this._isFollowing();
          if (
            ((this._userPanned = !1),
            (this._userZoomed = !1),
            this._active && !this._event)
          )
            this.stop();
          else if (this._active && void 0 !== this._event) {
            var e = this.options.clickBehavior,
              i = e.outOfView;
            switch (
              (this._map.getBounds().contains(this._event.latlng) &&
                (i = t ? e.inView : e.inViewNotFollowing),
              e[i] && (i = e[i]),
              i)
            ) {
              case 'setView':
                this.setView();
                break;
              case 'stop':
                if ((this.stop(), this.options.returnToPrevBounds))
                  (this.options.flyTo
                    ? this._map.flyToBounds
                    : this._map.fitBounds
                  ).bind(this._map)(this._prevBounds);
            }
          } else
            this.options.returnToPrevBounds &&
              (this._prevBounds = this._map.getBounds()),
              this.start();
          this._updateContainerStyle();
        },
        start: function () {
          this._activate(),
            this._event &&
              (this._drawMarker(this._map),
              this.options.setView && this.setView()),
            this._updateContainerStyle();
        },
        stop: function () {
          this._deactivate(),
            this._cleanClasses(),
            this._resetVariables(),
            this._removeMarker();
        },
        stopFollowing: function () {
          (this._userPanned = !0),
            this._updateContainerStyle(),
            this._drawMarker();
        },
        _activate: function () {
          this._active ||
            (this._map.locate(this.options.locateOptions),
            (this._active = !0),
            this._map.on('locationfound', this._onLocationFound, this),
            this._map.on('locationerror', this._onLocationError, this),
            this._map.on('dragstart', this._onDrag, this),
            this._map.on('zoomstart', this._onZoom, this),
            this._map.on('zoomend', this._onZoomEnd, this),
            this.options.showCompass &&
              ('ondeviceorientationabsolute' in window
                ? t.DomEvent.on(
                    window,
                    'deviceorientationabsolute',
                    this._onDeviceOrientation,
                    this
                  )
                : 'ondeviceorientation' in window &&
                  t.DomEvent.on(
                    window,
                    'deviceorientation',
                    this._onDeviceOrientation,
                    this
                  )));
        },
        _deactivate: function () {
          this._map.stopLocate(),
            (this._active = !1),
            this.options.cacheLocation || (this._event = void 0),
            this._map.off('locationfound', this._onLocationFound, this),
            this._map.off('locationerror', this._onLocationError, this),
            this._map.off('dragstart', this._onDrag, this),
            this._map.off('zoomstart', this._onZoom, this),
            this._map.off('zoomend', this._onZoomEnd, this),
            this.options.showCompass &&
              ((this._compassHeading = null),
              'ondeviceorientationabsolute' in window
                ? t.DomEvent.off(
                    window,
                    'deviceorientationabsolute',
                    this._onDeviceOrientation,
                    this
                  )
                : 'ondeviceorientation' in window &&
                  t.DomEvent.off(
                    window,
                    'deviceorientation',
                    this._onDeviceOrientation,
                    this
                  ));
        },
        setView: function () {
          if ((this._drawMarker(), this._isOutsideMapBounds()))
            (this._event = void 0),
              this.options.onLocationOutsideMapBounds(this);
          else if (this.options.keepCurrentZoomLevel) {
            (e = this.options.flyTo ? this._map.flyTo : this._map.panTo).bind(
              this._map
            )([this._event.latitude, this._event.longitude]);
          } else {
            var e = this.options.flyTo
              ? this._map.flyToBounds
              : this._map.fitBounds;
            (this._ignoreEvent = !0),
              e.bind(this._map)(this.options.getLocationBounds(this._event), {
                padding: this.options.circlePadding,
                maxZoom: this.options.locateOptions.maxZoom,
              }),
              t.Util.requestAnimFrame(function () {
                this._ignoreEvent = !1;
              }, this);
          }
        },
        _drawCompass: function () {
          if (this._event) {
            var t = this._event.latlng;
            if (
              this.options.showCompass &&
              t &&
              null !== this._compassHeading
            ) {
              var e = this._isFollowing()
                ? this.options.followCompassStyle
                : this.options.compassStyle;
              this._compass
                ? (this._compass.setLatLng(t),
                  this._compass.setHeading(this._compassHeading),
                  this._compass.setStyle && this._compass.setStyle(e))
                : (this._compass = new this.options.compassClass(
                    t,
                    this._compassHeading,
                    e
                  ).addTo(this._layer));
            }
            !this._compass ||
              (this.options.showCompass && null !== this._compassHeading) ||
              (this._compass.removeFrom(this._layer), (this._compass = null));
          }
        },
        _drawMarker: function () {
          void 0 === this._event.accuracy && (this._event.accuracy = 0);
          var e,
            i,
            o = this._event.accuracy,
            n = this._event.latlng;
          if (this.options.drawCircle) {
            var s = this._isFollowing()
              ? this.options.followCircleStyle
              : this.options.circleStyle;
            this._circle
              ? this._circle.setLatLng(n).setRadius(o).setStyle(s)
              : (this._circle = t.circle(n, o, s).addTo(this._layer));
          }
          if (
            (this.options.metric
              ? ((e = o.toFixed(0)), (i = this.options.strings.metersUnit))
              : ((e = (3.2808399 * o).toFixed(0)),
                (i = this.options.strings.feetUnit)),
            this.options.drawMarker)
          ) {
            var a = this._isFollowing()
              ? this.options.followMarkerStyle
              : this.options.markerStyle;
            this._marker
              ? (this._marker.setLatLng(n),
                this._marker.setStyle && this._marker.setStyle(a))
              : (this._marker = new this.options.markerClass(n, a).addTo(
                  this._layer
                ));
          }
          this._drawCompass();
          var r = this.options.strings.popup;
          this.options.showPopup &&
            r &&
            this._marker &&
            this._marker
              .bindPopup(t.Util.template(r, { distance: e, unit: i }))
              ._popup.setLatLng(n),
            this.options.showPopup &&
              r &&
              this._compass &&
              this._compass
                .bindPopup(t.Util.template(r, { distance: e, unit: i }))
                ._popup.setLatLng(n);
        },
        _removeMarker: function () {
          this._layer.clearLayers(),
            (this._marker = void 0),
            (this._circle = void 0);
        },
        _unload: function () {
          this.stop(), this._map.off('unload', this._unload, this);
        },
        _setCompassHeading: function (e) {
          !isNaN(parseFloat(e)) && isFinite(e)
            ? ((e = Math.round(e)),
              (this._compassHeading = e),
              t.Util.requestAnimFrame(this._drawCompass, this))
            : (this._compassHeading = null);
        },
        _onCompassNeedsCalibration: function () {
          this._setCompassHeading();
        },
        _onDeviceOrientation: function (t) {
          this._active &&
            (t.webkitCompassHeading
              ? this._setCompassHeading(t.webkitCompassHeading)
              : t.absolute &&
                t.alpha &&
                this._setCompassHeading(360 - t.alpha));
        },
        _onLocationError: function (t) {
          (3 == t.code && this.options.locateOptions.watch) ||
            (this.stop(), this.options.onLocationError(t, this));
        },
        _onLocationFound: function (t) {
          if (
            (!this._event ||
              this._event.latlng.lat !== t.latlng.lat ||
              this._event.latlng.lng !== t.latlng.lng ||
              this._event.accuracy !== t.accuracy) &&
            this._active
          ) {
            switch (
              ((this._event = t),
              this._drawMarker(),
              this._updateContainerStyle(),
              this.options.setView)
            ) {
              case 'once':
                this._justClicked && this.setView();
                break;
              case 'untilPan':
                this._userPanned || this.setView();
                break;
              case 'untilPanOrZoom':
                this._userPanned || this._userZoomed || this.setView();
                break;
              case 'always':
                this.setView();
            }
            this._justClicked = !1;
          }
        },
        _onDrag: function () {
          this._event &&
            !this._ignoreEvent &&
            ((this._userPanned = !0),
            this._updateContainerStyle(),
            this._drawMarker());
        },
        _onZoom: function () {
          this._event &&
            !this._ignoreEvent &&
            ((this._userZoomed = !0),
            this._updateContainerStyle(),
            this._drawMarker());
        },
        _onZoomEnd: function () {
          this._event && this._drawCompass(),
            this._event &&
              !this._ignoreEvent &&
              this._marker &&
              !this._map
                .getBounds()
                .pad(-0.3)
                .contains(this._marker.getLatLng()) &&
              ((this._userPanned = !0),
              this._updateContainerStyle(),
              this._drawMarker());
        },
        _isFollowing: function () {
          return (
            !!this._active &&
            ('always' === this.options.setView ||
              ('untilPan' === this.options.setView
                ? !this._userPanned
                : 'untilPanOrZoom' === this.options.setView
                ? !this._userPanned && !this._userZoomed
                : void 0))
          );
        },
        _isOutsideMapBounds: function () {
          return (
            void 0 !== this._event &&
            this._map.options.maxBounds &&
            !this._map.options.maxBounds.contains(this._event.latlng)
          );
        },
        _updateContainerStyle: function () {
          this._container &&
            (this._active && !this._event
              ? this._setClasses('requesting')
              : this._isFollowing()
              ? this._setClasses('following')
              : this._active
              ? this._setClasses('active')
              : this._cleanClasses());
        },
        _setClasses: function (t) {
          'requesting' == t
            ? (o(this._container, 'active following'),
              i(this._container, 'requesting'),
              o(this._icon, this.options.icon),
              i(this._icon, this.options.iconLoading))
            : 'active' == t
            ? (o(this._container, 'requesting following'),
              i(this._container, 'active'),
              o(this._icon, this.options.iconLoading),
              i(this._icon, this.options.icon))
            : 'following' == t &&
              (o(this._container, 'requesting'),
              i(this._container, 'active following'),
              o(this._icon, this.options.iconLoading),
              i(this._icon, this.options.icon));
        },
        _cleanClasses: function () {
          t.DomUtil.removeClass(this._container, 'requesting'),
            t.DomUtil.removeClass(this._container, 'active'),
            t.DomUtil.removeClass(this._container, 'following'),
            o(this._icon, this.options.iconLoading),
            i(this._icon, this.options.icon);
        },
        _resetVariables: function () {
          (this._active = !1),
            (this._justClicked = !1),
            (this._userPanned = !1),
            (this._userZoomed = !1);
        },
      });
    return (
      (t.control.locate = function (e) {
        return new t.Control.Locate(e);
      }),
      a
    );
  }, window),
    (function () {
      (L.Control.FullScreen = L.Control.extend({
        options: {
          position: 'topleft',
          title: 'Full Screen',
          titleCancel: 'Exit Full Screen',
          forceSeparateButton: !1,
          forcePseudoFullscreen: !1,
          fullscreenElement: !1,
        },
        onAdd: function (t) {
          var e,
            i = 'leaflet-control-zoom-fullscreen',
            o = '';
          return (
            (e =
              t.zoomControl && !this.options.forceSeparateButton
                ? t.zoomControl._container
                : L.DomUtil.create('div', 'leaflet-bar')),
            this.options.content
              ? (o = this.options.content)
              : (i += ' fullscreen-icon'),
            this._createButton(
              this.options.title,
              i,
              o,
              e,
              this.toggleFullScreen,
              this
            ),
            (this._map.fullscreenControl = this),
            this._map.on(
              'enterFullscreen exitFullscreen',
              this._toggleTitle,
              this
            ),
            e
          );
        },
        onRemove: function (e) {
          L.DomEvent.off(this.link, 'click', L.DomEvent.stopPropagation)
            .off(this.link, 'click', L.DomEvent.preventDefault)
            .off(this.link, 'click', this.toggleFullScreen, this),
            L.DomEvent.off(
              this._container,
              t.fullScreenEventName,
              L.DomEvent.stopPropagation
            )
              .off(
                this._container,
                t.fullScreenEventName,
                L.DomEvent.preventDefault
              )
              .off(
                this._container,
                t.fullScreenEventName,
                this._handleFullscreenChange,
                this
              ),
            L.DomEvent.off(
              document,
              t.fullScreenEventName,
              L.DomEvent.stopPropagation
            )
              .off(document, t.fullScreenEventName, L.DomEvent.preventDefault)
              .off(
                document,
                t.fullScreenEventName,
                this._handleFullscreenChange,
                this
              );
        },
        _createButton: function (e, i, o, n, s, a) {
          return (
            (this.link = L.DomUtil.create('a', i, n)),
            (this.link.href = '#'),
            (this.link.title = e),
            (this.link.innerHTML = o),
            this.link.setAttribute('role', 'button'),
            this.link.setAttribute('aria-label', e),
            L.DomEvent.on(this.link, 'click', L.DomEvent.stopPropagation)
              .on(this.link, 'click', L.DomEvent.preventDefault)
              .on(this.link, 'click', s, a),
            L.DomEvent.on(n, t.fullScreenEventName, L.DomEvent.stopPropagation)
              .on(n, t.fullScreenEventName, L.DomEvent.preventDefault)
              .on(n, t.fullScreenEventName, this._handleFullscreenChange, a),
            L.DomEvent.on(
              document,
              t.fullScreenEventName,
              L.DomEvent.stopPropagation
            )
              .on(document, t.fullScreenEventName, L.DomEvent.preventDefault)
              .on(
                document,
                t.fullScreenEventName,
                this._handleFullscreenChange,
                a
              ),
            this.link
          );
        },
        toggleFullScreen: function () {
          var e = this._map;
          (e._exitFired = !1),
            e._isFullscreen
              ? (t.supportsFullScreen && !this.options.forcePseudoFullscreen
                  ? t.cancelFullScreen()
                  : L.DomUtil.removeClass(
                      this.options.fullscreenElement
                        ? this.options.fullscreenElement
                        : e._container,
                      'leaflet-pseudo-fullscreen'
                    ),
                e.fire('exitFullscreen'),
                (e._exitFired = !0),
                (e._isFullscreen = !1))
              : (t.supportsFullScreen && !this.options.forcePseudoFullscreen
                  ? t.requestFullScreen(
                      this.options.fullscreenElement
                        ? this.options.fullscreenElement
                        : e._container
                    )
                  : L.DomUtil.addClass(
                      this.options.fullscreenElement
                        ? this.options.fullscreenElement
                        : e._container,
                      'leaflet-pseudo-fullscreen'
                    ),
                e.fire('enterFullscreen'),
                (e._isFullscreen = !0));
        },
        _toggleTitle: function () {
          this.link.title = this._map._isFullscreen
            ? this.options.title
            : this.options.titleCancel;
        },
        _handleFullscreenChange: function () {
          var e = this._map;
          e.invalidateSize(),
            t.isFullScreen() ||
              e._exitFired ||
              (e.fire('exitFullscreen'),
              (e._exitFired = !0),
              (e._isFullscreen = !1));
        },
      })),
        L.Map.include({
          toggleFullscreen: function () {
            this.fullscreenControl.toggleFullScreen();
          },
        }),
        L.Map.addInitHook(function () {
          this.options.fullscreenControl &&
            this.addControl(
              L.control.fullscreen(this.options.fullscreenControlOptions)
            );
        }),
        (L.control.fullscreen = function (t) {
          return new L.Control.FullScreen(t);
        });
      var t = {
          supportsFullScreen: !1,
          isFullScreen: function () {
            return !1;
          },
          requestFullScreen: function () {},
          cancelFullScreen: function () {},
          fullScreenEventName: '',
          prefix: '',
        },
        e = 'webkit moz o ms khtml'.split(' ');
      if (void 0 !== document.exitFullscreen) t.supportsFullScreen = !0;
      else {
        for (var i = 0, o = e.length; i < o; i++)
          if (
            ((t.prefix = e[i]),
            void 0 !== document[t.prefix + 'CancelFullScreen'])
          ) {
            t.supportsFullScreen = !0;
            break;
          }
        void 0 !== document.msExitFullscreen &&
          ((t.prefix = 'ms'), (t.supportsFullScreen = !0));
      }
      t.supportsFullScreen &&
        ('ms' === t.prefix
          ? (t.fullScreenEventName = 'MSFullscreenChange')
          : (t.fullScreenEventName = t.prefix + 'fullscreenchange'),
        (t.isFullScreen = function () {
          switch (this.prefix) {
            case '':
              return document.fullscreen;
            case 'webkit':
              return document.webkitIsFullScreen;
            case 'ms':
              return document.msFullscreenElement;
            default:
              return document[this.prefix + 'FullScreen'];
          }
        }),
        (t.requestFullScreen = function (t) {
          switch (this.prefix) {
            case '':
              return t.requestFullscreen();
            case 'ms':
              return t.msRequestFullscreen();
            default:
              return t[this.prefix + 'RequestFullScreen']();
          }
        }),
        (t.cancelFullScreen = function () {
          switch (this.prefix) {
            case '':
              return document.exitFullscreen();
            case 'ms':
              return document.msExitFullscreen();
            default:
              return document[this.prefix + 'CancelFullScreen']();
          }
        })),
        'undefined' != typeof jQuery &&
          (jQuery.fn.requestFullScreen = function () {
            return this.each(function () {
              var e = jQuery(this);
              t.supportsFullScreen && t.requestFullScreen(e);
            });
          }),
        (window.fullScreenApi = t);
    })(),
    (L.Control.Pegman = L.Control.extend({
      includes: L.Evented ? L.Evented.prototype : L.Mixin.Events,
      options: {
        position: 'bottomright',
        theme: 'leaflet-pegman-v3-default',
        debug: !1,
        apiKey: '',
        libraries: '',
        mutant: {
          attribution:
            'Map data: &copy; <a href="https://www.google.com/intl/en/help/terms_maps.html">Google</a>',
          pane: 'overlayPane',
          type: null,
        },
        pano: { enableCloseButton: !0 },
      },
      __interactURL: 'https://unpkg.com/interactjs@1.2.9/dist/interact.min.js',
      __gmapsURL: 'https://maps.googleapis.com/maps/api/js?v=3',
      __mutantURL:
        'https://unpkg.com/leaflet.gridlayer.googlemutant@0.8.0/Leaflet.GoogleMutant.js',
      initialize: function (t) {
        void 0 !== t.logging && (t.debug = t.logging),
          L.Util.setOptions(this, t),
          (this._mousePos = { direction: {}, old: {} }),
          (this._pegmanMarkerCoords = null),
          (this._streetViewCoords = null),
          (this._streetViewLayerEnabled = !1),
          (this._dropzoneMapOpts = {
            accept: '.draggable',
            overlap: 0.75,
            ondropactivate: L.bind(this.onDropZoneActivated, this),
            ondragenter: L.bind(this.onDropZoneDragEntered, this),
            ondragleave: L.bind(this.onDropZoneDragLeaved, this),
            ondrop: L.bind(this.onDropZoneDropped, this),
            ondropdeactivate: L.bind(this.onDropZoneDeactivated, this),
          }),
          (this._draggableMarkerOpts = {
            inertia: !1,
            onmove: L.bind(this.onDraggableMove, this),
            onend: L.bind(this.onDraggableEnd, this),
          }),
          (this._pegmanMarkerOpts = {
            draggable: !0,
            icon: L.icon({
              className: 'pegman-marker',
              iconSize: [52, 52],
              iconAnchor: [26, 13],
              iconUrl:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAFElEQVR4XgXAAQ0AAABAMP1L30IDCPwC/o5WcS4AAAAASUVORK5CYII=',
            }),
          }),
          (this._lazyLoaderAdded = !1);
      },
      onAdd: function (t) {
        return (
          (this._map = t),
          (this._container = L.DomUtil.create(
            'div',
            'leaflet-pegman pegman-control leaflet-bar'
          )),
          (this._pegman = L.DomUtil.create(
            'div',
            'pegman draggable drag-drop',
            this._container
          )),
          (this._pegmanButton = L.DomUtil.create(
            'div',
            'pegman-button',
            this._container
          )),
          (this._pegmanMarker = L.marker([0, 0], this._pegmanMarkerOpts)),
          (this._panoDiv = L.DomUtil.create(
            'div',
            'pano-canvas',
            this._map._container
          )),
          L.DomUtil.addClass(this._map._container, this.options.theme),
          L.DomEvent.disableClickPropagation(this._panoDiv),
          L.DomEvent.on(
            this._container,
            'click mousedown dblclick',
            this._disableClickPropagation,
            this
          ),
          this._container.addEventListener(
            'mousedown',
            this._loadScripts.bind(this, !0),
            !1
          ),
          this._container.addEventListener(
            'touchstart',
            this._loadScripts.bind(this, !0),
            !1
          ),
          this._container.addEventListener(
            'mouseover',
            this._loadScripts.bind(this, !1),
            !1
          ),
          this._loadInteractHandlers(),
          this._loadGoogleHandlers(),
          L.DomEvent.on(document, 'mousemove', this.mouseMoveTracking, this),
          L.DomEvent.on(document, 'keyup', this.keyUpTracking, this),
          this._pegmanMarker.on('dragend', this.onPegmanMarkerDragged, this),
          this._map.on('click', this.onMapClick, this),
          this._map.on('layeradd', this.onMapLayerAdd, this),
          this._container
        );
      },
      onRemove: function (t) {
        this._googleStreetViewLayer.remove(),
          this._pegmanMarker.remove(),
          L.DomUtil.remove(this._panoDiv),
          L.DomEvent.off(document, 'mousemove', this.mouseMoveTracking, this),
          L.DomEvent.off(document, 'keyup', this.keyUpTracking, this);
      },
      _log: function (t) {
        this.options.debug && console.log(t);
      },
      _addClasses: function (t, e) {
        for (var i in (e = e.split(' '))) L.DomUtil.addClass(t, e[i]);
      },
      _removeClasses: function (t, e) {
        for (var i in (e = e.split(' '))) L.DomUtil.removeClass(t, e[i]);
      },
      _removeAttributes: function (t, e) {
        for (var i in e) t.removeAttribute(e[i]);
      },
      _insertAfter: function (t, e) {
        t.parentNode.insertBefore(e, t.nextSibling);
      },
      _translateElement: function (t, e, i) {
        !1 === e &&
          !1 === i &&
          this._removeAttributes(this._pegman, ['style', 'data-x', 'data-y']);
        var o = (parseFloat(t.getAttribute('data-x')) || 0) + e,
          n = (parseFloat(t.getAttribute('data-y')) || 0) + i;
        (t.style.webkitTransform = t.style.transform =
          'translate(' + o + 'px, ' + n + 'px)'),
          t.setAttribute('data-x', o),
          t.setAttribute('data-y', n);
      },
      _updateClasses: function (t) {
        switch (t) {
          case 'pegman-dragging':
            this._removeClasses(this._pegman, 'dropped'),
              this._addClasses(this._container, 'dragging');
            break;
          case 'pegman-dragged':
            this._removeClasses(
              this._pegman,
              'can-drop dragged left right active dropped'
            ),
              this._removeAttributes(this._pegman, [
                'style',
                'data-x',
                'data-y',
              ]);
            break;
          case 'dropzone-actived':
            this._addClasses(this._map._container, 'drop-active');
            break;
          case 'dropzone-drag-entered':
            this._addClasses(this._pegman, 'active can-drop'),
              this._addClasses(this._map._container, 'drop-target');
            break;
          case 'dropzone-drag-leaved':
            this._removeClasses(this._map._container, 'drop-target'),
              this._removeClasses(this._pegman, 'can-drop');
            break;
          case 'dropzone-drop':
            this._removeClasses(this._container, 'dragging'),
              this._removeClasses(this._pegman, 'active left right'),
              this._addClasses(this._pegman, 'dropped'),
              this._removeClasses(
                this._pegman,
                'can-drop dragged left right active dropped'
              );
            break;
          case 'dropzone-deactivated':
            this._removeClasses(this._pegman, 'active left right'),
              this._removeClasses(
                this._map._container,
                'drop-active drop-target'
              );
            break;
          case 'mousemove-top':
            this._addClasses(this._pegman, 'top'),
              this._removeClasses(this._pegman, 'bottom right left');
            break;
          case 'mousemove-bottom':
            this._addClasses(this._pegman, 'bottom'),
              this._removeClasses(this._pegman, 'top right left');
            break;
          case 'mousemove-left':
            this._addClasses(this._pegman, 'left'),
              this._removeClasses(this._pegman, 'right top bottom');
            break;
          case 'mousemove-right':
            this._addClasses(this._pegman, 'right'),
              this._removeClasses(this._pegman, 'left top bottom');
            break;
          case 'pegman-added':
            this._addClasses(this._container, 'active');
            break;
          case 'pegman-removed':
            this._removeClasses(this._container, 'active');
            break;
          case 'streetview-shown':
            this._addClasses(this._container, 'streetview-layer-active');
            break;
          case 'streetview-hidden':
            this._removeClasses(this._container, 'streetview-layer-active');
            break;
          default:
            throw 'Unhandled event:' + t;
        }
        this._log(t), this.fireEvent('svpc_' + t);
      },
      onDraggableMove: function (t) {
        this.mouseMoveTracking(t),
          this.pegmanRemove(),
          this._updateClasses('pegman-dragging'),
          this._translateElement(this._pegman, t.dx, t.dy);
      },
      onDraggableEnd: function (t) {
        (this._pegmanMarkerCoords = this._map.mouseEventToLatLng(t)),
          this.pegmanAdd(),
          this._updateClasses('pegman-dragged');
      },
      onDropZoneActivated: function (t) {
        this._updateClasses('dropzone-actived');
      },
      onDropZoneDragEntered: function (t) {
        this.showStreetViewLayer(),
          this._updateClasses('dropzone-drag-entered');
      },
      onDropZoneDragLeaved: function (t) {
        this._updateClasses('dropzone-drag-leaved');
      },
      onDropZoneDropped: function (t) {
        this._updateClasses('dropzone-drop'),
          this._translateElement(this._pegman, !1, !1);
      },
      onDropZoneDeactivated: function (t) {
        this._updateClasses('dropzone-deactivated');
      },
      onPegmanMarkerDragged: function (t) {
        (this._pegmanMarkerCoords = this._pegmanMarker.getLatLng()),
          this.findStreetViewData(
            this._pegmanMarkerCoords.lat,
            this._pegmanMarkerCoords.lng
          );
      },
      onMapClick: function (t) {
        this._streetViewLayerEnabled &&
          this.findStreetViewData(t.latlng.lat, t.latlng.lng);
      },
      onMapLayerAdd: function (t) {
        this._googleStreetViewLayer &&
          this._googleStreetViewLayer.bringToFront();
      },
      onStreetViewPanoramaClose: function () {
        this.clear();
      },
      clear: function () {
        this.pegmanRemove(),
          this.hideStreetViewLayer(),
          this.closeStreetViewPanorama();
      },
      toggleStreetViewLayer: function (t) {
        this._streetViewLayerEnabled
          ? this.clear()
          : this.showStreetViewLayer(),
          this._log('streetview-layer-toggled');
      },
      pegmanAdd: function () {
        this._pegmanMarker.addTo(this._map),
          this._pegmanMarker.setLatLng(this._pegmanMarkerCoords),
          this.findStreetViewData(
            this._pegmanMarkerCoords.lat,
            this._pegmanMarkerCoords.lng
          ),
          this._updateClasses('pegman-added');
      },
      pegmanRemove: function () {
        this._pegmanMarker.removeFrom(this._map),
          this._updateClasses('pegman-removed');
      },
      closeStreetViewPanorama: function () {
        this._panoDiv.style.display = 'none';
      },
      openStreetViewPanorama: function () {
        this._panoDiv.style.display = 'block';
      },
      hideStreetViewLayer: function () {
        this._googleStreetViewLayer &&
          (this._googleStreetViewLayer.removeFrom(this._map),
          (this._streetViewLayerEnabled = !1),
          this._updateClasses('streetview-hidden'));
      },
      showStreetViewLayer: function () {
        this._googleStreetViewLayer &&
          (this._googleStreetViewLayer.addTo(this._map),
          (this._streetViewLayerEnabled = !0),
          this._updateClasses('streetview-shown'));
      },
      findStreetViewData: function (t, e) {
        this._streetViewCoords = new google.maps.LatLng(t, e);
        var i = this._map.getZoom(),
          o = 100;
        (o = i < 6 ? 5e3 : i < 10 ? 500 : i < 15 ? 250 : i >= 17 ? 50 : 100),
          this._streetViewService.getPanoramaByLocation(
            this._streetViewCoords,
            o,
            L.bind(this.processStreetViewServiceData, this)
          );
      },
      processStreetViewServiceData: function (t, e) {
        e == google.maps.StreetViewStatus.OK
          ? (this.openStreetViewPanorama(),
            this._panorama.setPano(t.location.pano),
            this._panorama.setPov({
              heading: google.maps.geometry.spherical.computeHeading(
                t.location.latLng,
                this._streetViewCoords
              ),
              pitch: 0,
              zoom: 0,
            }),
            this._panorama.setVisible(!0))
          : this._log('Street View data not found for this location.');
      },
      mouseMoveTracking: function (t) {
        var e = this._mousePos;
        t.pageY < e.old.y
          ? ((e.direction.y = 'top'), this._updateClasses('mousemove-top'))
          : t.pageY > e.old.y &&
            ((e.direction.y = 'bottom'),
            this._updateClasses('mousemove-bottom')),
          t.pageX < e.old.x
            ? ((e.direction.x = 'left'), this._updateClasses('mousemove-left'))
            : t.pageX > e.old.x &&
              ((e.direction.x = 'right'),
              this._updateClasses('mousemove-right')),
          (e.old.x = t.pageX),
          (e.old.y = t.pageY);
      },
      keyUpTracking: function (t) {
        27 == t.keyCode && (this._log('escape pressed'), this.clear());
      },
      _disableClickPropagation: function (t) {
        L.DomEvent.stopPropagation(t), L.DomEvent.preventDefault(t);
      },
      _loadGoogleHandlers: function () {
        'object' == typeof google &&
          'object' == typeof google.maps &&
          'function' == typeof L.GridLayer.GoogleMutant &&
          (this._initGoogleMaps(), this._initMouseTracker());
      },
      _initGoogleMaps: function () {
        (this._googleStreetViewLayer = L.gridLayer.googleMutant(
          this.options.mutant
        )),
          this._googleStreetViewLayer.addGoogleLayer('StreetViewCoverageLayer'),
          (this._panorama = new google.maps.StreetViewPanorama(
            this._panoDiv,
            this.options.pano
          )),
          (this._streetViewService = new google.maps.StreetViewService()),
          google.maps.event.addListener(
            this._panorama,
            'closeclick',
            L.bind(this.onStreetViewPanoramaClose, this)
          );
      },
      _initMouseTracker: function () {
        if (this._googleStreetViewLayer) {
          var t = this._googleStreetViewLayer.getTileSize();
          (this.tileWidth = t.x),
            (this.tileHeight = t.y),
            (this.defaultDraggableCursor = this._map._container.style.cursor),
            this._map.on('mousemove', this._setMouseCursor, this);
        }
      },
      _setMouseCursor: function (t) {
        var e = this._getTileCoords(
            t.latlng.lat,
            t.latlng.lng,
            this._map.getZoom()
          ),
          i = this._getTileImage(e),
          o = this._getTilePixelPoint(i, t.originalEvent),
          n = this._hasTileData(i, o);
        this._map._container.style.cursor = n
          ? 'pointer'
          : this.defaultDraggableCursor;
      },
      _getTileCoords: function (t, e, i) {
        return {
          x: parseInt(Math.floor(((e + 180) / 360) * (1 << i))),
          y: parseInt(
            Math.floor(
              ((1 -
                Math.log(
                  Math.tan(this._toRad(t)) + 1 / Math.cos(this._toRad(t))
                ) /
                  Math.PI) /
                2) *
                (1 << i)
            )
          ),
          z: i,
        };
      },
      _getTileImage: function (t) {
        if (this._googleStreetViewLayer && this._googleStreetViewLayer._tiles) {
          var e = this._googleStreetViewLayer._tileCoordsToKey(t),
            i = this._googleStreetViewLayer._tiles[e];
          if (i) {
            var o = i.el.querySelector('img');
            if (o) return this._downloadTile(o.src, this._tileLoaded), o;
          }
        }
      },
      _getTilePixelPoint: function (t, e) {
        if (t) {
          var i = t.getBoundingClientRect(),
            o = (i.top + window.scrollY).toFixed(0),
            n = (i.left + window.scrollX).toFixed(0);
          return { x: e.pageX - n, y: e.pageY - o };
        }
      },
      _hasTileData: function (t, e) {
        if (this.tileContext && e)
          return 0 != this.tileContext.getImageData(e.x, e.y, 1, 1).data[3];
      },
      _toRad: function (t) {
        return (t * Math.PI) / 180;
      },
      _downloadTile: function (t, e) {
        if (t) {
          var i = new Image();
          (i.crossOrigin = 'Anonymous'),
            i.addEventListener('load', e.bind(this, i), !1),
            (i.src = t);
        }
      },
      _tileLoaded: function (t) {
        (this.tileCanvas = document.createElement('canvas')),
          (this.tileContext = this.tileCanvas.getContext('2d')),
          (this.tileCanvas.width = this.tileWidth),
          (this.tileCanvas.height = this.tileHeight),
          this.tileContext.drawImage(t, 0, 0);
      },
      _loadInteractHandlers: function () {
        'function' == typeof interact &&
          ((this._draggable = interact(this._pegman).draggable(
            this._draggableMarkerOpts
          )),
          (this._dropzone = interact(this._map._container).dropzone(
            this._dropzoneMapOpts
          )),
          this._draggable.styleCursor(!1),
          interact(this._container).on(
            'tap',
            L.bind(this.toggleStreetViewLayer, this)
          ),
          L.DomEvent.on(
            this._container,
            'touchstart',
            function (t) {
              this._map.dragging.disable();
            },
            this
          ),
          L.DomEvent.on(
            this._container,
            'touchend',
            function (t) {
              this._map.dragging.enable();
            },
            this
          ));
      },
      _loadScripts: function (t) {
        if (!this._lazyLoaderAdded) {
          if (((this._lazyLoaderAdded = !0), 'function' != typeof interact)) {
            var e = this.__interactURL;
            this._loadJS(
              e,
              function () {
                this._log('interact.js loaded'), this._loadInteractHandlers();
              }.bind(this)
            );
          }
          if ('object' != typeof google || 'object' != typeof google.maps) {
            var i =
              this.__gmapsURL +
              '&key=' +
              this.options.apiKey +
              '&libraries=' +
              this.options.libraries +
              '&callback=?';
            this._loadJS(
              i,
              function () {
                this._log('gmaps.js loaded'),
                  this._loadGoogleHandlers(),
                  t && this.toggleStreetViewLayer();
              }.bind(this)
            );
          }
          if ('function' != typeof L.GridLayer.GoogleMutant) {
            var o = this.__mutantURL;
            this._loadJS(
              o,
              function () {
                this._log('Leaflet.GoogleMutant.js loaded'),
                  this._loadGoogleHandlers(),
                  t && this.toggleStreetViewLayer();
              }.bind(this)
            );
          }
        }
      },
      _loadJS: function (t, e) {
        if (-1 !== t.indexOf('callback=?')) this._jsonp(t, e);
        else {
          var i = document.createElement('script');
          i.src = t;
          i.onload = i.onreadystatechange = function () {
            (i.onload = i.onreadystatechange = null), e();
          };
          var o =
            document.head ||
            document.getElementsByTagName('head')[0] ||
            document.documentElement;
          o.insertBefore(i, o.firstChild);
        }
      },
      _jsonp: function (t, e, i) {
        var o = -1 === t.indexOf('?') ? '?' : '&';
        for (var n in (i = i || {}))
          i.hasOwnProperty(n) &&
            (o += encodeURIComponent(n) + '=' + encodeURIComponent(i[n]) + '&');
        var s = 'json_call_' + new Date().getUTCMilliseconds();
        window[s] = function (t) {
          e(t), (window[s] = void 0);
        };
        var a = document.createElement('script');
        -1 !== t.indexOf('callback=?')
          ? (a.src = t.replace('callback=?', 'callback=' + s) + o.slice(0, -1))
          : (a.src = t + o + 'callback=' + s);
        (a.async = !0),
          (a.onload = a.onreadystatechange =
            function () {
              (this.readyState &&
                'loaded' !== this.readyState &&
                'complete' !== this.readyState) ||
                ((a.onload = a.onreadystatechange = null),
                a && a.parentNode && a.parentNode.removeChild(a));
            });
        var r =
          document.head ||
          document.getElementsByTagName('head')[0] ||
          document.documentElement;
        r.insertBefore(a, r.firstChild);
      },
    })),
    (L.control.pegman = function (t) {
      return new L.Control.Pegman(t);
    }),
    (function (t, e) {
      'object' == typeof exports && 'undefined' != typeof module
        ? e(exports)
        : 'function' == typeof define && define.amd
        ? define('leaflet-gesture-handling', ['exports'], e)
        : e(((t = t || self)['leaflet-gesture-handling'] = {}));
    })(void 0, function (t) {
      var e = {
          ar: {
            touch: 'استخدم إصبعين لتحريك الخريطة',
            scroll: '‏استخدم ctrl + scroll لتصغير/تكبير الخريطة',
            scrollMac: 'يمكنك استخدام ⌘ + التمرير لتكبير/تصغير الخريطة',
          },
          bg: {
            touch: 'Използвайте два пръста, за да преместите картата',
            scroll:
              'Задръжте бутона Ctrl натиснат, докато превъртате, за да промените мащаба на картата',
            scrollMac:
              'Задръжте бутона ⌘ натиснат, докато превъртате, за да промените мащаба на картата',
          },
          bn: {
            touch: 'মানচিত্রটিকে সরাতে দুটি আঙ্গুল ব্যবহার করুন',
            scroll: 'ম্যাপ জুম করতে ctrl + scroll ব্যবহার করুন',
            scrollMac: 'ম্যাপে জুম করতে ⌘ বোতাম টিপে স্ক্রল করুন',
          },
          ca: {
            touch: 'Fes servir dos dits per moure el mapa',
            scroll:
              'Prem la tecla Control mentre et desplaces per apropar i allunyar el mapa',
            scrollMac:
              'Prem la tecla ⌘ mentre et desplaces per apropar i allunyar el mapa',
          },
          cs: {
            touch: 'K posunutí mapy použijte dva prsty',
            scroll:
              'Velikost zobrazení mapy změňte podržením klávesy Ctrl a posouváním kolečka myši',
            scrollMac:
              'Velikost zobrazení mapy změníte podržením klávesy ⌘ a posunutím kolečka myši / touchpadu',
          },
          da: {
            touch: 'Brug to fingre til at flytte kortet',
            scroll:
              'Brug ctrl + rullefunktionen til at zoome ind og ud på kortet',
            scrollMac:
              'Brug ⌘ + rullefunktionen til at zoome ind og ud på kortet',
          },
          de: {
            touch: 'Verschieben der Karte mit zwei Fingern',
            scroll: 'Verwende Strg+Scrollen zum Zoomen der Karte',
            scrollMac: '⌘',
          },
          el: {
            touch: 'Χρησιμοποιήστε δύο δάχτυλα για μετακίνηση στον χάρτη',
            scroll:
              'Χρησιμοποιήστε το πλήκτρο Ctrl και κύλιση, για να μεγεθύνετε τον χάρτη',
            scrollMac:
              'Χρησιμοποιήστε το πλήκτρο ⌘ + κύλιση για εστίαση στον χάρτη',
          },
          en: {
            touch: 'Use two fingers to move the map',
            scroll: 'Use ctrl + scroll to zoom the map',
            scrollMac: 'Use ⌘ + scroll to zoom the map',
          },
          'en-AU': {
            touch: 'Use two fingers to move the map',
            scroll: 'Use ctrl + scroll to zoom the map',
            scrollMac: 'Use ⌘ + scroll to zoom the map',
          },
          'en-GB': {
            touch: 'Use two fingers to move the map',
            scroll: 'Use ctrl + scroll to zoom the map',
            scrollMac: 'Use ⌘ + scroll to zoom the map',
          },
          es: {
            touch: 'Para mover el mapa, utiliza dos dedos',
            scroll:
              'Mantén pulsada la tecla Ctrl mientras te desplazas para acercar o alejar el mapa',
            scrollMac:
              'Mantén pulsada la tecla ⌘ mientras te desplazas para acercar o alejar el mapa',
          },
          eu: {
            touch: 'Erabili bi hatz mapa mugitzeko',
            scroll:
              'Mapan zooma aplikatzeko, sakatu Ktrl eta egin gora edo behera',
            scrollMac:
              'Eduki sakatuta ⌘ eta egin gora eta behera mapa handitu eta txikitzeko',
          },
          fa: {
            touch: 'برای حرکت دادن نقشه از دو انگشت استفاده کنید.',
            scroll: '‏برای بزرگ‌نمایی نقشه از ctrl + scroll استفاده کنید',
            scrollMac: 'برای بزرگ‌نمایی نقشه، از ⌘ + پیمایش استفاده کنید.',
          },
          fi: {
            touch: 'Siirrä karttaa kahdella sormella.',
            scroll:
              'Zoomaa karttaa painamalla Ctrl-painiketta ja vierittämällä.',
            scrollMac:
              'Zoomaa karttaa pitämällä painike ⌘ painettuna ja vierittämällä.',
          },
          fil: {
            touch: 'Gumamit ng dalawang daliri upang iusog ang mapa',
            scroll: 'Gamitin ang ctrl + scroll upang i-zoom ang mapa',
            scrollMac: 'Gamitin ang ⌘ + scroll upang i-zoom ang mapa',
          },
          fr: {
            touch: 'Utilisez deux doigts pour déplacer la carte',
            scroll:
              "Vous pouvez zoomer sur la carte à l'aide de CTRL+Molette de défilement",
            scrollMac:
              "Vous pouvez zoomer sur la carte à l'aide de ⌘+Molette de défilement",
          },
          gl: {
            touch: 'Utiliza dous dedos para mover o mapa',
            scroll: 'Preme Ctrl mentres te desprazas para ampliar o mapa',
            scrollMac: 'Preme ⌘ e desprázate para ampliar o mapa',
          },
          gu: {
            touch: 'નકશો ખસેડવા બે આંગળીઓનો ઉપયોગ કરો',
            scroll: 'નકશાને ઝૂમ કરવા માટે ctrl + સ્ક્રોલનો ઉપયોગ કરો',
            scrollMac: 'નકશાને ઝૂમ કરવા ⌘ + સ્ક્રોલનો ઉપયોગ કરો',
          },
          hi: {
            touch:
              'मैप एक जगह से दूसरी जगह ले जाने के लिए दो उंगलियों का इस्तेमाल करें',
            scroll: 'मैप को ज़ूम करने के लिए ctrl + स्क्रोल का उपयोग करें',
            scrollMac: 'मैप को ज़ूम करने के लिए ⌘ + स्क्रोल का उपयोग करें',
          },
          hr: {
            touch: 'Pomičite kartu pomoću dva prsta',
            scroll: 'Upotrijebite Ctrl i klizač miša da biste zumirali kartu',
            scrollMac: 'Upotrijebite gumb ⌘ dok se pomičete za zumiranje karte',
          },
          hu: {
            touch: 'Két ujjal mozgassa a térképet',
            scroll: 'A térkép a ctrl + görgetés használatával nagyítható',
            scrollMac: 'A térkép a ⌘ + görgetés használatával nagyítható',
          },
          id: {
            touch: 'Gunakan dua jari untuk menggerakkan peta',
            scroll:
              'Gunakan ctrl + scroll untuk memperbesar atau memperkecil peta',
            scrollMac:
              'Gunakan ⌘ + scroll untuk memperbesar atau memperkecil peta',
          },
          it: {
            touch: 'Utilizza due dita per spostare la mappa',
            scroll:
              'Utilizza CTRL + scorrimento per eseguire lo zoom della mappa',
            scrollMac:
              'Utilizza ⌘ + scorrimento per eseguire lo zoom della mappa',
          },
          iw: {
            touch: 'הזז את המפה באמצעות שתי אצבעות',
            scroll: '‏אפשר לשנות את מרחק התצוגה במפה באמצעות מקש ctrl וגלילה',
            scrollMac: 'אפשר לשנות את מרחק התצוגה במפה באמצעות מקש ⌘ וגלילה',
          },
          ja: {
            touch: '地図を移動させるには指 2 本で操作します',
            scroll:
              '地図をズームするには、Ctrl キーを押しながらスクロールしてください',
            scrollMac:
              '地図をズームするには、⌘ キーを押しながらスクロールしてください',
          },
          kn: {
            touch: 'Use two fingers to move the map',
            scroll: 'Use Ctrl + scroll to zoom the map',
            scrollMac: 'Use ⌘ + scroll to zoom the map',
          },
          ko: {
            touch: '지도를 움직이려면 두 손가락을 사용하세요.',
            scroll: '지도를 확대/축소하려면 Ctrl을 누른 채 스크롤하세요.',
            scrollMac: '지도를 확대하려면 ⌘ + 스크롤 사용',
          },
          lt: {
            touch: 'Perkelkite žemėlapį dviem pirštais',
            scroll:
              'Slinkite nuspaudę klavišą „Ctrl“, kad pakeistumėte žemėlapio mastelį',
            scrollMac:
              'Paspauskite klavišą ⌘ ir slinkite, kad priartintumėte žemėlapį',
          },
          lv: {
            touch: 'Lai pārvietotu karti, bīdiet to ar diviem pirkstiem',
            scroll: 'Kartes tālummaiņai izmantojiet ctrl + ritināšanu',
            scrollMac:
              'Lai veiktu kartes tālummaiņu, izmantojiet ⌘ + ritināšanu',
          },
          ml: {
            touch: 'മാപ്പ് നീക്കാൻ രണ്ട് വിരലുകൾ ഉപയോഗിക്കുക',
            scroll: 'കൺട്രോൾ + സ്‌ക്രോൾ ഉപയോഗിച്ച് ‌മാപ്പ് ‌സൂം ചെയ്യുക',
            scrollMac: '⌘ + സ്‌ക്രോൾ ഉപയോഗിച്ച് ‌മാപ്പ് ‌സൂം ചെയ്യുക',
          },
          mr: {
            touch: 'नकाशा हलविण्यासाठी दोन बोटे वापरा',
            scroll: 'नकाशा झूम करण्यासाठी ctrl + scroll वापरा',
            scrollMac: 'नकाशावर झूम करण्यासाठी ⌘ + स्क्रोल वापरा',
          },
          nl: {
            touch: 'Gebruik twee vingers om de kaart te verplaatsen',
            scroll:
              'Gebruik Ctrl + scrollen om in- en uit te zoomen op de kaart',
            scrollMac:
              'Gebruik ⌘ + scrollen om in en uit te zoomen op de kaart',
          },
          no: {
            touch: 'Bruk to fingre for å flytte kartet',
            scroll: 'Hold ctrl-tasten inne og rull for å zoome på kartet',
            scrollMac: 'Hold inne ⌘-tasten og rull for å zoome på kartet',
          },
          pl: {
            touch: 'Przesuń mapę dwoma palcami',
            scroll: 'Naciśnij CTRL i przewiń, by przybliżyć mapę',
            scrollMac: 'Naciśnij ⌘ i przewiń, by przybliżyć mapę',
          },
          pt: {
            touch: 'Use dois dedos para mover o mapa',
            scroll:
              'Pressione Ctrl e role a tela simultaneamente para aplicar zoom no mapa',
            scrollMac:
              'Use ⌘ e role a tela simultaneamente para aplicar zoom no mapa',
          },
          'pt-BR': {
            touch: 'Use dois dedos para mover o mapa',
            scroll:
              'Pressione Ctrl e role a tela simultaneamente para aplicar zoom no mapa',
            scrollMac:
              'Use ⌘ e role a tela simultaneamente para aplicar zoom no mapa',
          },
          'pt-PT': {
            touch: 'Utilize dois dedos para mover o mapa',
            scroll:
              'Utilizar ctrl + deslocar para aumentar/diminuir zoom do mapa',
            scrollMac:
              'Utilize ⌘ + deslocar para aumentar/diminuir o zoom do mapa',
          },
          ro: {
            touch: 'Folosiți două degete pentru a deplasa harta',
            scroll:
              'Apăsați tasta ctrl și derulați simultan pentru a mări harta',
            scrollMac: 'Folosiți ⌘ și derulați pentru a mări/micșora harta',
          },
          ru: {
            touch: 'Чтобы переместить карту, проведите по ней двумя пальцами',
            scroll:
              'Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl.',
            scrollMac: 'Чтобы изменить масштаб, нажмите ⌘ + прокрутка',
          },
          sk: {
            touch: 'Mapu môžete posunúť dvoma prstami',
            scroll: 'Ak chcete priblížiť mapu, stlačte kláves ctrl a posúvajte',
            scrollMac:
              'Ak chcete priblížiť mapu, stlačte kláves ⌘ a posúvajte kolieskom myši',
          },
          sl: {
            touch: 'Premaknite zemljevid z dvema prstoma',
            scroll:
              'Zemljevid povečate tako, da držite tipko Ctrl in vrtite kolesce na miški',
            scrollMac:
              'Uporabite ⌘ + funkcijo pomika, da povečate ali pomanjšate zemljevid',
          },
          sr: {
            touch: 'Мапу померајте помоћу два прста',
            scroll:
              'Притисните ctrl тастер док померате да бисте зумирали мапу',
            scrollMac:
              'Притисните тастер ⌘ док померате да бисте зумирали мапу',
          },
          sv: {
            touch: 'Använd två fingrar för att flytta kartan',
            scroll: 'Använd ctrl + rulla för att zooma kartan',
            scrollMac: 'Använd ⌘ + rulla för att zooma på kartan',
          },
          ta: {
            touch: 'மேப்பை நகர்த்த இரண்டு விரல்களைப் பயன்படுத்தவும்',
            scroll:
              'மேப்பை பெரிதாக்கி/சிறிதாக்கிப் பார்க்க, ctrl பட்டனைப் பிடித்தபடி, மேலே/கீழே ஸ்க்ரால் செய்யவும்',
            scrollMac:
              'மேப்பை பெரிதாக்கி/சிறிதாக்கிப் பார்க்க, ⌘ பட்டனைப் பிடித்தபடி, மேலே/கீழே ஸ்க்ரால் செய்யவும்',
          },
          te: {
            touch: 'మ్యాప్‌ని తరలించడం కోసం రెండు వేళ్లను ఉపయోగించండి',
            scroll:
              'మ్యాప్‌ని జూమ్ చేయడానికి ctrl బటన్‌ను నొక్కి ఉంచి, స్క్రోల్ చేయండి',
            scrollMac: 'మ్యాప్ జూమ్ చేయాలంటే ⌘ + స్క్రోల్ ఉపయోగించండి',
          },
          th: {
            touch: 'ใช้ 2 นิ้วเพื่อเลื่อนแผนที่',
            scroll: 'กด Ctrl ค้างไว้ แล้วเลื่อนหน้าจอเพื่อซูมแผนที่',
            scrollMac: 'กด ⌘ แล้วเลื่อนหน้าจอเพื่อซูมแผนที่',
          },
          tl: {
            touch: 'Gumamit ng dalawang daliri upang iusog ang mapa',
            scroll: 'Gamitin ang ctrl + scroll upang i-zoom ang mapa',
            scrollMac: 'Gamitin ang ⌘ + scroll upang i-zoom ang mapa',
          },
          tr: {
            touch: 'Haritada gezinmek için iki parmağınızı kullanın',
            scroll:
              'Haritayı yakınlaştırmak için ctrl + kaydırma kombinasyonunu kullanın',
            scrollMac:
              'Haritayı yakınlaştırmak için ⌘ tuşuna basıp ekranı kaydırın',
          },
          uk: {
            touch: 'Переміщуйте карту двома пальцями',
            scroll:
              'Щоб змінювати масштаб карти, прокручуйте коліщатко миші, утримуючи клавішу Ctrl',
            scrollMac:
              'Щоб змінити масштаб карти, використовуйте ⌘ + прокручування',
          },
          vi: {
            touch: 'Sử dụng hai ngón tay để di chuyển bản đồ',
            scroll: 'Sử dụng ctrl + cuộn để thu phóng bản đồ',
            scrollMac: 'Sử dụng ⌘ + cuộn để thu phóng bản đồ',
          },
          'zh-CN': {
            touch: '使用双指移动地图',
            scroll: '按住 Ctrl 并滚动鼠标滚轮才可缩放地图',
            scrollMac: '按住 ⌘ 并滚动鼠标滚轮才可缩放地图',
          },
          'zh-TW': {
            touch: '同時以兩指移動地圖',
            scroll: '按住 ctrl 鍵加上捲動滑鼠可以縮放地圖',
            scrollMac: '按 ⌘ 加上滾動捲軸可以縮放地圖',
          },
        },
        i = !1,
        o = { text: {}, duration: 1700 },
        n = L.Handler.extend({
          _isScrolling: !1,
          _isTouching: !1,
          _isFading: !1,
          addHooks: function () {
            (this._handleTouch = L.bind(this._handleTouch, this)),
              this._setGestureHandlingOptions(),
              this._disableInteractions(),
              this._map._container.addEventListener(
                'touchstart',
                this._handleTouch
              ),
              this._map._container.addEventListener(
                'touchmove',
                this._handleTouch
              ),
              this._map._container.addEventListener(
                'touchend',
                this._handleTouch
              ),
              this._map._container.addEventListener(
                'touchcancel',
                this._handleTouch
              ),
              this._map._container.addEventListener('click', this._handleTouch),
              L.DomEvent.on(
                this._map._container,
                'mousewheel',
                this._handleScroll,
                this
              ),
              L.DomEvent.on(
                this._map,
                'mouseover',
                this._handleMouseOver,
                this
              ),
              L.DomEvent.on(this._map, 'mouseout', this._handleMouseOut, this),
              L.DomEvent.on(this._map, 'movestart', this._handleDragging, this),
              L.DomEvent.on(this._map, 'move', this._handleDragging, this),
              L.DomEvent.on(this._map, 'moveend', this._handleDragging, this),
              L.DomEvent.off(
                this._map,
                'enterFullscreen',
                this._onEnterFullscreen,
                this
              ),
              L.DomEvent.off(
                this._map,
                'exitFullscreen',
                this._onExitFullscreen,
                this
              ),
              L.DomEvent.on(
                this._map,
                'enterFullscreen',
                this._onEnterFullscreen,
                this
              ),
              L.DomEvent.on(
                this._map,
                'exitFullscreen',
                this._onExitFullscreen,
                this
              ),
              L.DomUtil.addClass(
                this._map._container,
                'leaflet-gesture-handling'
              );
          },
          removeHooks: function () {
            this._enableInteractions(),
              this._map._container.removeEventListener(
                'touchstart',
                this._handleTouch
              ),
              this._map._container.removeEventListener(
                'touchmove',
                this._handleTouch
              ),
              this._map._container.removeEventListener(
                'touchend',
                this._handleTouch
              ),
              this._map._container.removeEventListener(
                'touchcancel',
                this._handleTouch
              ),
              this._map._container.removeEventListener(
                'click',
                this._handleTouch
              ),
              L.DomEvent.off(
                this._map._container,
                'mousewheel',
                this._handleScroll,
                this
              ),
              L.DomEvent.off(
                this._map,
                'mouseover',
                this._handleMouseOver,
                this
              ),
              L.DomEvent.off(this._map, 'mouseout', this._handleMouseOut, this),
              L.DomEvent.off(
                this._map,
                'movestart',
                this._handleDragging,
                this
              ),
              L.DomEvent.off(this._map, 'move', this._handleDragging, this),
              L.DomEvent.off(this._map, 'moveend', this._handleDragging, this),
              L.DomUtil.removeClass(
                this._map._container,
                'leaflet-gesture-handling'
              );
          },
          _handleDragging: function (t) {
            'movestart' == t.type || 'move' == t.type
              ? (i = !0)
              : 'moveend' == t.type && (i = !1);
          },
          _disableInteractions: function () {
            this._map.dragging.disable(),
              this._map.scrollWheelZoom.disable(),
              this._map.tap && this._map.tap.disable();
          },
          _enableInteractions: function () {
            this._map.dragging.enable(),
              this._map.scrollWheelZoom.enable(),
              this._map.tap && this._map.tap.enable();
          },
          _enableWarning: function (t) {
            clearTimeout(this._isFading),
              L.DomUtil.addClass(
                this._map._container,
                'leaflet-gesture-handling-' + t
              ),
              L.DomUtil.addClass(
                this._map._container,
                'leaflet-gesture-handling-warning'
              );
          },
          _disableWarning: function (t, e) {
            clearTimeout(this._isFading),
              (this._isFading = setTimeout(
                L.bind(
                  function (t) {
                    L.DomUtil.removeClass(
                      this._map._container,
                      'leaflet-gesture-handling-' + t
                    );
                  },
                  this,
                  t
                ),
                e || this._map.options.gestureHandlingOptions.duration
              )),
              L.DomUtil.removeClass(
                this._map._container,
                'leaflet-gesture-handling-warning'
              );
          },
          _isLanguageContent: function (t) {
            return t && t.touch && t.scroll && t.scrollMac;
          },
          _isMacUser: function () {
            return 0 <= navigator.platform.toUpperCase().indexOf('MAC');
          },
          _parseGestureHandlingOptions: function () {
            var t = L.extend(this._map.options.gestureHandlingOptions, o);
            return (
              this._map.options.gestureHandlingText &&
                (t.text = this._map.options.gestureHandlingText),
              t
            );
          },
          _setGestureHandlingOptions: function () {
            var t = this._parseGestureHandlingOptions(),
              e = this._isLanguageContent(t.text)
                ? t.text
                : this._getLanguageContent(t.locale);
            this._map._container.setAttribute(
              'data-gesture-handling-touch-content',
              e.touch
            ),
              this._map._container.setAttribute(
                'data-gesture-handling-scroll-content',
                e.scroll
              ),
              (this._touchWarning = e.touch),
              (this._scrollWarning = e.scroll);
          },
          _getUserLanguage: function () {
            return navigator.languages
              ? navigator.languages[0]
              : navigator.language || navigator.userLanguage;
          },
          _getLanguageContent: function (t) {
            t = t || this._getUserLanguage() || 'en';
            var i = e[t];
            return (
              ((i =
                (i = i || -1 === t.indexOf('-') ? i : e[t.split('-')[0]]) ||
                e.en).scroll = this._isMacUser() ? i.scrollMac : i.scroll),
              i
            );
          },
          _hasClass: function (t, e) {
            for (var i = 0; i < e.length; i++)
              if (L.DomUtil.hasClass(t, e[i])) return !0;
            return !1;
          },
          _handleTouch: function (t) {
            this._hasClass(t.target, [
              'leaflet-control-minimap',
              'leaflet-interactive',
              'leaflet-popup-content',
              'leaflet-popup-content-wrapper',
              'leaflet-popup-close-button',
              'leaflet-control-zoom-in',
              'leaflet-control-zoom-out',
            ])
              ? L.DomUtil.hasClass(t.target, 'leaflet-interactive') &&
                'touchmove' === t.type &&
                1 === t.touches.length
                ? this._enableTouchWarning()
                : this._disableTouchWarning()
              : 'touchmove' !== t.type && 'touchstart' !== t.type
              ? this._disableTouchWarning()
              : 1 === t.touches.length
              ? this._enableTouchWarning()
              : this._disableTouchWarning();
          },
          _enableTouchWarning: function () {
            this._enableWarning('touch'), this._disableInteractions();
          },
          _disableTouchWarning: function (t) {
            clearTimeout(this._isTouching),
              (this._isTouching = setTimeout(
                L.bind(function () {
                  this._disableWarning('touch'), this._enableInteractions();
                }, this),
                t || 0
              ));
          },
          _enableScrollWarning: function () {
            this._enableWarning('scroll'), this._map.scrollWheelZoom.disable();
          },
          _disableScrollWarning: function (t) {
            clearTimeout(this._isScrolling),
              (this._isScrolling = setTimeout(
                L.bind(function () {
                  this._disableWarning('scroll'),
                    this._map.scrollWheelZoom.enable();
                }, this),
                t || 0
              ));
          },
          _handleScroll: function (t) {
            t.metaKey || t.ctrlKey
              ? (t.preventDefault(), this._disableScrollWarning())
              : (this._enableScrollWarning(),
                this._disableScrollWarning(
                  this._map.options.gestureHandlingOptions.duration
                ));
          },
          _handleMouseOver: function (t) {
            this._enableInteractions();
          },
          _handleMouseOut: function (t) {
            i || this._disableInteractions();
          },
          _onExitFullscreen: function () {
            this._map.options.gestureHandling &&
              this._map.gestureHandling.enable();
          },
          _onEnterFullscreen: function () {
            this._map.options.gestureHandling &&
              this._map.gestureHandling.disable();
          },
        });
      L.Map.mergeOptions({ gestureHandlingOptions: o }),
        L.Map.addInitHook('addHandler', 'gestureHandling', n),
        (t.GestureHandling = n),
        (t.default = n),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (t = L.Control.Layers.prototype),
    (e = t.initialize),
    (o = t.onAdd),
    (t.options.inline = !1),
    L.Control.Layers.include({
      initialize: function (t, i, o) {
        o.inline && (o.collapsed = !1), e.call(this, t, i, o);
      },
      onAdd: function (t) {
        return (
          o.call(this, t),
          this.options.inline &&
            ((this.options.collapsed = !1),
            L.DomUtil.addClass(
              this._container,
              'leaflet-control-layers-inline'
            )),
          this._container
        );
      },
    }),
    (function (t, e) {
      'function' == typeof define && define.amd
        ? define(['leaflet'], t)
        : 'object' == typeof exports &&
          (module.exports = t(require('leaflet'))),
        void 0 !== e &&
          e.L &&
          ((e.L.Control.MiniMap = t(L)),
          (e.L.control.minimap = function (t, i) {
            return new e.L.Control.MiniMap(t, i);
          }));
    })(function (t) {
      var e = t.Control.extend({
        includes: t.Evented ? t.Evented.prototype : t.Mixin.Events,
        options: {
          position: 'bottomright',
          toggleDisplay: !1,
          zoomLevelOffset: -5,
          zoomLevelFixed: !1,
          centerFixed: !1,
          zoomAnimation: !1,
          autoToggleDisplay: !1,
          minimized: !1,
          width: 150,
          height: 150,
          collapsedWidth: 19,
          collapsedHeight: 19,
          aimingRectOptions: { color: '#ff7800', weight: 1, clickable: !1 },
          shadowRectOptions: {
            color: '#000000',
            weight: 1,
            clickable: !1,
            opacity: 0,
            fillOpacity: 0,
          },
          strings: { hideText: 'Hide MiniMap', showText: 'Show MiniMap' },
          mapOptions: {},
        },
        initialize: function (e, i) {
          t.Util.setOptions(this, i),
            (this.options.aimingRectOptions.clickable = !1),
            (this.options.shadowRectOptions.clickable = !1),
            (this._layer = e);
        },
        onAdd: function (e) {
          (this._mainMap = e),
            (this._container = t.DomUtil.create(
              'div',
              'leaflet-control-minimap'
            )),
            (this._container.style.width = this.options.width + 'px'),
            (this._container.style.height = this.options.height + 'px'),
            t.DomEvent.disableClickPropagation(this._container),
            t.DomEvent.on(
              this._container,
              'mousewheel',
              t.DomEvent.stopPropagation
            );
          var i = {
            attributionControl: !1,
            dragging: !this.options.centerFixed,
            zoomControl: !1,
            zoomAnimation: this.options.zoomAnimation,
            autoToggleDisplay: this.options.autoToggleDisplay,
            touchZoom: this.options.centerFixed
              ? 'center'
              : !this._isZoomLevelFixed(),
            scrollWheelZoom: this.options.centerFixed
              ? 'center'
              : !this._isZoomLevelFixed(),
            doubleClickZoom: this.options.centerFixed
              ? 'center'
              : !this._isZoomLevelFixed(),
            boxZoom: !this._isZoomLevelFixed(),
            crs: e.options.crs,
          };
          return (
            (i = t.Util.extend(this.options.mapOptions, i)),
            (this._miniMap = new t.Map(this._container, i)),
            this._miniMap.addLayer(this._layer),
            (this._mainMapMoving = !1),
            (this._miniMapMoving = !1),
            (this._userToggledDisplay = !1),
            (this._minimized = !1),
            this.options.toggleDisplay && this._addToggleButton(),
            this._miniMap.whenReady(
              t.Util.bind(function () {
                (this._aimingRect = t
                  .rectangle(
                    this._mainMap.getBounds(),
                    this.options.aimingRectOptions
                  )
                  .addTo(this._miniMap)),
                  (this._shadowRect = t
                    .rectangle(
                      this._mainMap.getBounds(),
                      this.options.shadowRectOptions
                    )
                    .addTo(this._miniMap)),
                  this._mainMap.on('moveend', this._onMainMapMoved, this),
                  this._mainMap.on('move', this._onMainMapMoving, this),
                  this._miniMap.on(
                    'movestart',
                    this._onMiniMapMoveStarted,
                    this
                  ),
                  this._miniMap.on('move', this._onMiniMapMoving, this),
                  this._miniMap.on('moveend', this._onMiniMapMoved, this);
              }, this)
            ),
            this._container
          );
        },
        addTo: function (e) {
          t.Control.prototype.addTo.call(this, e);
          var i = this.options.centerFixed || this._mainMap.getCenter();
          return (
            this._miniMap.setView(i, this._decideZoom(!0)),
            this._setDisplay(this.options.minimized),
            this
          );
        },
        onRemove: function (t) {
          this._mainMap.off('moveend', this._onMainMapMoved, this),
            this._mainMap.off('move', this._onMainMapMoving, this),
            this._miniMap.off('moveend', this._onMiniMapMoved, this),
            this._miniMap.removeLayer(this._layer);
        },
        changeLayer: function (t) {
          this._miniMap.removeLayer(this._layer),
            (this._layer = t),
            this._miniMap.addLayer(this._layer);
        },
        _addToggleButton: function () {
          (this._toggleDisplayButton = this.options.toggleDisplay
            ? this._createButton(
                '',
                this._toggleButtonInitialTitleText(),
                'leaflet-control-minimap-toggle-display leaflet-control-minimap-toggle-display-' +
                  this.options.position,
                this._container,
                this._toggleDisplayButtonClicked,
                this
              )
            : void 0),
            (this._toggleDisplayButton.style.width =
              this.options.collapsedWidth + 'px'),
            (this._toggleDisplayButton.style.height =
              this.options.collapsedHeight + 'px');
        },
        _toggleButtonInitialTitleText: function () {
          return this.options.minimized
            ? this.options.strings.showText
            : this.options.strings.hideText;
        },
        _createButton: function (e, i, o, n, s, a) {
          var r = t.DomUtil.create('a', o, n);
          (r.innerHTML = e), (r.href = '#'), (r.title = i);
          var l = t.DomEvent.stopPropagation;
          return (
            t.DomEvent.on(r, 'click', l)
              .on(r, 'mousedown', l)
              .on(r, 'dblclick', l)
              .on(r, 'click', t.DomEvent.preventDefault)
              .on(r, 'click', s, a),
            r
          );
        },
        _toggleDisplayButtonClicked: function () {
          (this._userToggledDisplay = !0),
            this._minimized ? this._restore() : this._minimize();
        },
        _setDisplay: function (t) {
          t !== this._minimized &&
            (this._minimized ? this._restore() : this._minimize());
        },
        _minimize: function () {
          this.options.toggleDisplay
            ? ((this._container.style.width =
                this.options.collapsedWidth + 'px'),
              (this._container.style.height =
                this.options.collapsedHeight + 'px'),
              (this._toggleDisplayButton.className +=
                ' minimized-' + this.options.position),
              (this._toggleDisplayButton.title = this.options.strings.showText))
            : (this._container.style.display = 'none'),
            (this._minimized = !0),
            this._onToggle();
        },
        _restore: function () {
          this.options.toggleDisplay
            ? ((this._container.style.width = this.options.width + 'px'),
              (this._container.style.height = this.options.height + 'px'),
              (this._toggleDisplayButton.className =
                this._toggleDisplayButton.className.replace(
                  'minimized-' + this.options.position,
                  ''
                )),
              (this._toggleDisplayButton.title = this.options.strings.hideText))
            : (this._container.style.display = 'block'),
            (this._minimized = !1),
            this._onToggle();
        },
        _onMainMapMoved: function (t) {
          if (this._miniMapMoving) this._miniMapMoving = !1;
          else {
            var e = this.options.centerFixed || this._mainMap.getCenter();
            (this._mainMapMoving = !0),
              this._miniMap.setView(e, this._decideZoom(!0)),
              this._setDisplay(this._decideMinimized());
          }
          this._aimingRect.setBounds(this._mainMap.getBounds());
        },
        _onMainMapMoving: function (t) {
          this._aimingRect.setBounds(this._mainMap.getBounds());
        },
        _onMiniMapMoveStarted: function (t) {
          if (!this.options.centerFixed) {
            var e = this._aimingRect.getBounds(),
              i = this._miniMap.latLngToContainerPoint(e.getSouthWest()),
              o = this._miniMap.latLngToContainerPoint(e.getNorthEast());
            this._lastAimingRectPosition = { sw: i, ne: o };
          }
        },
        _onMiniMapMoving: function (e) {
          this.options.centerFixed ||
            (!this._mainMapMoving &&
              this._lastAimingRectPosition &&
              (this._shadowRect.setBounds(
                new t.LatLngBounds(
                  this._miniMap.containerPointToLatLng(
                    this._lastAimingRectPosition.sw
                  ),
                  this._miniMap.containerPointToLatLng(
                    this._lastAimingRectPosition.ne
                  )
                )
              ),
              this._shadowRect.setStyle({ opacity: 1, fillOpacity: 0.3 })));
        },
        _onMiniMapMoved: function (t) {
          this._mainMapMoving
            ? (this._mainMapMoving = !1)
            : ((this._miniMapMoving = !0),
              this._mainMap.setView(
                this._miniMap.getCenter(),
                this._decideZoom(!1)
              ),
              this._shadowRect.setStyle({ opacity: 0, fillOpacity: 0 }));
        },
        _isZoomLevelFixed: function () {
          var t = this.options.zoomLevelFixed;
          return this._isDefined(t) && this._isInteger(t);
        },
        _decideZoom: function (t) {
          if (this._isZoomLevelFixed())
            return t ? this.options.zoomLevelFixed : this._mainMap.getZoom();
          if (t) return this._mainMap.getZoom() + this.options.zoomLevelOffset;
          var e,
            i = this._miniMap.getZoom() - this._mainMap.getZoom(),
            o = this._miniMap.getZoom() - this.options.zoomLevelOffset;
          return (
            i > this.options.zoomLevelOffset &&
            this._mainMap.getZoom() <
              this._miniMap.getMinZoom() - this.options.zoomLevelOffset
              ? this._miniMap.getZoom() > this._lastMiniMapZoom
                ? ((e = this._mainMap.getZoom() + 1),
                  this._miniMap.setZoom(this._miniMap.getZoom() - 1))
                : (e = this._mainMap.getZoom())
              : (e = o),
            (this._lastMiniMapZoom = this._miniMap.getZoom()),
            e
          );
        },
        _decideMinimized: function () {
          return this._userToggledDisplay
            ? this._minimized
            : this.options.autoToggleDisplay
            ? !!this._mainMap.getBounds().contains(this._miniMap.getBounds())
            : this._minimized;
        },
        _isInteger: function (t) {
          return 'number' == typeof t;
        },
        _isDefined: function (t) {
          return void 0 !== t;
        },
        _onToggle: function () {
          t.Util.requestAnimFrame(function () {
            t.DomEvent.on(
              this._container,
              'transitionend',
              this._fireToggleEvents,
              this
            ),
              t.Browser.any3d ||
                t.Util.requestAnimFrame(this._fireToggleEvents, this);
          }, this);
        },
        _fireToggleEvents: function () {
          t.DomEvent.off(
            this._container,
            'transitionend',
            this._fireToggleEvents,
            this
          );
          var e = { minimized: this._minimized };
          this.fire(this._minimized ? 'minimize' : 'restore', e),
            this.fire('toggle', e);
        },
      });
      return (
        t.Map.mergeOptions({ miniMapControl: !1 }),
        t.Map.addInitHook(function () {
          this.options.miniMapControl &&
            (this.miniMapControl = new e().addTo(this));
        }),
        e
      );
    }, window),
    (function () {
      var t = window.console || { error: function () {}, warn: function () {} };
      function e(e) {
        (e.Control.Loading = e.Control.extend({
          options: {
            delayIndicator: null,
            position: 'topleft',
            separate: !1,
            zoomControl: null,
            spinjs: !1,
            spin: {
              lines: 7,
              length: 3,
              width: 3,
              radius: 5,
              rotate: 13,
              top: '83%',
            },
          },
          initialize: function (t) {
            e.setOptions(this, t),
              (this._dataLoaders = {}),
              null !== this.options.zoomControl &&
                (this.zoomControl = this.options.zoomControl);
          },
          onAdd: function (i) {
            if (this.options.spinjs && 'function' != typeof Spinner)
              return t.error(
                "Leaflet.loading cannot load because you didn't load spin.js (http://fgnass.github.io/spin.js/), even though you set it in options."
              );
            this._addLayerListeners(i),
              this._addMapListeners(i),
              this.options.separate ||
                this.zoomControl ||
                (i.zoomControl
                  ? (this.zoomControl = i.zoomControl)
                  : i.zoomsliderControl &&
                    (this.zoomControl = i.zoomsliderControl));
            var o,
              n = 'leaflet-control-loading';
            return (
              this.zoomControl && !this.options.separate
                ? ((o = this.zoomControl._container),
                  (n += ' leaflet-bar-part-bottom leaflet-bar-part last'),
                  e.DomUtil.addClass(
                    this._getLastControlButton(),
                    'leaflet-bar-part-bottom'
                  ))
                : (o = e.DomUtil.create(
                    'div',
                    'leaflet-control-zoom leaflet-control-layer-container leaflet-bar'
                  )),
              (this._indicatorContainer = o),
              (this._indicator = e.DomUtil.create('a', n, o)),
              this.options.spinjs &&
                ((this._spinner = new Spinner(this.options.spin).spin()),
                this._indicator.appendChild(this._spinner.el)),
              o
            );
          },
          onRemove: function (t) {
            this._removeLayerListeners(t), this._removeMapListeners(t);
          },
          removeFrom: function (t) {
            return this.zoomControl && !this.options.separate
              ? (this._container.removeChild(this._indicator),
                (this._map = null),
                this.onRemove(t),
                this)
              : e.Control.prototype.removeFrom.call(this, t);
          },
          addLoader: function (t) {
            if (
              ((this._dataLoaders[t] = !0),
              this.options.delayIndicator && !this.delayIndicatorTimeout)
            ) {
              var e = this;
              this.delayIndicatorTimeout = setTimeout(function () {
                e.updateIndicator(), (e.delayIndicatorTimeout = null);
              }, this.options.delayIndicator);
            } else this.updateIndicator();
          },
          removeLoader: function (t) {
            delete this._dataLoaders[t],
              this.updateIndicator(),
              this.options.delayIndicator &&
                this.delayIndicatorTimeout &&
                !this.isLoading() &&
                (clearTimeout(this.delayIndicatorTimeout),
                (this.delayIndicatorTimeout = null));
          },
          updateIndicator: function () {
            this.isLoading() ? this._showIndicator() : this._hideIndicator();
          },
          isLoading: function () {
            return this._countLoaders() > 0;
          },
          _countLoaders: function () {
            var t,
              e = 0;
            for (t in this._dataLoaders)
              this._dataLoaders.hasOwnProperty(t) && e++;
            return e;
          },
          _showIndicator: function () {
            e.DomUtil.addClass(this._indicator, 'is-loading'),
              e.DomUtil.addClass(this._indicatorContainer, 'is-loading'),
              this.options.separate ||
                (this.zoomControl instanceof e.Control.Zoom
                  ? e.DomUtil.removeClass(
                      this._getLastControlButton(),
                      'leaflet-bar-part-bottom'
                    )
                  : 'function' == typeof e.Control.Zoomslider &&
                    this.zoomControl instanceof e.Control.Zoomslider &&
                    e.DomUtil.removeClass(
                      this.zoomControl._ui.zoomOut,
                      'leaflet-bar-part-bottom'
                    ));
          },
          _hideIndicator: function () {
            e.DomUtil.removeClass(this._indicator, 'is-loading'),
              e.DomUtil.removeClass(this._indicatorContainer, 'is-loading'),
              this.options.separate ||
                (this.zoomControl instanceof e.Control.Zoom
                  ? e.DomUtil.addClass(
                      this._getLastControlButton(),
                      'leaflet-bar-part-bottom'
                    )
                  : 'function' == typeof e.Control.Zoomslider &&
                    this.zoomControl instanceof e.Control.Zoomslider &&
                    e.DomUtil.addClass(
                      this.zoomControl._ui.zoomOut,
                      'leaflet-bar-part-bottom'
                    ));
          },
          _getLastControlButton: function () {
            for (
              var t = this.zoomControl._container, e = t.children.length - 1;
              e > 0;

            ) {
              var i = t.children[e];
              if (
                this._indicator !== i &&
                0 !== i.offsetWidth &&
                0 !== i.offsetHeight
              )
                break;
              e--;
            }
            return t.children[e];
          },
          _handleLoading: function (t) {
            this.addLoader(this.getEventId(t));
          },
          _handleBaseLayerChange: function (t) {
            var i = this;
            t.layer &&
            t.layer.eachLayer &&
            'function' == typeof t.layer.eachLayer
              ? t.layer.eachLayer(function (t) {
                  i._handleBaseLayerChange({ layer: t });
                })
              : (e.TileLayer.Canvas && t.layer instanceof e.TileLayer.Canvas) ||
                i._handleLoading(t);
          },
          _handleLoad: function (t) {
            this.removeLoader(this.getEventId(t));
          },
          getEventId: function (t) {
            return t.id
              ? t.id
              : t.layer
              ? t.layer._leaflet_id
              : t.target._leaflet_id;
          },
          _layerAdd: function (e) {
            if (e.layer && e.layer.on)
              try {
                e.layer.on(
                  { loading: this._handleLoading, load: this._handleLoad },
                  this
                );
              } catch (i) {
                t.warn(
                  'L.Control.Loading: Tried and failed to add  event handlers to layer',
                  e.layer
                ),
                  t.warn('L.Control.Loading: Full details', i);
              }
          },
          _layerRemove: function (e) {
            if (e.layer && e.layer.off)
              try {
                e.layer.off(
                  { loading: this._handleLoading, load: this._handleLoad },
                  this
                );
              } catch (i) {
                t.warn(
                  'L.Control.Loading: Tried and failed to remove event handlers from layer',
                  e.layer
                ),
                  t.warn('L.Control.Loading: Full details', i);
              }
          },
          _addLayerListeners: function (t) {
            t.eachLayer(function (t) {
              t.on &&
                t.on(
                  { loading: this._handleLoading, load: this._handleLoad },
                  this
                );
            }, this),
              t.on('layeradd', this._layerAdd, this),
              t.on('layerremove', this._layerRemove, this);
          },
          _removeLayerListeners: function (t) {
            t.eachLayer(function (t) {
              t.off &&
                t.off(
                  { loading: this._handleLoading, load: this._handleLoad },
                  this
                );
            }, this),
              t.off('layeradd', this._layerAdd, this),
              t.off('layerremove', this._layerRemove, this);
          },
          _addMapListeners: function (t) {
            t.on(
              {
                baselayerchange: this._handleBaseLayerChange,
                dataloading: this._handleLoading,
                dataload: this._handleLoad,
                layerremove: this._handleLoad,
              },
              this
            );
          },
          _removeMapListeners: function (t) {
            t.off(
              {
                baselayerchange: this._handleBaseLayerChange,
                dataloading: this._handleLoading,
                dataload: this._handleLoad,
                layerremove: this._handleLoad,
              },
              this
            );
          },
        })),
          e.Map.addInitHook(function () {
            this.options.loadingControl &&
              ((this.loadingControl = new e.Control.Loading()),
              this.addControl(this.loadingControl));
          }),
          (e.Control.loading = function (t) {
            return new e.Control.Loading(t);
          });
      }
      'function' == typeof define && define.amd
        ? define(['leaflet'], function (t) {
            e(t);
          })
        : e(L);
    })(),
    (function (t) {
      if ('function' == typeof define && define.amd) define(['leaflet'], t);
      else if ('undefined' != typeof module)
        module.exports = t(require('leaflet'));
      else {
        if (void 0 === window.L) throw 'Leaflet must be loaded first';
        t(window.L);
      }
    })(function (t) {
      return (
        (t.Control.Search = t.Control.extend({
          includes: '1' === t.version[0] ? t.Evented.prototype : t.Mixin.Events,
          options: {
            url: '',
            layer: null,
            sourceData: null,
            jsonpParam: null,
            propertyLoc: 'loc',
            propertyName: 'title',
            formatData: null,
            filterData: null,
            moveToLocation: null,
            buildTip: null,
            container: '',
            zoom: null,
            minLength: 1,
            initial: !0,
            casesensitive: !1,
            autoType: !0,
            delayType: 400,
            tooltipLimit: -1,
            tipAutoSubmit: !0,
            firstTipSubmit: !1,
            autoResize: !0,
            collapsed: !0,
            autoCollapse: !1,
            autoCollapseTime: 1200,
            textErr: 'Location not found',
            textCancel: 'Cancel',
            textPlaceholder: 'Search...',
            hideMarkerOnCollapse: !1,
            position: 'topleft',
            marker: {
              icon: !1,
              animate: !0,
              circle: {
                radius: 10,
                weight: 3,
                color: '#e03',
                stroke: !0,
                fill: !1,
              },
            },
          },
          _getPath: function (t, e) {
            var i = e.split('.'),
              o = i.pop(),
              n = i.length,
              s = i[0],
              a = 1;
            if (n > 0) for (; (t = t[s]) && a < n; ) s = i[a++];
            if (t) return t[o];
          },
          _isObject: function (t) {
            return '[object Object]' === Object.prototype.toString.call(t);
          },
          initialize: function (e) {
            t.Util.setOptions(this, e || {}),
              (this._inputMinSize = this.options.textPlaceholder
                ? this.options.textPlaceholder.length
                : 10),
              (this._layer = this.options.layer || new t.LayerGroup()),
              (this._filterData =
                this.options.filterData || this._defaultFilterData),
              (this._formatData =
                this.options.formatData || this._defaultFormatData),
              (this._moveToLocation =
                this.options.moveToLocation || this._defaultMoveToLocation),
              (this._autoTypeTmp = this.options.autoType),
              (this._countertips = 0),
              (this._recordsCache = {}),
              (this._curReq = null);
          },
          onAdd: function (e) {
            return (
              (this._map = e),
              (this._container = t.DomUtil.create(
                'div',
                'leaflet-control-search'
              )),
              (this._input = this._createInput(
                this.options.textPlaceholder,
                'search-input'
              )),
              (this._tooltip = this._createTooltip('search-tooltip')),
              (this._cancel = this._createCancel(
                this.options.textCancel,
                'search-cancel'
              )),
              (this._button = this._createButton(
                this.options.textPlaceholder,
                'search-button'
              )),
              (this._alert = this._createAlert('search-alert')),
              !1 === this.options.collapsed &&
                this.expand(this.options.collapsed),
              this.options.marker &&
                (this.options.marker instanceof t.Marker ||
                this.options.marker instanceof t.CircleMarker
                  ? (this._markerSearch = this.options.marker)
                  : this._isObject(this.options.marker) &&
                    (this._markerSearch = new t.Control.Search.Marker(
                      [0, 0],
                      this.options.marker
                    )),
                (this._markerSearch._isMarkerSearch = !0)),
              this.setLayer(this._layer),
              e.on({ resize: this._handleAutoresize }, this),
              this._container
            );
          },
          addTo: function (e) {
            return (
              this.options.container
                ? ((this._container = this.onAdd(e)),
                  (this._wrapper = t.DomUtil.get(this.options.container)),
                  (this._wrapper.style.position = 'relative'),
                  this._wrapper.appendChild(this._container))
                : t.Control.prototype.addTo.call(this, e),
              this
            );
          },
          onRemove: function (t) {
            (this._recordsCache = {}),
              t.off({ resize: this._handleAutoresize }, this);
          },
          setLayer: function (t) {
            return (this._layer = t), this._layer.addTo(this._map), this;
          },
          showAlert: function (t) {
            var e = this;
            return (
              (t = t || this.options.textErr),
              (this._alert.style.display = 'block'),
              (this._alert.innerHTML = t),
              clearTimeout(this.timerAlert),
              (this.timerAlert = setTimeout(function () {
                e.hideAlert();
              }, this.options.autoCollapseTime)),
              this
            );
          },
          hideAlert: function () {
            return (this._alert.style.display = 'none'), this;
          },
          cancel: function () {
            return (
              (this._input.value = ''),
              this._handleKeypress({ keyCode: 8 }),
              (this._input.size = this._inputMinSize),
              this._input.focus(),
              (this._cancel.style.display = 'none'),
              this._hideTooltip(),
              this.fire('search:cancel'),
              this
            );
          },
          expand: function (e) {
            return (
              (e = 'boolean' != typeof e || e),
              (this._input.style.display = 'block'),
              t.DomUtil.addClass(this._container, 'search-exp'),
              !1 !== e &&
                (this._input.focus(),
                this._map.on('dragstart click', this.collapse, this)),
              this.fire('search:expanded'),
              this
            );
          },
          collapse: function () {
            return (
              this._hideTooltip(),
              this.cancel(),
              (this._alert.style.display = 'none'),
              this._input.blur(),
              this.options.collapsed &&
                ((this._input.style.display = 'none'),
                (this._cancel.style.display = 'none'),
                t.DomUtil.removeClass(this._container, 'search-exp'),
                this.options.hideMarkerOnCollapse &&
                  this._map.removeLayer(this._markerSearch),
                this._map.off('dragstart click', this.collapse, this)),
              this.fire('search:collapsed'),
              this
            );
          },
          collapseDelayed: function () {
            var t = this;
            return this.options.autoCollapse
              ? (clearTimeout(this.timerCollapse),
                (this.timerCollapse = setTimeout(function () {
                  t.collapse();
                }, this.options.autoCollapseTime)),
                this)
              : this;
          },
          collapseDelayedStop: function () {
            return clearTimeout(this.timerCollapse), this;
          },
          _createAlert: function (e) {
            var i = t.DomUtil.create('div', e, this._container);
            return (
              (i.style.display = 'none'),
              t.DomEvent.on(i, 'click', t.DomEvent.stop, this).on(
                i,
                'click',
                this.hideAlert,
                this
              ),
              i
            );
          },
          _createInput: function (e, i) {
            var o = this,
              n = t.DomUtil.create('label', i, this._container),
              s = t.DomUtil.create('input', i, this._container);
            return (
              (s.type = 'text'),
              (s.size = this._inputMinSize),
              (s.value = ''),
              (s.autocomplete = 'off'),
              (s.autocorrect = 'off'),
              (s.autocapitalize = 'off'),
              (s.placeholder = e),
              (s.style.display = 'none'),
              (s.role = 'search'),
              (s.id = s.role + s.type + s.size),
              (n.htmlFor = s.id),
              (n.style.display = 'none'),
              (n.value = e),
              t.DomEvent.disableClickPropagation(s)
                .on(s, 'keyup', this._handleKeypress, this)
                .on(
                  s,
                  'paste',
                  function (t) {
                    setTimeout(
                      function (t) {
                        o._handleKeypress(t);
                      },
                      10,
                      t
                    );
                  },
                  this
                )
                .on(s, 'blur', this.collapseDelayed, this)
                .on(s, 'focus', this.collapseDelayedStop, this),
              s
            );
          },
          _createCancel: function (e, i) {
            var o = t.DomUtil.create('a', i, this._container);
            return (
              (o.href = '#'),
              (o.title = e),
              (o.style.display = 'none'),
              (o.innerHTML = '<span>&otimes;</span>'),
              t.DomEvent.on(o, 'click', t.DomEvent.stop, this).on(
                o,
                'click',
                this.cancel,
                this
              ),
              o
            );
          },
          _createButton: function (e, i) {
            var o = t.DomUtil.create('a', i, this._container);
            return (
              (o.href = '#'),
              (o.title = e),
              t.DomEvent.on(o, 'click', t.DomEvent.stop, this)
                .on(o, 'click', this._handleSubmit, this)
                .on(o, 'focus', this.collapseDelayedStop, this)
                .on(o, 'blur', this.collapseDelayed, this),
              o
            );
          },
          _createTooltip: function (e) {
            var i = this,
              o = t.DomUtil.create('ul', e, this._container);
            return (
              (o.style.display = 'none'),
              t.DomEvent.disableClickPropagation(o)
                .on(o, 'blur', this.collapseDelayed, this)
                .on(
                  o,
                  'mousewheel',
                  function (e) {
                    i.collapseDelayedStop(), t.DomEvent.stopPropagation(e);
                  },
                  this
                )
                .on(
                  o,
                  'mouseover',
                  function (t) {
                    i.collapseDelayedStop();
                  },
                  this
                ),
              o
            );
          },
          _createTip: function (e, i) {
            var o;
            if (this.options.buildTip) {
              if (
                'string' == typeof (o = this.options.buildTip.call(this, e, i))
              ) {
                var n = t.DomUtil.create('div');
                (n.innerHTML = o), (o = n.firstChild);
              }
            } else (o = t.DomUtil.create('li', '')).innerHTML = e;
            return (
              t.DomUtil.addClass(o, 'search-tip'),
              (o._text = e),
              this.options.tipAutoSubmit &&
                t.DomEvent.disableClickPropagation(o)
                  .on(o, 'click', t.DomEvent.stop, this)
                  .on(
                    o,
                    'click',
                    function (t) {
                      (this._input.value = e),
                        this._handleAutoresize(),
                        this._input.focus(),
                        this._hideTooltip(),
                        this._handleSubmit();
                    },
                    this
                  ),
              o
            );
          },
          _getUrl: function (t) {
            return 'function' == typeof this.options.url
              ? this.options.url(t)
              : this.options.url;
          },
          _defaultFilterData: function (t, e) {
            var i,
              o,
              n,
              s = {};
            if ('' === (t = t.replace(/[.*+?^${}()|[\]\\]/g, ''))) return [];
            for (var a in ((i = this.options.initial ? '^' : ''),
            (o = this.options.casesensitive ? void 0 : 'i'),
            (n = new RegExp(i + t, o)),
            e))
              n.test(a) && (s[a] = e[a]);
            return s;
          },
          showTooltip: function (t) {
            if (
              ((this._countertips = 0),
              (this._tooltip.innerHTML = ''),
              (this._tooltip.currentSelection = -1),
              this.options.tooltipLimit)
            )
              for (var e in t) {
                if (this._countertips === this.options.tooltipLimit) break;
                this._countertips++,
                  this._tooltip.appendChild(this._createTip(e, t[e]));
              }
            return (
              this._countertips > 0
                ? ((this._tooltip.style.display = 'block'),
                  this._autoTypeTmp && this._autoType(),
                  (this._autoTypeTmp = this.options.autoType))
                : this._hideTooltip(),
              (this._tooltip.scrollTop = 0),
              this._countertips
            );
          },
          _hideTooltip: function () {
            return (
              (this._tooltip.style.display = 'none'),
              (this._tooltip.innerHTML = ''),
              0
            );
          },
          _defaultFormatData: function (e) {
            var i,
              o = this.options.propertyName,
              n = this.options.propertyLoc,
              s = {};
            if (t.Util.isArray(n))
              for (i in e)
                s[this._getPath(e[i], o)] = t.latLng(e[i][n[0]], e[i][n[1]]);
            else
              for (i in e)
                s[this._getPath(e[i], o)] = t.latLng(this._getPath(e[i], n));
            return s;
          },
          _recordsFromJsonp: function (e, i) {
            t.Control.Search.callJsonp = i;
            var o = t.DomUtil.create(
                'script',
                'leaflet-search-jsonp',
                document.getElementsByTagName('body')[0]
              ),
              n = t.Util.template(
                this._getUrl(e) +
                  '&' +
                  this.options.jsonpParam +
                  '=L.Control.Search.callJsonp',
                { s: e }
              );
            return (
              (o.type = 'text/javascript'),
              (o.src = n),
              {
                abort: function () {
                  o.parentNode.removeChild(o);
                },
              }
            );
          },
          _recordsFromAjax: function (e, i) {
            void 0 === window.XMLHttpRequest &&
              (window.XMLHttpRequest = function () {
                try {
                  return new ActiveXObject('Microsoft.XMLHTTP.6.0');
                } catch (t) {
                  try {
                    return new ActiveXObject('Microsoft.XMLHTTP.3.0');
                  } catch (t) {
                    throw new Error('XMLHttpRequest is not supported');
                  }
                }
              });
            var o =
                t.Browser.ie && !window.atob && document.querySelector
                  ? new XDomainRequest()
                  : new XMLHttpRequest(),
              n = t.Util.template(this._getUrl(e), { s: e });
            return (
              o.open('GET', n),
              (o.onload = function () {
                i(JSON.parse(o.responseText));
              }),
              (o.onreadystatechange = function () {
                4 === o.readyState && 200 === o.status && this.onload();
              }),
              o.send(),
              o
            );
          },
          _searchInLayer: function (e, i, o) {
            var n,
              s = this;
            e instanceof t.Control.Search.Marker ||
              (e instanceof t.Marker || e instanceof t.CircleMarker
                ? s._getPath(e.options, o)
                  ? (((n = e.getLatLng()).layer = e),
                    (i[s._getPath(e.options, o)] = n))
                  : s._getPath(e.feature.properties, o)
                  ? (((n = e.getLatLng()).layer = e),
                    (i[s._getPath(e.feature.properties, o)] = n))
                  : console.warn("propertyName '" + o + "' not found in marker")
                : e instanceof t.Path ||
                  e instanceof t.Polyline ||
                  e instanceof t.Polygon
                ? s._getPath(e.options, o)
                  ? (((n = e.getBounds().getCenter()).layer = e),
                    (i[s._getPath(e.options, o)] = n))
                  : s._getPath(e.feature.properties, o)
                  ? (((n = e.getBounds().getCenter()).layer = e),
                    (i[s._getPath(e.feature.properties, o)] = n))
                  : console.warn("propertyName '" + o + "' not found in shape")
                : e.hasOwnProperty('feature')
                ? e.feature.properties.hasOwnProperty(o)
                  ? e.getLatLng && 'function' == typeof e.getLatLng
                    ? (((n = e.getLatLng()).layer = e),
                      (i[e.feature.properties[o]] = n))
                    : e.getBounds && 'function' == typeof e.getBounds
                    ? (((n = e.getBounds().getCenter()).layer = e),
                      (i[e.feature.properties[o]] = n))
                    : console.warn('Unknown type of Layer')
                  : console.warn(
                      "propertyName '" + o + "' not found in feature"
                    )
                : e instanceof t.LayerGroup &&
                  e.eachLayer(function (t) {
                    s._searchInLayer(t, i, o);
                  }));
          },
          _recordsFromLayer: function () {
            var t = this,
              e = {},
              i = this.options.propertyName;
            return (
              this._layer.eachLayer(function (o) {
                t._searchInLayer(o, e, i);
              }),
              e
            );
          },
          _autoType: function () {
            var t = this._input.value.length,
              e = this._tooltip.firstChild
                ? this._tooltip.firstChild._text
                : '',
              i = e.length;
            if (0 === e.indexOf(this._input.value))
              if (
                ((this._input.value = e),
                this._handleAutoresize(),
                this._input.createTextRange)
              ) {
                var o = this._input.createTextRange();
                o.collapse(!0),
                  o.moveStart('character', t),
                  o.moveEnd('character', i),
                  o.select();
              } else
                this._input.setSelectionRange
                  ? this._input.setSelectionRange(t, i)
                  : this._input.selectionStart &&
                    ((this._input.selectionStart = t),
                    (this._input.selectionEnd = i));
          },
          _hideAutoType: function () {
            var t;
            if ((t = this._input.selection) && t.empty) t.empty();
            else if (this._input.createTextRange) {
              (t = this._input.createTextRange()).collapse(!0);
              var e = this._input.value.length;
              t.moveStart('character', e),
                t.moveEnd('character', e),
                t.select();
            } else
              this._input.getSelection &&
                this._input.getSelection().removeAllRanges(),
                (this._input.selectionStart = this._input.selectionEnd);
          },
          _handleKeypress: function (t) {
            var e = this;
            switch (t.keyCode) {
              case 27:
                this.collapse();
                break;
              case 13:
                (1 == this._countertips ||
                  (this.options.firstTipSubmit && this._countertips > 0)) &&
                  -1 == this._tooltip.currentSelection &&
                  this._handleArrowSelect(1),
                  this._handleSubmit();
                break;
              case 38:
                this._handleArrowSelect(-1);
                break;
              case 40:
                this._handleArrowSelect(1);
                break;
              case 8:
              case 45:
              case 46:
                this._autoTypeTmp = !1;
                break;
              case 37:
              case 39:
              case 16:
              case 17:
              case 35:
              case 36:
                break;
              default:
                this._input.value.length
                  ? (this._cancel.style.display = 'block')
                  : (this._cancel.style.display = 'none'),
                  this._input.value.length >= this.options.minLength
                    ? (clearTimeout(this.timerKeypress),
                      (this.timerKeypress = setTimeout(function () {
                        e._fillRecordsCache();
                      }, this.options.delayType)))
                    : this._hideTooltip();
            }
            this._handleAutoresize();
          },
          searchText: function (e) {
            var i = e.charCodeAt(e.length);
            (this._input.value = e),
              (this._input.style.display = 'block'),
              t.DomUtil.addClass(this._container, 'search-exp'),
              (this._autoTypeTmp = !1),
              this._handleKeypress({ keyCode: i });
          },
          _fillRecordsCache: function () {
            var e,
              i = this,
              o = this._input.value;
            this._curReq && this._curReq.abort && this._curReq.abort(),
              t.DomUtil.addClass(this._container, 'search-load'),
              this.options.layer
                ? ((this._recordsCache = this._recordsFromLayer()),
                  (e = this._filterData(this._input.value, this._recordsCache)),
                  this.showTooltip(e),
                  t.DomUtil.removeClass(this._container, 'search-load'))
                : (this.options.sourceData
                    ? (this._retrieveData = this.options.sourceData)
                    : this.options.url &&
                      (this._retrieveData = this.options.jsonpParam
                        ? this._recordsFromJsonp
                        : this._recordsFromAjax),
                  (this._curReq = this._retrieveData.call(
                    this,
                    o,
                    function (o) {
                      (i._recordsCache = i._formatData.call(i, o)),
                        (e = i.options.sourceData
                          ? i._filterData(i._input.value, i._recordsCache)
                          : i._recordsCache),
                        i.showTooltip(e),
                        t.DomUtil.removeClass(i._container, 'search-load');
                    }
                  )));
          },
          _handleAutoresize: function () {
            var t;
            this._input.style.maxWidth !== this._map._container.offsetWidth &&
              ((t = this._map._container.clientWidth),
              (t -= 83),
              (this._input.style.maxWidth = t.toString() + 'px')),
              this.options.autoResize &&
                this._container.offsetWidth + 20 <
                  this._map._container.offsetWidth &&
                (this._input.size =
                  this._input.value.length < this._inputMinSize
                    ? this._inputMinSize
                    : this._input.value.length);
          },
          _handleArrowSelect: function (e) {
            var o = this._tooltip.hasChildNodes()
              ? this._tooltip.childNodes
              : [];
            for (i = 0; i < o.length; i++)
              t.DomUtil.removeClass(o[i], 'search-tip-select');
            if (1 == e && this._tooltip.currentSelection >= o.length - 1)
              t.DomUtil.addClass(
                o[this._tooltip.currentSelection],
                'search-tip-select'
              );
            else if (-1 == e && this._tooltip.currentSelection <= 0)
              this._tooltip.currentSelection = -1;
            else if ('none' != this._tooltip.style.display) {
              (this._tooltip.currentSelection += e),
                t.DomUtil.addClass(
                  o[this._tooltip.currentSelection],
                  'search-tip-select'
                ),
                (this._input.value = o[this._tooltip.currentSelection]._text);
              var n = o[this._tooltip.currentSelection].offsetTop;
              n + o[this._tooltip.currentSelection].clientHeight >=
              this._tooltip.scrollTop + this._tooltip.clientHeight
                ? (this._tooltip.scrollTop =
                    n -
                    this._tooltip.clientHeight +
                    o[this._tooltip.currentSelection].clientHeight)
                : n <= this._tooltip.scrollTop && (this._tooltip.scrollTop = n);
            }
          },
          _handleSubmit: function () {
            if (
              (this._hideAutoType(),
              this.hideAlert(),
              this._hideTooltip(),
              'none' == this._input.style.display)
            )
              this.expand();
            else if ('' === this._input.value) this.collapse();
            else {
              var t = this._getLocation(this._input.value);
              !1 === t
                ? this.showAlert()
                : (this.showLocation(t, this._input.value),
                  this.fire('search:locationfound', {
                    latlng: t,
                    text: this._input.value,
                    layer: t.layer ? t.layer : null,
                  }));
            }
          },
          _getLocation: function (t) {
            return (
              !!this._recordsCache.hasOwnProperty(t) && this._recordsCache[t]
            );
          },
          _defaultMoveToLocation: function (t, e, i) {
            this.options.zoom
              ? this._map.setView(t, this.options.zoom)
              : this._map.panTo(t);
          },
          showLocation: function (t, e) {
            var i = this;
            return (
              i._map.once('moveend zoomend', function (e) {
                i._markerSearch && i._markerSearch.addTo(i._map).setLatLng(t);
              }),
              i._moveToLocation(t, e, i._map),
              i.options.autoCollapse && i.collapse(),
              i
            );
          },
        })),
        (t.Control.Search.Marker = t.Marker.extend({
          includes: '1' === t.version[0] ? t.Evented.prototype : t.Mixin.Events,
          options: {
            icon: new t.Icon.Default(),
            animate: !0,
            circle: {
              radius: 10,
              weight: 3,
              color: '#e03',
              stroke: !0,
              fill: !1,
            },
          },
          initialize: function (e, i) {
            t.setOptions(this, i),
              !0 === i.icon && (i.icon = new t.Icon.Default()),
              t.Marker.prototype.initialize.call(this, e, i),
              t.Control.Search.prototype._isObject(this.options.circle) &&
                (this._circleLoc = new t.CircleMarker(e, this.options.circle));
          },
          onAdd: function (e) {
            t.Marker.prototype.onAdd.call(this, e),
              this._circleLoc &&
                (e.addLayer(this._circleLoc),
                this.options.animate && this.animate());
          },
          onRemove: function (e) {
            t.Marker.prototype.onRemove.call(this, e),
              this._circleLoc && e.removeLayer(this._circleLoc);
          },
          setLatLng: function (e) {
            return (
              t.Marker.prototype.setLatLng.call(this, e),
              this._circleLoc && this._circleLoc.setLatLng(e),
              this
            );
          },
          _initIcon: function () {
            this.options.icon && t.Marker.prototype._initIcon.call(this);
          },
          _removeIcon: function () {
            this.options.icon && t.Marker.prototype._removeIcon.call(this);
          },
          animate: function () {
            if (this._circleLoc) {
              var t = this._circleLoc,
                e = parseInt(t._radius / 5),
                i = this.options.circle.radius,
                o = 2 * t._radius,
                n = 0;
              t._timerAnimLoc = setInterval(function () {
                (o -= e += n += 0.5),
                  t.setRadius(o),
                  o < i && (clearInterval(t._timerAnimLoc), t.setRadius(i));
              }, 200);
            }
            return this;
          },
        })),
        t.Map.addInitHook(function () {
          this.options.searchControl &&
            ((this.searchControl = t.control.search(
              this.options.searchControl
            )),
            this.addControl(this.searchControl));
        }),
        (t.control.search = function (e) {
          return new t.Control.Search(e);
        }),
        t.Control.Search
      );
    }),
    (function (t, e) {
      'object' == typeof exports && 'undefined' != typeof module
        ? e()
        : 'function' == typeof define && define.amd
        ? define(e)
        : e();
    })(0, function () {
      function t(t, e) {
        return t((e = { exports: {} }), e.exports), e.exports;
      }
      var e =
          'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : {},
        i = t(function (t) {
          !(function (e) {
            function i(t, e) {
              return (
                (function (t) {
                  void 0 === t.imagePlaceholder
                    ? (p.impl.options.imagePlaceholder = c.imagePlaceholder)
                    : (p.impl.options.imagePlaceholder = t.imagePlaceholder),
                    void 0 === t.cacheBust
                      ? (p.impl.options.cacheBust = c.cacheBust)
                      : (p.impl.options.cacheBust = t.cacheBust);
                })((e = e || {})),
                Promise.resolve(t)
                  .then(function (t) {
                    return (function t(e, i, o) {
                      return o || !i || i(e)
                        ? Promise.resolve(e)
                            .then(function (t) {
                              return t instanceof HTMLCanvasElement
                                ? a.makeImage(t.toDataURL())
                                : t.cloneNode(!1);
                            })
                            .then(function (o) {
                              return (function (e, i, o) {
                                var n = e.childNodes;
                                return 0 === n.length
                                  ? Promise.resolve(i)
                                  : (function (e, i, o) {
                                      var n = Promise.resolve();
                                      return (
                                        i.forEach(function (i) {
                                          n = n
                                            .then(function () {
                                              return t(i, o);
                                            })
                                            .then(function (t) {
                                              t && e.appendChild(t);
                                            });
                                        }),
                                        n
                                      );
                                    })(i, a.asArray(n), o).then(function () {
                                      return i;
                                    });
                              })(e, o, i);
                            })
                            .then(function (t) {
                              return (function (t, e) {
                                return e instanceof Element
                                  ? Promise.resolve()
                                      .then(function () {
                                        !(function (t, e) {
                                          t.cssText
                                            ? (e.cssText = t.cssText)
                                            : (function (t, e) {
                                                a.asArray(t).forEach(function (
                                                  i
                                                ) {
                                                  e.setProperty(
                                                    i,
                                                    t.getPropertyValue(i),
                                                    t.getPropertyPriority(i)
                                                  );
                                                });
                                              })(t, e);
                                        })(window.getComputedStyle(t), e.style);
                                      })
                                      .then(function () {
                                        function i(i) {
                                          var o = window.getComputedStyle(t, i),
                                            n = o.getPropertyValue('content');
                                          if ('' !== n && 'none' !== n) {
                                            var s = a.uid();
                                            e.className = e.className + ' ' + s;
                                            var r =
                                              document.createElement('style');
                                            r.appendChild(
                                              (function (t, e, i) {
                                                var o = '.' + t + ':' + e,
                                                  n = i.cssText
                                                    ? (function (t) {
                                                        var e =
                                                          t.getPropertyValue(
                                                            'content'
                                                          );
                                                        return (
                                                          t.cssText +
                                                          ' content: ' +
                                                          e +
                                                          ';'
                                                        );
                                                      })(i)
                                                    : (function (t) {
                                                        return (
                                                          a
                                                            .asArray(t)
                                                            .map(function (e) {
                                                              return (
                                                                e +
                                                                ': ' +
                                                                t.getPropertyValue(
                                                                  e
                                                                ) +
                                                                (t.getPropertyPriority(
                                                                  e
                                                                )
                                                                  ? ' !important'
                                                                  : '')
                                                              );
                                                            })
                                                            .join('; ') + ';'
                                                        );
                                                      })(i);
                                                return document.createTextNode(
                                                  o + '{' + n + '}'
                                                );
                                              })(s, i, o)
                                            ),
                                              e.appendChild(r);
                                          }
                                        }
                                        [':before', ':after'].forEach(function (
                                          t
                                        ) {
                                          i(t);
                                        });
                                      })
                                      .then(function () {
                                        t instanceof HTMLTextAreaElement &&
                                          (e.innerHTML = t.value),
                                          t instanceof HTMLInputElement &&
                                            e.setAttribute('value', t.value);
                                      })
                                      .then(function () {
                                        e instanceof SVGElement &&
                                          (e.setAttribute(
                                            'xmlns',
                                            'http://www.w3.org/2000/svg'
                                          ),
                                          e instanceof SVGRectElement &&
                                            ['width', 'height'].forEach(
                                              function (t) {
                                                var i = e.getAttribute(t);
                                                i && e.style.setProperty(t, i);
                                              }
                                            ));
                                      })
                                      .then(function () {
                                        return e;
                                      })
                                  : e;
                              })(e, t);
                            })
                        : Promise.resolve();
                    })(t, e.filter, !0);
                  })
                  .then(n)
                  .then(s)
                  .then(function (t) {
                    return (
                      e.bgcolor && (t.style.backgroundColor = e.bgcolor),
                      e.width && (t.style.width = e.width + 'px'),
                      e.height && (t.style.height = e.height + 'px'),
                      e.style &&
                        Object.keys(e.style).forEach(function (i) {
                          t.style[i] = e.style[i];
                        }),
                      t
                    );
                  })
                  .then(function (i) {
                    return (function (t, e, i) {
                      return Promise.resolve(t)
                        .then(function (t) {
                          return (
                            t.setAttribute(
                              'xmlns',
                              'http://www.w3.org/1999/xhtml'
                            ),
                            new XMLSerializer().serializeToString(t)
                          );
                        })
                        .then(a.escapeXhtml)
                        .then(function (t) {
                          return (
                            '<foreignObject x="0" y="0" width="100%" height="100%">' +
                            t +
                            '</foreignObject>'
                          );
                        })
                        .then(function (t) {
                          return (
                            '<svg xmlns="http://www.w3.org/2000/svg" width="' +
                            e +
                            '" height="' +
                            i +
                            '">' +
                            t +
                            '</svg>'
                          );
                        })
                        .then(function (t) {
                          return 'data:image/svg+xml;charset=utf-8,' + t;
                        });
                    })(i, e.width || a.width(t), e.height || a.height(t));
                  })
              );
            }
            function o(t, e) {
              function o(t) {
                var i = document.createElement('canvas');
                if (
                  ((i.width = e.width || a.width(t)),
                  (i.height = e.height || a.height(t)),
                  e.bgcolor)
                ) {
                  var o = i.getContext('2d');
                  (o.fillStyle = e.bgcolor),
                    o.fillRect(0, 0, i.width, i.height);
                }
                return i;
              }
              return i(t, e)
                .then(a.makeImage)
                .then(a.delay(100))
                .then(function (e) {
                  var i = o(t);
                  return i.getContext('2d').drawImage(e, 0, 0), i;
                });
            }
            function n(t) {
              return l.resolveAll().then(function (e) {
                var i = document.createElement('style');
                return (
                  t.appendChild(i), i.appendChild(document.createTextNode(e)), t
                );
              });
            }
            function s(t) {
              return h.inlineAll(t).then(function () {
                return t;
              });
            }
            var a = (function () {
                function t(t) {
                  var e = /\.([^\.\/]*?)$/g.exec(t);
                  return e ? e[1] : '';
                }
                function e(t, e) {
                  var i = window.getComputedStyle(t).getPropertyValue(e);
                  return parseFloat(i.replace('px', ''));
                }
                return {
                  escape: function (t) {
                    return t.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
                  },
                  parseExtension: t,
                  mimeType: function (e) {
                    var i = t(e).toLowerCase();
                    return (
                      (function () {
                        var t = 'application/font-woff',
                          e = 'image/jpeg';
                        return {
                          woff: t,
                          woff2: t,
                          ttf: 'application/font-truetype',
                          eot: 'application/vnd.ms-fontobject',
                          png: 'image/png',
                          jpg: e,
                          jpeg: e,
                          gif: 'image/gif',
                          tiff: 'image/tiff',
                          svg: 'image/svg+xml',
                        };
                      })()[i] || ''
                    );
                  },
                  dataAsUrl: function (t, e) {
                    return 'data:' + e + ';base64,' + t;
                  },
                  isDataUrl: function (t) {
                    return -1 !== t.search(/^(data:)/);
                  },
                  canvasToBlob: function (t) {
                    return t.toBlob
                      ? new Promise(function (e) {
                          t.toBlob(e);
                        })
                      : (function (t) {
                          return new Promise(function (e) {
                            for (
                              var i = window.atob(t.toDataURL().split(',')[1]),
                                o = i.length,
                                n = new Uint8Array(o),
                                s = 0;
                              s < o;
                              s++
                            )
                              n[s] = i.charCodeAt(s);
                            e(new Blob([n], { type: 'image/png' }));
                          });
                        })(t);
                  },
                  resolveUrl: function (t, e) {
                    var i = document.implementation.createHTMLDocument(),
                      o = i.createElement('base');
                    i.head.appendChild(o);
                    var n = i.createElement('a');
                    return (
                      i.body.appendChild(n), (o.href = e), (n.href = t), n.href
                    );
                  },
                  getAndEncode: function (t) {
                    var e = 3e4;
                    return (
                      p.impl.options.cacheBust &&
                        (t +=
                          (/\?/.test(t) ? '&' : '?') + new Date().getTime()),
                      new Promise(function (i) {
                        function o(t) {
                          console.error(t), i('');
                        }
                        var n,
                          s = new XMLHttpRequest();
                        if (
                          ((s.onreadystatechange = function () {
                            if (4 === s.readyState) {
                              if (200 !== s.status)
                                return void (n
                                  ? i(n)
                                  : o(
                                      'cannot fetch resource: ' +
                                        t +
                                        ', status: ' +
                                        s.status
                                    ));
                              var e = new FileReader();
                              (e.onloadend = function () {
                                var t = e.result.split(/,/)[1];
                                i(t);
                              }),
                                e.readAsDataURL(s.response);
                            }
                          }),
                          (s.ontimeout = function () {
                            n
                              ? i(n)
                              : o(
                                  'timeout of ' +
                                    e +
                                    'ms occured while fetching resource: ' +
                                    t
                                );
                          }),
                          (s.responseType = 'blob'),
                          (s.timeout = e),
                          s.open('GET', t, !0),
                          s.send(),
                          p.impl.options.imagePlaceholder)
                        ) {
                          var a = p.impl.options.imagePlaceholder.split(/,/);
                          a && a[1] && (n = a[1]);
                        }
                      })
                    );
                  },
                  uid: (function () {
                    var t = 0;
                    return function () {
                      return (
                        'u' +
                        (
                          '0000' +
                          ((Math.random() * Math.pow(36, 4)) << 0).toString(36)
                        ).slice(-4) +
                        t++
                      );
                    };
                  })(),
                  delay: function (t) {
                    return function (e) {
                      return new Promise(function (i) {
                        setTimeout(function () {
                          i(e);
                        }, t);
                      });
                    };
                  },
                  asArray: function (t) {
                    for (var e = [], i = t.length, o = 0; o < i; o++)
                      e.push(t[o]);
                    return e;
                  },
                  escapeXhtml: function (t) {
                    return t.replace(/#/g, '%23').replace(/\n/g, '%0A');
                  },
                  makeImage: function (t) {
                    return new Promise(function (e, i) {
                      var o = new Image();
                      (o.onload = function () {
                        e(o);
                      }),
                        (o.onerror = i),
                        (o.src = t);
                    });
                  },
                  width: function (t) {
                    var i = e(t, 'border-left-width'),
                      o = e(t, 'border-right-width');
                    return t.scrollWidth + i + o;
                  },
                  height: function (t) {
                    var i = e(t, 'border-top-width'),
                      o = e(t, 'border-bottom-width');
                    return t.scrollHeight + i + o;
                  },
                };
              })(),
              r = (function () {
                function t(t) {
                  return -1 !== t.search(o);
                }
                function e(t) {
                  for (var e, i = []; null !== (e = o.exec(t)); ) i.push(e[1]);
                  return i.filter(function (t) {
                    return !a.isDataUrl(t);
                  });
                }
                function i(t, e, i, o) {
                  return Promise.resolve(e)
                    .then(function (t) {
                      return i ? a.resolveUrl(t, i) : t;
                    })
                    .then(o || a.getAndEncode)
                    .then(function (t) {
                      return a.dataAsUrl(t, a.mimeType(e));
                    })
                    .then(function (i) {
                      return t.replace(
                        (function (t) {
                          return new RegExp(
                            '(url\\([\'"]?)(' + a.escape(t) + ')([\'"]?\\))',
                            'g'
                          );
                        })(e),
                        '$1' + i + '$3'
                      );
                    });
                }
                var o = /url\(['"]?([^'"]+?)['"]?\)/g;
                return {
                  inlineAll: function (o, n, s) {
                    return t(o)
                      ? Promise.resolve(o)
                          .then(e)
                          .then(function (t) {
                            var e = Promise.resolve(o);
                            return (
                              t.forEach(function (t) {
                                e = e.then(function (e) {
                                  return i(e, t, n, s);
                                });
                              }),
                              e
                            );
                          })
                      : Promise.resolve(o);
                  },
                  shouldProcess: t,
                  impl: { readUrls: e, inline: i },
                };
              })(),
              l = (function () {
                function t() {
                  function t(t) {
                    return {
                      resolve: function () {
                        var e = (t.parentStyleSheet || {}).href;
                        return r.inlineAll(t.cssText, e);
                      },
                      src: function () {
                        return t.style.getPropertyValue('src');
                      },
                    };
                  }
                  return Promise.resolve(a.asArray(document.styleSheets))
                    .then(function (t) {
                      var e = [];
                      return (
                        t.forEach(function (t) {
                          try {
                            a.asArray(t.cssRules || []).forEach(e.push.bind(e));
                          } catch (e) {
                            console.log(
                              'Error while reading CSS rules from ' + t.href,
                              e.toString()
                            );
                          }
                        }),
                        e
                      );
                    })
                    .then(function (t) {
                      return t
                        .filter(function (t) {
                          return t.type === CSSRule.FONT_FACE_RULE;
                        })
                        .filter(function (t) {
                          return r.shouldProcess(
                            t.style.getPropertyValue('src')
                          );
                        });
                    })
                    .then(function (e) {
                      return e.map(t);
                    });
                }
                return {
                  resolveAll: function () {
                    return t()
                      .then(function (t) {
                        return Promise.all(
                          t.map(function (t) {
                            return t.resolve();
                          })
                        );
                      })
                      .then(function (t) {
                        return t.join('\n');
                      });
                  },
                  impl: { readAll: t },
                };
              })(),
              h = (function () {
                function t(t) {
                  return {
                    inline: function (e) {
                      return a.isDataUrl(t.src)
                        ? Promise.resolve()
                        : Promise.resolve(t.src)
                            .then(e || a.getAndEncode)
                            .then(function (e) {
                              return a.dataAsUrl(e, a.mimeType(t.src));
                            })
                            .then(function (e) {
                              return new Promise(function (i, o) {
                                (t.onload = i), (t.onerror = o), (t.src = e);
                              });
                            });
                    },
                  };
                }
                return {
                  inlineAll: function e(i) {
                    return i instanceof Element
                      ? (function (t) {
                          var e = t.style.getPropertyValue('background');
                          return e
                            ? r
                                .inlineAll(e)
                                .then(function (e) {
                                  t.style.setProperty(
                                    'background',
                                    e,
                                    t.style.getPropertyPriority('background')
                                  );
                                })
                                .then(function () {
                                  return t;
                                })
                            : Promise.resolve(t);
                        })(i).then(function () {
                          return i instanceof HTMLImageElement
                            ? t(i).inline()
                            : Promise.all(
                                a.asArray(i.childNodes).map(function (t) {
                                  return e(t);
                                })
                              );
                        })
                      : Promise.resolve(i);
                  },
                  impl: { newImage: t },
                };
              })(),
              c = { imagePlaceholder: void 0, cacheBust: !1 },
              p = {
                toSvg: i,
                toPng: function (t, e) {
                  return o(t, e || {}).then(function (t) {
                    return t.toDataURL();
                  });
                },
                toJpeg: function (t, e) {
                  return o(t, (e = e || {})).then(function (t) {
                    return t.toDataURL('image/jpeg', e.quality || 1);
                  });
                },
                toBlob: function (t, e) {
                  return o(t, e || {}).then(a.canvasToBlob);
                },
                toPixelData: function (t, e) {
                  return o(t, e || {}).then(function (e) {
                    return e
                      .getContext('2d')
                      .getImageData(0, 0, a.width(t), a.height(t)).data;
                  });
                },
                impl: {
                  fontFaces: l,
                  images: h,
                  util: a,
                  inliner: r,
                  options: {},
                },
              };
            t.exports = p;
          })();
        }),
        o = t(function (t) {
          var i =
            i ||
            (function (t) {
              if (
                !(
                  void 0 === t ||
                  ('undefined' != typeof navigator &&
                    /MSIE [1-9]\./.test(navigator.userAgent))
                )
              ) {
                var e = t.document,
                  i = function () {
                    return t.URL || t.webkitURL || t;
                  },
                  o = e.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
                  n = 'download' in o,
                  s = /constructor/i.test(t.HTMLElement) || t.safari,
                  a = /CriOS\/[\d]+/.test(navigator.userAgent),
                  r = function (e) {
                    (t.setImmediate || t.setTimeout)(function () {
                      throw e;
                    }, 0);
                  },
                  l = function (t) {
                    setTimeout(function () {
                      'string' == typeof t
                        ? i().revokeObjectURL(t)
                        : t.remove();
                    }, 4e4);
                  },
                  h = function (t, e, i) {
                    for (var o = (e = [].concat(e)).length; o--; ) {
                      var n = t['on' + e[o]];
                      if ('function' == typeof n)
                        try {
                          n.call(t, i || t);
                        } catch (t) {
                          r(t);
                        }
                    }
                  },
                  c = function (t) {
                    return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
                      t.type
                    )
                      ? new Blob([String.fromCharCode(65279), t], {
                          type: t.type,
                        })
                      : t;
                  },
                  p = function (e, r, p) {
                    p || (e = c(e));
                    var d,
                      u = this,
                      m = 'application/octet-stream' === e.type,
                      g = function () {
                        h(u, 'writestart progress write writeend'.split(' '));
                      };
                    if (((u.readyState = u.INIT), n))
                      return (
                        (d = i().createObjectURL(e)),
                        void setTimeout(function () {
                          (o.href = d),
                            (o.download = r),
                            (function (t) {
                              var e = new MouseEvent('click');
                              t.dispatchEvent(e);
                            })(o),
                            g(),
                            l(d),
                            (u.readyState = u.DONE);
                        })
                      );
                    !(function () {
                      if ((a || (m && s)) && t.FileReader) {
                        var o = new FileReader();
                        return (
                          (o.onloadend = function () {
                            var e = a
                              ? o.result
                              : o.result.replace(
                                  /^data:[^;]*;/,
                                  'data:attachment/file;'
                                );
                            t.open(e, '_blank') || (t.location.href = e),
                              (e = void 0),
                              (u.readyState = u.DONE),
                              g();
                          }),
                          o.readAsDataURL(e),
                          void (u.readyState = u.INIT)
                        );
                      }
                      d || (d = i().createObjectURL(e)),
                        m
                          ? (t.location.href = d)
                          : t.open(d, '_blank') || (t.location.href = d),
                        (u.readyState = u.DONE),
                        g(),
                        l(d);
                    })();
                  },
                  d = p.prototype;
                return 'undefined' != typeof navigator &&
                  navigator.msSaveOrOpenBlob
                  ? function (t, e, i) {
                      return (
                        (e = e || t.name || 'download'),
                        i || (t = c(t)),
                        navigator.msSaveOrOpenBlob(t, e)
                      );
                    }
                  : ((d.abort = function () {}),
                    (d.readyState = d.INIT = 0),
                    (d.WRITING = 1),
                    (d.DONE = 2),
                    (d.error =
                      d.onwritestart =
                      d.onprogress =
                      d.onwrite =
                      d.onabort =
                      d.onerror =
                      d.onwriteend =
                        null),
                    function (t, e, i) {
                      return new p(t, e || t.name || 'download', i);
                    });
              }
            })(
              ('undefined' != typeof self && self) ||
                ('undefined' != typeof window && window) ||
                e.content
            );
          t.exports && (t.exports.saveAs = i);
        });
      (L.Control.EasyPrint = L.Control.extend({
        options: {
          title: 'Print map',
          position: 'topleft',
          sizeModes: ['Current'],
          filename: 'map',
          exportOnly: !1,
          hidden: !1,
          tileWait: 500,
          hideControlContainer: !0,
          hideClasses: [],
          customWindowTitle: window.document.title,
          spinnerBgCOlor: '#0DC5C1',
          customSpinnerClass: 'epLoader',
          defaultSizeTitles: {
            Current: 'Current Size',
            A4Landscape: 'A4 Landscape',
            A4Portrait: 'A4 Portrait',
          },
        },
        onAdd: function () {
          (this.mapContainer = this._map.getContainer()),
            (this.options.sizeModes = this.options.sizeModes.map(function (t) {
              return 'Current' === t
                ? {
                    name: this.options.defaultSizeTitles.Current,
                    className: 'CurrentSize',
                  }
                : 'A4Landscape' === t
                ? {
                    height: this._a4PageSize.height,
                    width: this._a4PageSize.width,
                    name: this.options.defaultSizeTitles.A4Landscape,
                    className: 'A4Landscape page',
                  }
                : 'A4Portrait' === t
                ? {
                    height: this._a4PageSize.width,
                    width: this._a4PageSize.height,
                    name: this.options.defaultSizeTitles.A4Portrait,
                    className: 'A4Portrait page',
                  }
                : t;
            }, this));
          var t = L.DomUtil.create(
            'div',
            'leaflet-control-easyPrint leaflet-bar leaflet-control'
          );
          if (!this.options.hidden) {
            this._addCss(),
              L.DomEvent.addListener(
                t,
                'mouseover',
                this._togglePageSizeButtons,
                this
              ),
              L.DomEvent.addListener(
                t,
                'mouseout',
                this._togglePageSizeButtons,
                this
              );
            var e = 'leaflet-control-easyPrint-button';
            this.options.exportOnly && (e += '-export'),
              (this.link = L.DomUtil.create('a', e, t)),
              (this.link.id = 'leafletEasyPrint'),
              (this.link.title = this.options.title),
              (this.holder = L.DomUtil.create('ul', 'easyPrintHolder', t)),
              this.options.sizeModes.forEach(function (t) {
                var e = L.DomUtil.create(
                  'li',
                  'easyPrintSizeMode',
                  this.holder
                );
                (e.title = t.name),
                  L.DomUtil.create('a', t.className, e),
                  L.DomEvent.addListener(e, 'click', this.printMap, this);
              }, this),
              L.DomEvent.disableClickPropagation(t);
          }
          return t;
        },
        printMap: function (t, e) {
          e && (this.options.filename = e),
            this.options.exportOnly ||
              ((this._page = window.open(
                '',
                '_blank',
                'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10, top=10, width=200, height=250, visible=none'
              )),
              this._page.document.write(
                this._createSpinner(
                  this.options.customWindowTitle,
                  this.options.customSpinnerClass,
                  this.options.spinnerBgCOlor
                )
              )),
            (this.originalState = {
              mapWidth: this.mapContainer.style.width,
              widthWasAuto: !1,
              widthWasPercentage: !1,
              mapHeight: this.mapContainer.style.height,
              zoom: this._map.getZoom(),
              center: this._map.getCenter(),
            }),
            'auto' === this.originalState.mapWidth
              ? ((this.originalState.mapWidth = this._map.getSize().x + 'px'),
                (this.originalState.widthWasAuto = !0))
              : this.originalState.mapWidth.includes('%') &&
                ((this.originalState.percentageWidth =
                  this.originalState.mapWidth),
                (this.originalState.widthWasPercentage = !0),
                (this.originalState.mapWidth = this._map.getSize().x + 'px')),
            this._map.fire('easyPrint-start', { event: t }),
            this.options.hidden || this._togglePageSizeButtons({ type: null }),
            this.options.hideControlContainer && this._toggleControls(),
            this.options.hideClasses.length > 0 &&
              this._toggleClasses(this.options.hideClasses);
          var i = 'string' != typeof t ? t.target.className : t;
          if ('CurrentSize' === i) return this._printOpertion(i);
          (this.outerContainer = this._createOuterContainer(this.mapContainer)),
            this.originalState.widthWasAuto &&
              (this.outerContainer.style.width = this.originalState.mapWidth),
            this._createImagePlaceholder(i);
        },
        _createImagePlaceholder: function (t) {
          var e = this;
          i.toPng(this.mapContainer, {
            width: parseInt(this.originalState.mapWidth.replace('px')),
            height: parseInt(this.originalState.mapHeight.replace('px')),
          })
            .then(function (i) {
              e.blankDiv = document.createElement('div');
              var o = e.blankDiv;
              e.outerContainer.parentElement.insertBefore(o, e.outerContainer),
                (o.className = 'epHolder'),
                (o.style.backgroundImage = 'url("' + i + '")'),
                (o.style.position = 'absolute'),
                (o.style.zIndex = 1011),
                (o.style.display = 'initial'),
                (o.style.width = e.originalState.mapWidth),
                (o.style.height = e.originalState.mapHeight),
                e._resizeAndPrintMap(t);
            })
            .catch(function (t) {
              console.error('oops, something went wrong!', t);
            });
        },
        _resizeAndPrintMap: function (t) {
          this.outerContainer.style.opacity = 0;
          var e = this.options.sizeModes.filter(function (e) {
            return e.className === t;
          });
          (e = e[0]),
            (this.mapContainer.style.width = e.width + 'px'),
            (this.mapContainer.style.height = e.height + 'px'),
            this.mapContainer.style.width > this.mapContainer.style.height
              ? (this.orientation = 'portrait')
              : (this.orientation = 'landscape'),
            this._map.setView(this.originalState.center),
            this._map.setZoom(this.originalState.zoom),
            this._map.invalidateSize(),
            this.options.tileLayer
              ? this._pausePrint(t)
              : this._printOpertion(t);
        },
        _pausePrint: function (t) {
          var e = this,
            i = setInterval(function () {
              e.options.tileLayer.isLoading() ||
                (clearInterval(i), e._printOpertion(t));
            }, e.options.tileWait);
        },
        _printOpertion: function (t) {
          var e = this,
            n = this.mapContainer.style.width;
          ((this.originalState.widthWasAuto && 'CurrentSize' === t) ||
            (this.originalState.widthWasPercentage && 'CurrentSize' === t)) &&
            (n = this.originalState.mapWidth),
            i
              .toPng(e.mapContainer, {
                width: parseInt(n),
                height: parseInt(e.mapContainer.style.height.replace('px')),
              })
              .then(function (t) {
                var i = e._dataURItoBlob(t);
                e.options.exportOnly
                  ? o.saveAs(i, e.options.filename + '.png')
                  : e._sendToBrowserPrint(t, e.orientation),
                  e._toggleControls(!0),
                  e._toggleClasses(e.options.hideClasses, !0),
                  e.outerContainer &&
                    (e.originalState.widthWasAuto
                      ? (e.mapContainer.style.width = 'auto')
                      : e.originalState.widthWasPercentage
                      ? (e.mapContainer.style.width =
                          e.originalState.percentageWidth)
                      : (e.mapContainer.style.width = e.originalState.mapWidth),
                    (e.mapContainer.style.height = e.originalState.mapHeight),
                    e._removeOuterContainer(
                      e.mapContainer,
                      e.outerContainer,
                      e.blankDiv
                    ),
                    e._map.invalidateSize(),
                    e._map.setView(e.originalState.center),
                    e._map.setZoom(e.originalState.zoom)),
                  e._map.fire('easyPrint-finished');
              })
              .catch(function (t) {
                console.error('Print operation failed', t);
              });
        },
        _sendToBrowserPrint: function (t, e) {
          this._page.resizeTo(600, 800);
          var i = this._createNewWindow(t, e, this);
          (this._page.document.body.innerHTML = ''),
            this._page.document.write(i),
            this._page.document.close();
        },
        _createSpinner: function (t, e, i) {
          return (
            '<html><head><title>' +
            t +
            '</title></head><body><style>\n      body{\n        background: ' +
            i +
            ";\n      }\n      .epLoader,\n      .epLoader:before,\n      .epLoader:after {\n        border-radius: 50%;\n      }\n      .epLoader {\n        color: #ffffff;\n        font-size: 11px;\n        text-indent: -99999em;\n        margin: 55px auto;\n        position: relative;\n        width: 10em;\n        height: 10em;\n        box-shadow: inset 0 0 0 1em;\n        -webkit-transform: translateZ(0);\n        -ms-transform: translateZ(0);\n        transform: translateZ(0);\n      }\n      .epLoader:before,\n      .epLoader:after {\n        position: absolute;\n        content: '';\n      }\n      .epLoader:before {\n        width: 5.2em;\n        height: 10.2em;\n        background: #0dc5c1;\n        border-radius: 10.2em 0 0 10.2em;\n        top: -0.1em;\n        left: -0.1em;\n        -webkit-transform-origin: 5.2em 5.1em;\n        transform-origin: 5.2em 5.1em;\n        -webkit-animation: load2 2s infinite ease 1.5s;\n        animation: load2 2s infinite ease 1.5s;\n      }\n      .epLoader:after {\n        width: 5.2em;\n        height: 10.2em;\n        background: #0dc5c1;\n        border-radius: 0 10.2em 10.2em 0;\n        top: -0.1em;\n        left: 5.1em;\n        -webkit-transform-origin: 0px 5.1em;\n        transform-origin: 0px 5.1em;\n        -webkit-animation: load2 2s infinite ease;\n        animation: load2 2s infinite ease;\n      }\n      @-webkit-keyframes load2 {\n        0% {\n          -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n          transform: rotate(360deg);\n        }\n      }\n      @keyframes load2 {\n        0% {\n          -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n          transform: rotate(360deg);\n        }\n      }\n      </style>\n    <div class=\"" +
            e +
            '">Loading...</div></body></html>'
          );
        },
        _createNewWindow: function (t, e, i) {
          return (
            '<html><head>\n        <style>@media print {\n          img { max-width: 98%!important; max-height: 98%!important; }\n          @page { size: ' +
            e +
            ";}}\n        </style>\n        <script>function step1(){\n        setTimeout('step2()', 10);}\n        function step2(){window.print();window.close()}\n        </script></head><body onload='step1()'>\n        <img src=\"" +
            t +
            '" style="display:block; margin:auto;"></body></html>'
          );
        },
        _createOuterContainer: function (t) {
          var e = document.createElement('div');
          return (
            t.parentNode.insertBefore(e, t),
            t.parentNode.removeChild(t),
            e.appendChild(t),
            (e.style.width = t.style.width),
            (e.style.height = t.style.height),
            (e.style.display = 'inline-block'),
            (e.style.overflow = 'hidden'),
            e
          );
        },
        _removeOuterContainer: function (t, e, i) {
          e.parentNode &&
            (e.parentNode.insertBefore(t, e),
            e.parentNode.removeChild(i),
            e.parentNode.removeChild(e));
        },
        _addCss: function () {
          var t = document.createElement('style');
          (t.type = 'text/css'),
            (t.innerHTML =
              '.leaflet-control-easyPrint-button { \n      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMTI4LDMyaDI1NnY2NEgxMjhWMzJ6IE00ODAsMTI4SDMyYy0xNy42LDAtMzIsMTQuNC0zMiwzMnYxNjBjMCwxNy42LDE0LjM5OCwzMiwzMiwzMmg5NnYxMjhoMjU2VjM1Mmg5NiAgIGMxNy42LDAsMzItMTQuNCwzMi0zMlYxNjBDNTEyLDE0Mi40LDQ5Ny42LDEyOCw0ODAsMTI4eiBNMzUyLDQ0OEgxNjBWMjg4aDE5MlY0NDh6IE00ODcuMTk5LDE3NmMwLDEyLjgxMy0xMC4zODcsMjMuMi0yMy4xOTcsMjMuMiAgIGMtMTIuODEyLDAtMjMuMjAxLTEwLjM4Ny0yMy4yMDEtMjMuMnMxMC4zODktMjMuMiwyMy4xOTktMjMuMkM0NzYuODE0LDE1Mi44LDQ4Ny4xOTksMTYzLjE4Nyw0ODcuMTk5LDE3NnoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);\n      background-size: 16px 16px; \n      cursor: pointer; \n    }\n    .leaflet-control-easyPrint-button-export { \n      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQzMy41IDQzMy41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MzMuNSA0MzMuNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnIGlkPSJmaWxlLWRvd25sb2FkIj4KCQk8cGF0aCBkPSJNMzk1LjI1LDE1M2gtMTAyVjBoLTE1M3YxNTNoLTEwMmwxNzguNSwxNzguNUwzOTUuMjUsMTUzeiBNMzguMjUsMzgyLjV2NTFoMzU3di01MUgzOC4yNXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);\n      background-size: 16px 16px; \n      cursor: pointer; \n    }\n    .easyPrintHolder a {\n      background-size: 16px 16px;\n      cursor: pointer;\n    }\n    .easyPrintHolder .CurrentSize{\n      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNjQgNjQiPgogIDxnPgogICAgPGcgZmlsbD0iIzFEMUQxQiI+CiAgICAgIDxwYXRoIGQ9Ik0yNS4yNTUsMzUuOTA1TDQuMDE2LDU3LjE0NVY0Ni41OWMwLTEuMTA4LTAuODk3LTIuMDA4LTIuMDA4LTIuMDA4QzAuODk4LDQ0LjU4MiwwLDQ1LjQ4MSwwLDQ2LjU5djE1LjQwMiAgICBjMCwwLjI2MSwwLjA1MywwLjUyMSwwLjE1NSwwLjc2N2MwLjIwMywwLjQ5MiwwLjU5NCwwLjg4MiwxLjA4NiwxLjA4N0MxLjQ4Niw2My45NDcsMS43NDcsNjQsMi4wMDgsNjRoMTUuNDAzICAgIGMxLjEwOSwwLDIuMDA4LTAuODk4LDIuMDA4LTIuMDA4cy0wLjg5OC0yLjAwOC0yLjAwOC0yLjAwOEg2Ljg1NWwyMS4yMzgtMjEuMjRjMC43ODQtMC43ODQsMC43ODQtMi4wNTUsMC0yLjgzOSAgICBTMjYuMDM5LDM1LjEyMSwyNS4yNTUsMzUuOTA1eiIgZmlsbD0iIzAwMDAwMCIvPgogICAgICA8cGF0aCBkPSJtNjMuODQ1LDEuMjQxYy0wLjIwMy0wLjQ5MS0wLjU5NC0wLjg4Mi0xLjA4Ni0xLjA4Ny0wLjI0NS0wLjEwMS0wLjUwNi0wLjE1NC0wLjc2Ny0wLjE1NGgtMTUuNDAzYy0xLjEwOSwwLTIuMDA4LDAuODk4LTIuMDA4LDIuMDA4czAuODk4LDIuMDA4IDIuMDA4LDIuMDA4aDEwLjU1NmwtMjEuMjM4LDIxLjI0Yy0wLjc4NCwwLjc4NC0wLjc4NCwyLjA1NSAwLDIuODM5IDAuMzkyLDAuMzkyIDAuOTA2LDAuNTg5IDEuNDIsMC41ODlzMS4wMjctMC4xOTcgMS40MTktMC41ODlsMjEuMjM4LTIxLjI0djEwLjU1NWMwLDEuMTA4IDAuODk3LDIuMDA4IDIuMDA4LDIuMDA4IDEuMTA5LDAgMi4wMDgtMC44OTkgMi4wMDgtMi4wMDh2LTE1LjQwMmMwLTAuMjYxLTAuMDUzLTAuNTIyLTAuMTU1LTAuNzY3eiIgZmlsbD0iIzAwMDAwMCIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==)\n    }\n    .easyPrintHolder .page {\n      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ0NC44MzMgNDQ0LjgzMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjgzMyA0NDQuODMzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNTUuMjUsNDQ0LjgzM2gzMzQuMzMzYzkuMzUsMCwxNy03LjY1LDE3LTE3VjEzOS4xMTdjMC00LjgxNy0xLjk4My05LjM1LTUuMzgzLTEyLjQ2N0wyNjkuNzMzLDQuNTMzICAgIEMyNjYuNjE3LDEuNywyNjIuMzY3LDAsMjU4LjExNywwSDU1LjI1Yy05LjM1LDAtMTcsNy42NS0xNywxN3Y0MTAuODMzQzM4LjI1LDQzNy4xODMsNDUuOSw0NDQuODMzLDU1LjI1LDQ0NC44MzN6ICAgICBNMzcyLjU4MywxNDYuNDgzdjAuODVIMjU2LjQxN3YtMTA4LjhMMzcyLjU4MywxNDYuNDgzeiBNNzIuMjUsMzRoMTUwLjE2N3YxMzAuMzMzYzAsOS4zNSw3LjY1LDE3LDE3LDE3aDEzMy4xNjd2MjI5LjVINzIuMjVWMzR6ICAgICIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);\n    }\n    .easyPrintHolder .A4Landscape { \n      transform: rotate(-90deg);\n    }\n\n    .leaflet-control-easyPrint-button{\n      display: inline-block;\n    }\n    .easyPrintHolder{\n      margin-top:-31px;\n      margin-bottom: -5px;\n      margin-left: 30px;\n      padding-left: 0px;\n      display: none;\n    }\n\n    .easyPrintSizeMode {\n      display: inline-block;\n    }\n    .easyPrintHolder .easyPrintSizeMode a {\n      border-radius: 0px;\n    }\n\n    .easyPrintHolder .easyPrintSizeMode:last-child a{\n      border-top-right-radius: 2px;\n      border-bottom-right-radius: 2px;\n      margin-left: -1px;\n    }\n\n    .easyPrintPortrait:hover, .easyPrintLandscape:hover{\n      background-color: #757570;\n      cursor: pointer;\n    }'),
            document.body.appendChild(t);
        },
        _dataURItoBlob: function (t) {
          for (
            var e = atob(t.split(',')[1]),
              i = t.split(',')[0].split(':')[1].split(';')[0],
              o = new ArrayBuffer(e.length),
              n = new DataView(o),
              s = 0;
            s < e.length;
            s++
          )
            n.setUint8(s, e.charCodeAt(s));
          return new Blob([o], { type: i });
        },
        _togglePageSizeButtons: function (t) {
          var e = this.holder.style,
            i = this.link.style;
          'mouseover' === t.type
            ? ((e.display = 'block'),
              (i.borderTopRightRadius = '0'),
              (i.borderBottomRightRadius = '0'))
            : ((e.display = 'none'),
              (i.borderTopRightRadius = '2px'),
              (i.borderBottomRightRadius = '2px'));
        },
        _toggleControls: function (t) {
          var e = document.getElementsByClassName(
            'leaflet-control-container'
          )[0];
          if (t) return (e.style.display = 'block');
          e.style.display = 'none';
        },
        _toggleClasses: function (t, e) {
          t.forEach(function (t) {
            var i = document.getElementsByClassName(t)[0];
            if (e) return (i.style.display = 'block');
            i.style.display = 'none';
          });
        },
        _a4PageSize: { height: 715, width: 1045 },
      })),
        (L.easyPrint = function (t) {
          return new L.Control.EasyPrint(t);
        });
    });
  const n = document.currentScript,
    s = '0.1.9+master.34bdc86'.split('+')[0].trim();
  var a = {
    baseURL: 'https://unpkg.com/',
    loadSyncScripts: function (t) {
      return t.reduce(
        (t, e) => t.then(() => a.loadAsyncScripts(e)),
        Promise.resolve()
      );
    },
    loadAsyncScripts: function (t) {
      return Promise.all(t.map((t) => a.loadScript(t)));
    },
    loadScript: function (t) {
      return new Promise((e, i) => {
        let o = t.split('.').pop(),
          s = 'css' == o ? 'link' : 'script',
          r = document.createElement(s),
          l = document.head,
          h = (l.contains(n) ? n : l.lastChild) || l,
          c =
            a['prev_' + s] || ('script' == s && a.prev_link ? a.prev_link : h),
          p =
            0 === t.indexOf('/') ||
            0 === t.indexOf('http://') ||
            0 === t.indexOf('https://')
              ? ''
              : a.baseURL;
        'css' == o && (r.rel = 'stylesheet'),
          r.addEventListener('load', e, { once: !0 }),
          r.setAttribute('css' == o ? 'href' : 'src', p + t),
          c.parentNode && c.nextSibling
            ? c.parentNode.insertBefore(r, c.nextSibling)
            : l.appendChild(r),
          (a['prev_' + s] = r);
      });
    },
  };
  !(function () {
    var t = {
      mapTypes: {
        streets: {
          name: 'Streets',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          options: {
            maxZoom: 19,
            attribution:
              'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          },
        },
        terrain: {
          name: 'Terrain',
          url: 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
          options: {
            maxZoom: 22,
            attribution:
              'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Map style: &copy; <a href="http://www.thunderforest.com/">Thunderforest</a>',
          },
        },
        satellite: {
          name: 'Satellite',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          options: {
            maxZoom: 18,
            attribution:
              'Map data: &copy; <a href="http://www.esri.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          },
        },
        topo: {
          name: 'Topo',
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          options: {
            maxZoom: 17,
            attribution:
              'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
          },
        },
        //TODO: Add this tilelayer...
        maptiler: {
          name: 'Maptiler',
          url: 'https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=QaHh0ZLIE8qRom1dYRWb',
          options: {
            maxZoom: 17,
            attribution:
              '&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors',
          },
        },
        mapbox: {
          name: 'Mapbox',
          url: 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFodWw5OCIsImEiOiJjbHdweXQ4MW0ydWtqMnFwZjlqNnFjdXdmIn0.KNtlyTnG4CSSMe-YbWo5Hg',
          options: {
            maxZoom: 18,
            tileSize: 512,
            zoomOffset: -1,
            attribution: '© Mapbox © OpenStreetMap',
          },
        },
        esri: {
          name: 'Esri',
          url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            attribution: 'USGS, NOAA',
            attributionUrl:
              'https://static.arcgis.com/attribution/World_Topo_Map',
          },
        },
      },
      zoomControl: { position: 'bottomright' },
      scaleControl: { width: 200, position: 'bottomright', imperial: !1 },
      pegmanControl: {
        position: 'bottomright',
        theme: 'leaflet-pegman-v3-small',
      },
      locateControl: { position: 'bottomright' },
      fullscreenControl: {
        position: 'topright',
        title: 'Enter Fullscreen',
        titleCancel: 'Exit Fullscreen',
        forceSeparateButton: !0,
      },
      layersControl: { inline: !0, position: 'topleft' },
      minimapControl: {
        position: 'bottomleft',
        toggleDisplay: !1,
        toggleMapTypes: !0,
        width: 75,
        height: 75,
        aimingRectOptions: {
          color: '#000000',
          weight: 1,
          opacity: 0,
          fillOpacity: 0,
        },
        shadowRectOptions: {
          color: '#000000',
          weight: 1,
          opacity: 0,
          fillOpacity: 0,
        },
        mapOptions: {
          mapTypeId: 'satellite',
          gestureHandling: !1,
          searchControl: !1,
          loadingControl: !1,
          _isMiniMap: !0,
        },
      },
      editInOSMControl: { position: 'bottomright' },
      loadingControl: { separate: !0, position: 'bottomright' },
      searchControl: {
        url: 'https://nominatim.openstreetmap.org/search?format=json&accept-language={querylang}&q={s}',
        querylang: 'en-US',
        detectUserLang: !0,
        jsonpParam: 'json_callback',
        propertyName: 'display_name',
        propertyLoc: ['lat', 'lon'],
        markerLocation: !0,
        autoType: !1,
        autoCollapse: !0,
        firstTipSubmit: !0,
        minLength: 1,
        zoom: 10,
        position: 'bottomright',
      },
      printControl: {
        position: 'bottomright',
        hideControlContainer: !0,
        exportOnly: !0,
        sizeModes: ['A4Portrait', 'A4Landscape'],
      },
      disableDefaultUI: !1,
      plugins: [],
      _isMiniMap: !1,
    };
    function e() {
      this.zoomControl && this.zoomControl.remove(),
        this.fullscreenControl &&
          this.options.fullscreenControl &&
          !this.options.zoomControl &&
          this.fullscreenControl.remove(),
        this.searchControl &&
          this.options.searchControl &&
          this.searchControl.remove(),
        this.attributionControl && this.attributionControl.remove();
    }
    function i() {
      for (let e in t)
        !0 === this.options[e] || void 0 === this.options[e]
          ? (this.options[e] = t[e])
          : 'object' == typeof this.options[e] &&
            this.options[e] instanceof Array == !1 &&
            (this.options[e] = c(t[e], this.options[e]));
      if (
        (this.options.apiKeys &&
          (this.options.apiKeys.thunderforest &&
            (this.options.mapTypes.terrain.options.apikey =
              this.options.apiKeys.thunderforest),
          this.options.apiKeys.google &&
            (this.options.pegmanControl.apiKey = this.options.apiKeys.google)),
        this.options.mapTypes.terrain.options.apikey)
      ) {
        var e = this.options.mapTypes.terrain.url;
        -1 === e.indexOf('apikey=') &&
          (this.options.mapTypes.terrain.url +=
            (-1 === e.indexOf('?') ? '?' : '&') + 'apikey={apikey}');
      }
      !1 === this.options.mapTypeIds.includes(this.options.mapTypeId) &&
        this.options.mapTypeIds.length > 0 &&
        (this.options.mapTypeId = this.options.mapTypeIds[0]),
        this.options.searchControl &&
          this.options.searchControl.detectUserLang &&
          (this.options.searchControl.querylang = window.navigator.languages
            ? window.navigator.languages[0]
            : window.navigator.userLanguage || window.navigator.language),
        this.options.searchControl &&
          this.options.searchControl.querylang &&
          (this.options.searchControl.url =
            this.options.searchControl.url.replace(
              '{querylang}',
              this.options.searchControl.querylang
            )),
        !this.options.minimapControl ||
          this.options.center ||
          this.options.zoom ||
          this.setView([0, 0], 0);
    }
    function o() {
      var t = {},
        e = {},
        i = {};
      this.options.gestureHandling && this.gestureHandling.enable();
      for (let t in this.options.mapTypeIds) {
        var o = this.options.mapTypeIds[t];
        this.options.mapTypes[o] &&
          ((i[this.options.mapTypes[o].name] = e[o] =
            new L.TileLayer(
              this.options.mapTypes[o].url,
              this.options.mapTypes[o].options
            )),
          (e[o].mapTypeId = o));
      }
      if (
        (this.options.layersControl &&
          (t.layers = new L.Control.Layers(
            i,
            null,
            this.options.layersControl
          )),
        this.options.attributionControl &&
          this.attributionControl &&
          (this.attributionControl.addTo(this),
          (t.attribution = this.attributionControl),
          this.on(
            'baselayerchange',
            L.bind(n, this, this.attributionControl.options.prefix)
          )),
        this.options.editInOSMControl &&
          (t.editInOSM = new L.Control.EditInOSM(
            this.options.editInOSMControl
          )),
        this.options.scaleControl &&
          (t.scale = new L.Control.Scale(this.options.scaleControl)),
        this.options.zoomControl &&
          this.zoomControl &&
          (this.zoomControl.setPosition(this.options.zoomControl.position),
          this.zoomControl.addTo(this),
          (t.zoom = this.zoomControl)),
        this.options.pegmanControl &&
          (t.pegman = new L.Control.Pegman(this.options.pegmanControl)),
        this.options.locateControl &&
          (t.locate = new L.Control.Locate(this.options.locateControl)),
        this.options.searchControl &&
          (t.search = this.searchControl =
            new L.Control.Search(this.options.searchControl)),
        this.options.printControl &&
          (t.print = new L.Control.EasyPrint(this.options.printControl)),
        this.options.loadingControl &&
          (t.loading = new L.Control.Loading(this.options.loadingControl)),
        this.options.fullscreenControl &&
          (t.fullscreen = this.fullscreenControl =
            new L.Control.FullScreen(this.options.fullscreenControl)),
        this.options.minimapControl)
      ) {
        var r = this.options.minimapControl.mapOptions.mapTypeId,
          l = this.options.mapTypes[r];
        l &&
          (((l = new L.TileLayer(l.url, l.options)).mapTypeId = r),
          (t.minimap = new L.Control.MiniMap(l, this.options.minimapControl)),
          (t.minimap._mainMapBaseLayers = i));
      }
      for (let e in t) t[e].addTo && t[e].addTo(this);
      if (
        ((this.controls = t),
        this.whenReady(function () {
          if ((this.fire('idle'), this.options.mapTypeId)) {
            var t = this.options.mapTypes[this.options.mapTypeId];
            t &&
              i[t.name] &&
              (this.options.layers = this.options.layers.filter(
                (e) => e._leaflet_id !== i[t.name]._leaflet_id
              ));
          }
        }, this),
        this.options.mapTypeId)
      ) {
        var h = this.options.mapTypes[this.options.mapTypeId];
        h && i[h.name] && this.options.layers.unshift(i[h.name]);
      }
      if (this.options.plugins) {
        if (!a.loader) {
          var c = ['leaflet-ui@' + s + '/dist/leaflet-ui.css'];
          if (window.L) {
            if (this.options.includeLeafletCSS && L.version) {
              let t = 'leaflet@' + L.version + '/dist/leaflet.css',
                e = !1;
              for (let i = 0; i < document.styleSheets.length; i++)
                if (
                  document.styleSheets[i].href &&
                  document.styleSheets[i].href.indexOf(t) > 0
                ) {
                  e = !0;
                  break;
                }
              e || c.unshift(t);
            }
          } else
            c.unshift('leaflet@1.3.4/dist/leaflet.css'),
              c.unshift('leaflet@1.3.4/dist/leaflet.js');
          a.loader = a.loadSyncScripts([c, this.options.plugins]);
        }
        a.loader.then(
          function () {
            this.fire('plugins_loaded');
          }.bind(this)
        );
      }
    }
    function n(t, e) {
      this.attributionControl.setPrefix(
        !(
          e &&
          e.layer &&
          L.GridLayer.GoogleMutant &&
          e.layer instanceof L.GridLayer.GoogleMutant
        ) && t
      );
    }
    L.Map.mergeOptions({
      mapTypeId: 'streets',
      // mapTypeIds: ['streets', 'terrain', 'satellite', 'topo', 'customTopo'],
      mapTypeIds: [
        'streets',
        'satellite',
        'topo',
        'maptiler',
        'mapbox',
        'esri',
      ],
      mapTypes: void 0,
      gestureHandling: !0,
      zoomControl: !0,
      scaleControl: !0,
      pegmanControl: !0,
      locateControl: !0,
      fullscreenControl: !0,
      layersControl: !0,
      minimapControl: !0,
      editInOSMControl: !0,
      loadingControl: !0,
      searchControl: !0,
      printControl: !0,
      disableDefaultUI: !1,
      includeLeafletCSS: !0,
      apiKeys: void 0,
      _isMiniMap: !1,
    }),
      L.Map.addInitHook(function () {
        e.call(this),
          this.options._isMiniMap ||
            this.options.disableDefaultUI ||
            (i.call(this), o.call(this));
      });
    var r = L.Control.MiniMap.prototype.onAdd;
    function l(t, e) {
      return t.some((t) => e.includes(t));
    }
    function h(t) {
      return t && 'object' == typeof t && !Array.isArray(t);
    }
    function c(t, ...e) {
      if (!e.length) return t;
      const i = e.shift();
      if (h(t) && h(i))
        for (const e in i)
          h(i[e])
            ? (t[e] || Object.assign(t, { [e]: {} }), c(t[e], i[e]))
            : Object.assign(t, { [e]: i[e] });
      return c(t, ...e);
    }
    L.Control.MiniMap.include({
      onAdd: function (t) {
        var e = r.call(this, t);
        return (
          this._miniMap &&
            (this._miniMap.doubleClickZoom.disable(),
            this._miniMap.touchZoom.disable(),
            this._miniMap.scrollWheelZoom.disable()),
          this.options.toggleMapTypes &&
            (L.DomEvent.on(
              t,
              'baselayerchange',
              this._handleMainMapTypeChange,
              this
            ),
            L.DomEvent.on(
              this._container,
              'click',
              this._handleMiniMapTypeToggle,
              this
            )),
          e
        );
      },
      _handleMainMapTypeChange: function (t) {
        if (!this._handligMiniMapTypeToggle && t && t.layer) {
          var e,
            i,
            o = this._mainMap,
            n = this._layer.mapTypeId,
            s = t.layer.mapTypeId;
          if (o.options.mapTypeIds.length > 0 && l(o.options.mapTypeIds, s))
            s != n && (this._lastMapTypeId = s),
              'satellite' == s && 'satellite' == n
                ? (e = this._lastMapTypeId)
                : 'satellite' != s && 'satellite' != n && (e = 'satellite'),
              (i = o.options.mapTypes[e]) &&
                (((i = new L.TileLayer(i.url, i.options)).mapTypeId = e),
                (this._lastMapTypeId = n),
                this.changeLayer(i));
        }
      },
      _handleMiniMapTypeToggle: function () {
        if (
          ((this._handligMiniMapTypeToggle = !0),
          this._layer && this._mainMapBaseLayers)
        ) {
          var t,
            e,
            i = this._mainMap,
            o = this._layer.mapTypeId;
          for (let t in this._mainMapBaseLayers)
            if (
              i.hasLayer(this._mainMapBaseLayers[t]) &&
              o != this._mainMapBaseLayers[t].mapTypeId
            ) {
              this._mainMapBaseLayers[t].mapTypeId;
              break;
            }
          if (i.options.mapTypeIds.length > 0 && l(i.options.mapTypeIds, o))
            if (
              ((t = this._lastMapTypeId || i.options.mapTypeId),
              'satellite' != this._lastMapTypeId &&
                'satellite' != o &&
                (t = 'satellite'),
              (e = i.options.mapTypes[t]))
            ) {
              ((e = new L.TileLayer(e.url, e.options)).mapTypeId = t),
                (this._lastMapTypeId = o),
                this.changeLayer(e);
              for (let t in this._mainMapBaseLayers)
                this._mainMapBaseLayers[t].remove(),
                  this._lastMapTypeId == this._mainMapBaseLayers[t].mapTypeId &&
                    this._mainMapBaseLayers[t].addTo(i);
            }
          this._handligMiniMapTypeToggle = !1;
        }
      },
    }),
      (L.Control.EditInOSM = L.Control.extend({
        options: { editor: !1 },
        _edit: function () {
          var t = this._map.getCenter(),
            e = this._map.getZoom(),
            i = this.options.editor ? '&editor=' + this.options.editor : '';
          window.open(
            'http://www.openstreetmap.org/edit?zoom=' +
              e +
              i +
              '&lat=' +
              t.lat +
              '&lon=' +
              t.lng
          );
        },
        onAdd: function (t) {
          var e = L.DomUtil.create(
              'div',
              'leaflet-control-attribution leaflet-edit-osm'
            ),
            i = L.DomUtil.create('a', '', e);
          return (
            (i.href = '#'),
            (i.innerHTML = '✎ Edit'),
            (i.title = 'Edit in OpenStreetMap'),
            L.DomEvent.on(i, 'click', L.DomEvent.stopPropagation)
              .on(i, 'mousedown', L.DomEvent.stopPropagation)
              .on(i, 'dblclick', L.DomEvent.stopPropagation)
              .on(i, 'click', L.DomEvent.preventDefault)
              .on(i, 'click', L.bind(this._edit, this), this),
            e
          );
        },
      }));
  })();
});
//# sourceMappingURL=leaflet-ui.js.map

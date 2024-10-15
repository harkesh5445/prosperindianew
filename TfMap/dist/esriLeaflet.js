/* esri-leaflet - v3.0.12 - Mon Nov 27 2023 08:34:50 GMT-0600 (Central Standard Time)
 * Copyright (c) 2023 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports, require('leaflet'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'leaflet'], e)
    : e(
        (((t = 'undefined' != typeof globalThis ? globalThis : t || self).L =
          t.L || {}),
        (t.L.esri = {})),
        t.L
      );
})(this, function (t, e) {
  'use strict';
  var i = '3.0.12',
    s =
      window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest(),
    r = '' === document.documentElement.style.pointerEvents,
    o = { cors: s, pointerEvents: r },
    n = { attributionWidthOffset: 55 },
    a = 0;
  function l(t) {
    var e = '';
    for (var i in ((t.f = t.f || 'json'), t))
      if (Object.prototype.hasOwnProperty.call(t, i)) {
        var s,
          r = t[i],
          o = Object.prototype.toString.call(r);
        e.length && (e += '&'),
          (s =
            '[object Array]' === o
              ? '[object Object]' === Object.prototype.toString.call(r[0])
                ? JSON.stringify(r)
                : r.join(',')
              : '[object Object]' === o
              ? JSON.stringify(r)
              : '[object Date]' === o
              ? r.valueOf()
              : r),
          (e += encodeURIComponent(i) + '=' + encodeURIComponent(s));
      }
    return e.replaceAll("'", '%27');
  }
  function u(t, i) {
    var s = new window.XMLHttpRequest();
    return (
      (s.onerror = function (r) {
        (s.onreadystatechange = e.Util.falseFn),
          t.call(
            i,
            { error: { code: 500, message: 'XMLHttpRequest error' } },
            null
          );
      }),
      (s.onreadystatechange = function () {
        var r, o;
        if (4 === s.readyState) {
          try {
            r = JSON.parse(s.responseText);
          } catch (t) {
            (r = null),
              (o = {
                code: 500,
                message:
                  'Could not parse response as JSON. This could also be caused by a CORS or XMLHttpRequest error.',
              });
          }
          !o && r.error && ((o = r.error), (r = null)),
            (s.onerror = e.Util.falseFn),
            t.call(i, o, r);
        }
      }),
      (s.ontimeout = function () {
        this.onerror();
      }),
      s
    );
  }
  function h(t, e, i, s) {
    var r = u(i, s);
    return (
      r.open('POST', t),
      null != s && void 0 !== s.options && (r.timeout = s.options.timeout),
      r.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded; charset=UTF-8'
      ),
      r.send(l(e)),
      r
    );
  }
  function c(t, e, i, s) {
    var r = u(i, s);
    return (
      r.open('GET', t + '?' + l(e), !0),
      null != s &&
        void 0 !== s.options &&
        ((r.timeout = s.options.timeout),
        s.options.withCredentials && (r.withCredentials = !0)),
      r.send(null),
      r
    );
  }
  function p(t, e, i, s) {
    var r = l(e),
      n = u(i, s),
      a = (t + '?' + r).length;
    if (
      (a <= 2e3 && o.cors
        ? n.open('GET', t + '?' + r)
        : a > 2e3 &&
          o.cors &&
          (n.open('POST', t),
          n.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded; charset=UTF-8'
          )),
      null != s &&
        void 0 !== s.options &&
        ((n.timeout = s.options.timeout),
        s.options.withCredentials && (n.withCredentials = !0)),
      a <= 2e3 && o.cors)
    )
      n.send(null);
    else {
      if (!(a > 2e3 && o.cors))
        return a <= 2e3 && !o.cors
          ? d(t, e, i, s)
          : void f(
              'a request to ' +
                t +
                ' was longer then 2000 characters and this browser cannot make a cross-domain post request. Please use a proxy https://developers.arcgis.com/esri-leaflet/api-reference/request/'
            );
      n.send(r);
    }
    return n;
  }
  function d(t, i, s, r) {
    window._EsriLeafletCallbacks = window._EsriLeafletCallbacks || {};
    var o = 'c' + a;
    (i.callback = 'window._EsriLeafletCallbacks.' + o),
      (window._EsriLeafletCallbacks[o] = function (t) {
        if (!0 !== window._EsriLeafletCallbacks[o]) {
          var e,
            i = Object.prototype.toString.call(t);
          '[object Object]' !== i &&
            '[object Array]' !== i &&
            ((e = {
              error: {
                code: 500,
                message: 'Expected array or object as JSONP response',
              },
            }),
            (t = null)),
            !e && t.error && ((e = t), (t = null)),
            s.call(r, e, t),
            (window._EsriLeafletCallbacks[o] = !0);
        }
      });
    var n = e.DomUtil.create('script', null, document.body);
    return (
      (n.type = 'text/javascript'),
      (n.src = t + '?' + l(i)),
      (n.id = o),
      (n.onerror = function (t) {
        if (t && !0 !== window._EsriLeafletCallbacks[o]) {
          s.call(r, {
            error: { code: 500, message: 'An unknown error occurred' },
          }),
            (window._EsriLeafletCallbacks[o] = !0);
        }
      }),
      e.DomUtil.addClass(n, 'esri-leaflet-jsonp'),
      a++,
      {
        id: o,
        url: n.src,
        abort: function () {
          window._EsriLeafletCallbacks._callback[o]({
            code: 0,
            message: 'Request aborted.',
          });
        },
      }
    );
  }
  var m = o.cors ? c : d;
  function f() {
    console && console.warn && console.warn.apply(console, arguments);
  }
  (m.CORS = c), (m.JSONP = d);
  var y = { request: p, get: m, post: h },
    g = function (t, e, i, s) {
      var r = (s[0] - i[0]) * (t[1] - i[1]) - (s[1] - i[1]) * (t[0] - i[0]),
        o = (e[0] - t[0]) * (t[1] - i[1]) - (e[1] - t[1]) * (t[0] - i[0]),
        n = (s[1] - i[1]) * (e[0] - t[0]) - (s[0] - i[0]) * (e[1] - t[1]);
      if (0 !== n) {
        var a = r / n,
          l = o / n;
        if (a >= 0 && a <= 1 && l >= 0 && l <= 1) return !0;
      }
      return !1;
    },
    _ = function (t, e) {
      for (var i = 0; i < t.length - 1; i++)
        for (var s = 0; s < e.length - 1; s++)
          if (g(t[i], t[i + 1], e[s], e[s + 1])) return !0;
      return !1;
    },
    v = function (t) {
      return (
        (function (t, e) {
          for (var i = 0; i < t.length; i++) if (t[i] !== e[i]) return !1;
          return !0;
        })(t[0], t[t.length - 1]) || t.push(t[0]),
        t
      );
    },
    b = function (t) {
      for (var e, i = 0, s = 0, r = t.length, o = t[s]; s < r - 1; s++)
        (i += ((e = t[s + 1])[0] - o[0]) * (e[1] + o[1])), (o = e);
      return i >= 0;
    },
    x = function (t) {
      var e = {};
      for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
      return e;
    },
    L = function (t, e) {
      var i = _(t, e),
        s = (function (t, e) {
          for (var i = !1, s = -1, r = t.length, o = r - 1; ++s < r; o = s)
            ((t[s][1] <= e[1] && e[1] < t[o][1]) ||
              (t[o][1] <= e[1] && e[1] < t[s][1])) &&
              e[0] <
                ((t[o][0] - t[s][0]) * (e[1] - t[s][1])) / (t[o][1] - t[s][1]) +
                  t[s][0] &&
              (i = !i);
          return i;
        })(t, e[0]);
      return !(i || !s);
    },
    S = function t(e, i) {
      var s = {};
      if (e.features) {
        (s.type = 'FeatureCollection'), (s.features = []);
        for (var r = 0; r < e.features.length; r++)
          s.features.push(t(e.features[r], i));
      }
      if (
        ('number' == typeof e.x &&
          'number' == typeof e.y &&
          ((s.type = 'Point'),
          (s.coordinates = [e.x, e.y]),
          'number' == typeof e.z && s.coordinates.push(e.z)),
        e.points &&
          ((s.type = 'MultiPoint'), (s.coordinates = e.points.slice(0))),
        e.paths &&
          (1 === e.paths.length
            ? ((s.type = 'LineString'), (s.coordinates = e.paths[0].slice(0)))
            : ((s.type = 'MultiLineString'),
              (s.coordinates = e.paths.slice(0)))),
        e.rings &&
          (s = (function (t) {
            for (var e, i, s, r = [], o = [], n = 0; n < t.length; n++) {
              var a = v(t[n].slice(0));
              if (!(a.length < 4))
                if (b(a)) {
                  var l = [a.slice().reverse()];
                  r.push(l);
                } else o.push(a.slice().reverse());
            }
            for (var u = []; o.length; ) {
              s = o.pop();
              var h = !1;
              for (e = r.length - 1; e >= 0; e--)
                if (((i = r[e][0]), L(i, s))) {
                  r[e].push(s), (h = !0);
                  break;
                }
              h || u.push(s);
            }
            for (; u.length; ) {
              s = u.pop();
              var c = !1;
              for (e = r.length - 1; e >= 0; e--)
                if (((i = r[e][0]), _(i, s))) {
                  r[e].push(s), (c = !0);
                  break;
                }
              c || r.push([s.reverse()]);
            }
            return 1 === r.length
              ? { type: 'Polygon', coordinates: r[0] }
              : { type: 'MultiPolygon', coordinates: r };
          })(e.rings.slice(0))),
        'number' == typeof e.xmin &&
          'number' == typeof e.ymin &&
          'number' == typeof e.xmax &&
          'number' == typeof e.ymax &&
          ((s.type = 'Polygon'),
          (s.coordinates = [
            [
              [e.xmax, e.ymax],
              [e.xmin, e.ymax],
              [e.xmin, e.ymin],
              [e.xmax, e.ymin],
              [e.xmax, e.ymax],
            ],
          ])),
        (e.geometry || e.attributes) &&
          ((s.type = 'Feature'),
          (s.geometry = e.geometry ? t(e.geometry) : null),
          (s.properties = e.attributes ? x(e.attributes) : null),
          e.attributes))
      )
        try {
          s.id = (function (t, e) {
            for (
              var i = e ? [e, 'OBJECTID', 'FID'] : ['OBJECTID', 'FID'], s = 0;
              s < i.length;
              s++
            ) {
              var r = i[s];
              if (
                r in t &&
                ('string' == typeof t[r] || 'number' == typeof t[r])
              )
                return t[r];
            }
            throw Error('No valid id attribute found');
          })(e.attributes, i);
        } catch (t) {}
      return (
        JSON.stringify(s.geometry) === JSON.stringify({}) &&
          (s.geometry = null),
        e.spatialReference &&
          e.spatialReference.wkid &&
          4326 !== e.spatialReference.wkid &&
          console.warn(
            'Object converted in non-standard crs - ' +
              JSON.stringify(e.spatialReference)
          ),
        s
      );
    },
    A = function (t) {
      var e = [],
        i = t.slice(0),
        s = v(i.shift().slice(0));
      if (s.length >= 4) {
        b(s) || s.reverse(), e.push(s);
        for (var r = 0; r < i.length; r++) {
          var o = v(i[r].slice(0));
          o.length >= 4 && (b(o) && o.reverse(), e.push(o));
        }
      }
      return e;
    },
    I = function t(e, i) {
      i = i || 'OBJECTID';
      var s,
        r = { wkid: 4326 },
        o = {};
      switch (e.type) {
        case 'Point':
          (o.x = e.coordinates[0]),
            (o.y = e.coordinates[1]),
            e.coordinates[2] && (o.z = e.coordinates[2]),
            (o.spatialReference = r);
          break;
        case 'MultiPoint':
          (o.points = e.coordinates.slice(0)),
            e.coordinates[0][2] && (o.hasZ = !0),
            (o.spatialReference = r);
          break;
        case 'LineString':
          (o.paths = [e.coordinates.slice(0)]),
            e.coordinates[0][2] && (o.hasZ = !0),
            (o.spatialReference = r);
          break;
        case 'MultiLineString':
          (o.paths = e.coordinates.slice(0)),
            e.coordinates[0][0][2] && (o.hasZ = !0),
            (o.spatialReference = r);
          break;
        case 'Polygon':
          (o.rings = A(e.coordinates.slice(0))),
            e.coordinates[0][0][2] && (o.hasZ = !0),
            (o.spatialReference = r);
          break;
        case 'MultiPolygon':
          (o.rings = (function (t) {
            for (var e = [], i = 0; i < t.length; i++)
              for (var s = A(t[i]), r = s.length - 1; r >= 0; r--) {
                var o = s[r].slice(0);
                e.push(o);
              }
            return e;
          })(e.coordinates.slice(0))),
            e.coordinates[0][0][0][2] && (o.hasZ = !0),
            (o.spatialReference = r);
          break;
        case 'Feature':
          e.geometry && (o.geometry = t(e.geometry, i)),
            (o.attributes = e.properties ? x(e.properties) : {}),
            e.id && (o.attributes[i] = e.id);
          break;
        case 'FeatureCollection':
          for (o = [], s = 0; s < e.features.length; s++)
            o.push(t(e.features[s], i));
          break;
        case 'GeometryCollection':
          for (o = [], s = 0; s < e.geometries.length; s++)
            o.push(t(e.geometries[s], i));
      }
      return o;
    };
  /* @preserve
   * @terraformer/arcgis - v2.0.7 - MIT
   * Copyright (c) 2012-2021 Environmental Systems Research Institute, Inc.
   * Thu Jul 22 2021 13:58:30 GMT-0700 (Pacific Daylight Time)
   */
  /* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
   * Apache-2.0 */ function T(t, e) {
    return I(t, e);
  }
  function C(t, e) {
    return S(t, e);
  }
  function w(t) {
    if (
      'NaN' !== t.xmin &&
      'NaN' !== t.ymin &&
      'NaN' !== t.xmax &&
      'NaN' !== t.ymax
    ) {
      var i = e.latLng(t.ymin, t.xmin),
        s = e.latLng(t.ymax, t.xmax);
      return e.latLngBounds(i, s);
    }
    return null;
  }
  function R(t) {
    return {
      xmin: (t = e.latLngBounds(t)).getSouthWest().lng,
      ymin: t.getSouthWest().lat,
      xmax: t.getNorthEast().lng,
      ymax: t.getNorthEast().lat,
      spatialReference: { wkid: 4326 },
    };
  }
  var P = /^(OBJECTID|FID|OID|ID)$/i;
  function O(t) {
    var e;
    if (t.objectIdFieldName) e = t.objectIdFieldName;
    else if (t.fields) {
      for (var i = 0; i <= t.fields.length - 1; i++)
        if ('esriFieldTypeOID' === t.fields[i].type) {
          e = t.fields[i].name;
          break;
        }
      if (!e)
        for (i = 0; i <= t.fields.length - 1; i++)
          if (t.fields[i].name.match(P)) {
            e = t.fields[i].name;
            break;
          }
    }
    return e;
  }
  function F(t) {
    for (var e in t.attributes) if (e.match(P)) return e;
  }
  function k(t, e) {
    var i,
      s = t.features || t.results,
      r = s && s.length;
    i = e || O(t);
    var o = { type: 'FeatureCollection', features: [] };
    if (r)
      for (var n = s.length - 1; n >= 0; n--) {
        var a = C(s[n], i || F(s[n]));
        o.features.push(a);
      }
    return o;
  }
  function M(t) {
    return '/' !== (t = e.Util.trim(t))[t.length - 1] && (t += '/'), t;
  }
  function U(t) {
    if (-1 !== t.url.indexOf('?')) {
      t.requestParams = t.requestParams || {};
      var e = t.url.substring(t.url.indexOf('?') + 1);
      (t.url = t.url.split('?')[0]),
        (t.requestParams = JSON.parse(
          '{"' +
            decodeURI(e)
              .replace(/"/g, '\\"')
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}'
        ));
    }
    return (t.url = M(t.url.split('?')[0])), t;
  }
  function G(t) {
    return /^(?!.*utility\.arcgis\.com).*\.arcgis\.com.*FeatureServer/i.test(t);
  }
  function D(t) {
    var e;
    switch (t) {
      case 'Point':
        e = 'esriGeometryPoint';
        break;
      case 'MultiPoint':
        e = 'esriGeometryMultipoint';
        break;
      case 'LineString':
      case 'MultiLineString':
        e = 'esriGeometryPolyline';
        break;
      case 'Polygon':
      case 'MultiPolygon':
        e = 'esriGeometryPolygon';
    }
    return e;
  }
  function E(t) {
    return t.getSize().x - n.attributionWidthOffset + 'px';
  }
  function q(t) {
    if (t.attributionControl) {
      if (
        (t.attributionControl._esriAttributionLayerCount ||
          (t.attributionControl._esriAttributionLayerCount = 0),
        0 === t.attributionControl._esriAttributionLayerCount)
      ) {
        if (!t.attributionControl._esriAttributionAddedOnce) {
          var i = document.createElement('style');
          (i.type = 'text/css'),
            (i.innerHTML =
              '.esri-truncated-attribution:hover {white-space: normal;}'),
            document.getElementsByTagName('head')[0].appendChild(i);
          var s = document.createElement('style');
          (s.type = 'text/css'),
            (s.innerHTML =
              '.esri-truncated-attribution {vertical-align: -3px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;transition: 0s white-space;transition-delay: 1s;max-width: ' +
              E(t) +
              ';}'),
            document.getElementsByTagName('head')[0].appendChild(s),
            t.on('resize', function (e) {
              t.attributionControl &&
                (t.attributionControl._container.style.maxWidth = E(e.target));
            }),
            (t.attributionControl._esriAttributionAddedOnce = !0);
        }
        e.DomUtil.addClass(
          t.attributionControl._container,
          'esri-truncated-attribution:hover'
        ),
          e.DomUtil.addClass(
            t.attributionControl._container,
            'esri-truncated-attribution'
          );
      }
      t.attributionControl._esriAttributionLayerCount =
        t.attributionControl._esriAttributionLayerCount + 1;
    }
  }
  function B(t) {
    t.attributionControl &&
      (t.attributionControl._esriAttributionLayerCount &&
        1 === t.attributionControl._esriAttributionLayerCount &&
        (e.DomUtil.removeClass(
          t.attributionControl._container,
          'esri-truncated-attribution:hover'
        ),
        e.DomUtil.removeClass(
          t.attributionControl._container,
          'esri-truncated-attribution'
        )),
      (t.attributionControl._esriAttributionLayerCount =
        t.attributionControl._esriAttributionLayerCount - 1));
  }
  function z(t) {
    var i = { geometry: null, geometryType: null };
    return t instanceof e.LatLngBounds
      ? ((i.geometry = R(t)), (i.geometryType = 'esriGeometryEnvelope'), i)
      : (t.getLatLng && (t = t.getLatLng()),
        t instanceof e.LatLng &&
          (t = { type: 'Point', coordinates: [t.lng, t.lat] }),
        t instanceof e.GeoJSON &&
          ((t = t.getLayers()[0].feature.geometry),
          (i.geometry = T(t)),
          (i.geometryType = D(t.type))),
        t.toGeoJSON && (t = t.toGeoJSON()),
        'Feature' === t.type && (t = t.geometry),
        'Point' === t.type ||
        'LineString' === t.type ||
        'Polygon' === t.type ||
        'MultiPolygon' === t.type
          ? ((i.geometry = T(t)), (i.geometryType = D(t.type)), i)
          : void f(
              'invalid geometry passed to spatial query. Should be L.LatLng, L.LatLngBounds, L.Marker or a GeoJSON Point, Line, Polygon or MultiPolygon object'
            ));
  }
  function Z(t, i) {
    o.cors &&
      p(
        t,
        {},
        e.Util.bind(function (t, s) {
          if (!t) {
            i._esriAttributions = [];
            for (var r = 0; r < s.contributors.length; r++)
              for (
                var o = s.contributors[r], n = 0;
                n < o.coverageAreas.length;
                n++
              ) {
                var a = o.coverageAreas[n],
                  l = e.latLng(a.bbox[0], a.bbox[1]),
                  u = e.latLng(a.bbox[2], a.bbox[3]);
                i._esriAttributions.push({
                  attribution: o.attribution,
                  score: a.score,
                  bounds: e.latLngBounds(l, u),
                  minZoom: a.zoomMin,
                  maxZoom: a.zoomMax,
                });
              }
            i._esriAttributions.sort(function (t, e) {
              return e.score - t.score;
            }),
              N({ target: i });
          }
        }, this)
      );
  }
  function N(t) {
    var i = t.target,
      s = i._esriAttributions;
    if (i && i.attributionControl) {
      var r = i.attributionControl._container.querySelector(
        '.esri-dynamic-attribution'
      );
      if (r && s) {
        for (
          var o = '',
            n = i.getBounds(),
            a = e.latLngBounds(
              n.getSouthWest().wrap(),
              n.getNorthEast().wrap()
            ),
            l = i.getZoom(),
            u = 0;
          u < s.length;
          u++
        ) {
          var h = s[u],
            c = h.attribution;
          !o.match(c) &&
            h.bounds.intersects(a) &&
            l >= h.minZoom &&
            l <= h.maxZoom &&
            (o += ', ' + c);
        }
        (o =
          'Powered by <a href="https://www.esri.com">Esri</a> | ' +
          o.substr(2)),
          (r.innerHTML = o),
          (r.style.maxWidth = E(i)),
          i.fire('attributionupdated', { attribution: o });
      }
    }
  }
  var j = {
      warn: f,
      cleanUrl: M,
      getUrlParams: U,
      isArcgisOnline: G,
      geojsonTypeToArcGIS: D,
      responseToFeatureCollection: k,
      geojsonToArcGIS: T,
      arcgisToGeoJSON: C,
      boundsToExtent: R,
      extentToBounds: w,
      calcAttributionWidth: E,
      setEsriAttribution: q,
      removeEsriAttribution: B,
      _setGeometry: z,
      _getAttributionData: Z,
      _updateMapAttribution: N,
      _findIdAttributeFromFeature: F,
      _findIdAttributeFromResponse: O,
    },
    W = e.Class.extend({
      options: { proxy: !1, useCors: s },
      generateSetter: function (t, i) {
        return e.Util.bind(function (e) {
          return (this.params[t] = e), this;
        }, i);
      },
      initialize: function (t) {
        if (
          (t.request && t.options
            ? ((this._service = t), e.Util.setOptions(this, t.options))
            : (e.Util.setOptions(this, t), (this.options.url = M(t.url))),
          (this.params = e.Util.extend({}, this.params || {})),
          this.setters)
        )
          for (var i in this.setters) {
            var s = this.setters[i];
            this[i] = this.generateSetter(s, this);
          }
      },
      token: function (t) {
        return (
          this._service
            ? this._service.authenticate(t)
            : (this.params.token = t),
          this
        );
      },
      apikey: function (t) {
        return this.token(t);
      },
      format: function (t) {
        return (this.params.returnUnformattedValues = !t), this;
      },
      request: function (t, i) {
        return (
          this.options.requestParams &&
            e.Util.extend(this.params, this.options.requestParams),
          this._service
            ? this._service.request(this.path, this.params, t, i)
            : this._request('request', this.path, this.params, t, i)
        );
      },
      _request: function (t, e, i, s, r) {
        var o = this.options.proxy
          ? this.options.proxy + '?' + this.options.url + e
          : this.options.url + e;
        return ('get' !== t && 'request' !== t) || this.options.useCors
          ? y[t](o, i, s, r)
          : y.get.JSONP(o, i, s, r);
      },
    });
  var J = W.extend({
    setters: {
      offset: 'resultOffset',
      limit: 'resultRecordCount',
      fields: 'outFields',
      precision: 'geometryPrecision',
      featureIds: 'objectIds',
      returnGeometry: 'returnGeometry',
      returnM: 'returnM',
      transform: 'datumTransformation',
      token: 'token',
    },
    path: 'query',
    params: { returnGeometry: !0, where: '1=1', outSR: 4326, outFields: '*' },
    within: function (t) {
      return (
        this._setGeometryParams(t),
        (this.params.spatialRel = 'esriSpatialRelContains'),
        this
      );
    },
    intersects: function (t) {
      return (
        this._setGeometryParams(t),
        (this.params.spatialRel = 'esriSpatialRelIntersects'),
        this
      );
    },
    contains: function (t) {
      return (
        this._setGeometryParams(t),
        (this.params.spatialRel = 'esriSpatialRelWithin'),
        this
      );
    },
    crosses: function (t) {
      return (
        this._setGeometryParams(t),
        (this.params.spatialRel = 'esriSpatialRelCrosses'),
        this
      );
    },
    touches: function (t) {
      return (
        this._setGeometryParams(t),
        (this.params.spatialRel = 'esriSpatialRelTouches'),
        this
      );
    },
    overlaps: function (t) {
      return (
        this._setGeometryParams(t),
        (this.params.spatialRel = 'esriSpatialRelOverlaps'),
        this
      );
    },
    bboxIntersects: function (t) {
      return (
        this._setGeometryParams(t),
        (this.params.spatialRel = 'esriSpatialRelEnvelopeIntersects'),
        this
      );
    },
    indexIntersects: function (t) {
      return (
        this._setGeometryParams(t),
        (this.params.spatialRel = 'esriSpatialRelIndexIntersects'),
        this
      );
    },
    nearby: function (t, i) {
      return (
        (t = e.latLng(t)),
        (this.params.geometry = [t.lng, t.lat]),
        (this.params.geometryType = 'esriGeometryPoint'),
        (this.params.spatialRel = 'esriSpatialRelIntersects'),
        (this.params.units = 'esriSRUnit_Meter'),
        (this.params.distance = i),
        (this.params.inSR = 4326),
        this
      );
    },
    where: function (t) {
      return (this.params.where = t), this;
    },
    between: function (t, e) {
      return (this.params.time = [t.valueOf(), e.valueOf()]), this;
    },
    simplify: function (t, e) {
      var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
      return (this.params.maxAllowableOffset = (i / t.getSize().y) * e), this;
    },
    orderBy: function (t, e) {
      return (
        (e = e || 'ASC'),
        (this.params.orderByFields = this.params.orderByFields
          ? this.params.orderByFields + ','
          : ''),
        (this.params.orderByFields += [t, e].join(' ')),
        this
      );
    },
    run: function (t, e) {
      return (
        this._cleanParams(),
        this.options.isModern ||
        (G(this.options.url) && void 0 === this.options.isModern)
          ? ((this.params.f = 'geojson'),
            this.request(function (i, s) {
              this._trapSQLerrors(i), t.call(e, i, s, s);
            }, this))
          : this.request(function (i, s) {
              this._trapSQLerrors(i), t.call(e, i, s && k(s), s);
            }, this)
      );
    },
    count: function (t, e) {
      return (
        this._cleanParams(),
        (this.params.returnCountOnly = !0),
        this.request(function (e, i) {
          t.call(this, e, i && i.count, i);
        }, e)
      );
    },
    ids: function (t, e) {
      return (
        this._cleanParams(),
        (this.params.returnIdsOnly = !0),
        this.request(function (e, i) {
          t.call(this, e, i && i.objectIds, i);
        }, e)
      );
    },
    bounds: function (t, e) {
      return (
        this._cleanParams(),
        (this.params.returnExtentOnly = !0),
        this.request(function (i, s) {
          s && s.extent && w(s.extent)
            ? t.call(e, i, w(s.extent), s)
            : ((i = { message: 'Invalid Bounds' }), t.call(e, i, null, s));
        }, e)
      );
    },
    distinct: function () {
      return (
        (this.params.returnGeometry = !1),
        (this.params.returnDistinctValues = !0),
        this
      );
    },
    pixelSize: function (t) {
      var i = e.point(t);
      return (this.params.pixelSize = [i.x, i.y]), this;
    },
    layer: function (t) {
      return (this.path = t + '/query'), this;
    },
    _trapSQLerrors: function (t) {
      t &&
        '400' === t.code &&
        f(
          'one common syntax error in query requests is encasing string values in double quotes instead of single quotes'
        );
    },
    _cleanParams: function () {
      delete this.params.returnIdsOnly,
        delete this.params.returnExtentOnly,
        delete this.params.returnCountOnly;
    },
    _setGeometryParams: function (t) {
      this.params.inSR = 4326;
      var e = z(t);
      (this.params.geometry = e.geometry),
        (this.params.geometryType = e.geometryType);
    },
  });
  function V(t) {
    return new J(t);
  }
  var Q = W.extend({
    setters: {
      contains: 'contains',
      text: 'searchText',
      fields: 'searchFields',
      spatialReference: 'sr',
      sr: 'sr',
      layers: 'layers',
      returnGeometry: 'returnGeometry',
      maxAllowableOffset: 'maxAllowableOffset',
      precision: 'geometryPrecision',
      dynamicLayers: 'dynamicLayers',
      returnZ: 'returnZ',
      returnM: 'returnM',
      gdbVersion: 'gdbVersion',
      token: 'token',
    },
    path: 'find',
    params: {
      sr: 4326,
      contains: !0,
      returnGeometry: !0,
      returnZ: !0,
      returnM: !1,
    },
    layerDefs: function (t, e) {
      return (
        (this.params.layerDefs = this.params.layerDefs
          ? this.params.layerDefs + ';'
          : ''),
        (this.params.layerDefs += [t, e].join(':')),
        this
      );
    },
    simplify: function (t, e) {
      var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
      return (this.params.maxAllowableOffset = (i / t.getSize().y) * e), this;
    },
    run: function (t, e) {
      return this.request(function (i, s) {
        t.call(e, i, s && k(s), s);
      }, e);
    },
  });
  function K(t) {
    return new Q(t);
  }
  var H = W.extend({
    path: 'identify',
    between: function (t, e) {
      return (this.params.time = [t.valueOf(), e.valueOf()]), this;
    },
  });
  var X = H.extend({
    setters: {
      layers: 'layers',
      precision: 'geometryPrecision',
      tolerance: 'tolerance',
      returnGeometry: 'returnGeometry',
    },
    params: { sr: 4326, layers: 'all', tolerance: 3, returnGeometry: !0 },
    on: function (t) {
      var e = R(t.getBounds()),
        i = t.getSize();
      return (
        (this.params.imageDisplay = [i.x, i.y, 96]),
        (this.params.mapExtent = [e.xmin, e.ymin, e.xmax, e.ymax]),
        this
      );
    },
    at: function (t) {
      return (
        2 === t.length && (t = e.latLng(t)), this._setGeometryParams(t), this
      );
    },
    layerDef: function (t, e) {
      return (
        (this.params.layerDefs = this.params.layerDefs
          ? this.params.layerDefs + ';'
          : ''),
        (this.params.layerDefs += [t, e].join(':')),
        this
      );
    },
    simplify: function (t, e) {
      var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
      return (this.params.maxAllowableOffset = (i / t.getSize().y) * e), this;
    },
    run: function (t, e) {
      return this.request(function (i, s) {
        if (i) t.call(e, i, void 0, s);
        else {
          var r = k(s);
          s.results = s.results.reverse();
          for (var o = 0; o < r.features.length; o++) {
            r.features[o].layerId = s.results[o].layerId;
          }
          t.call(e, void 0, r, s);
        }
      });
    },
    _setGeometryParams: function (t) {
      var e = z(t);
      (this.params.geometry = e.geometry),
        (this.params.geometryType = e.geometryType);
    },
  });
  function Y(t) {
    return new X(t);
  }
  var $ = H.extend({
    setters: {
      setMosaicRule: 'mosaicRule',
      setRenderingRule: 'renderingRule',
      setPixelSize: 'pixelSize',
      returnCatalogItems: 'returnCatalogItems',
      returnGeometry: 'returnGeometry',
    },
    params: { returnGeometry: !1 },
    at: function (t) {
      return (
        (t = e.latLng(t)),
        (this.params.geometry = JSON.stringify({
          x: t.lng,
          y: t.lat,
          spatialReference: { wkid: 4326 },
        })),
        (this.params.geometryType = 'esriGeometryPoint'),
        this
      );
    },
    getMosaicRule: function () {
      return this.params.mosaicRule;
    },
    getRenderingRule: function () {
      return this.params.renderingRule;
    },
    getPixelSize: function () {
      return this.params.pixelSize;
    },
    run: function (t, e) {
      return this.request(function (i, s) {
        t.call(e, i, s && this._responseToGeoJSON(s), s);
      }, this);
    },
    _responseToGeoJSON: function (t) {
      var e = t.location,
        i = t.catalogItems,
        s = t.catalogItemVisibilities,
        r = {
          pixel: {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [e.x, e.y] },
            crs: {
              type: 'EPSG',
              properties: { code: e.spatialReference.wkid },
            },
            properties: { OBJECTID: t.objectId, name: t.name, value: t.value },
            id: t.objectId,
          },
        };
      if (
        (t.properties &&
          t.properties.Values &&
          (r.pixel.properties.values = t.properties.Values),
        i &&
          i.features &&
          ((r.catalogItems = k(i)),
          s && s.length === r.catalogItems.features.length))
      )
        for (var o = s.length - 1; o >= 0; o--)
          r.catalogItems.features[o].properties.catalogItemVisibility = s[o];
      return r;
    },
  });
  function tt(t) {
    return new $(t);
  }
  var et = e.Evented.extend({
    options: { proxy: !1, useCors: s, timeout: 0 },
    initialize: function (t) {
      (t = t || {}),
        (this._requestQueue = []),
        (this._authenticating = !1),
        e.Util.setOptions(this, t),
        (this.options.url = M(this.options.url));
    },
    get: function (t, e, i, s) {
      return this._request('get', t, e, i, s);
    },
    post: function (t, e, i, s) {
      return this._request('post', t, e, i, s);
    },
    request: function (t, e, i, s) {
      return this._request('request', t, e, i, s);
    },
    metadata: function (t, e) {
      return this._request('get', '', {}, t, e);
    },
    authenticate: function (t) {
      return (
        (this._authenticating = !1),
        (this.options.token = t),
        this._runQueue(),
        this
      );
    },
    getTimeout: function () {
      return this.options.timeout;
    },
    setTimeout: function (t) {
      this.options.timeout = t;
    },
    _request: function (t, i, s, r, o) {
      this.fire(
        'requeststart',
        { url: this.options.url + i, params: s, method: t },
        !0
      );
      var n = this._createServiceCallback(t, i, s, r, o);
      if (
        (this.options.token && (s.token = this.options.token),
        this.options.requestParams &&
          e.Util.extend(s, this.options.requestParams),
        !this._authenticating)
      ) {
        var a = this.options.proxy
          ? this.options.proxy + '?' + this.options.url + i
          : this.options.url + i;
        return ('get' !== t && 'request' !== t) || this.options.useCors
          ? y[t](a, s, n, o)
          : y.get.JSONP(a, s, n, o);
      }
      this._requestQueue.push([t, i, s, r, o]);
    },
    _createServiceCallback: function (t, i, s, r, o) {
      return e.Util.bind(function (n, a) {
        !n ||
          (499 !== n.code && 498 !== n.code) ||
          ((this._authenticating = !0),
          this._requestQueue.push([t, i, s, r, o]),
          this.fire(
            'authenticationrequired',
            { authenticate: e.Util.bind(this.authenticate, this) },
            !0
          ),
          (n.authenticate = e.Util.bind(this.authenticate, this))),
          r.call(o, n, a),
          n
            ? this.fire(
                'requesterror',
                {
                  url: this.options.url + i,
                  params: s,
                  message: n.message,
                  code: n.code,
                  method: t,
                },
                !0
              )
            : this.fire(
                'requestsuccess',
                {
                  url: this.options.url + i,
                  params: s,
                  response: a,
                  method: t,
                },
                !0
              ),
          this.fire(
            'requestend',
            { url: this.options.url + i, params: s, method: t },
            !0
          );
      }, this);
    },
    _runQueue: function () {
      for (var t = this._requestQueue.length - 1; t >= 0; t--) {
        var e = this._requestQueue[t];
        this[e.shift()].apply(this, e);
      }
      this._requestQueue = [];
    },
  });
  var it = et.extend({
    identify: function () {
      return Y(this);
    },
    find: function () {
      return K(this);
    },
    query: function () {
      return V(this);
    },
  });
  function st(t) {
    return new it(t);
  }
  var rt = et.extend({
    query: function () {
      return V(this);
    },
    identify: function () {
      return tt(this);
    },
  });
  function ot(t) {
    return new rt(t);
  }
  var nt = et.extend({
    options: { idAttribute: 'OBJECTID' },
    query: function () {
      return V(this);
    },
    addFeature: function (t, e, i) {
      this.addFeatures(t, e, i);
    },
    addFeatures: function (t, e, i) {
      for (var s = t.features ? t.features : [t], r = s.length - 1; r >= 0; r--)
        delete s[r].id;
      return (
        (t = T(t)),
        (t = s.length > 1 ? t : [t]),
        this.post(
          'addFeatures',
          { features: t },
          function (t, s) {
            var r =
              s && s.addResults
                ? s.addResults.length > 1
                  ? s.addResults
                  : s.addResults[0]
                : void 0;
            e && e.call(i, t || s.addResults[0].error, r);
          },
          i
        )
      );
    },
    updateFeature: function (t, e, i) {
      this.updateFeatures(t, e, i);
    },
    updateFeatures: function (t, e, i) {
      var s = t.features ? t.features : [t];
      return (
        (t = T(t, this.options.idAttribute)),
        (t = s.length > 1 ? t : [t]),
        this.post(
          'updateFeatures',
          { features: t },
          function (t, s) {
            var r =
              s && s.updateResults
                ? s.updateResults.length > 1
                  ? s.updateResults
                  : s.updateResults[0]
                : void 0;
            e && e.call(i, t || s.updateResults[0].error, r);
          },
          i
        )
      );
    },
    deleteFeature: function (t, e, i) {
      this.deleteFeatures(t, e, i);
    },
    deleteFeatures: function (t, e, i) {
      return this.post(
        'deleteFeatures',
        { objectIds: t },
        function (t, s) {
          var r =
            s && s.deleteResults
              ? s.deleteResults.length > 1
                ? s.deleteResults
                : s.deleteResults[0]
              : void 0;
          e && e.call(i, t || s.deleteResults[0].error, r);
        },
        i
      );
    },
  });
  function at(t) {
    return new nt(t);
  }
  var lt = 'https:' !== window.location.protocol ? 'http:' : 'https:',
    ut = e.TileLayer.extend({
      statics: {
        TILES: {
          Streets: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ['server', 'services'],
              attribution: 'USGS, NOAA',
              attributionUrl:
                'https://static.arcgis.com/attribution/World_Street_Map',
            },
          },
          Topographic: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ['server', 'services'],
              attribution: 'USGS, NOAA',
              attributionUrl:
                'https://static.arcgis.com/attribution/World_Topo_Map',
            },
          },
          Oceans: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              attribution: 'USGS, NOAA',
              attributionUrl:
                'https://static.arcgis.com/attribution/Ocean_Basemap',
            },
          },
          OceansLabels: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              pane: r ? 'esri-labels' : 'tilePane',
              attribution: '',
            },
          },
          NationalGeographic: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              attribution:
                'National Geographic, DeLorme, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, increment P Corp.',
            },
          },
          DarkGray: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              attribution:
                'HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors',
            },
          },
          DarkGrayLabels: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              pane: r ? 'esri-labels' : 'tilePane',
              attribution: '',
            },
          },
          Gray: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              attribution:
                'HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors',
            },
          },
          GrayLabels: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              pane: r ? 'esri-labels' : 'tilePane',
              attribution: '',
            },
          },
          Imagery: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ['server', 'services'],
              attribution:
                'DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community',
              attributionUrl:
                'https://static.arcgis.com/attribution/World_Imagery',
            },
          },
          ImageryLabels: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ['server', 'services'],
              pane: r ? 'esri-labels' : 'tilePane',
              attribution: '',
            },
          },
          ImageryTransportation: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ['server', 'services'],
              pane: r ? 'esri-labels' : 'tilePane',
              attribution: '',
            },
          },
          ShadedRelief: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 13,
              subdomains: ['server', 'services'],
              attribution: 'USGS',
            },
          },
          ShadedReliefLabels: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 12,
              subdomains: ['server', 'services'],
              pane: r ? 'esri-labels' : 'tilePane',
              attribution: '',
            },
          },
          Terrain: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 13,
              subdomains: ['server', 'services'],
              attribution: 'USGS, NOAA',
            },
          },
          TerrainLabels: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 13,
              subdomains: ['server', 'services'],
              pane: r ? 'esri-labels' : 'tilePane',
              attribution: '',
            },
          },
          USATopo: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 15,
              subdomains: ['server', 'services'],
              attribution: 'USGS, National Geographic Society, i-cubed',
            },
          },
          ImageryClarity: {
            urlTemplate:
              lt +
              '//clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 19,
              attribution:
                'Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
            },
          },
          Physical: {
            urlTemplate:
              lt +
              '//{s}.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 8,
              subdomains: ['server', 'services'],
              attribution: 'U.S. National Park Service',
            },
          },
          ImageryFirefly: {
            urlTemplate:
              lt +
              '//fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 19,
              attribution:
                'Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
              attributionUrl:
                'https://static.arcgis.com/attribution/World_Imagery',
            },
          },
        },
      },
      initialize: function (t, i) {
        var s;
        if ('object' == typeof t && t.urlTemplate && t.options) s = t;
        else {
          if ('string' != typeof t || !ut.TILES[t])
            throw new Error(
              'L.esri.BasemapLayer: Invalid parameter. Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Physical", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ImageryClarity", "ImageryFirefly", ShadedRelief", "ShadedReliefLabels", "Terrain", "TerrainLabels" or "USATopo"'
            );
          s = ut.TILES[t];
        }
        var r = e.Util.extend(s.options, i);
        e.Util.setOptions(this, r),
          this.options.ignoreDeprecationWarning ||
            console.warn(
              'WARNING: L.esri.BasemapLayer uses data services that are in mature support and are not being updated. Please use L.esri.Vector.vectorBasemapLayer instead. More info: https://esriurl.com/esri-leaflet-basemap'
            ),
          this.options.token &&
            -1 === s.urlTemplate.indexOf('token=') &&
            (s.urlTemplate += '?token=' + this.options.token),
          this.options.proxy &&
            (s.urlTemplate = this.options.proxy + '?' + s.urlTemplate),
          e.TileLayer.prototype.initialize.call(this, s.urlTemplate, r);
      },
      onAdd: function (t) {
        q(t),
          'esri-labels' === this.options.pane && this._initPane(),
          this.options.attributionUrl &&
            Z(
              (this.options.proxy ? this.options.proxy + '?' : '') +
                this.options.attributionUrl,
              t
            ),
          t.on('moveend', N),
          e.TileLayer.prototype.onAdd.call(this, t);
      },
      onRemove: function (t) {
        B(t), t.off('moveend', N), e.TileLayer.prototype.onRemove.call(this, t);
      },
      _initPane: function () {
        if (!this._map.getPane(this.options.pane)) {
          var t = this._map.createPane(this.options.pane);
          (t.style.pointerEvents = 'none'), (t.style.zIndex = 500);
        }
      },
      getAttribution: function () {
        if (this.options.attribution)
          var t =
            '<span class="esri-dynamic-attribution">' +
            this.options.attribution +
            '</span>';
        return t;
      },
    });
  var ht = e.TileLayer.extend({
    options: {
      zoomOffsetAllowance: 0.1,
      errorTileUrl:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAA1BMVEUzNDVszlHHAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAAAAAAAAAB6mUWpAAAADZJREFUeJztwQEBAAAAgiD/r25IQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7waBAAABw08RwAAAAABJRU5ErkJggg==',
    },
    statics: {
      MercatorZoomLevels: {
        0: 156543.033928,
        1: 78271.5169639999,
        2: 39135.7584820001,
        3: 19567.8792409999,
        4: 9783.93962049996,
        5: 4891.96981024998,
        6: 2445.98490512499,
        7: 1222.99245256249,
        8: 611.49622628138,
        9: 305.748113140558,
        10: 152.874056570411,
        11: 76.4370282850732,
        12: 38.2185141425366,
        13: 19.1092570712683,
        14: 9.55462853563415,
        15: 4.77731426794937,
        16: 2.38865713397468,
        17: 1.19432856685505,
        18: 0.597164283559817,
        19: 0.298582141647617,
        20: 0.14929107082381,
        21: 0.07464553541191,
        22: 0.0373227677059525,
        23: 0.0186613838529763,
      },
    },
    initialize: function (t) {
      (t = U((t = e.Util.setOptions(this, t)))),
        (this.tileUrl =
          (t.proxy ? t.proxy + '?' : '') +
          t.url +
          'tile/{z}/{y}/{x}' +
          (t.requestParams && Object.keys(t.requestParams).length > 0
            ? e.Util.getParamString(t.requestParams)
            : '')),
        -1 !== t.url.indexOf('{s}') &&
          t.subdomains &&
          (t.url = t.url.replace('{s}', t.subdomains[0])),
        (this.service = st(t)),
        this.service.addEventParent(this),
        new RegExp(/tiles.arcgis(online)?\.com/g).test(t.url) &&
          ((this.tileUrl = this.tileUrl.replace('://tiles', '://tiles{s}')),
          (t.subdomains = ['1', '2', '3', '4'])),
        this.options.token && (this.tileUrl += '?token=' + this.options.token),
        e.TileLayer.prototype.initialize.call(this, this.tileUrl, t);
    },
    getTileUrl: function (t) {
      var i = this._getZoomForUrl();
      return e.Util.template(
        this.tileUrl,
        e.Util.extend(
          {
            s: this._getSubdomain(t),
            x: t.x,
            y: t.y,
            z: this._lodMap && void 0 !== this._lodMap[i] ? this._lodMap[i] : i,
          },
          this.options
        )
      );
    },
    createTile: function (t, i) {
      var s = document.createElement('img');
      return (
        e.DomEvent.on(s, 'load', e.Util.bind(this._tileOnLoad, this, i, s)),
        e.DomEvent.on(s, 'error', e.Util.bind(this._tileOnError, this, i, s)),
        this.options.crossOrigin && (s.crossOrigin = ''),
        (s.alt = ''),
        !this._lodMap ||
        (this._lodMap && void 0 !== this._lodMap[this._getZoomForUrl()])
          ? (s.src = this.getTileUrl(t))
          : this.once(
              'lodmap',
              function () {
                s.src = this.getTileUrl(t);
              },
              this
            ),
        s
      );
    },
    onAdd: function (t) {
      q(t),
        this._lodMap ||
          this.metadata(function (i, s) {
            if (!i && s.spatialReference) {
              var r = s.spatialReference.latestWkid || s.spatialReference.wkid;
              if (
                (!this.options.attribution &&
                  t.attributionControl &&
                  s.copyrightText &&
                  ((this.options.attribution = s.copyrightText),
                  t.attributionControl.addAttribution(this.getAttribution())),
                t.options.crs !== e.CRS.EPSG3857 ||
                  (102100 !== r && 3857 !== r))
              )
                (t.options.crs &&
                  t.options.crs.code &&
                  t.options.crs.code.indexOf(r) > -1) ||
                  f(
                    'L.esri.TiledMapLayer is using a non-mercator spatial reference. Support may be available through Proj4Leaflet https://developers.arcgis.com/esri-leaflet/samples/non-mercator-projection/'
                  );
              else {
                this._lodMap = {};
                for (
                  var o = s.tileInfo.lods, n = ht.MercatorZoomLevels, a = 0;
                  a < o.length;
                  a++
                ) {
                  var l = o[a];
                  for (var u in n) {
                    var h = n[u];
                    if (
                      this._withinPercentage(
                        l.resolution,
                        h,
                        this.options.zoomOffsetAllowance
                      )
                    ) {
                      this._lodMap[u] = l.level;
                      break;
                    }
                  }
                }
                this.fire('lodmap');
              }
            }
          }, this),
        e.TileLayer.prototype.onAdd.call(this, t);
    },
    onRemove: function (t) {
      B(t), e.TileLayer.prototype.onRemove.call(this, t);
    },
    metadata: function (t, e) {
      return this.service.metadata(t, e), this;
    },
    identify: function () {
      return this.service.identify();
    },
    find: function () {
      return this.service.find();
    },
    query: function () {
      return this.service.query();
    },
    authenticate: function (t) {
      var e = '?token=' + t;
      return (
        (this.tileUrl = this.options.token
          ? this.tileUrl.replace(/\?token=(.+)/g, e)
          : this.tileUrl + e),
        (this.options.token = t),
        this.service.authenticate(t),
        this
      );
    },
    _withinPercentage: function (t, e, i) {
      return Math.abs(t / e - 1) < i;
    },
  });
  var ct = e.ImageOverlay.extend({
      onAdd: function (t) {
        (this._topLeft = t.getPixelBounds().min),
          e.ImageOverlay.prototype.onAdd.call(this, t);
      },
      _reset: function () {
        this._map.options.crs === e.CRS.EPSG3857
          ? e.ImageOverlay.prototype._reset.call(this)
          : e.DomUtil.setPosition(
              this._image,
              this._topLeft.subtract(this._map.getPixelOrigin())
            );
      },
    }),
    pt = e.Layer.extend({
      options: {
        opacity: 1,
        position: 'front',
        f: 'image',
        useCors: s,
        attribution: null,
        interactive: !1,
        alt: '',
      },
      onAdd: function (t) {
        q(t),
          this.options.zIndex && (this.options.position = null),
          (this._update = e.Util.throttle(
            this._update,
            this.options.updateInterval,
            this
          )),
          t.on('moveend', this._update, this),
          this._currentImage &&
          this._currentImage._bounds.equals(this._map.getBounds())
            ? t.addLayer(this._currentImage)
            : this._currentImage &&
              (this._map.removeLayer(this._currentImage),
              (this._currentImage = null)),
          this._update(),
          this._popup &&
            (this._map.on('click', this._getPopupData, this),
            this._map.on('dblclick', this._resetPopupState, this)),
          this.metadata(function (e, i) {
            !e &&
              !this.options.attribution &&
              t.attributionControl &&
              i.copyrightText &&
              ((this.options.attribution = i.copyrightText),
              t.attributionControl.addAttribution(this.getAttribution()));
          }, this);
      },
      onRemove: function (t) {
        B(t),
          this._currentImage && this._map.removeLayer(this._currentImage),
          this._popup &&
            (this._map.off('click', this._getPopupData, this),
            this._map.off('dblclick', this._resetPopupState, this)),
          this._map.off('moveend', this._update, this);
      },
      bindPopup: function (t, i) {
        return (
          (this._shouldRenderPopup = !1),
          (this._lastClick = !1),
          (this._popup = e.popup(i)),
          (this._popupFunction = t),
          this._map &&
            (this._map.on('click', this._getPopupData, this),
            this._map.on('dblclick', this._resetPopupState, this)),
          this
        );
      },
      unbindPopup: function () {
        return (
          this._map &&
            (this._map.closePopup(this._popup),
            this._map.off('click', this._getPopupData, this),
            this._map.off('dblclick', this._resetPopupState, this)),
          (this._popup = !1),
          this
        );
      },
      bringToFront: function () {
        return (
          (this.options.position = 'front'),
          this._currentImage &&
            (this._currentImage.bringToFront(), this._setAutoZIndex(Math.max)),
          this
        );
      },
      bringToBack: function () {
        return (
          (this.options.position = 'back'),
          this._currentImage &&
            (this._currentImage.bringToBack(), this._setAutoZIndex(Math.min)),
          this
        );
      },
      setZIndex: function (t) {
        return (
          (this.options.zIndex = t),
          this._currentImage && this._currentImage.setZIndex(t),
          this
        );
      },
      _setAutoZIndex: function (t) {
        if (this._currentImage) {
          for (
            var e,
              i = this._currentImage.getPane().children,
              s = -t(-1 / 0, 1 / 0),
              r = 0,
              o = i.length;
            r < o;
            r++
          )
            (e = i[r].style.zIndex),
              i[r] !== this._currentImage._image && e && (s = t(s, +e));
          isFinite(s) &&
            ((this.options.zIndex = s + t(-1, 1)),
            this.setZIndex(this.options.zIndex));
        }
      },
      getAttribution: function () {
        return this.options.attribution;
      },
      getOpacity: function () {
        return this.options.opacity;
      },
      setOpacity: function (t) {
        return (
          (this.options.opacity = t),
          this._currentImage && this._currentImage.setOpacity(t),
          this
        );
      },
      getTimeRange: function () {
        return [this.options.from, this.options.to];
      },
      setTimeRange: function (t, e) {
        return (
          (this.options.from = t), (this.options.to = e), this._update(), this
        );
      },
      metadata: function (t, e) {
        return this.service.metadata(t, e), this;
      },
      authenticate: function (t) {
        return this.service.authenticate(t), this;
      },
      redraw: function () {
        this._update();
      },
      _renderImage: function (t, e, i) {
        if (this._map) {
          if ((i && (t = 'data:' + i + ';base64,' + t), !t)) return;
          var s = new ct(t, e, {
              opacity: 0,
              crossOrigin: this.options.withCredentials
                ? 'use-credentials'
                : this.options.useCors,
              alt: this.options.alt,
              pane: this.options.pane || this.getPane(),
              interactive: this.options.interactive,
            }).addTo(this._map),
            r = function () {
              this._map.removeLayer(s),
                this.fire('error'),
                s.off('load', o, this);
            },
            o = function (t) {
              if ((s.off('error', r, this), this._map)) {
                var i = t.target,
                  o = this._currentImage;
                i._bounds.equals(e) && i._bounds.equals(this._map.getBounds())
                  ? ((this._currentImage = i),
                    'front' === this.options.position
                      ? this.bringToFront()
                      : 'back' === this.options.position && this.bringToBack(),
                    this.options.zIndex && this.setZIndex(this.options.zIndex),
                    this._map && this._currentImage._map
                      ? this._currentImage.setOpacity(this.options.opacity)
                      : this._currentImage._map.removeLayer(this._currentImage),
                    o && this._map && this._map.removeLayer(o),
                    o && o._map && o._map.removeLayer(o))
                  : this._map.removeLayer(i);
              }
              this.fire('load', { bounds: e });
            };
          s.once('error', r, this), s.once('load', o, this);
        }
      },
      _update: function () {
        if (this._map) {
          var t = this._map.getZoom(),
            i = this._map.getBounds();
          if (
            !(
              this._animatingZoom ||
              (this._map._panTransition && this._map._panTransition._inProgress)
            )
          )
            if (t > this.options.maxZoom || t < this.options.minZoom)
              this._currentImage &&
                (this._currentImage._map.removeLayer(this._currentImage),
                (this._currentImage = null));
            else {
              var s = this._buildExportParams();
              e.Util.extend(s, this.options.requestParams),
                s
                  ? (this._requestExport(s, i),
                    this.fire('loading', { bounds: i }))
                  : this._currentImage &&
                    (this._currentImage._map.removeLayer(this._currentImage),
                    (this._currentImage = null));
            }
        }
      },
      _renderPopup: function (t, i, s, r) {
        if (
          ((t = e.latLng(t)),
          this._shouldRenderPopup && this._lastClick.equals(t))
        ) {
          var o = this._popupFunction(i, s, r);
          o && this._popup.setLatLng(t).setContent(o).openOn(this._map);
        }
      },
      _resetPopupState: function (t) {
        (this._shouldRenderPopup = !1), (this._lastClick = t.latlng);
      },
      _calculateBbox: function () {
        var t = this._map.getPixelBounds(),
          i = this._map.unproject(t.getBottomLeft()),
          s = this._map.unproject(t.getTopRight()),
          r = this._map.options.crs.project(s),
          o = this._map.options.crs.project(i),
          n = e.bounds(r, o);
        return [
          n.getBottomLeft().x,
          n.getBottomLeft().y,
          n.getTopRight().x,
          n.getTopRight().y,
        ].join(',');
      },
      _calculateImageSize: function () {
        var t = this._map.getPixelBounds(),
          e = this._map.getSize(),
          i = this._map.unproject(t.getBottomLeft()),
          s = this._map.unproject(t.getTopRight()),
          r = this._map.latLngToLayerPoint(s).y,
          o = this._map.latLngToLayerPoint(i).y;
        return (r > 0 || o < e.y) && (e.y = o - r), e.x + ',' + e.y;
      },
    }),
    dt = pt.extend({
      options: {
        updateInterval: 150,
        format: 'jpgpng',
        transparent: !0,
        f: 'image',
      },
      query: function () {
        return this.service.query();
      },
      identify: function () {
        return this.service.identify();
      },
      initialize: function (t) {
        (t = U(t)),
          (this.service = ot(t)),
          this.service.addEventParent(this),
          e.Util.setOptions(this, t);
      },
      setPixelType: function (t) {
        return (this.options.pixelType = t), this._update(), this;
      },
      getPixelType: function () {
        return this.options.pixelType;
      },
      setBandIds: function (t) {
        return (
          e.Util.isArray(t)
            ? (this.options.bandIds = t.join(','))
            : (this.options.bandIds = t.toString()),
          this._update(),
          this
        );
      },
      getBandIds: function () {
        return this.options.bandIds;
      },
      setNoData: function (t, i) {
        return (
          e.Util.isArray(t)
            ? (this.options.noData = t.join(','))
            : (this.options.noData = t.toString()),
          i && (this.options.noDataInterpretation = i),
          this._update(),
          this
        );
      },
      getNoData: function () {
        return this.options.noData;
      },
      getNoDataInterpretation: function () {
        return this.options.noDataInterpretation;
      },
      setRenderingRule: function (t) {
        (this.options.renderingRule = t), this._update();
      },
      getRenderingRule: function () {
        return this.options.renderingRule;
      },
      setMosaicRule: function (t) {
        (this.options.mosaicRule = t), this._update();
      },
      getMosaicRule: function () {
        return this.options.mosaicRule;
      },
      _getPopupData: function (t) {
        var i = e.Util.bind(function (i, s, r) {
            i ||
              setTimeout(
                e.Util.bind(function () {
                  this._renderPopup(t.latlng, i, s, r);
                }, this),
                300
              );
          }, this),
          s = this.identify().at(t.latlng);
        this.options.mosaicRule && s.setMosaicRule(this.options.mosaicRule),
          s.run(i),
          (this._shouldRenderPopup = !0),
          (this._lastClick = t.latlng);
      },
      _buildExportParams: function () {
        var t = parseInt(this._map.options.crs.code.split(':')[1], 10),
          e = {
            bbox: this._calculateBbox(),
            size: this._calculateImageSize(),
            format: this.options.format,
            transparent: this.options.transparent,
            bboxSR: t,
            imageSR: t,
          };
        return (
          this.options.from &&
            this.options.to &&
            (e.time =
              this.options.from.valueOf() + ',' + this.options.to.valueOf()),
          this.options.pixelType && (e.pixelType = this.options.pixelType),
          this.options.interpolation &&
            (e.interpolation = this.options.interpolation),
          this.options.compressionQuality &&
            (e.compressionQuality = this.options.compressionQuality),
          this.options.bandIds && (e.bandIds = this.options.bandIds),
          (0 === this.options.noData || this.options.noData) &&
            (e.noData = this.options.noData),
          this.options.noDataInterpretation &&
            (e.noDataInterpretation = this.options.noDataInterpretation),
          this.service.options.token && (e.token = this.service.options.token),
          this.options.renderingRule &&
            (e.renderingRule = JSON.stringify(this.options.renderingRule)),
          this.options.mosaicRule &&
            (e.mosaicRule = JSON.stringify(this.options.mosaicRule)),
          e
        );
      },
      _requestExport: function (t, i) {
        if ('json' === this.options.f)
          this.service.request(
            'exportImage',
            t,
            function (t, e) {
              t ||
                (this.options.token &&
                  (e.href += '?token=' + this.options.token),
                this.options.proxy &&
                  (e.href = this.options.proxy + '?' + e.href),
                this._renderImage(e.href, i));
            },
            this
          );
        else {
          t.f = 'image';
          var s = this.options.url + 'exportImage' + e.Util.getParamString(t);
          this.options.proxy && (s = this.options.proxy + '?' + s),
            this._renderImage(s, i);
        }
      },
    });
  var mt = pt.extend({
    options: {
      updateInterval: 150,
      layers: !1,
      layerDefs: !1,
      timeOptions: !1,
      format: 'png32',
      transparent: !0,
      f: 'json',
    },
    initialize: function (t) {
      (t = U(t)),
        (this.service = st(t)),
        this.service.addEventParent(this),
        e.Util.setOptions(this, t);
    },
    getDynamicLayers: function () {
      return this.options.dynamicLayers;
    },
    setDynamicLayers: function (t) {
      return (this.options.dynamicLayers = t), this._update(), this;
    },
    getLayers: function () {
      return this.options.layers;
    },
    setLayers: function (t) {
      return (this.options.layers = t), this._update(), this;
    },
    getLayerDefs: function () {
      return this.options.layerDefs;
    },
    setLayerDefs: function (t) {
      return (this.options.layerDefs = t), this._update(), this;
    },
    getTimeOptions: function () {
      return this.options.timeOptions;
    },
    setTimeOptions: function (t) {
      return (this.options.timeOptions = t), this._update(), this;
    },
    query: function () {
      return this.service.query();
    },
    identify: function () {
      return this.service.identify();
    },
    find: function () {
      return this.service.find();
    },
    _getPopupData: function (t) {
      var i,
        s = e.Util.bind(function (i, s, r) {
          i ||
            setTimeout(
              e.Util.bind(function () {
                this._renderPopup(t.latlng, i, s, r);
              }, this),
              300
            );
        }, this);
      if (
        ((i = this.options.popup
          ? this.options.popup.on(this._map).at(t.latlng)
          : this.identify().on(this._map).at(t.latlng)).params
          .maxAllowableOffset || i.simplify(this._map, 0.5),
        (this.options.popup &&
          this.options.popup.params &&
          this.options.popup.params.layers) ||
          (this.options.layers
            ? i.layers('visible:' + this.options.layers.join(','))
            : i.layers('visible')),
        this.options.layerDefs &&
          'string' != typeof this.options.layerDefs &&
          !i.params.layerDefs)
      )
        for (var r in this.options.layerDefs)
          Object.prototype.hasOwnProperty.call(this.options.layerDefs, r) &&
            i.layerDef(r, this.options.layerDefs[r]);
      i.run(s), (this._shouldRenderPopup = !0), (this._lastClick = t.latlng);
    },
    _buildExportParams: function () {
      var t = parseInt(this._map.options.crs.code.split(':')[1], 10),
        e = {
          bbox: this._calculateBbox(),
          size: this._calculateImageSize(),
          dpi: 96,
          format: this.options.format,
          transparent: this.options.transparent,
          bboxSR: t,
          imageSR: t,
        };
      if (
        (this.options.dynamicLayers &&
          (e.dynamicLayers = this.options.dynamicLayers),
        this.options.layers)
      ) {
        if (0 === this.options.layers.length) return;
        e.layers = 'show:' + this.options.layers.join(',');
      }
      return (
        this.options.layerDefs &&
          (e.layerDefs =
            'string' == typeof this.options.layerDefs
              ? this.options.layerDefs
              : JSON.stringify(this.options.layerDefs)),
        this.options.timeOptions &&
          (e.timeOptions = JSON.stringify(this.options.timeOptions)),
        this.options.from &&
          this.options.to &&
          (e.time =
            this.options.from.valueOf() + ',' + this.options.to.valueOf()),
        this.service.options.token && (e.token = this.service.options.token),
        this.options.proxy && (e.proxy = this.options.proxy),
        this.options.disableCache && (e._ts = Date.now()),
        e
      );
    },
    _requestExport: function (t, i) {
      if ('json' === this.options.f)
        this.service.request(
          'export',
          t,
          function (t, e) {
            t ||
              (this.options.token &&
                e.href &&
                (e.href += '?token=' + this.options.token),
              this.options.proxy &&
                e.href &&
                (e.href = this.options.proxy + '?' + e.href),
              e.href
                ? this._renderImage(e.href, i)
                : this._renderImage(e.imageData, i, e.contentType));
          },
          this
        );
      else {
        t.f = 'image';
        var s = this.options.url + 'export' + e.Util.getParamString(t);
        this.options.proxy && (s = this.options.proxy + '?' + s),
          this._renderImage(s, i);
      }
    },
  });
  var ft = e.Layer.extend({
    options: {
      cellSize: 512,
      updateWhenIdle: e.Browser.mobile,
      updateInterval: 150,
      noWrap: !1,
      keepBuffer: 1.5,
    },
    initialize: function (t) {
      e.Util.setOptions(this, t);
    },
    onAdd: function (t) {
      (this._cells = {}),
        (this._activeCells = {}),
        this._resetView(),
        this._update();
    },
    onRemove: function (t) {
      this._removeAllCells(), (this._cellZoom = void 0);
    },
    isLoading: function () {
      return this._loading;
    },
    redraw: function () {
      return this._map && (this._removeAllCells(), this._update()), this;
    },
    getEvents: function () {
      var t = {
        viewprereset: this._invalidateAll,
        viewreset: this._resetView,
        zoom: this._resetView,
        moveend: this._onMoveEnd,
      };
      return (
        this.options.updateWhenIdle ||
          (this._onMove ||
            (this._onMove = e.Util.throttle(
              this._onMoveEnd,
              this.options.updateInterval,
              this
            )),
          (t.move = this._onMove)),
        t
      );
    },
    createCell: function () {
      return document.createElement('div');
    },
    removeCell: function () {},
    reuseCell: function () {},
    cellLeave: function () {},
    cellEnter: function () {},
    getCellSize: function () {
      var t = this.options.cellSize;
      return t instanceof e.Point ? t : new e.Point(t, t);
    },
    _pruneCells: function () {
      if (this._map) {
        var t, e;
        for (t in this._cells) (e = this._cells[t]).retain = e.current;
        for (t in this._cells)
          if ((e = this._cells[t]).current && !e.active) {
            var i = e.coords;
            this._retainParent(i.x, i.y, i.z, i.z - 5) ||
              this._retainChildren(i.x, i.y, i.z, i.z + 2);
          }
        for (t in this._cells) this._cells[t].retain || this._removeCell(t);
      }
    },
    _removeAllCells: function () {
      for (var t in this._cells) this._removeCell(t);
    },
    _invalidateAll: function () {
      this._removeAllCells(), (this._cellZoom = void 0);
    },
    _retainParent: function (t, i, s, r) {
      var o = Math.floor(t / 2),
        n = Math.floor(i / 2),
        a = s - 1,
        l = new e.Point(+o, +n);
      l.z = +a;
      var u = this._cellCoordsToKey(l),
        h = this._cells[u];
      return h && h.active
        ? ((h.retain = !0), !0)
        : (h && h.loaded && (h.retain = !0),
          a > r && this._retainParent(o, n, a, r));
    },
    _retainChildren: function (t, i, s, r) {
      for (var o = 2 * t; o < 2 * t + 2; o++)
        for (var n = 2 * i; n < 2 * i + 2; n++) {
          var a = new e.Point(o, n);
          a.z = s + 1;
          var l = this._cellCoordsToKey(a),
            u = this._cells[l];
          u && u.active
            ? (u.retain = !0)
            : (u && u.loaded && (u.retain = !0),
              s + 1 < r && this._retainChildren(o, n, s + 1, r));
        }
    },
    _resetView: function (t) {
      var e = t && (t.pinch || t.flyTo);
      e || this._setView(this._map.getCenter(), this._map.getZoom(), e, e);
    },
    _setView: function (t, e, i, s) {
      var r = Math.round(e);
      s ||
        ((this._cellZoom = r),
        this._abortLoading && this._abortLoading(),
        this._resetGrid(),
        void 0 !== r && this._update(t),
        i || this._pruneCells(),
        (this._noPrune = !!i));
    },
    _resetGrid: function () {
      var t = this._map,
        e = t.options.crs,
        i = (this._cellSize = this.getCellSize()),
        s = this._cellZoom,
        r = this._map.getPixelWorldBounds(this._cellZoom);
      r && (this._globalCellRange = this._pxBoundsToCellRange(r)),
        (this._wrapX = e.wrapLng &&
          !this.options.noWrap && [
            Math.floor(t.project([0, e.wrapLng[0]], s).x / i.x),
            Math.ceil(t.project([0, e.wrapLng[1]], s).x / i.y),
          ]),
        (this._wrapY = e.wrapLat &&
          !this.options.noWrap && [
            Math.floor(t.project([e.wrapLat[0], 0], s).y / i.x),
            Math.ceil(t.project([e.wrapLat[1], 0], s).y / i.y),
          ]);
    },
    _onMoveEnd: function (t) {
      (t && (t.pinch || t.flyTo)) ||
        !this._map ||
        this._map._animatingZoom ||
        this._update();
    },
    _getCelldPixelBounds: function (t) {
      var i = this._map,
        s = i._animatingZoom
          ? Math.max(i._animateToZoom, i.getZoom())
          : i.getZoom(),
        r = i.getZoomScale(s, this._cellZoom),
        o = i.project(t, this._cellZoom).floor(),
        n = i.getSize().divideBy(2 * r);
      return new e.Bounds(o.subtract(n), o.add(n));
    },
    _update: function (t) {
      var i = this._map;
      if (i) {
        var s = Math.round(i.getZoom());
        void 0 === t && (t = i.getCenter());
        var r = this._getCelldPixelBounds(t),
          o = this._pxBoundsToCellRange(r),
          n = o.getCenter(),
          a = [],
          l = this.options.keepBuffer,
          u = new e.Bounds(
            o.getBottomLeft().subtract([l, -l]),
            o.getTopRight().add([l, -l])
          );
        if (
          !(
            isFinite(o.min.x) &&
            isFinite(o.min.y) &&
            isFinite(o.max.x) &&
            isFinite(o.max.y)
          )
        )
          throw new Error('Attempted to load an infinite number of cells');
        for (var h in this._cells) {
          var c = this._cells[h].coords;
          (c.z === this._cellZoom && u.contains(new e.Point(c.x, c.y))) ||
            (this._cells[h].current = !1);
        }
        if (Math.abs(s - this._cellZoom) > 1) this._setView(t, s);
        else {
          for (var p = o.min.y; p <= o.max.y; p++)
            for (var d = o.min.x; d <= o.max.x; d++) {
              var m = new e.Point(d, p);
              if (((m.z = this._cellZoom), this._isValidCell(m))) {
                var f = this._cells[this._cellCoordsToKey(m)];
                f ? (f.current = !0) : a.push(m);
              }
            }
          if (
            (a.sort(function (t, e) {
              return t.distanceTo(n) - e.distanceTo(n);
            }),
            0 !== a.length)
          )
            for (
              this._loading || (this._loading = !0), d = 0;
              d < a.length;
              d++
            ) {
              var y = this._cellCoordsToKey(a[d]),
                g = this._keyToCellCoords(y);
              this._activeCells[g]
                ? this._reuseCell(a[d])
                : this._createCell(a[d]);
            }
        }
      }
    },
    _isValidCell: function (t) {
      var i = this._map.options.crs;
      if (!i.infinite) {
        var s = this._globalCellRange;
        if (
          (!i.wrapLng && (t.x < s.min.x || t.x > s.max.x)) ||
          (!i.wrapLat && (t.y < s.min.y || t.y > s.max.y))
        )
          return !1;
      }
      if (!this.options.bounds) return !0;
      var r = this._cellCoordsToBounds(t);
      return e.toLatLngBounds(this.options.bounds).overlaps(r);
    },
    _keyToBounds: function (t) {
      return this._cellCoordsToBounds(this._keyToCellCoords(t));
    },
    _cellCoordsToNwSe: function (t) {
      var e = this._map,
        i = this.getCellSize(),
        s = t.scaleBy(i),
        r = s.add(i);
      return [e.unproject(s, t.z), e.unproject(r, t.z)];
    },
    _cellCoordsToBounds: function (t) {
      var i = this._cellCoordsToNwSe(t),
        s = new e.LatLngBounds(i[0], i[1]);
      return this.options.noWrap || (s = this._map.wrapLatLngBounds(s)), s;
    },
    _cellCoordsToKey: function (t) {
      return t.x + ':' + t.y + ':' + t.z;
    },
    _keyToCellCoords: function (t) {
      var i = t.split(':'),
        s = new e.Point(+i[0], +i[1]);
      return (s.z = +i[2]), s;
    },
    _removeCell: function (t) {
      var e = this._cells[t];
      if (e) {
        var i = this._keyToCellCoords(t),
          s = this._wrapCoords(i),
          r = this._cellCoordsToBounds(this._wrapCoords(i));
        (e.current = !1),
          delete this._cells[t],
          (this._activeCells[t] = e),
          this.cellLeave(r, s, t),
          this.fire('cellleave', { key: t, coords: s, bounds: r });
      }
    },
    _reuseCell: function (t) {
      var e = this._cellCoordsToKey(t);
      (this._cells[e] = this._activeCells[e]), (this._cells[e].current = !0);
      var i = this._wrapCoords(t),
        s = this._cellCoordsToBounds(this._wrapCoords(t));
      this.cellEnter(s, i, e),
        this.fire('cellenter', { key: e, coords: i, bounds: s });
    },
    _createCell: function (t) {
      var i = this._cellCoordsToKey(t),
        s = this._wrapCoords(t),
        r = this._cellCoordsToBounds(this._wrapCoords(t));
      this.createCell(r, s, i),
        this.fire('cellcreate', { key: i, coords: s, bounds: r }),
        (this._cells[i] = { coords: t, current: !0 }),
        e.Util.requestAnimFrame(this._pruneCells, this);
    },
    _cellReady: function (t, e, i) {
      var s = this._cellCoordsToKey(t);
      (i = this._cells[s]) && ((i.loaded = +new Date()), (i.active = !0));
    },
    _getCellPos: function (t) {
      return t.scaleBy(this.getCellSize());
    },
    _wrapCoords: function (t) {
      var i = new e.Point(
        this._wrapX ? e.Util.wrapNum(t.x, this._wrapX) : t.x,
        this._wrapY ? e.Util.wrapNum(t.y, this._wrapY) : t.y
      );
      return (i.z = t.z), i;
    },
    _pxBoundsToCellRange: function (t) {
      var i = this.getCellSize();
      return new e.Bounds(
        t.min.unscaleBy(i).floor(),
        t.max.unscaleBy(i).ceil().subtract([1, 1])
      );
    },
  });
  function yt(t) {
    this.values = [].concat(t || []);
  }
  (yt.prototype.query = function (t) {
    var e = this.getIndex(t);
    return this.values[e];
  }),
    (yt.prototype.getIndex = function (t) {
      this.dirty && this.sort();
      for (var e, i, s = 0, r = this.values.length - 1; s <= r; )
        if (
          ((e = ((s + r) / 2) | 0),
          +(i = this.values[Math.round(e)]).value < +t)
        )
          s = e + 1;
        else {
          if (!(+i.value > +t)) return e;
          r = e - 1;
        }
      return Math.abs(~r);
    }),
    (yt.prototype.between = function (t, e) {
      var i = this.getIndex(t),
        s = this.getIndex(e);
      if (0 === i && 0 === s) return [];
      for (; this.values[i - 1] && this.values[i - 1].value === t; ) i--;
      for (; this.values[s + 1] && this.values[s + 1].value === e; ) s++;
      return (
        this.values[s] &&
          this.values[s].value === e &&
          this.values[s + 1] &&
          s++,
        this.values.slice(i, s)
      );
    }),
    (yt.prototype.insert = function (t) {
      return this.values.splice(this.getIndex(t.value), 0, t), this;
    }),
    (yt.prototype.bulkAdd = function (t, e) {
      return (
        (this.values = this.values.concat([].concat(t || []))),
        e ? this.sort() : (this.dirty = !0),
        this
      );
    }),
    (yt.prototype.sort = function () {
      return (
        this.values
          .sort(function (t, e) {
            return +e.value - +t.value;
          })
          .reverse(),
        (this.dirty = !1),
        this
      );
    });
  var gt = ft.extend({
      options: {
        attribution: null,
        where: '1=1',
        fields: ['*'],
        from: !1,
        to: !1,
        timeField: !1,
        timeFilterMode: 'server',
        simplifyFactor: 0,
        precision: 6,
        fetchAllFeatures: !1,
      },
      initialize: function (t) {
        if (
          (ft.prototype.initialize.call(this, t),
          (t = U(t)),
          (t = e.Util.setOptions(this, t)),
          (this.service = at(t)),
          this.service.addEventParent(this),
          '*' !== this.options.fields[0])
        ) {
          for (var i = !1, s = 0; s < this.options.fields.length; s++)
            this.options.fields[s].match(/^(OBJECTID|FID|OID|ID)$/i) &&
              (i = !0);
          !1 === i &&
            f(
              'no known esriFieldTypeOID field detected in fields Array.  Please add an attribute field containing unique IDs to ensure the layer can be drawn correctly.'
            );
        }
        this.options.timeField.start && this.options.timeField.end
          ? ((this._startTimeIndex = new yt()), (this._endTimeIndex = new yt()))
          : this.options.timeField && (this._timeIndex = new yt()),
          (this._cache = {}),
          (this._currentSnapshot = []),
          (this._activeRequests = 0);
      },
      onAdd: function (t) {
        return (
          q(t),
          this.service.metadata(function (e, i) {
            if (!e) {
              var s = i.supportedQueryFormats,
                r = !1;
              (!1 === this.service.options.isModern ||
                this.options.fetchAllFeatures) &&
                (r = !0),
                !r &&
                  s &&
                  -1 !== s.indexOf('geoJSON') &&
                  (this.service.options.isModern = !0),
                i.objectIdField &&
                  (this.service.options.idAttribute = i.objectIdField),
                !this.options.attribution &&
                  t.attributionControl &&
                  i.copyrightText &&
                  ((this.options.attribution = i.copyrightText),
                  t.attributionControl.addAttribution(this.getAttribution()));
            }
          }, this),
          t.on('zoomend', this._handleZoomChange, this),
          ft.prototype.onAdd.call(this, t)
        );
      },
      onRemove: function (t) {
        return (
          B(t),
          t.off('zoomend', this._handleZoomChange, this),
          ft.prototype.onRemove.call(this, t)
        );
      },
      getAttribution: function () {
        return this.options.attribution;
      },
      createCell: function (t, e) {
        this._visibleZoom() && this._requestFeatures(t, e);
      },
      _requestFeatures: function (t, i, s, r) {
        this._activeRequests++, (r = r || 0);
        var o = this.options.where;
        return (
          1 === this._activeRequests && this.fire('loading', { bounds: t }, !0),
          this._buildQuery(t, r).run(function (n, a, l) {
            l && l.exceededTransferLimit && this.fire('drawlimitexceeded'),
              this.options.where === o &&
                (!n &&
                  a &&
                  a.features.length &&
                  e.Util.requestAnimFrame(
                    e.Util.bind(function () {
                      this._addFeatures(a.features, i),
                        this._postProcessFeatures(t);
                    }, this)
                  ),
                n || !a || a.features.length || this._postProcessFeatures(t),
                n && this._postProcessFeatures(t),
                s && s.call(this, n, a),
                l &&
                  (l.exceededTransferLimit ||
                    (l.properties && l.properties.exceededTransferLimit)) &&
                  this.options.fetchAllFeatures &&
                  this._requestFeatures(t, i, s, r + a.features.length));
          }, this)
        );
      },
      _postProcessFeatures: function (t) {
        this._activeRequests--,
          this._activeRequests <= 0 && this.fire('load', { bounds: t });
      },
      _cacheKey: function (t) {
        return t.z + ':' + t.x + ':' + t.y;
      },
      _addFeatures: function (t, e) {
        if (e) {
          var i = this._cacheKey(e);
          this._cache[i] = this._cache[i] || [];
        }
        for (var s = t.length - 1; s >= 0; s--) {
          var r = t[s].id;
          -1 === this._currentSnapshot.indexOf(r) &&
            this._currentSnapshot.push(r),
            void 0 !== i &&
              -1 === this._cache[i].indexOf(r) &&
              this._cache[i].push(r);
        }
        this.options.timeField && this._buildTimeIndexes(t),
          this.createLayers(t);
      },
      _buildQuery: function (t, i) {
        var s = this.service
          .query()
          .intersects(t)
          .where(this.options.where)
          .fields(this.options.fields)
          .precision(this.options.precision);
        return (
          this.options.fetchAllFeatures &&
            !isNaN(parseInt(i)) &&
            (s = s.offset(i)),
          (s.params.resultType = 'tile'),
          this.options.requestParams &&
            e.Util.extend(s.params, this.options.requestParams),
          this.options.simplifyFactor &&
            s.simplify(this._map, this.options.simplifyFactor),
          'server' === this.options.timeFilterMode &&
            this.options.from &&
            this.options.to &&
            s.between(this.options.from, this.options.to),
          s
        );
      },
      setWhere: function (t, i, s) {
        this.options.where = t && t.length ? t : '1=1';
        for (
          var r = [],
            o = [],
            n = 0,
            a = null,
            l = e.Util.bind(function (l, u) {
              if ((l && (a = l), u))
                for (var h = u.features.length - 1; h >= 0; h--)
                  o.push(u.features[h].id);
              --n <= 0 &&
                this._visibleZoom() &&
                t === this.options.where &&
                ((this._currentSnapshot = o),
                e.Util.requestAnimFrame(
                  e.Util.bind(function () {
                    this.removeLayers(r), this.addLayers(o), i && i.call(s, a);
                  }, this)
                ));
            }, this),
            u = this._currentSnapshot.length - 1;
          u >= 0;
          u--
        )
          r.push(this._currentSnapshot[u]);
        for (var h in ((this._cache = {}), this._cells)) {
          n++;
          var c = this._keyToCellCoords(h),
            p = this._cellCoordsToBounds(c);
          this._requestFeatures(p, c, l);
        }
        return this;
      },
      getWhere: function () {
        return this.options.where;
      },
      getTimeRange: function () {
        return [this.options.from, this.options.to];
      },
      setTimeRange: function (t, i, s, r) {
        var o = this.options.from,
          n = this.options.to,
          a = 0,
          l = null,
          u = e.Util.bind(function (e) {
            e && (l = e),
              this._filterExistingFeatures(o, n, t, i),
              a--,
              s && a <= 0 && s.call(r, l);
          }, this);
        if (
          ((this.options.from = t),
          (this.options.to = i),
          this._filterExistingFeatures(o, n, t, i),
          'server' === this.options.timeFilterMode)
        )
          for (var h in this._cells) {
            a++;
            var c = this._keyToCellCoords(h),
              p = this._cellCoordsToBounds(c);
            this._requestFeatures(p, c, u);
          }
        return this;
      },
      refresh: function () {
        this.setWhere(this.options.where);
      },
      _filterExistingFeatures: function (t, i, s, r) {
        var o =
            t && i ? this._getFeaturesInTimeRange(t, i) : this._currentSnapshot,
          n = this._getFeaturesInTimeRange(s, r);
        if (n.indexOf)
          for (var a = 0; a < n.length; a++) {
            var l = o.indexOf(n[a]);
            l >= 0 && o.splice(l, 1);
          }
        e.Util.requestAnimFrame(
          e.Util.bind(function () {
            this.removeLayers(o), this.addLayers(n);
          }, this)
        );
      },
      _getFeaturesInTimeRange: function (t, e) {
        var i,
          s = [];
        if (this.options.timeField.start && this.options.timeField.end) {
          var r = this._startTimeIndex.between(t, e),
            o = this._endTimeIndex.between(t, e);
          i = r.concat(o);
        } else {
          if (!this._timeIndex)
            return (
              f(
                'You must set timeField in the layer constructor in order to manipulate the start and end time filter.'
              ),
              []
            );
          i = this._timeIndex.between(t, e);
        }
        for (var n = i.length - 1; n >= 0; n--) s.push(i[n].id);
        return s;
      },
      _buildTimeIndexes: function (t) {
        var e, i;
        if (this.options.timeField.start && this.options.timeField.end) {
          var s = [],
            r = [];
          for (e = t.length - 1; e >= 0; e--)
            (i = t[e]),
              s.push({
                id: i.id,
                value: new Date(i.properties[this.options.timeField.start]),
              }),
              r.push({
                id: i.id,
                value: new Date(i.properties[this.options.timeField.end]),
              });
          this._startTimeIndex.bulkAdd(s), this._endTimeIndex.bulkAdd(r);
        } else {
          var o = [];
          for (e = t.length - 1; e >= 0; e--)
            (i = t[e]),
              o.push({
                id: i.id,
                value: new Date(i.properties[this.options.timeField]),
              });
          this._timeIndex.bulkAdd(o);
        }
      },
      _featureWithinTimeRange: function (t) {
        if (!this.options.from || !this.options.to) return !0;
        var e = +this.options.from.valueOf(),
          i = +this.options.to.valueOf();
        if ('string' == typeof this.options.timeField) {
          var s = +t.properties[this.options.timeField];
          return s >= e && s <= i;
        }
        if (this.options.timeField.start && this.options.timeField.end) {
          var r = +t.properties[this.options.timeField.start],
            o = +t.properties[this.options.timeField.end];
          return (r >= e && r <= i) || (o >= e && o <= i) || (r <= e && o >= i);
        }
      },
      _visibleZoom: function () {
        if (!this._map) return !1;
        var t = this._map.getZoom();
        return !(t > this.options.maxZoom || t < this.options.minZoom);
      },
      _handleZoomChange: function () {
        if (this._visibleZoom())
          for (var t in this._cells) {
            var e = this._cells[t].coords,
              i = this._cacheKey(e);
            this._cache[i] && this.addLayers(this._cache[i]);
          }
        else
          this.removeLayers(this._currentSnapshot),
            (this._currentSnapshot = []);
      },
      authenticate: function (t) {
        return this.service.authenticate(t), this;
      },
      metadata: function (t, e) {
        return this.service.metadata(t, e), this;
      },
      query: function () {
        return this.service.query();
      },
      _getMetadata: function (t) {
        this._metadata
          ? t(undefined, this._metadata)
          : this.metadata(
              e.Util.bind(function (e, i) {
                (this._metadata = i), t(e, this._metadata);
              }, this)
            );
      },
      addFeature: function (t, e, i) {
        this.addFeatures(t, e, i);
      },
      addFeatures: function (t, i, s) {
        this._getMetadata(
          e.Util.bind(function (r, o) {
            if (r) i && i.call(this, r, null);
            else {
              var n = t.features ? t.features : [t];
              this.service.addFeatures(
                t,
                e.Util.bind(function (t, e) {
                  if (!t) {
                    for (var r = n.length - 1; r >= 0; r--)
                      (n[r].properties[o.objectIdField] =
                        n.length > 1 ? e[r].objectId : e.objectId),
                        (n[r].id = n.length > 1 ? e[r].objectId : e.objectId);
                    this._addFeatures(n);
                  }
                  i && i.call(s, t, e);
                }, this)
              );
            }
          }, this)
        );
      },
      updateFeature: function (t, e, i) {
        this.updateFeatures(t, e, i);
      },
      updateFeatures: function (t, e, i) {
        var s = t.features ? t.features : [t];
        this.service.updateFeatures(
          t,
          function (t, r) {
            if (!t) {
              for (var o = s.length - 1; o >= 0; o--)
                this.removeLayers([s[o].id], !0);
              this._addFeatures(s);
            }
            e && e.call(i, t, r);
          },
          this
        );
      },
      deleteFeature: function (t, e, i) {
        this.deleteFeatures(t, e, i);
      },
      deleteFeatures: function (t, e, i) {
        return this.service.deleteFeatures(
          t,
          function (t, s) {
            var r = s.length ? s : [s];
            if (!t && r.length > 0)
              for (var o = r.length - 1; o >= 0; o--)
                this.removeLayers([r[o].objectId], !0);
            e && e.call(i, t, s);
          },
          this
        );
      },
    }),
    _t = gt.extend({
      options: { cacheLayers: !0 },
      initialize: function (t) {
        t.apikey && (t.token = t.apikey),
          gt.prototype.initialize.call(this, t),
          (this._originalStyle = this.options.style),
          (this._layers = {});
      },
      onRemove: function (t) {
        for (var e in this._layers)
          t.removeLayer(this._layers[e]),
            this.fire(
              'removefeature',
              { feature: this._layers[e].feature, permanent: !1 },
              !0
            );
        return gt.prototype.onRemove.call(this, t);
      },
      createNewLayer: function (t) {
        var i = e.GeoJSON.geometryToLayer(t, this.options);
        return i && (i.defaultOptions = i.options), i;
      },
      _updateLayer: function (t, i) {
        var s = [],
          r = this.options.coordsToLatLng || e.GeoJSON.coordsToLatLng;
        switch (
          (i.properties && (t.feature.properties = i.properties),
          i.geometry.type)
        ) {
          case 'Point':
            (s = e.GeoJSON.coordsToLatLng(i.geometry.coordinates)),
              t.setLatLng(s);
            break;
          case 'LineString':
            (s = e.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 0, r)),
              t.setLatLngs(s);
            break;
          case 'MultiLineString':
          case 'Polygon':
            (s = e.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 1, r)),
              t.setLatLngs(s);
            break;
          case 'MultiPolygon':
            (s = e.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 2, r)),
              t.setLatLngs(s);
        }
        this.redraw(t.feature.id);
      },
      createLayers: function (t) {
        for (var e = t.length - 1; e >= 0; e--) {
          var i,
            s = t[e],
            r = this._layers[s.id];
          !this._visibleZoom() ||
            !r ||
            this._map.hasLayer(r) ||
            (this.options.timeField && !this._featureWithinTimeRange(s)) ||
            (this._map.addLayer(r),
            this.fire('addfeature', { feature: r.feature }, !0)),
            r && (r.setLatLngs || r.setLatLng) && this._updateLayer(r, s),
            r ||
              ((i = this.createNewLayer(s))
                ? ((i.feature = s),
                  i.addEventParent(this),
                  this.options.onEachFeature &&
                    this.options.onEachFeature(i.feature, i),
                  (this._layers[i.feature.id] = i),
                  this.setFeatureStyle(i.feature.id, this.options.style),
                  this.fire('createfeature', { feature: i.feature }, !0),
                  this._visibleZoom() &&
                    (!this.options.timeField ||
                      (this.options.timeField &&
                        this._featureWithinTimeRange(s))) &&
                    this._map.addLayer(i))
                : f('invalid GeoJSON encountered'));
        }
      },
      addLayers: function (t) {
        for (var e = t.length - 1; e >= 0; e--) {
          var i = this._layers[t[e]];
          !i ||
            (this.options.timeField &&
              !this._featureWithinTimeRange(i.feature)) ||
            (this._map.addLayer(i),
            this.fire('addfeature', { feature: i.feature }, !0));
        }
      },
      removeLayers: function (t, e) {
        for (var i = t.length - 1; i >= 0; i--) {
          var s = t[i],
            r = this._layers[s];
          r &&
            (this.fire(
              'removefeature',
              { feature: r.feature, permanent: e },
              !0
            ),
            this._map.removeLayer(r)),
            r && e && delete this._layers[s];
        }
      },
      cellEnter: function (t, i) {
        this._visibleZoom() &&
          !this._zooming &&
          this._map &&
          e.Util.requestAnimFrame(
            e.Util.bind(function () {
              var t = this._cacheKey(i),
                e = this._cellCoordsToKey(i),
                s = this._cache[t];
              this._activeCells[e] && s && this.addLayers(s);
            }, this)
          );
      },
      cellLeave: function (t, i) {
        this._zooming ||
          e.Util.requestAnimFrame(
            e.Util.bind(function () {
              if (this._map) {
                var t = this._cacheKey(i),
                  e = this._cellCoordsToKey(i),
                  s = this._cache[t],
                  r = this._map.getBounds();
                if (!this._activeCells[e] && s) {
                  for (var o = !0, n = 0; n < s.length; n++) {
                    var a = this._layers[s[n]];
                    a && a.getBounds && r.intersects(a.getBounds()) && (o = !1);
                  }
                  o && this.removeLayers(s, !this.options.cacheLayers),
                    !this.options.cacheLayers &&
                      o &&
                      (delete this._cache[t],
                      delete this._cells[e],
                      delete this._activeCells[e]);
                }
              }
            }, this)
          );
      },
      resetStyle: function () {
        return (
          (this.options.style = this._originalStyle),
          this.eachFeature(function (t) {
            this.resetFeatureStyle(t.feature.id);
          }, this),
          this
        );
      },
      setStyle: function (t) {
        return (
          (this.options.style = t),
          this.eachFeature(function (e) {
            this.setFeatureStyle(e.feature.id, t);
          }, this),
          this
        );
      },
      resetFeatureStyle: function (t) {
        var i = this._layers[t],
          s = this._originalStyle || e.Path.prototype.options;
        return (
          i &&
            (e.Util.extend(i.options, i.defaultOptions),
            this.setFeatureStyle(t, s)),
          this
        );
      },
      setFeatureStyle: function (t, e) {
        var i = this._layers[t];
        return (
          'function' == typeof e && (e = e(i.feature)),
          i.setStyle && i.setStyle(e),
          this
        );
      },
      eachActiveFeature: function (t, e) {
        if (this._map) {
          var i = this._map.getBounds();
          for (var s in this._layers)
            -1 !== this._currentSnapshot.indexOf(this._layers[s].feature.id) &&
              (('function' == typeof this._layers[s].getLatLng &&
                i.contains(this._layers[s].getLatLng())) ||
                ('function' == typeof this._layers[s].getBounds &&
                  i.intersects(this._layers[s].getBounds()))) &&
              t.call(e, this._layers[s]);
        }
        return this;
      },
      eachFeature: function (t, e) {
        for (var i in this._layers) t.call(e, this._layers[i]);
        return this;
      },
      getFeature: function (t) {
        return this._layers[t];
      },
      bringToBack: function () {
        this.eachFeature(function (t) {
          t.bringToBack && t.bringToBack();
        });
      },
      bringToFront: function () {
        this.eachFeature(function (t) {
          t.bringToFront && t.bringToFront();
        });
      },
      redraw: function (t) {
        return t && this._redraw(t), this;
      },
      _redraw: function (t) {
        var i = this._layers[t],
          s = i.feature;
        if (
          i &&
          i.setIcon &&
          this.options.pointToLayer &&
          this.options.pointToLayer
        ) {
          var r = this.options.pointToLayer(
            s,
            e.latLng(s.geometry.coordinates[1], s.geometry.coordinates[0])
          ).options.icon;
          i.setIcon(r);
        }
        if (i && i.setStyle && this.options.pointToLayer) {
          var o = this.options.pointToLayer(
            s,
            e.latLng(s.geometry.coordinates[1], s.geometry.coordinates[0])
          ).options;
          this.setFeatureStyle(s.id, o);
        }
        i && i.setStyle && this.options.style && this.resetFeatureStyle(s.id);
      },
      openPopup(t) {
        return (
          this._popup &&
            this._popup._prepareOpen(t || this._latlng) &&
            this._popup.openOn(this._map),
          this
        );
      },
      openTooltip(t) {
        return (
          this._tooltip &&
            this._tooltip._prepareOpen(t) &&
            (this._tooltip.openOn(this._map),
            this.getElement
              ? this._setAriaDescribedByOnLayer(this)
              : this.eachLayer &&
                this.eachLayer(this._setAriaDescribedByOnLayer, this)),
          this
        );
      },
    });
  var vt = i;
  (t.BasemapLayer = ut),
    (t.DynamicMapLayer = mt),
    (t.FeatureLayer = _t),
    (t.FeatureLayerService = nt),
    (t.FeatureManager = gt),
    (t.Find = Q),
    (t.Identify = H),
    (t.IdentifyFeatures = X),
    (t.IdentifyImage = $),
    (t.ImageMapLayer = dt),
    (t.ImageService = rt),
    (t.MapService = it),
    (t.Query = J),
    (t.RasterLayer = pt),
    (t.Service = et),
    (t.Support = o),
    (t.Task = W),
    (t.TiledMapLayer = ht),
    (t.Util = j),
    (t.VERSION = vt),
    (t.basemapLayer = function (t, e) {
      return new ut(t, e);
    }),
    (t.dynamicMapLayer = function (t, e) {
      return new mt(t, e);
    }),
    (t.featureLayer = function (t) {
      return new _t(t);
    }),
    (t.featureLayerService = at),
    (t.find = K),
    (t.get = m),
    (t.identify = function (t) {
      return new H(t);
    }),
    (t.identifyFeatures = Y),
    (t.identifyImage = tt),
    (t.imageMapLayer = function (t, e) {
      return new dt(t, e);
    }),
    (t.imageService = ot),
    (t.mapService = st),
    (t.options = n),
    (t.post = h),
    (t.query = V),
    (t.request = p),
    (t.service = function (t) {
      return (t = U(t)), new et(t);
    }),
    (t.task = function (t) {
      return (t = U(t)), new W(t);
    }),
    (t.tiledMapLayer = function (t, e) {
      return new ht(t, e);
    }),
    Object.defineProperty(t, '__esModule', { value: !0 });
});
//# sourceMappingURL=esri-leaflet.js.map

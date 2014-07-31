/*
	Leaflet.twofingerzoom, enables zooming the map out with a two finger tap on touch devices
	(c) 2014, Adam Ratcliffe, TomTom International BV
*/
L.Map.mergeOptions({
	twoFingerZoom: L.Browser.touch && !L.Browser.android23
});

L.Map.TwoFingerZoom = L.Handler.extend({

	statics: {
		ZOOM_OUT_THRESHOLD: 100		
	},

	addHooks: function () {
		L.DomEvent.on(this._map._container, 'touchstart', this._onTouchStart, this);
		L.DomEvent.on(this._map._container, 'touchend', this._onTouchEnd, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'touchstart', this._onTouchStart, this);
		L.DomEvent.off(this._map._container, 'touchend', this._onTouchEnd, this);
	},

	_onTouchStart: function (e) {
		var touches = e.touches;

		if (touches.length !== 2) {
			return;
		}

		this._touchStartTime = new Date();
	},

	_onTouchEnd: function (e) {
		var map = this._map,
		    touches = e.changedTouches;

		if (!this._touchStartTime) {
			return;
		}

		L.DomEvent.preventDefault(e);

		if (new Date() - this._touchStartTime <= L.Map.TwoFingerZoom.ZOOM_OUT_THRESHOLD) {
			this._touchStartTime = null;
			map.zoomOut();
		}
	}
});

L.Map.addInitHook('addHandler', 'twoFingerZoom', L.Map.TwoFingerZoom);

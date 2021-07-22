// wrs.js
// Wrapper tidak resmi yang digunakan untuk mendapatkan informasi dari WRS BMKG

const miniget = require("miniget");
const events = require("events");

/*
 * @param object apiURL
 * return event
 */
module.exports = function newListener(apiURL = "https://bmkg-content-inatews.storage.googleapis.com") {
	let event = new events();
	let stop = false;
	event.lastAlert = null;
	event.lastRealtimeQL = null;
	function get() {
		if (stop) return;
		miniget(apiURL, { path: `/datagempa.json?t=${Date.now()}` }).text().then(body => {
			let msg = JSON.parse(body);

			event.emit("incommingBody", body);
			if (!!event.lastAlert && msg.identifier === event.lastAlert.identifier) return get();
			event.lastAlert = msg;
			event.emit(msg.info.event, msg.info);
			// Then do a polling after request finished.
			get();
		}).catch(err => event.emit('error', err));

		miniget(apiURL, { path: `/lastQL.json?t=${Date.now()}` }).text().then(body => {
			let msg = JSON.parse(body)
			msg = msg.features[0];

			event.emit("incommingBody_lastQL", body);
			if (!!event.lastRealtimeQL && msg.properties.id === event.lastRealtimeQL.properties.id) return;
			event.lastRealtimeQL = msg;
			event.emit('realtime', msg);
		}).catch(err => event.emit('error', err));
	}

	event.gempaQL = function getGempaQL () {
		return new Promise((res, rej) => {
			miniget(apiURL, { path: `/gempaQL.json` }).text().then(body => {
				let msg = JSON.parse(body);
				res(msg.features);
			}).catch(rej);
		});
	}
	
	event.startPolling = _ => {
		stop = false;
		get();
	}
	event.stopPolling = _ => stop = true;
	return event;
}

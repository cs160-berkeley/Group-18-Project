import Pins from "pins";

export var PinsManager = {
	RemotePins: null,
	Connected: function () {
		return this.RemotePins != null;
	},
	SetupPins: function () {
		let discoveryInstance = Pins.discover(
	},
}
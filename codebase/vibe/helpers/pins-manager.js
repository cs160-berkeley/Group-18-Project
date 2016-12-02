import Pins from "pins";

export var PinsManager = {
	RemotePins: null,
	Connected: function () {
		return this.RemotePins != null;
	},
	SetupPins: function () {
		let discoveryInstance = Pins.discover(            connectionDesc => {                if (connectionDesc.name == "pins-share") {                    trace("Connecting to remote pins\n");                    this.RemotePins = Pins.connect(connectionDesc);                }            },             connectionDesc => {                if (connectionDesc.name == "pins-share") {                    trace("Disconnected from remote pins\n");                    this.RemotePins = null;                }            }        );
	},
}
import Pins from "pins";

var pinsSetup = false;
export var PinsManager = {
	RemotePins: null,
	GetBatteryLevel: function (callback) {
		if (PinsManager.Connected()) PinsManager.RemotePins.invoke("/battery/read", value => { callback(value); });
	},
	VibrationOn: function () {
		if (PinsManager.Connected()) PinsManager.RemotePins.invoke("/vibration/write", 1);
	},
	VibrationOff: function () {
		if (PinsManager.Connected()) PinsManager.RemotePins.invoke("/vibration/write", 0);
	},
	LedOn: function () {
		if (PinsManager.Connected()) PinsManager.RemotePins.invoke("/led/write", 1);
	},
	LedOn: function () {
		if (PinsManager.Connected()) PinsManager.RemotePins.invoke("/led/write", 0);
	},
	Connected: function () {
		return this.RemotePins != null;
	},
	SetupPins: function () {
		if (!pinsSetup) {
			pinsSetup = true;
			let discoveryInstance = Pins.discover(	            connectionDesc => {	                if (connectionDesc.name == "pins-share") {	                    trace("Connecting to remote pins!\n");	                    this.RemotePins = Pins.connect(connectionDesc);	                }	            }, 	            connectionDesc => {	                if (connectionDesc.name == "pins-share") {	                    trace("Disconnected from remote pins!\n");	                    this.RemotePins = null;	                }	            }	        );
        }
	},
}
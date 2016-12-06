import Pins from "pins";

var pinsSetup = false;
var batteryLevel = 0.5;
var vibeActive = false;
export var PinsManager = {
	RemotePins: null,
	GetBatteryLevel: function (callback) {
		if (PinsManager.InitialConnected()) PinsManager.RemotePins.invoke("/battery/read", value => { 
			batteryLevel = value;
			callback(value); 
			PinsManager.UpdateIndicator();
		});
	},
	IsActive: function() { 
		return vibeActive;
	},
	Activate: function() {
		vibeActive = true;
	},
	Deactivate: function() {
		vibeActive = false;
	},
	VibrationOn: function () {
		PinsManager.UpdateIndicator();
		if (PinsManager.Connected()) PinsManager.RemotePins.invoke("/vibration/write", 1);
	},
	VibrationOff: function () {
		PinsManager.UpdateIndicator();
		if (PinsManager.Connected()) PinsManager.RemotePins.invoke("/vibration/write", 0);
	},
	LedOn: function () {
		if (PinsManager.Connected()) PinsManager.RemotePins.invoke("/led/write", 1);
	},
	LedOff: function () {
		if (PinsManager.Connected()) PinsManager.RemotePins.invoke("/led/write", 0);
	},
	UpdateIndicator: function() {
		if (batteryLevel < 0.20) {
			PinsManager.LedOn();
		} else {
			PinsManager.LedOff();
		}
	},
	Connected: function () {
		return vibeActive && this.RemotePins != null;
	},
	InitialConnected: function () {
		return this.RemotePins != null;
	},
	SetupPins: function () {
		if (!pinsSetup) {
			pinsSetup = true;
			let discoveryInstance = Pins.discover(	            connectionDesc => {	                if (connectionDesc.name == "pins-share") {	                    trace("Connecting to remote pins!\n");	                    this.RemotePins = Pins.connect(connectionDesc);	                }	            }, 	            connectionDesc => {	                if (connectionDesc.name == "pins-share") {	                    trace("Disconnected from remote pins!\n");	                    this.RemotePins = null;	                }	            }	        );
        }
	},
}
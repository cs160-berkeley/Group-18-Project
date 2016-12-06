import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";
import { PinsManager } from "../helpers/pins-manager";
import { Session } from "../helpers/sessions";
import { Push, CrossFade } from '../libraries/transition';

export var ConnectPageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.Background,
	contents: [
		new CommonTemplates.NavBar({ 
			screenTitle: "Connect",  
			backPage: "Interests"
		}),
		new Label({
			name: "connectionTitle",
			left: 0, right: 0, top: CommonVars.NavBarHeight + 30,
			style: new Style({ font: "24px " + CommonVars.TitleFont, color: "black", horizontal: "center" }),
			string: "Searching for device"
		}),
		new Text({
			name: "connectionDescription",
			left: 60, right: 60, top: CommonVars.NavBarHeight + 80,
			style: CommonStyles.CenterParagraph,
			string: "Please wait while we connect to your device."
		}),
		new Container({
			name: "deviceContainer",
			width: 200, height: 252, top: 220,
			contents: [
				new Container({
					name: "batteryLevel",
					skin: CommonSkins.Primary,
					width: 55, height: 80,
					top: 130, left: 45,
				}),
				new Picture({
					top: 0, left: 0, bottom: 0, right: 0,
					name: "connectionImage",
					url: "../assets/images/connection-searching.png"
				}),
			]
		}),
	],
	behavior: Behavior({
		onDisplayed: function(container, data) {
	    	container.interval = 2000;        	container.start();
        	updateConnectionStatus(container);	    },
		onTimeChanged: function(container) {
			updateConnectionStatus(container);
		},
	})
}));

var previouslyConnected = "not false";
function updateConnectionStatus(container) {
	if (PinsManager.InitialConnected() && previouslyConnected != true) {
		container.connectionTitle.string = "Vibe Connected!";
		container.connectionDescription.string = "You're all set! Happy vibing!";
		container.deviceContainer.connectionImage.url = "../assets/images/connection-good.png";
		previouslyConnected = true;
	} else if (PinsManager.InitialConnected()) {
		PinsManager.GetBatteryLevel(function(batteryLevelPercent) {
			container.deviceContainer.batteryLevel.width = batteryLevelPercent * 110;
		});
	} else if (!PinsManager.InitialConnected() && previouslyConnected != false) {
		container.connectionTitle.string = "Device not found!";
		container.connectionDescription.string = "Please connect your device to your phone's bluetooth.";
		container.deviceContainer.connectionImage.url = "../assets/images/connection-bad.png";
		previouslyConnected = false;
	}
}
import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";
import { PinsManager } from "../helpers/pins-manager";
import { Session } from "../helpers/sessions";
import { Push } from '../libraries/transition';

var vibrationOn = false;
var navigating = false;
export var  MatchPageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.Background,
	contents: [
		new CommonTemplates.NavBar({ 
			screenTitle: "Found a Match!",  
			backPage: "Interests",
			extraBackAction: function(container) {
				if (PinsManager.Connected()) {
					navigating = true;
					PinsManager.RemotePins.invoke("/vibration/write", 0);
				}
			}
		}),
		new Label({
			top: 62, left: 34, right: 0, height: 30,
			style: new Style({ font: "21px Apercu Bold", color: CommonVars.PrimaryColor, horizontal: "left" }),
			string: "STRONG"
		}),
		new Label({
			top: 78, left: 35, right: 0, height: 30,
			style: new Style({ font: "14px Apercu Regular", color: "gray", horizontal: "left" }),
			string: "0.5mi Away"
		}),
		new Picture({
			top: 120, left: 65, right: 65, height: 200,
			aspect: "fill",
			active: true,
			behavior: Behavior({
				onDisplayed: function(container) {
					trace(Session.getMatch().image + "\n");
					container.url = Session.getMatch().image;
				}
			})
		}),
		new Label({
			top: 340, left: 0, right: 0, height: 30,
			style: CommonStyles.CenterHeading,
			behavior: Behavior({
				onDisplayed: function(container) {
					container.string = Session.getMatch().name + ", 20";
				}
			})
		}),
		new Label({
			top: 360, left: 0, right: 0, height: 30,
			style: new Style({ font: "16px Apercu Regular", color: "gray", horizontal: "center" }),
			string: "Berkeley, CA"
		}),
		new Text({
			top: 410, left: 0, right: 0, height: 30,
			style: new Style({ font: "16px Apercu Regular", color: "gray", horizontal: "center" }),
			behavior: Behavior({
				onDisplayed: function(container) {
					container.string = Session.getMatch().bio;
				}
			})
			
		}),
		new CommonTemplates.BottomButton ({
			text: "Accept",
			action: function (container) {
				if (PinsManager.Connected()) {
					PinsManager.RemotePins.invoke("/vibration/write", 0);
					navigating = true;
				}
				let mainContainer = container.container;
				mainContainer.container.run(new Push(), mainContainer, CommonPages.Locate,
					{ duration: CommonVars.TransitionDuration, direction: "left" });
			}
		})
	],
	behavior: Behavior({
		onDisplayed: function(container, data) {	    	container.interval = 500;	        container.duration = 10000000;        	container.start();
        	navigating = false;	    },
		onTimeChanged: function(container) {
			if (vibrationOn) {
				if (PinsManager.Connected()) 
					PinsManager.RemotePins.invoke("/vibration/write", 0);
				vibrationOn = false;
			} else if (!navigating) {
				if (PinsManager.Connected())
					PinsManager.RemotePins.invoke("/vibration/write", 1);
				vibrationOn = true;
			}
		}
	})
}));
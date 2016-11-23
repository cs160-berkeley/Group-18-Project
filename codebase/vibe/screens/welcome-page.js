import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { PinsManager } from "../helpers/pins-manager";
import { Push } from '../libraries/transition';

let DeviceSkin = new Skin({ 
	width: 161, height: 453,
	texture: new Texture("../assets/images/device.png"),
    aspect: "stretch"
});
let textTopMargin = 70;
export var WelcomePageTemplate = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0,
	skin: CommonSkins.Primary,
	active: true,
	behavior: Behavior({
		onDisplayed: function() {
			PinsManager.SetupPins();
		},
		onCreate: function(container, data) {	    	container.interval = 2000;	        container.duration = 1;        	container.start();	    },
		onTimeChanged: function(container) {	
			let mainContainer = container;
			mainContainer.container.run(new Push(), mainContainer, CommonPages.LoginSignup,
				{ duration: CommonVars.TransitionDuration, direction: "left" });
		}
	}),
	contents: [
		new Label({
			top: textTopMargin, left: 0, right: 0, height: 30,
			style: new Style({ font: "24px Apercu Bold", color: "white", horizontal: "center" }),
			string: "Welcome to Vibe"
		}),
		new Label({
			top: textTopMargin + 30, left: 0, right: 0, height: 30,
			style: new Style({ font: "16px Apercu Regular", color: "white", horizontal: "center" }),
			string: "Please connect the device"
		}),
		new Label({
			top: textTopMargin + 47, left: 0, right: 0, height: 30,
			style: new Style({ font: "16px Apercu Regular", color: "white", horizontal: "center" }),
			string: "with the cord that came"
		}),
		new Label({
			top: textTopMargin + 64, left: 0, right: 0, height: 30,
			style: new Style({ font: "16px Apercu Regular", color: "white", horizontal: "center" }),
			string: "in the box."
		}),
		new Container({
			left: 90, right: 90, top: 230, bottom: -50,
			skin: DeviceSkin
		})
	]
}));
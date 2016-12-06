import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";
import { PinsManager } from "../helpers/pins-manager";
import { Session } from "../helpers/sessions";
import { Push, CrossFade } from '../libraries/transition';

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
		onDisplayed: function(container) {
			PinsManager.SetupPins();	    	container.interval = 1000;        	container.start();
		},
		onTimeChanged: function(container) {
			if (PinsManager.InitialConnected()) {
				container.stop();
				let mainContainer = container;
				mainContainer.container.run(new Push(), mainContainer, CommonPages.LoginSignup,
					{ duration: CommonVars.TransitionDuration, direction: "left" });
			}
		},
		onTouchEnded: function(container) {
			container.stop();
			let mainContainer = container;
			mainContainer.container.run(new Push(), mainContainer, CommonPages.LoginSignup,
				{ duration: CommonVars.TransitionDuration, direction: "left" });
		}
	}),
	contents: [
		new Label({
			top: textTopMargin, left: 0, right: 0, height: 30,
			style: new Style({ font: "24px " + CommonVars.HeadingFont + " Bold", color: "white", horizontal: "center" }),
			string: "Welcome to Vibe"
		}),
		new Label({
			top: textTopMargin + 30, left: 0, right: 0, height: 30,
			style: new Style({ font: "16px " + CommonVars.ParagraphFont + " Regular", color: "white", horizontal: "center" }),
			string: "Please connect the device"
		}),
		new Label({
			top: textTopMargin + 47, left: 0, right: 0, height: 30,
			style: new Style({ font: "16px " + CommonVars.ParagraphFont + " Regular", color: "white", horizontal: "center" }),
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
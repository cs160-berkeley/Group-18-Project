import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";
import { PinsManager } from "../helpers/pins-manager";
import { Session } from "../helpers/sessions";
import { Push, CrossFade } from '../libraries/transition'; 

export var SplashPageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: new Skin({
		width: 942, height: 1664,
		texture: new Texture("../assets/images/splash-page.png"),
	    aspect: "stretch"
	}),
	active: true,
	behavior: Behavior({
	    onDisplayed: function(container) {	    	container.interval = 2600;        	container.start();
        	CommonVars.AppWidth = container.width;
			CommonVars.AppHeight = container.height;
			trace(container.width + '\n');
	    },
		onTimeChanged: function(container) {
			container.stop();	
			let mainContainer = container;
			mainContainer.container.run(new Push(), mainContainer, CommonPages.Welcome,
				{ duration: CommonVars.TransitionDuration, direction: "left" });
		},
		onTouchEnded: function(container) {
			container.stop();
			let mainContainer = container;
			mainContainer.container.run(new Push(), mainContainer, CommonPages.Welcome,
				{ duration: CommonVars.TransitionDuration, direction: "left" });
		}
	})
}));
import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { Push } from '../libraries/transition';

export var SplashPageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: new Skin({
		width: 942, height: 1664,
		texture: new Texture("../assets/images/splash-page.png"),
	    aspect: "stretch"
	}),
	active: true,
	behavior: Behavior({
		onCreate: function(container, data) {	    	//container.interval = 2600;	        //container.duration = 1;        	//container.start();	    },
	    onDisplayed: function(container) {	    	container.interval = 2600;	        container.duration = 1;        	container.start();
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
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
		onCreate: function(container, data) {
		onTimeChanged: function(container) {	
			let mainContainer = container;
			mainContainer.container.run(new Push(), mainContainer, CommonPages.Welcome,
				{ duration: CommonVars.TransitionDuration, direction: "left" });
		}
	})
}));
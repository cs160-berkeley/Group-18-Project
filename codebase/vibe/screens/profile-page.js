import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { Push } from '../libraries/transition';

export var ProfilePageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.Background,
	contents: [
		new CommonTemplates.NavBar({ 
			screenTitle: "My Profile",  
			backPage: "Interests"
		}),
		new CommonTemplates.Button({
			bottom: 20, left: 20, right: 20,
			text: "Update Interests",
			action: function(container) {
				let mainContainer = container.container;
				mainContainer.container.run(new Push(), mainContainer, CommonPages.UpdateInterests,
					{ duration: CommonVars.TransitionDuration, direction: "left" });
			}
		})
	]
}));
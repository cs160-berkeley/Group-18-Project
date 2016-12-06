import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";
import { PinsManager } from "../helpers/pins-manager";
import { Session } from "../helpers/sessions";
import { Push, CrossFade } from '../libraries/transition';

export var  MatchCanceledPageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.Background,
	contents: [
		new CommonTemplates.NavBar({ 
			screenTitle: "Vibe Killed",
		}),
		new Text({
			top: 370, left: 60, right: 60, height: 40,
			style: new Style({ font: "21px " + CommonVars.TitleFont, color: "#424242", horizontal: "center" }),
			string: "Sorry, the vibe has been killed."
		}),
		new Picture({
			top: 140, height: 200, width: 140,
			url: "../assets/images/sad-face.png",
		}),
		new CommonTemplates.BottomButton ({
			text: "Back to Interests",
			action: function (container) {
				let mainContainer = container.container;
				mainContainer.container.run(new Push(), mainContainer, CommonPages.Interests,
					{ duration: CommonVars.TransitionDuration, direction: "right" });
			}
		})
	]
}));
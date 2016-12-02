import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { Push } from '../libraries/transition';

export var LocatePageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.Background,
	contents: [
		new CommonTemplates.NavBar({ 
			screenTitle: "Find your Match!",
		}),
		new Label({
			top: 65, left: 34, right: 0, height: 30,
			style: new Style({ font: "21px Apercu Bold", color: CommonVars.PrimaryColor, horizontal: "left" }),
			string: "YOU'RE CLOSE"
		}),
		new Label({
			top: 83, left: 35, right: 0, height: 30,
			style: new Style({ font: "14px Apercu Regular", color: "gray", horizontal: "left" }),
			string: "0.5mi Away"
		}),
		new Container({
			top: 120, bottom: 100, left: 0, right: 0,
			skin: new Skin({
				width: 515, height: 565,
				texture: new Texture("../assets/images/map.PNG"),
	    		aspect: "stretch"
			})
		}),
		new CommonTemplates.BottomButton ({
			text: "Cancel Match",
			action: function (container) {
				let mainContainer = container.container;
				mainContainer.container.run(new Push(), mainContainer, CommonPages.Interests,
					{ duration: CommonVars.TransitionDuration, direction: "right" });
			}
		})
	]
}));
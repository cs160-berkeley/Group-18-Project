import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { Push } from '../libraries/transition';
import { ApiManager } from "../helpers/api-manager";

let textTopMargin = 100;
let FacebookButtonSkin = new Skin({ 
	width: 472, height: 90,
	texture: new Texture("../assets/images/facebook-btn.png"),
    aspect: "stretch"
});
let FacebookButtonDownSkin = new Skin({ 
	width: 472, height: 90,
	texture: new Texture("../assets/images/facebook-btn.png"),
    aspect: "stretch"
});
export var LoginSignupPageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.Background,
	contents: [
		new CommonTemplates.NavBar({ screenTitle: "Vibe" }),
		new Label({
			top: textTopMargin, left: 0, right: 0, height: 30,
			style: new Style({ font: "25px Apercu Bold", color: "black", horizontal: "center" }),
			string: "Welcome to Vibe!"
		}),
		new Label({
			top: textTopMargin + 70, left: 0, right: 0, height: 30,
			style: CommonStyles.CenterParagraph,
			string: "It looks like you're setting up this"
		}),
		new Label({
			top: textTopMargin + 90, left: 0, right: 0, height: 30,
			style: CommonStyles.CenterParagraph,
			string: "device for the first time"
		}),
		new Label({
			top: textTopMargin + 140, left: 0, right: 0, height: 30,
			style: new Style({ font: "14px Apercu Regular", color: "gray", horizontal: "center" }),
			string: "Sign up below with Facebook to get started!"
		}),
		new Container({
			left: 40, right: 40, top: textTopMargin + 180, height: 43,
			skin: FacebookButtonSkin,
			active: true,
			behavior: Behavior({
				onTouchBegan: function(container) {
					container.skin = FacebookButtonSkin;
				},
				onTouchEnded: function(container) {
					container.skin = FacebookButtonDownSkin;
					ApiManager.LoginRequest(undefined, function() {
						let mainContainer = container.container;
						mainContainer.container.run(new Push(), mainContainer, CommonPages.Interests,
							{ duration: CommonVars.TransitionDuration, direction: "left" });
					});
					
				},
			})
		})
	]
}));


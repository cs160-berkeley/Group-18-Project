// PUT ANYTHING VARIABLES, SKINS, STYLES, AND TEMPLATES MIGHT BE USEFULL
// ACROSS PAGES IN HERE AND MAKE SURE TO IMPORT THESE ON THAT PAGE

import { Push } from '../libraries/transition';
import { ConnectPageTemplate } from '../screens/connect-page';
import { InterestsPageTemplate } from '../screens/interests-page';
import { LocatePageTemplate } from '../screens/locate-page';
import { LoginSignupPageTemplate } from '../screens/login-signup-page';
import { MatchPageTemplate } from '../screens/match-page';
import { ProfilePageTemplate } from '../screens/profile-page';
import { SplashPageTemplate } from '../screens/splash-page';
import { UpdateInterestsPageTemplate } from '../screens/update-interests-page';
import { WelcomePageTemplate } from '../screens/welcome-page';

export var CommonVars = {
	// Colors
	PrimaryColor: "#FF8270",
	PrimaryDarkColor: "#DD7161",
	SecondaryColor: "#70C0FF",
	SecondaryDarkColor: "#5A9ED4",
	TertiaryColor: "#7470FF",
	TertiaryDarkColor: "#DC6D5D",
	
	// Fonts
	TitleFont: "Montserrat",
	HeadingFont: "Roboto",
	ParagraphFont: "Roboto",
	
	// Dimensions
	NavBarHeight: 50,
	
	// Misc
	TransitionDuration: 300,
	AppWidth: 0,
	AppHeight: 0,
};

export var CommonSkins = {

	// Color Skins
	Background: new Skin({ fill: "white" }),
	BackgroundDown: new Skin({ fill: "#FAFAFA" }),
	BackgroundDark: new Skin({ fill: "#EDEDED" }),
	Primary: new Skin({ fill: CommonVars.PrimaryColor }),
	PrimaryDark: new Skin({ fill: CommonVars.PrimaryDarkColor }),
	Secondary: new Skin({ fill: CommonVars.SecondaryColor }),
	SecondaryDark: new Skin({ fill: CommonVars.SecondaryDarkColor }),
	Tertiary: new Skin({ fill: CommonVars.TertiaryColor }),
	TertiaryDark: new Skin({ fill: CommonVars.TertiaryDarkColor }),
	
	// Image Skins
	BackArrowSkin: new Skin({ 
		width: 91, height: 90,
		texture: new Texture("../assets/images/back-arrow.png"),
	    aspect: "stretch"
	}),
	BackArrowDownSkin: new Skin({ 
		width: 91, height: 90,
		texture: new Texture("../assets/images/back-arrow-down.png"),
	    aspect: "stretch"
	}),
	ProfileSkin: new Skin({ 
		width: 80, height: 80,
		texture: new Texture("../assets/images/profile.png"),
	    aspect: "stretch"
	}),
	ProfileDownSkin: new Skin({ 
		width: 80, height: 80,
		texture: new Texture("../assets/images/profile-down.png"),
	    aspect: "stretch"
	}),
	ConnectSkin: new Skin({ 
		width: 80, height: 80,
		texture: new Texture("../assets/images/connect.png"),
	    aspect: "stretch"
	}),
	ConnectDownSkin: new Skin({ 
		width: 80, height: 80,
		texture: new Texture("../assets/images/connect-down.png"),
	    aspect: "stretch"
	}),
	
	// Helpers
	IdentifyR: new Skin({ fill: "red" }),
	IdentifyB: new Skin({ fill: "blue" }),
	IdentifyG: new Skin({ fill: "green" }),
};

export var CommonStyles = {
	CenterTitle: new Style({ font: "21px " + CommonVars.TitleFont, color: "white", horizontal: "center" }),
	LeftTitle: new Style({ font: "21px " + CommonVars.TitleFont, color: "white", horizontal: "left" }),
	RightTitle: new Style({ font: "21px " + CommonVars.TitleFont, color: "white", horizontal: "right" }),
	CenterHeading: new Style({ font: "21px " + CommonVars.HeadingFont, color: "#424242", horizontal: "center" }),
	LeftHeading: new Style({ font: "21px " + CommonVars.HeadingFont, color: "#424242", horizontal: "left" }),
	RightHeading: new Style({ font: "21px " + CommonVars.HeadingFont, color: "#424242", horizontal: "right" }),
	CenterParagraph: new Style({ font: "16px " + CommonVars.ParagraphFont + " Regular", color: "black", horizontal: "center" }),
	LeftParagraph: new Style({ font: "16px " + CommonVars.ParagraphFont + " Regular", color: "black", horizontal: "left" }),
	RightParagraph: new Style({ font: "16px " + CommonVars.ParagraphFont + " Regular", color: "black", horizontal: "right" }),
};

export var CommonTemplates = {

	// Button -> top, left, right, height=40, textTop=5, text, textSize=14, action(container)
	Button: Container.template($ => ({
		name: "buttonContainer",
		top: $.top,
		bottom: $.bottom,
		left: $.left, right: $.right,
		height: $.height != null ? $.height : 50,
		skin: CommonSkins.Primary,
		active: true,
		contents: [
			new Label({
				name: "buttonText",
				left: 0, right: 0,
				top:  $.textTop != null ? $.textTop : 10,
				string: $.text,
				style: new Style({ 
					font: ($.textSize != null ? $.textSize + "px" : "26px") + " Segoe UI Semilight", 
					color: "white", horizontal: "center"
				})
			})
		],
		behavior: Behavior({
			onTouchBegan: function(container) {
				container.skin = CommonSkins.PrimaryDark;
				container.buttonText.style = new Style({ 
					font: ($.textSize != null ? $.textSize + "px" : "26px") + " Segoe UI Semilight", 
					color: "white", horizontal: "center"
				});
				if ($.onButtonDown) $.onButtonDown(container);
			},
			onTouchEnded: function(container) {
				container.skin = undefined;
				container.skin = CommonSkins.Primary;
				container.buttonText.style = new Style({ 
					font: ($.textSize != null ? $.textSize + "px" : "26px") + " Segoe UI Semilight", 
					color: "white", horizontal: "center"
				})
				if ($.action) $.action(container);
				if ($.onButtonUp) $.onButtonUp(container);
			}
		})
	})),
	
	// BottomButton -> top, left, right, height=40, textTop=5, text, textSize=14, action(container)
	BottomButton: Container.template($ => ({
		name: "buttonContainer",
		bottom: 0, left: 0, right: 0,
		height: $.height != null ? $.height : 50,
		skin: CommonSkins.Primary,
		active: true,
		contents: [
			new Label({
				name: "buttonText",
				left: 0, right: 0,
				top:  $.textTop != null ? $.textTop : 10,
				string: $.text,
				style: new Style({ 
					font: ($.textSize != null ? $.textSize + "px" : "26px") + " Segoe UI Semilight", 
					color: "white", horizontal: "center"
				})
			})
		],
		behavior: Behavior({
			onTouchBegan: function(container) {
				container.skin = CommonSkins.PrimaryDark;
				container.buttonText.style = new Style({ 
					font: ($.textSize != null ? $.textSize + "px" : "26px") + " Segoe UI Semilight", 
					color: "white", horizontal: "center"
				});
				if ($.onButtonDown) $.onButtonDown(container);
			},
			onTouchEnded: function(container) {
				container.skin = undefined;
				container.skin = CommonSkins.Primary;
				container.buttonText.style = new Style({ 
					font: ($.textSize != null ? $.textSize + "px" : "26px") + " Segoe UI Semilight", 
					color: "white", horizontal: "center"
				})
				if ($.action) $.action(container);
				if ($.onButtonUp) $.onButtonUp(container);
			}
		})
	})),
	
	// NavBar -> screenTitle, backAction(container)=goToMenu, pins
	NavBar: Container.template($ => ({
		name: "navBar",
		top: 0, left: 0, right: 0, height: CommonVars.NavBarHeight,
		skin: CommonSkins.Primary,
		contents: function () {
			var contents = [];
			contents.push(
				new Label({
					left: 0, right: 0, top: 0, bottom: 0,
					style: CommonStyles.CenterTitle,
					string: $.screenTitle
			}));
			if ($.showProfile != undefined) {
				contents.push(new Container({
					left: 10, top: 10, width: 30, height: 30,
					skin: CommonSkins.ProfileSkin,
					active: true,
					behavior: Behavior({
						onTouchBegan: function(container) {
							container.skin = CommonSkins.ProfileDownSkin;
						},
						onTouchEnded: function(container){
							container.skin = CommonSkins.ProfileSkin;
							// NavBar must be direct child of screen template to work
							let mainContainer = container.container.container;
							mainContainer.container.run(new Push(), mainContainer, CommonPages.Profile,
								{ duration: CommonVars.TransitionDuration, direction: "right" });
						}
					})
				}))
			}
			if ($.showConnect != undefined) {
				contents.push(new Container({
					right: 10, top: 10, width: 30, height: 30,
					skin: CommonSkins.ConnectSkin,
					active: true,
					behavior: Behavior({
						onTouchBegan: function(container) {
							container.skin = CommonSkins.ConnectDownSkin;
						},
						onTouchEnded: function(container){
							container.skin = CommonSkins.ConnectSkin;
							// NavBar must be direct child of screen template to work
							let mainContainer = container.container.container;
							mainContainer.container.run(new Push(), mainContainer, CommonPages.Connect,
								{ duration: CommonVars.TransitionDuration, direction: "left" });
						}
					})
				}))
			}
			if ($.backPage != undefined) {
				contents.push(new Container({
					left: 16, top: 16, width: 18, height: 18,
					skin: CommonSkins.BackArrowSkin,
					active: true,
					behavior: Behavior({
						onTouchBegan: function(container) {
							container.skin = CommonSkins.BackArrowDownSkin;
						},
						onTouchEnded: function(container){
							container.skin = CommonSkins.BackArrowSkin;
							if ($.backAction != undefined) {
								$.backAction(container);
							} else {
								// Must be direct child of screen template to work
								if ($.extraBackAction != undefined) $.extraBackAction(container);
								let mainContainer = container.container.container;
								mainContainer.container.run(new Push(), mainContainer, CommonPages[$.backPage],
									{ duration: CommonVars.TransitionDuration, direction: "right" });
							}
						}
					})
				}));
			}
			return contents;
		}()
	})),
};

export var CommonPages = {
	Connect: new ConnectPageTemplate({}),
	Interests: new InterestsPageTemplate({}),
	Locate: new LocatePageTemplate({}),
	LoginSignup: new LoginSignupPageTemplate({}),
	Match: new MatchPageTemplate({}),
	Profile: new ProfilePageTemplate({}),
	Splash: new SplashPageTemplate({}),
	UpdateInterests: new UpdateInterestsPageTemplate({}),
	Welcome: new WelcomePageTemplate({}),
}
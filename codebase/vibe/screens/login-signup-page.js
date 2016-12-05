import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";
import { PinsManager } from "../helpers/pins-manager";
import { Session } from "../helpers/sessions";
import { Push, CrossFade } from '../libraries/transition';

let textTopMargin = 80;
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

var buttonHeight = 45;
var buttonMarginTight = 2;
var buttonMarginEdge = 70;
var NumPadButton = Container.template($ => ({
	height: buttonHeight, left: $.left, right: $.right,
	skin: CommonSkins.Primary,
	active: true,
	behavior: Behavior({
		onTouchBegan: function(container) {
			container.skin = CommonSkins.PrimaryDark,
		},
		onTouchEnded: function(container) {
			container.skin = CommonSkins.Primary,
			var digitsContainer = container.container.container.container.digitsContainer;
			if ($.value != "c" && $.value != "<" && currentDigit < 6) {
				digits[currentDigit] = $.value + "";
				digitsContainer["digit" + currentDigit].first.string = $.value + "";
				if (currentDigit == 5) {
					var access_code = digits[0] + digits[1] + digits[2] + digits[3] + digits[4] + digits[5];
					ApiManager.Login(access_code, 
						function(response) {
							if (Session.getUser() != undefined) {
								let mainContainer = container.container.container.container;
								mainContainer.container.run(new Push(), mainContainer, CommonPages.Interests,
									{ duration: CommonVars.TransitionDuration, direction: "left" });
							}
						},
						function(failure_response) { 
							container.container.container.container.errorText.string = "User not found, please try again";
						}
					);
				}
				currentDigit++;
			} else if ($.value == "c") {
				for (var i = 0; i < 6; i++) {
					digits[currentDigit] = "";
					digitsContainer["digit" + i].first.string = "";
				}
				currentDigit = 0;
			} else if ($.value == "<") {
				digits[currentDigit] = "";
				if (currentDigit > 0) { 
					digitsContainer["digit" + (currentDigit - 1)].first.string = "";
					currentDigit--;
				}
			}
		}
	}),
	contents: [
		new Label({
			top: 0, bottom: 0, left: 0, right: 0,
			style: CommonStyles.CenterTitle,
			string: $.value
		})
	]
}));

var currentDigit = 0;
var digits = ["","","","","",""];
var digitHeight = 50;
var digitMarginTight = 2;
var digitMarginEdge = 15;
var AccessCodeDigit = Container.template($ => ({
	name: "digit" + $.id,
	height: digitHeight, left: $.left, right: $.right,
	skin: CommonSkins.BackgroundDark,
	contents: [
		new Label({
			top: 0, bottom: 0, left: 0, right: 0,
			style: new Style({ font: "20px " + CommonVars.TitleFont, color: "#444", horizontal: "center" }),
			string: ""
		})
	]
}));

export var LoginSignupPageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.Background,
	contents: [
		new CommonTemplates.NavBar({ screenTitle: "Login" }),
		new Label({
			top: textTopMargin, left: 0, right: 0, height: 30,
			style: new Style({ font: "25px " + CommonVars.HeadingFont + " Bold", color: "black", horizontal: "center" }),
			string: "Welcome to Vibe!"
		}),
		new Label({
			top: textTopMargin + 50, left: 0, right: 0, height: 30,
			style: CommonStyles.CenterParagraph,
			string: "To login, please obtain a 6-digit"
		}),
		new Label({
			top: textTopMargin + 73, left: 0, right: 0, height: 30,
			style: CommonStyles.CenterParagraph,
			string: "code using our web portal!"
		}),
		new Label({
			top: textTopMargin + 120, left: 0, right: 0, height: 30,
			style: new Style({ font: "14px " + CommonVars.ParagraphFont + " Regular", color: "gray", horizontal: "center" }),
			string: "Once you have your code, please"
		}),
		new Label({
			top: textTopMargin + 140, left: 0, right: 0, height: 30,
			style: new Style({ font: "14px " + CommonVars.ParagraphFont + " Regular", color: "gray", horizontal: "center" }),
			string: "enter it using the number pad below..."
		}),
		new Label({
			name: "errorText",
			top: textTopMargin + 170, left: 0, right: 0, height: 30,
			style: new Style({ font: "14px " + CommonVars.ParagraphFont + " Regular", color: "red", horizontal: "center" }),
			string: ""
		}),
		new Line({
			name: "digitsContainer",
			top: textTopMargin + 190, left: 0, right: 0, height: 80,
			contents: [
				new AccessCodeDigit({ id: 0, left: digitMarginEdge, right: digitMarginTight }),
				new AccessCodeDigit({ id: 1, left: digitMarginTight, right: digitMarginTight }),
				new AccessCodeDigit({ id: 2, left: digitMarginTight, right: digitMarginTight }),
				new AccessCodeDigit({ id: 3, left: digitMarginTight, right: digitMarginTight }),
				new AccessCodeDigit({ id: 4, left: digitMarginTight, right: digitMarginTight }),
				new AccessCodeDigit({ id: 5, left: digitMarginTight, right: digitMarginEdge }),
			]
		}),
		new Container({
			bottom: 0, left: 0, right: 0, height: 24 + 56 * 4,
			contents: [
				new Line({
					left: 0, right: 0, bottom: 12 + (buttonMarginTight*2 + buttonHeight) * 3,
					contents: [
						new NumPadButton({ value: "7", left: buttonMarginEdge, right: buttonMarginTight }),
						new NumPadButton({ value: "8", left: buttonMarginTight, right: buttonMarginTight }),
						new NumPadButton({ value: "9", left: buttonMarginTight, right: buttonMarginEdge }),
					]
				}),
				new Line({
					left: 0, right: 0, bottom: 12 + (buttonMarginTight*2 + buttonHeight) * 2,
					contents: [
						new NumPadButton({ value: "4", left: buttonMarginEdge, right: buttonMarginTight }),
						new NumPadButton({ value: "5", left: buttonMarginTight, right: buttonMarginTight }),
						new NumPadButton({ value: "6", left: buttonMarginTight, right: buttonMarginEdge }),
					]
				}),
				new Line({
					left: 0, right: 0, bottom: 12 + (buttonMarginTight*2 + buttonHeight),
					contents: [
						new NumPadButton({ value: "1", left: buttonMarginEdge, right: buttonMarginTight }),
						new NumPadButton({ value: "2", left: buttonMarginTight, right: buttonMarginTight }),
						new NumPadButton({ value: "3", left: buttonMarginTight, right: buttonMarginEdge }),
					]
				}),
				new Line({
					left: 0, right: 0, bottom: 12,
					contents: [
						new NumPadButton({ value: "c", left: buttonMarginEdge, right: buttonMarginTight }),
						new NumPadButton({ value: "0", left: buttonMarginTight, right: buttonMarginTight }),
						new NumPadButton({ value: "<", left: buttonMarginTight, right: buttonMarginEdge }),
					]
				})
			]
		})
	]
}));


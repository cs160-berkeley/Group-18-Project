import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { Session } from "../helpers/sessions";
import { Push } from '../libraries/transition';
import { SystemKeyboard } from '../libraries/keyboard';
import { FieldScrollerBehavior, FieldLabelBehavior } from '../libraries/field';
import { ApiManager } from "../helpers/api-manager";
import { PinsManager } from "../helpers/pins-manager";

let descriptionTitle = "My Bio";
export var ProfilePageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.Background,
	active: true,
	contents: [
		new CommonTemplates.NavBar({ 
			screenTitle: "My Profile",  
			backPage: "Interests"
		}),
		new Label({
			name: "userNameLabel",
			left: 0, right: 0, top: CommonVars.NavBarHeight + 20,
			style: CommonStyles.CenterHeading,
			string: "",
		}),
		new Container({
			name: "profilePictureContainer",
			left: 80, right: 80, top: 35,
			contents: [
				new Picture({
					top: 1, bottom: 1, left: 1, right: 1,
					url: ""
				}),
				new Picture({
					top: 0, bottom: 0, left: 0, right: 0,
					url: "../assets/images/profile-picture-overlay.png",
				}),
			]
		}),
		new Label({
			name: "updateDescriptionLable",
			left: 30, right: 30, top: 285,
			style: CommonStyles.LeftParagraph,
			string: descriptionTitle,
		}),
		new Container({
			name: "toggle",
			left: 30, right: 30, height: 36, bottom: 84,
			contents: [
				new Label({
					name: "batteryLevel",
					width: 200, height: 30,
					style: new Style({ font: "20px " + CommonVars.TitleFont, color: "black", horizontal: "left" }),
					bottom: 4, left: 0,
					string: "Enable Matching:"
				}),
				new Picture({
					bottom: 0, right: 0,
					width: 110, height: 36,
					name: "connectionImage",
					url: "../assets/images/toggle-no.png",
					active: true,
					behavior: Behavior({
						onTouchEnded: function(container) {
							if (PinsManager.IsActive()) {
								PinsManager.Deactivate()
								container.url = "../assets/images/toggle-no.png";
							} else {
								PinsManager.Activate()
								container.url = "../assets/images/toggle-yes.png";
							}
						}
					})
				}),
			]
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
	],
	behavior: Behavior({ onDisplayed: onPageDisplayed, onTouchEnded: unfocusInput })
}));

function onPageDisplayed(pageContainer) {
	pageContainer.userNameLabel.string = Session.getUser().name;
	pageContainer.profilePictureContainer.height = pageContainer.profilePictureContainer.width;
	pageContainer.profilePictureContainer.first.url = Session.getUser().url;
	if (Session.getUser().description) {
		pageContainer.add(new MyField({ name: Session.getUser().description, top: 310 }));
		pageContainer.updateDescriptionLable.string = descriptionTitle + " (tap to edit)";
	} else {
		pageContainer.add(new MyField({ name: "", top: 310 }));
		pageContainer.updateDescriptionLable.string = descriptionTitle + " (tap to edit)";
	}
}

function unfocusInput(content) {
	ApiManager.UpdateUserDescription(Session.getUser().uid, Session.getUser().description, function() {
		// SUCCESS
	}, function() {
		// FAILURE
	}),	SystemKeyboard.hide();    content.focus();
	content.updateDescriptionLable.string = descriptionTitle + " (tap to edit)";
}

let nameInputSkin = new Skin({ fill: "#F9F9F9" });let fieldStyle = new Style({ color: 'black', font: '14px Roboto', horizontal: 'left',    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });let fieldHintStyle = new Style({ color: '#aaa', font: '14px Roboto', horizontal: 'left',    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });let whiteSkin = new Skin({ fill: "white" });let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#C0C0C0', '#acd473'] });
let MyField = Container.template($ => ({     left: 30, right: 30, height: 120, top: $.top, skin: nameInputSkin, contents: [        Scroller($, {             left: 4, right: 4, top: 4, bottom: 4, active: true,             Behavior: FieldScrollerBehavior, clip: true,             contents: [                Text($, { 
                	name: "newDescriptionLabel",                    left: 0, top: 0, bottom: 0, skin: fieldLabelSkin,                     style: fieldStyle, anchor: 'NAME',                    editable: true, string: $.name,                    Behavior: class extends FieldLabelBehavior {                        onEdited(label) {
                            let data = this.data;                            data.name = label.string;                            label.container.hint.visible = (data.name.length == 0);
                            if (Session.getUser().description != data.name) {
	                            var pageContainer = label.container.container.container;
                            	pageContainer.updateDescriptionLable.string = descriptionTitle + " (tap outside to save)";
                            }                            Session.getUser().description = data.name;                        }                    },                }),                Text($, {                    left: 2, right: 0, top: 0, bottom: 0, style: fieldHintStyle,                    string: "Tap to add a description...", name: "hint"                }),            ]        })    ]}));
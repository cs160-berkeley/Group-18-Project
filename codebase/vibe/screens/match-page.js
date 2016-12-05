import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";
import { PinsManager } from "../helpers/pins-manager";
import { Session } from "../helpers/sessions";
import { Push, CrossFade } from '../libraries/transition';

var vibrationOn = false;
var navigating = false;
export var  MatchPageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.Background,
	contents: [
		new CommonTemplates.NavBar({ 
			screenTitle: "Vibing with...",  
			backPage: "Interests",
			extraBackAction: function(container) {
				if (PinsManager.Connected()) {
					navigating = true;
					PinsManager.VibrationOff();
				}
			}
		}),
		new Label({
			top: 62, left: 34, right: 0, height: 30,
			style: new Style({ font: "18px Montserrat", color: CommonVars.PrimaryColor, horizontal: "left" }),
			string: "STRONG"
		}),
		new Label({
			top: 80, left: 35, right: 0, height: 30,
			style: new Style({ font: "14px Roboto", color: "gray", horizontal: "left" }),
			string: "0.5mi Away"
		}),
		new Label({
			name: "userNameLabel",
			left: 0, right: 0, top: CommonVars.NavBarHeight + 70,
			style: new Style({ font: "22px Montserrat", color: "black", horizontal: "center" }),
			string: "",
			behavior: Behavior({
				onDisplayed: function(container) {
					container.string = Session.getMatchUser().name;
				}
			})
		}),
		new Container({
			name: "profilePictureContainer",
			left: 80, right: 80, top: 85,
			contents: [
				new Picture({
					top: 1, bottom: 1, left: 1, right: 1,
					url: "",
					behavior: Behavior({
						onDisplayed: function(container) {
							container.url = Session.getMatchUser().url;
						}
					})
				}),
				new Picture({
					top: 0, bottom: 0, left: 0, right: 0,
					url: "../assets/images/profile-picture-overlay.png"
				}),
			]
		}),
		new Label({
			name: "updateDescriptionLable",
			left: 40, right: 40, top: 325,
			style: new Style({ font: "18px Montserrat", color: "gray", horizontal: "left" }),
			string: "Bio",
		}),
		new Text({
			top: 348, left: 40, right: 40, height: 60,
			style: new Style({ font: "14px Roboto", color: "gray", horizontal: "left" }),
			behavior: Behavior({
				onDisplayed: function(container) {
					container.string = Session.getMatchUser().description;
				}
			})
			
		}),
		new CommonTemplates.BottomButton ({
			text: "Accept",
			action: function (container) {
				ApiManager.AcceptMatch(Session.getMatch().id, Session.getUser().uid, function(response) {
					if (PinsManager.Connected()) {
						PinsManager.VibrationOff();
						navigating = true;
					}
					let mainContainer = container.container;
					mainContainer.container.run(new Push(), mainContainer, CommonPages.MatchWaiting,
						{ duration: CommonVars.TransitionDuration, direction: "left" });
				},
				function(error) {
					// HANDLE ERROR
				});
			}
		})
	],
	behavior: Behavior({
		onDisplayed: function(container, data) {	    	container.interval = 500;        	container.start();
        	navigating = false;	    },
		onTimeChanged: function(container) {
			ApiManager.GetMatchByUser(Session.getUser().uid, function(response) {}, function(error) {
				if (error.message == "Match canceled") {
					Session.unmatch();        			container.stop();
					let mainContainer = container;
					mainContainer.container.run(new Push(), mainContainer, CommonPages.MatchCanceled,
						{ duration: CommonVars.TransitionDuration, direction: "right" });
				}
			});
			if (vibrationOn) {
				PinsManager.VibrationOn();
				vibrationOn = false;
			} else if (!navigating) {
				PinsManager.VibrationOff();
				vibrationOn = true;
			}
		}
	})
}));
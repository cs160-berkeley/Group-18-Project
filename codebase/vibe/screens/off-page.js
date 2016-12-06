import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";
import { PinsManager } from "../helpers/pins-manager";
import { Session } from "../helpers/sessions";
import { Push, CrossFade } from '../libraries/transition'; 

var vibrationOn = false;
var navigating = false;
export var OffPageTemplate = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0,
	skin: new Skin({ fill: "black" }),
	contents: [
		new Container({
			name: "notification",
			top: 30, left: 10, right: 10, height: 60,
			visible: false,
			active: false,
			contents: [
				new Picture({
					top: 0, bottom: 0, left: 0, right: 0,
					url: "../assets/images/notification.png"
				})
			],
			behavior: Behavior({
				onDisplayed: function(container, data) {			    	container.interval = 500;
					container.visible = false;
					container.active = false;		        	container.start();
		        	navigating = false;
			    },
				onTimeChanged: function(container) {
					if (PinsManager.Connected() && Session.hasMatch()) {
						if (vibrationOn) {
							PinsManager.VibrationOn();
							vibrationOn = false;
						} else if (!navigating) {
							PinsManager.VibrationOff();
							vibrationOn = true;
						}
					}
				},
				onTouchEnded: function(container) {
					container.visible = false;
					container.active = false;
					navigating = true;		        	container.stop();
					let mainContainer = container.container;
					mainContainer.container.run(new CrossFade(), mainContainer, CommonPages.Match,
						{ duration: CommonVars.TransitionDuration });
				}
			})
		})
	],
	active: true,
	behavior: Behavior({
		onDisplayed: function(container, data) {	    	container.interval = 1000;        	container.start();	    },
		onTimeChanged: function(container) {
			if (Session.getUser() != undefined && PinsManager.IsActive()) {
				ApiManager.CheckForMatch(Session.getUser().uid, function(response) {
					if (response.message != "Match Not Found" && !navigating) {
						Session.match(response.match);
						container.notification.visible = true;
						container.notification.active = true;
					} else {
						ApiManager.GetMatchByUser(Session.getUser().uid, function(response) {
							if (response.message != "Match Not Found" && !navigating) {
								Session.match(response.match);
								container.notification.visible = true;
								container.notification.active = true;
							}
						}, function(error) {
							if (error.message == "Match canceled") {
								Session.unmatch();
								container.notification.visible = false;
								container.notification.active = false;
							}
						});
					}
				}, function(error) {
					if (error.message == "Match canceled") {
						Session.unmatch();
						container.notification.visible = false;
						container.notification.active = false;
					}
				});
				
				
			}
		},
		onTouchEnded: function(container) {
			if (Session.getUser() != undefined) {
				container.first.stop();
				navigating = true;
				container.notification.visible = false;
				container.notification.active = false;
				let mainContainer = container;
				mainContainer.container.run(new CrossFade(), mainContainer, CommonPages.Interests,
					{ duration: CommonVars.TransitionDuration });
			} else {
				container.first.stop();
				navigating = true;
				let mainContainer = container;
				container.notification.visible = false;
				container.notification.active = false;
				mainContainer.container.run(new CrossFade(), mainContainer, CommonPages.Splash,
					{ duration: CommonVars.TransitionDuration });
			}
		}
	}),
}));
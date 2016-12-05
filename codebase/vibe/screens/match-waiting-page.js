import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";
import { PinsManager } from "../helpers/pins-manager";
import { Session } from "../helpers/sessions";
import { Push, CrossFade } from '../libraries/transition';

export var MatchWaitingPageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.Background,
	contents: [
		new CommonTemplates.NavBar({ 
			screenTitle: "Waiting on Good Vibes",
		}),
		new Text({
			top: 370, left: 60, right: 60, height: 40,
			style: new Style({ font: "19px " + CommonVars.TitleFont, color: "#424242", horizontal: "center" }),
			string: "Please wait while we confirm with your match that there are good vibes."
		}),
		new Picture({
			top: 140, height: 200, width: 140,
			url: "../assets/images/waiting.png",
		}),
		new CommonTemplates.BottomButton ({
			text: "Kill the Vibe",
			action: function (container) {
				ApiManager.CancelMatch(Session.getMatch().id, Session.getUser().uid, function(response) {
					if (PinsManager.Connected()) {
						PinsManager.VibrationOff();
					}
					let mainContainer = container.container;
					mainContainer.container.run(new Push(), mainContainer, CommonPages.Interests,
						{ duration: CommonVars.TransitionDuration, direction: "right" });
				},
				function(error) {
					// HANDLE ERROR
				});
			}
		})
	],
	behavior: Behavior({
		onDisplayed: function(container, data) {
	    	container.interval = 1000;        	container.start();
	    },
		onTimeChanged: function(container) {
			ApiManager.GetMatch(Session.getMatch().id, function(response) {
				if (response.match.accepted) {        			container.stop();
					let mainContainer = container;
					mainContainer.container.run(new Push(), mainContainer, CommonPages.Locate,
						{ duration: CommonVars.TransitionDuration, direction: "left" });
				}
			}, function (error) {
				if (error == "Match canceled") {        			container.stop();
					let mainContainer = container;
					mainContainer.container.run(new Push(), mainContainer, CommonPages.MatchCanceled,
						{ duration: CommonVars.TransitionDuration, direction: "right" });
				}
			});
		},
	})
}));
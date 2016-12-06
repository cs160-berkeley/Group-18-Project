import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";
import { PinsManager } from "../helpers/pins-manager";
import { Session } from "../helpers/sessions";
import { Push, CrossFade } from '../libraries/transition'; 

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
		new Picture({
			top: 120, width: 260, height: 260,
			url: "",
			behavior: Behavior({
				onDisplayed: function(container) {
					container.url = ApiManager.GetMap(
						Session.getUser().latitude,
						Session.getUser().longitude,
						Session.getMatch().meet_point_latitude,
						Session.getMatch().meet_point_longitude
					);
				}
			})
		}),
		new CommonTemplates.BottomButton ({
			text: "Kill the vibe!",
			negativeButton: true,
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
		onDisplayed: function(container) {
			if (PinsManager.Connected()) {
				PinsManager.VibrationOff();
			}	    	container.interval = 1000;        	container.start();
		},
		onTimeChanged: function(container) {
			ApiManager.GetMatchByUser(Session.getUser().uid, function(response) {}, function(error) {
				if (error == "Match canceled" || error == "Match not found") {
					Session.unmatch();        			container.stop();
					let mainContainer = container;
					mainContainer.container.run(new Push(), mainContainer, CommonPages.MatchCanceled,
						{ duration: CommonVars.TransitionDuration, direction: "right" });
				}
			});
		}
	})
}));
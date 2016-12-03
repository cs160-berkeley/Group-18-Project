import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { CrossFade } from '../libraries/transition';
import { ApiManager } from "../helpers/api-manager";
import { Session } from "../helpers/sessions";

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
				onTouchEnded: function(container) {
					container.visible = false;
					container.active = false;
					let mainContainer = container.container;
					mainContainer.container.run(new CrossFade(), mainContainer, CommonPages.LoginSignup,
						{ duration: CommonVars.TransitionDuration });
				}
			})
		})
	],
	active: true,
	behavior: Behavior({
		onCreate: function(container, data) {	    	container.interval = 5000;	        container.duration = 100000;        	container.start();	    },
		onTimeChanged: function(container) {
			if (Session.getUser() != undefined) {
				ApiManager.GetUserMatch(Session.getUser().uid, function(response) {
					if (response.message != "Match Not Found") {
						Session.match(response.match);
						container.notification.visible = true;
						container.notification.active = true;
					}
				}, function(error) {
					// HANDLE ERROR
				});
			}
		},
		onTouchEnded: function(container) {
			if (Session.getUser() != undefined) {
				let mainContainer = container;
				mainContainer.container.run(new CrossFade(), mainContainer, CommonPages.Interests,
					{ duration: CommonVars.TransitionDuration });
			} else {
				let mainContainer = container;
				mainContainer.container.run(new CrossFade(), mainContainer, CommonPages.LoginSignup,
					{ duration: CommonVars.TransitionDuration });
			}
		}
	}),
}));
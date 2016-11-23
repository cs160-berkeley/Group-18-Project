import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";
import { Session } from "../helpers/sessions";
import { Push } from '../libraries/transition';

let ActionBarHeight = 110;
let ActionButtonSize = ActionBarHeight * 0.8;
let ActionBarImageHeight = 319;
let ActionBarImageWidth = 829;
let ActionItemsSkin = new Skin({ 
	width: ActionBarImageWidth, height: ActionBarImageHeight,
	texture: new Texture("../assets/images/action-items.png"),
    aspect: "stretch"
});
let ActionItemsLikeSkin = new Skin({ 
	width: ActionBarImageWidth, height: ActionBarImageHeight,
	texture: new Texture("../assets/images/action-items-like.png"),
    aspect: "stretch"
});
let ActionItemsDislikeSkin = new Skin({ 
	width: ActionBarImageWidth, height: ActionBarImageHeight,
	texture: new Texture("../assets/images/action-items-dislike.png"),
    aspect: "stretch"
});
let ActionItemsPassSkin = new Skin({ 
	width: ActionBarImageWidth, height: ActionBarImageHeight,
	texture: new Texture("../assets/images/action-items-pass.png"),
    aspect: "stretch"
});

export var InterestsPageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.BackgroundDark,
	behavior: Behavior({
		onCreate: function(container, data) {	    	container.interval = 10000;	        container.duration = 10000000;        	container.start();	    },
		onTimeChanged: function(container) {
			ApiManager.CheckMatch(Session.getUser().id, function(matchUser) {
				let mainContainer = container;
				trace(matchUser.id + " Match User \n");
				Session.match(matchUser);
				mainContainer.container.run(new Push(), mainContainer, CommonPages.Match,
					{ duration: CommonVars.TransitionDuration, direction: "left" });
			});
		}
	}),
	contents: [
		new CommonTemplates.NavBar({ 
			screenTitle: "Interests",
			showProfile: true,
			showConnect: true
		}), //, pins: $.pins  }),
		new Container({
			name: "interestsViewer",
			top: CommonVars.NavBarHeight,
			left: 0, right: 0, bottom: ActionBarHeight,
			skin: CommonSkins.BackgroundDark
		}),
		new Container({
			name: "actionItems",
			bottom: 20, left: 20, right: 20,
			height: ActionBarHeight,
			skin: ActionItemsSkin,
			contents: [
				new Container({
					left: 0, top: 0,
					width: ActionBarHeight, height: ActionBarHeight,
					active: true,
					behavior: Behavior({
						onTouchBegan: function(container) {
							container.container.skin = ActionItemsLikeSkin;
						},
						onTouchEnded: function(container) {
							container.container.skin = ActionItemsSkin;
							ApiManager.PostDecision(Session.getUser().id, Session.getUser().currentInterest - 1, "like");
							nextCard(container.container.container.last);
						}
					})
				}),
				new Container({
					right: 0, top: 0,
					width: ActionBarHeight, height: ActionBarHeight,
					active: true,
					behavior: Behavior({
						onTouchBegan: function(container) {
							container.container.skin = ActionItemsDislikeSkin;
						},
						onTouchEnded: function(container) {
							container.container.skin = ActionItemsSkin;
							ApiManager.PostDecision(Session.getUser().id, Session.getUser().currentInterest - 1, "dislike");
							nextCard(container.container.container.last);
						}
					})
				}),
				new Container({
					left: ActionBarHeight, right: ActionBarHeight, top: 25, bottom: 25,
					active: true,
					behavior: Behavior({
						onTouchBegan: function(container) {
							container.container.skin = ActionItemsPassSkin;
						},
						onTouchEnded: function(container) {
							container.container.skin = ActionItemsSkin;
							ApiManager.PostDecision(Session.getUser().id, Session.getUser().currentInterest - 1, "pass");
							nextCard(container.container.container.last);
						}
					})
				})
			]
		}),
		new InterestCardTemplate({
			url: undefined,
			title: "",
		})
	]
}));

function nextCard(interestCard) {
	if (ApiManager.NextInterestExists(Session.getUser().id)) {
		var interest = ApiManager.GetNextInterest(Session.getUser().id);
		interestCard.cardTitle.string = interest.title;
		interestCard.cardPicture.url = interest.url;
	}
}

var InterestCardTemplate = Container.template($ => ({
	name: "interestCard" + $.title,
	left: 0, right: 0,
	top: CommonVars.NavBarHeight, bottom: ActionBarHeight + 20, 
	skin: CommonSkins.Background,
	active: true,
	behavior: Behavior({
		onDisplayed: function(container, data) {
			if (container.cardTitle.string == "" && ApiManager.NextInterestExists(Session.getUser().id)) {
				var interest = ApiManager.GetNextInterest(Session.getUser().id);
				container.cardTitle.string = interest.title;
				container.cardPicture.url = interest.url;
			}
		}
	}),
	/*behavior: Behavior({
		onCreate: function(container, data) {	    	container.interval = 5;	        container.duration = 10000000;        	container.start();	    },
		onTimeChanged: function(container) {
			if (activeCard != $.id) {
				container.offset.x = container.offset.x - 1;
				if (container.offset.x + container.offset.width <= 0) {
					container.offset.x = container.offset.width;
				}
			}
		}
	}),*/
	contents: [
		new Picture({
			name: "cardPicture",
			aspect: "stretch",
			top: 0, left: 0, right: 0, bottom: 60,
			url: $.url
		}),
		new Container({
			name: "cardOverlay",
			top: 0, bottom: 0, left: 0, right: 0,
			skin: new Skin({
				width: 942, height: 1148,
				texture: new Texture("../assets/images/interest-overlay.png"),
			    aspect: "stretch"
			})
		}),
		new Label({
			name: "cardTitle",
			left: 0, right: 0, bottom: 34, height: 40,
			style: new Style({ font: "21px Apercu Bold", color: CommonVars.PrimaryColor, horizontal: "center" }),
			string: $.title
		})
	]
}));
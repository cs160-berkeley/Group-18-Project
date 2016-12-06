import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";
import { PinsManager } from "../helpers/pins-manager";
import { Session } from "../helpers/sessions";
import { Push, CrossFade } from '../libraries/transition';

let ActionBarHeight = 110;
let ActionButtonSize = ActionBarHeight * 0.8;
let ActionBarImageHeight = 319;
let ActionBarImageWidth = 829;
let ActionItemsSkin = new Skin({ 
	width: ActionBarImageWidth, height: ActionBarImageHeight,
	texture: new Texture("../assets/images/action-items-btn.png"),
    aspect: "stretch"
});
let ActionItemsLikeSkin = new Skin({ 
	width: ActionBarImageWidth, height: ActionBarImageHeight,
	texture: new Texture("../assets/images/action-items-btn-like.png"),
    aspect: "stretch"
});
let ActionItemsDislikeSkin = new Skin({ 
	width: ActionBarImageWidth, height: ActionBarImageHeight,
	texture: new Texture("../assets/images/action-items-btn-dislike.png"),
    aspect: "stretch"
});
let ActionItemsPassSkin = new Skin({ 
	width: ActionBarImageWidth, height: ActionBarImageHeight,
	texture: new Texture("../assets/images/action-items-btn-pass.png"),
    aspect: "stretch"
});

export var InterestsPageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.BackgroundDark,
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
							if (!Session.isEndOfInterests()) {
								ApiManager.PostDecision(Session.getUser().uid, Session.getCurrentInterests().id, "like", function(response) {
									nextCard(container.container.container.last);
								}, function() {
									// SHOW CONNECTION ERROR
								});
							}
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
							if (!Session.isEndOfInterests()) {
								ApiManager.PostDecision(Session.getUser().uid, Session.getCurrentInterests().id, "dislike", function(response) {
									nextCard(container.container.container.last);
								}, function() {
									// SHOW CONNECTION ERROR
								});
							}
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
							if (!Session.isEndOfInterests()) {
								ApiManager.PostDecision(Session.getUser().uid, Session.getCurrentInterests().id, "pass", function(response) {
									nextCard(container.container.container.last);
								}, function() {
									// SHOW CONNECTION ERROR
								});
							}
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
	Session.makeDecision();
	if (Session.hasNextInterest()) {
		var interest = Session.getNextInterests();
		interestCard.cardTitle.string = interest.name;
		interestCard.cardPicture.url = interest.url;
	} else {
		// SHOW "NO NEW DECISIONS" CARD
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
			if (PinsManager.Connected()) {
				PinsManager.VibrationOff();
			}
			ApiManager.GetNextInterests(Session.getUser().uid, function(response) {
				Session.setInterests(response.interests);
				if (Session.hasNextInterest()) {
					var interest = Session.getNextInterests();
					container.cardTitle.string = interest.name;
					container.cardPicture.url = interest.url;
				}
			}, function(error) {
				// SHOW THE ERROR
			});
		}
	}),
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
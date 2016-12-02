import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";
import { Session } from "../helpers/sessions";
import { VerticalScroller, VerticalScrollbar, TopScrollerShadow, BottomScrollerShadow } from '../libraries/scroller';

let itemHeight = 60;
let iconImageSize = 150;
let LikeIconSkin = new Skin({
	width: iconImageSize, height: iconImageSize,
	texture: new Texture("../assets/images/like-icon.png"),
    aspect: "stretch"
});
let SkipIconSkin = new Skin({
	width: iconImageSize, height: iconImageSize,
	texture: new Texture("../assets/images/pass-icon.png"),
    aspect: "stretch"
});
let DislikeIconSkin = new Skin({
	width: iconImageSize, height: iconImageSize,
	texture: new Texture("../assets/images/dislike-icon.png"),
    aspect: "stretch"
});
var InterestItemTemplate = Container.template($ => ({
	name: "interestItem" + $.index,
	left: 0, right: 0,
	skin: CommonSkins.Background,
	top: $.index * (itemHeight + 1),
	height: itemHeight,
	contents: [
		new Label({ name: "decisionTypeHelper", left: -1000, string: $.decisionType }),
		new Label({ name: "decisionIdHelper", left: -1000, string: $.decisionId }),
		new Label({
			name: "interestItemLabel",
			top: 0, left: 20, bottom: 0, right: 60,
			style: CommonStyles.LeftParagraph,
			string: $.title
		}),
		new Container({
			name: "interestItemDecisionIcon",
			top: 0, bottom: 0, right: 0, width: 60,
			skin: function(){
				if ($.decisionType == "like") return LikeIconSkin;
				if ($.decisionType == "pass") return SkipIconSkin;
				if ($.decisionType == "dislike") return DislikeIconSkin;
				else return undefined;
			}()
		}),
	],
	active: true,
	behavior: Behavior({
		onTouchEnded: function(container) {
			rotateInterest(container);
		},
	})
}));

export var UpdateInterestsPageTemplate = Container.template($ => ({
	left: 0, right: 0, bottom: 0, top: 0,
	skin: CommonSkins.BackgroundDark,
	contents: [
		new Container({
			top: CommonVars.NavBarHeight,
			bottom: 0, left: 0, right: 0,
			behavior: Behavior({
				onDisplayed: function(container) {
					container.empty();
					ApiManager.GetUserDecisions(Session.getUser().uid, function(response) {
						// Creates properly sized container for all items to fit within
						var scollableContent = new Container({
							left: 0, right: 0, top: 0, 
							height: response.decisions.length * (itemHeight + 1),
						});
						for (var i = 0; i < response.decisions.length; i++) {
							var decision = response.decisions[i];
							scollableContent.add(new InterestItemTemplate({
								index: i,
								title: decision.interest.name,
								decisionType: decision.decision_type,
								decisionId: decision.id
							}));
						}
						container.add(VerticalScroller($, { 				            active: true, top: 0, bottom: 0,				            contents: [				                scollableContent,				                VerticalScrollbar(), 				                //TopScrollerShadow(), 				                //BottomScrollerShadow(),    				            ]                     				        }));
					}, function() {
						// ERROR HERE
					});
				}
			})
		}),
		new CommonTemplates.NavBar({ 
			screenTitle: "Update Interests",  
			backPage: "Profile"
		}),
	]
}));

function rotateInterest(interestItemContainer) {
	var newDecisionType = "";
	if (interestItemContainer.decisionTypeHelper.string == "like") { 
		ApiManager.UpdateDecision(interestItemContainer.decisionIdHelper.string, "pass", function(response) {
			interestItemContainer.interestItemDecisionIcon.skin = SkipIconSkin;
			interestItemContainer.decisionTypeHelper.string = "pass";
		}, function() {
			// ERROR HERE
		});
	}
	if (interestItemContainer.decisionTypeHelper.string == "pass") { 
		ApiManager.UpdateDecision(interestItemContainer.decisionIdHelper.string, "dislike", function(response) {
			interestItemContainer.interestItemDecisionIcon.skin = DislikeIconSkin;
			interestItemContainer.decisionTypeHelper.string = "dislike";
		}, function() {
			// ERROR HERE
		});
	}
	if (interestItemContainer.decisionTypeHelper.string == "dislike") { 
		ApiManager.UpdateDecision(interestItemContainer.decisionIdHelper.string, "like", function(response) {
			interestItemContainer.interestItemDecisionIcon.skin = LikeIconSkin;
			interestItemContainer.decisionTypeHelper.string = "like";
		}, function() {
			// ERROR HERE
		});
	}
	
	// Add api call here to change decision
}
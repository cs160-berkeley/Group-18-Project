import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
import { ApiManager } from "../helpers/api-manager";

let itemHeight = 60;
let iconImageSize = 150;
let LikeIconSkin = new Skin({
	width: iconImageSize, height: iconImageSize,
	texture: new Texture("../assets/images/like-icon.png"),
    aspect: "stretch"
});
let SkipIconSkin = new Skin({
	width: iconImageSize, height: iconImageSize,
	texture: new Texture("../assets/images/skip-icon.png"),
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
	top: $.index * (itemHeight + 1) + CommonVars.NavBarHeight,
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
				if ($.decisionType == "skip") return SkipIconSkin;
				if ($.decisionType == "dislike") return DislikeIconSkin;
				else return undefined;
			}()
		}),
	],
	active: true,
	behavior: Behavior({
		onTouchBegan: function(container) {
			container.skin = CommonSkins.BackgroundDown;
		},
		onTouchEnded: function(container) {
			container.skin = CommonSkins.Background;
			rotateInterest(container);
		},
	})
}));

export var UpdateInterestsPageTemplate = Container.template($ => ({
	left: 0, right: 0, bottom: 0, top: 0,
	skin: CommonSkins.BackgroundDark,
	contents: function(){
		var contents = [];
		contents.push(new CommonTemplates.NavBar({ 
			screenTitle: "Update Interests",  
			backPage: "Profile"
		}));
		var decisionsList = ApiManager.AccessUserDecisions();
		for (var i = 0; i < decisionsList.length; i++) {
			contents.push(new InterestItemTemplate({
				index: i,
				title: decisionsList[i].interest.title,
				decisionType: decisionsList[i].decision_type,
				decisionId: decisionsList[i].id
			}));
		}
		return contents
	}()
}));

function rotateInterest(interestItemContainer) {
	var newDecisionType = "";
	if (interestItemContainer.decisionTypeHelper.string == "like") { 
		newDecisionType = "skip";
		interestItemContainer.interestItemDecisionIcon.skin = SkipIconSkin;
	}
	if (interestItemContainer.decisionTypeHelper.string == "skip") { 
		newDecisionType = "dislike";
		interestItemContainer.interestItemDecisionIcon.skin = DislikeIconSkin;
	}
	if (interestItemContainer.decisionTypeHelper.string == "dislike") { 
		newDecisionType = "like";
		interestItemContainer.interestItemDecisionIcon.skin = LikeIconSkin;
	}
	interestItemContainer.decisionTypeHelper.string = newDecisionType;
	
	// Add api call here to change decision
}
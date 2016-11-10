import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";
//import { PinsManager } from "../helpers/pins-manager";

export var ConnectPageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.Background,
	contents: [
		new CommonTemplates.NavBar({ 
			screenTitle: "Connect",  
			backPage: "Interests"
		}),
	]
}));
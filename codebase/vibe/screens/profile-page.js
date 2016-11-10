import { CommonPages, CommonVars, CommonTemplates, CommonSkins, CommonStyles } from "../helpers/common";

export var ProfilePageTemplate = Container.template($ => ({
	top: 0, left: 0, right: 0, bottom: 0,
	skin: CommonSkins.Background,
	contents: [
		new CommonTemplates.NavBar({ 
			screenTitle: "My Profile",  
			backPage: "Interests"
		}),
	]
}));
import Pins from "pins";

let textStyle = new Style({ font: "bold 30px", color: "white" });let MainContainer = Container.template($ => ({    top: 0, bottom: 0, left: 0, right: 0,    skin: new Skin({ fill: "#FF8270" }),    contents: [
    	new Picture({
    		width: 177 * .8, height: 73 * .8,
    		left: 80, top: 60,
    		url: "logo-white.png",
    		aspect: "stretch"
    	}),        Label($, {            top: 130, bottom: 0, left: 70, right: 70,            style: textStyle,  string: $.status        }),    ],}));

class AppBehavior extends Behavior {    onLaunch(application) {        Pins.configure({		    led: {
				require: "Digital",
				pins: {
					ground: {pin: 51, type: "Ground" },
					digital: {pin: 52, direction: "output" },
				}
			},
	        vibration: {
	        	require: "Digital",
		        pins:{
		            ground: {pin: 53, type: "Ground" },
		            digital: {pin: 54, direction: "output" },    
		        }
	        },        },  success => {            if (success) {                Pins.share("ws", {zeroconf: true, name: "pins-share"});                application.add(new MainContainer({ status: "Ready!" }));            } else {                application.add(new MainContainer({ status: "Error!" }));            };        });    }}application.behavior = new AppBehavior();
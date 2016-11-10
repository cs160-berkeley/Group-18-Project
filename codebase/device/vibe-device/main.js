import Pins from "pins";

let textStyle = new Style({ font: "bold 30px", color: "white" });
    	new Picture({
    		width: 177 * .8, height: 73 * .8,
    		left: 80, top: 60,
    		url: "logo-white.png",
    		aspect: "stretch"
    	}),

class AppBehavior extends Behavior {
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
	        },
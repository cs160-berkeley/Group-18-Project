var currentUser = undefined;
var currentMatch = undefined;
var upcomingInterests = [];
export var Session = {
	getUser: function() {
		return currentUser;
	},
	begin: function(user) {
		currentUser = user;
	},
	end: function() {
		currentUser = undefined;
	},
	getMatch: function() {
		return currentMatch;
	},
	match: function(matchUser) {
		currentMatch = matchUser;
	},
	unmatch: function() {
		currentMatch = undefined;
	},
	setInterests: function(interests) {
		upcomingInterests = interests;
	},
	hasNextInterest: function() {
		return upcomingInterests.length > 0;
	},
	getNextInterests: function() {
		return upcomingInterests[0];
	},
	getCurrentInterests: function() {
		return upcomingInterests[0];
	},
	makeDecision: function() {
		upcomingInterests.shift();
	},
	isEndOfInterests: function() {
		return upcomingInterests.length == 1;
	}
}
var currentUser = undefined;
var currentMatch = undefined;
var currentMatchUser = undefined;
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
	hasMatch: function() {
		return currentMatch != undefined;
	},
	getMatch: function() {
		return currentMatch;
	},
	getMatchUser: function() {
		return currentMatchUser;
	},
	match: function(match) {
		currentMatch = match;
		if (currentUser.id == currentMatch.user1.id) currentMatchUser = currentMatch.user2;
		else currentMatchUser = currentMatch.user1;
	},
	unmatch: function() {
		currentMatch = undefined;
		currentMatchUser = undefined
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
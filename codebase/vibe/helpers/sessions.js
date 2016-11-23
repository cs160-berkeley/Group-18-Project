var currentUser = undefined;
var currentMatch = undefined;
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
	}
}
import { Session } from "sessions";

let baseUrl = "http://vibe-alexyku.c9users.io";
let URLS = {
	INTEREST: function(uid) { return baseUrl + "/interests/" + uid },
	INTERESTS: baseUrl + "/interests",
	USER: function(uid) { return baseUrl + "/users/" + uid },
	USERS: baseUrl + "/users",
	USER_NEXT_INTERESTS: function(uid) { return baseUrl + "/users/" + uid + "/interests"},
	USER_DECISIONS: function(uid) { return baseUrl + "/users/" + uid + "/decisions"},
	CHECK_FOR_MATCH: function(uid) { return baseUrl + "/users/" + uid + "/match"},
	GET_MATCH: function(matchId) { return baseUrl + "/matches/" + matchId },
	GET_MATCH_BY_MATCHER: function(uid) { return baseUrl + "/matches/find_by_matcher/" + uid },
	GET_MATCH_BY_MATCHEE: function(uid) { return baseUrl + "/matches/find_by_matchee/" + uid },
	GET_MATCH_BY_USER: function(uid) { return baseUrl + "/matches/find_by_user/" + uid },
	ACCEPT_MATCH: function(matchId, uid) { return baseUrl + "/matches/" + matchId + "/accept/" + uid},
	CANCEL_MATCH: function(matchId, uid) { return baseUrl + "/matches/" + matchId + "/cancel/" + uid},
	DECISION: function(id) { return baseUrl + "/decisions/" + id },
	DECISIONS: baseUrl + "/decisions",
	LOGIN: function(access_code) { return baseUrl + "/kinoma_login?access_code=" + access_code },
	MAP: function(userLatitude, userLongitude, meetLatitude, meetLongitude) {
		return "http://maps.googleapis.com/maps/api/staticmap?autoscale=false&size=300x300&maptype=roadmap&key=AIzaSyCOcpyWG_N14fH19tPmy6_OIJqCku0coAY&format=png&visual_refresh=true&markers=icon:http://www.starcarpreowned.com/assets/d912/img/star.png%7Cshadow:false%7C"+meetLatitude+",+"+meetLongitude+"&markers=icon:http://downloadicons.net/sites/default/files/walking-man-icon-45663.png%7Cshadow:false%7C"+userLatitude+",+"+userLongitude;
	}
};
let METHODS = { GET: "GET", POST: "POST", PATCH: "PATCH", DELETE: "DELETE" };

export var ApiManager = {
	GetUser: function (userUid, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.USER(userUid), METHODS.GET, null, callbackSuccess, callbackSuccess);
	},
	UpdateUserDescription: function (userUid, description, callbackSuccess, callbackFailure) {
		var json = {user: { description: description }};
		genericApiCall(URLS.USER(userUid), METHODS.PATCH, json, callbackSuccess, callbackFailure);
	},
	GetNextInterests: function(userUid, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.USER_NEXT_INTERESTS(userUid), METHODS.GET, null, callbackSuccess, callbackFailure);
	},
	PostDecision: function(userUid, interestId, type, callbackSuccess, callbackFailure) {
		var json = {decision: { user_uid: userUid, interest_id: interestId, decision_type: type }};
		genericApiCall(URLS.DECISIONS, METHODS.POST, json, callbackSuccess, callbackFailure);
	},
	UpdateDecision: function(decisionId, newType, callbackSuccess, callbackFailure) {
		var json = {decision: { decision_type: newType }};
		genericApiCall(URLS.DECISION(decisionId), METHODS.PATCH, json, callbackSuccess, callbackFailure);
	},
	GetUserDecisions: function(userUid, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.USER_DECISIONS(userUid), METHODS.GET, null, callbackSuccess, callbackFailure);
	},
	Login: function(access_code, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.LOGIN(access_code), METHODS.GET, null, function(response_uid) {
			genericApiCall(URLS.USER(response_uid.uid), METHODS.GET, null, function(response_user) {
				Session.begin(response_user.user);
				callbackSuccess(response_uid);
			}, callbackFailure);
		}, callbackFailure);
	},
	CheckForMatch: function(userUid, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.CHECK_FOR_MATCH(userUid), METHODS.GET, null, callbackSuccess, callbackFailure);
	},
	GetMatch: function(matchId, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.GET_MATCH(matchId), METHODS.GET, null, callbackSuccess, callbackFailure);
	},
	GetMatchByMatcher: function(matcherUid, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.GET_MATCH_BY_MATCHER(matcherUid), METHODS.GET, null, callbackSuccess, callbackFailure);
	},
	GetMatchByMatcher: function(matcheeUid, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.GET_MATCH_BY_MATCHEE(matcheeUid), METHODS.GET, null, callbackSuccess, callbackFailure);
	},
	GetMatchByUser: function(userUid, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.GET_MATCH_BY_USER(userUid), METHODS.GET, null, callbackSuccess, callbackFailure);
	},
	AcceptMatch: function(matchId, userUid, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.ACCEPT_MATCH(matchId, userUid), METHODS.GET, null, callbackSuccess, callbackFailure);
	},
	CancelMatch: function(matchId, userUid, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.CANCEL_MATCH(matchId, userUid), METHODS.GET, null, callbackSuccess, callbackFailure);
	},
	GetMap: function(userLatitude, userLongitude, meetLatitude, meetLongitude) {
		trace('user latitude: ' + userLatitude + '\n');
		trace('user longitude: ' + userLongitude + '\n');
		trace('meet latitude: ' + meetLatitude + '\n');
		trace('meet longitude: ' + meetLongitude + '\n');
		trace('rul: ' + URLS.MAP(userLatitude, userLongitude, meetLatitude, meetLongitude) + '\n');
		return URLS.MAP(userLatitude, userLongitude, meetLatitude, meetLongitude);
	}
}

function genericApiCall(url, method, json, callbackSuccess, callbackFailure) {
	var message = new Message(url);
	message.method = method;
	if (method == METHODS.POST || method == METHODS.PATCH) {
		message.setRequestHeader("Content-Type", "application/json");
		message.requestText = JSON.stringify(json);
	}
    var promise = message.invoke(Message.JSON);
    promise.then(json => {
      if (0 == message.error && 200 == message.status) {
          try {
          	var response = json;
		    if (response.success == "true" || response.success == true) {
				callbackSuccess(response);
			} else {
				callbackFailure(response.message);
			}
          }
          catch (e) {
          	callbackFailure('Web service responded with invalid JSON!\n');
          }
      }
      else {
          callbackFailure('Request Failed - Raw Response Body: ' + json + '\n');
      }
    });
}

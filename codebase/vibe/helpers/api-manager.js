import { Session } from "sessions";

let baseUrl = "http://vibe-alexyku.c9users.io";
let URLS = {
	INTEREST: function(uid) { return baseUrl + "/interests/" + uid },
	INTERESTS: baseUrl + "/interests",
	USER: function(uid) { return baseUrl + "/users/" + uid },
	USERS: baseUrl + "/users",
	USER_NEXT_INTERESTS: function(uid) { return baseUrl + "/users/" + uid + "/interests"},
	USER_DECISIONS: function(uid) { return baseUrl + "/users/" + uid + "/decisions"},
	DECISION: function(id) { return baseUrl + "/decisions/" + id },
	DECISIONS: baseUrl + "/decisions",
	LOGIN: function(access_code) { return baseUrl + "/kinoma_login?access_code=" + access_code },
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
	GetMatches: function(userUid, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.USER_MATCHES(userUid), METHODS.GET, null, callbackSuccess, callbackFailure);
	},
	GetUserDecisions: function(userUid, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.USER_DECISIONS(userUid), METHODS.GET, null, callbackSuccess, callbackFailure);
	},
	Login: function(access_code, callbackSuccess, callbackFailure) {
		genericApiCall(URLS.LOGIN(access_code), METHODS.GET, null, function(response_uid) {
			genericApiCall(URLS.USER(response_uid.uid), METHODS.GET, null, function(response_user) {
				Session.begin(response_user.user);
			}, callbackFailure);
			callbackSuccess(response_uid);
		}, callbackFailure);
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

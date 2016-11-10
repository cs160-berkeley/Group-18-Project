import { Session } from "sessions";

let InterestList = [
	{ id: 0, title: "Men", url: "http://www.clipartkid.com/images/203/15-symbols-for-male-female-free-cliparts-that-you-can-download-to-you-BgFVmU-clipart.jpeg" },
	{ id: 1, title: "Women", url: "http://www.clipartbest.com/cliparts/McL/kKk/McLkKk6bi.png"},
	{ id: 2, title: "Hip Hop", url: "http://cdn.bgr.com/2016/06/hip-hop-dancing.jpg?quality=98&strip=all"},
	{ id: 3, title: "Thrillers", url: "http://1.bp.blogspot.com/-z_9RLoxRcu0/UnJek08GZ8I/AAAAAAAAAjc/8nmIv1EwXsM/s1600/8619296862_710d471edf_b.jpg"},
	{ id: 4, title: "Taylor Swift", url: "http://www.lyricsmode.com/i/bpictures/10381.png"},
	{ id: 5, title: "Running", url: "http://healthycentralflorida.org/wp-content/uploads/2014/08/mec-spring-_u4a3495-running.jpg"},
	{ id: 6, title: "Android", url: "https://timedotcom.files.wordpress.com/2016/01/biztech-illos-android2.jpg?quality=85&w=1100"},
	{ id: 7, title: "Singing", url: "http://www.theartcareerproject.com/wp-content/uploads/2012/02/Singing-Career.jpg"},
	{ id: 8, title: "Premier League", url: "http://www.standardmedia.co.ke/images/wednesday/the_latest_epl_tabl56d6fc508d42c.jpg"},
	{ id: 9, title: "Donald Trump", url: "http://www.slate.com/content/dam/slate/blogs/moneybox/2015/08/16/donald_trump_on_immigration_build_border_fence_make_mexico_pay_for_it/483208412-real-estate-tycoon-donald-trump-flashes-the-thumbs-up.jpg.CROP.promo-xlarge2.jpg"},
	{ id: 10, title: "Modern Family", url: "http://static.tvtropes.org/pmwiki/pub/images/modernfamsfour133.jpg"},
	{ id: 11, title: "Rihanna", url: "http://buzz.ie/wp-content/uploads/2016/04/rihanna.jpg"},
	{ id: 12, title: "Kayaking", url: "http://www.spytx.com/wp-content/uploads/2016/08/KAYAKING.jpg"},
	{ id: 13, title: "Barack Obama", url: "https://pbs.twimg.com/profile_images/738744285101580288/OUoCVEXG.jpg"},
	{ id: 14, title: "American Football", url: "http://s3.amazonaws.com/vnn-aws-sites/1252/files/2014/09/Football-and-helmets.jpg"},
	{ id: 15, title: "Orange is the New Black", url: "http://abovethelaw.com/wp-content/uploads/2015/04/OITNB.jpg"},
	{ id: 16, title: "Sky Diving", url: "http://www.skydivingphiladelphia.net/images/gallery/philadelphia-pennsylvania-skydiving.jpg"},
	{ id: 17, title: "Gold Fish", url: "http://www.hippoquotes.com/img/goldfish-snack-quotes/300px-goldfish-crackers.jpg"},
	{ id: 18, title: "Snowboarding", url: "https://i.ytimg.com/vi/j5V7kD_HeMw/maxresdefault.jpg"},
	{ id: 19, title: "Design", url: "https://c.s-microsoft.com/en-us/CMSImages/microsoft-design-practice-pillar-color-theory.png?version=3c3a11b7-6671-3564-251c-3b0506c006fc"},
	{ id: 20, title: "Astrology", url: "https://www.sellcell.com/blog/wp-content/uploads/2014/07/s266135201567006809_p25_i2_w1000.jpeg"},
	{ id: 21, title: "Dogs", url: "http://r.ddmcdn.com/s_f/o_1/cx_633/cy_0/cw_1725/ch_1725/w_720/APL/uploads/2014/11/too-cute-doggone-it-video-playlist.jpg"},
	{ id: 22, title: "Pizza", url: "http://manhattanpizzaplacehga.com/wp-content/uploads/2016/03/wafswectpmbr0zmug9ly.jpg"},
];
let UserList = [
	{ id: 0, name: "Jane Moe", currentInterest: 0, bio: "I love dogs; people are okay", image: "http://rs1259.pbsrc.com/albums/ii544/noerpamoengkas/Ardi%20and%20Blog/Information%20and%20Computer%20Technology/FacebookFemale_web_V.jpg~c200" },
	{ id: 1, name: "John Doe", currentInterest: 0, bio: "I love dogs; people are okay", image: "http://rs1216.pbsrc.com/albums/dd363/gamestar32/Untitled-1.jpg~c200" },
];
let Relations = [
	// { id: 1, user: 1, interest: 0, type: "Like" } 
];

let apiCallResult = { message: "match", match: { id: 0, name: "Jane Moe", currentInterest: 0, bio: "I love dogs; people are okay", image: "http://rs1259.pbsrc.com/albums/ii544/noerpamoengkas/Ardi%20and%20Blog/Information%20and%20Computer%20Technology/FacebookFemale_web_V.jpg~c200" } };
//let apiCallResult = { message: "none" };

export var ApiManager = {
	GetUser: function (userId) {
		return UserList[userId];
	},
	NextInterestExists: function(userId) {
		return UserList[userId].currentInterest < InterestList.length;
	},
	GetNextInterest: function(userId) {
		var interest = InterestList[UserList[userId].currentInterest];
		UserList[userId].currentInterest++;
		return interest;
	},
	PostDecision: function(userId, interestId, type) {
		Relations.push({ id: Relations.length, user: userId, interest: interestId, type: type });
	},
	LoginRequest: function(information, callback) {
		Session.begin(UserList[0]);
		callback();
	},
	CheckMatch: function(userId, callback) {
		if (apiCallResult != undefined && apiCallResult.message == "match") {
			callback(apiCallResult.match);
		}
	}
}

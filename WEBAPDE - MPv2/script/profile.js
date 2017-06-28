var root = 'http://jsonplaceholder.typicode.com';
userId = 99;
latestAlbum = 0;
function getUserId(url){
	var urlArr = url;
	var id = [];
	for(i=url.length-1;urlArr[i]!='?';i--){
		//console.log(urlArr[i]);
		id.push(urlArr[i]);
	}
	//console.log(id);
	if(id.length == 2)
		userId = 10;
	else
		userId = parseInt(id[0]);
}
function outputUserInfo(){
	$.ajax({
		url: root + '/users/' + userId,
		method: 'GET'
	}).then(function(user) {
		//console.log(user);
		
		var userName = document.createElement("span");
		var userUsername = document.createElement("span");
		var userEmail = document.createElement("span");
		var userAddress = document.createElement("div");
		var userPhone = document.createElement("span");
		var userWebsite = document.createElement("span");
		var userCompany = document.createElement("div");
		
		$(userName).addClass("userName");
		$(userUsername).addClass("userUsername");
		$(userEmail).addClass("userEmail");
		$(userPhone).addClass("userPhone");
		$(userWebsite).addClass("userWebsite");
		
		$(userAddress).addClass("userAddress");
		$(userCompany).addClass("userCompany");
		
		//ADDING INFO TO VARIABLES
		$(userName).append(user.name);
		$(userUsername).append("'" + user.username + "'");
		$(userEmail).append("Email: " + user.email);
		$(userPhone).append("Phone: " + user.phone);
		$(userWebsite).append("Website: " + user.website);
		//ADDRESS
		var addStreet = document.createElement("span");
		var addSuite = document.createElement("span");
		var addCity = document.createElement("span");
		var addZipcode = document.createElement("span");
		
		$(addStreet).append("Street: " + user.address.street);
		$(addSuite).append("Suite: " + user.address.suite);
		$(addCity).append("City: " + user.address.city);
		$(addZipcode).append("Zipcode: " + user.address.zipcode);
		
		$(userAddress).append("Address");
		$(userAddress).append(addStreet);
		$(userAddress).append(addSuite);
		$(userAddress).append(addCity);
		$(userAddress).append(addZipcode);
		
		//COMPANY
		var comName = document.createElement("span");
		var comCatchPhrase = document.createElement("span");
		var comBs = document.createElement("span");
		
		$(comName).append("Name: " + user.company.name);
		$(comCatchPhrase).append("Catch Phrase: " + user.company.catchPhrase);
		$(comBs).append("Bs: " + user.company.bs);
		
		$(userCompany).append("Company");
		$(userCompany).append(comName);
		$(userCompany).append(comCatchPhrase);
		$(userCompany).append(comBs);
		
		//ADDING TO CONTAINER
		$("#userContainer").append(userName);
		$("#userContainer").append(userUsername);
		$("#userContainer").append(userEmail);
		$("#userContainer").append(userAddress);
		$("#userContainer").append(userPhone);
		$("#userContainer").append(userPhone);
		$("#userContainer").append(userWebsite);
		$("#userContainer").append(userCompany);
		
	});
}
function loadPosts(){
	for(i=10;i>0;i--){
		//console.log(i);
		$.ajax({
			url: root + '/posts/' + i + '?Userid=' + userId,
			method: 'GET'
		}).then(function(data) {
			//console.log(data);
			createPost(data);
		});
	}
}
function createPost(data){
	//console.log(data);
	$.ajax({
		url: root + '/users/' + userId,
		method: 'GET'
	}).then(function(user) {
		var title = data.title;
		var content = data.body;
		var username = user.username;
		var postNum = data.id;
			
		var post = document.createElement("div");
		var user = document.createElement("span");
		var header = document.createElement("span");
		var body = document.createElement("p");
		var postNumber = document.createElement("div");
			
		user.href = "profile.html?"+data.userId;
			
		$(post).addClass("post");
		$(user).addClass("postUser");
		$(header).addClass("postHeader");
		$(body).addClass("postBody");
		$(postNumber).addClass("postNumber");
			
		$(user).append(username);
		$(header).append(title);
		$(body).append(content);
		$(postNumber).append(postNum+1);
			
		//$(post).append(postNumber);
		$(post).append(user);
		$(post).append(header);
		$(post).append(body);
		
		$("#userPosts").append(post);
	});
}
function loadAlbums(){
	for(i=userId*10-latestAlbum;i>userId*10-latestAlbum-4;i--){
		$.ajax({
			url: root + '/albums?userId=' + userId + '&id=' + i,
			method: 'GET'
		}).then(function(data) {
			console.log(data[0]);
			loadRandomImage(data[0]);
		});
	}
	latestAlbum+=4;
}
function loadRandomImage(album){
	randomPhotoNum = Math.floor(Math.random() * 50) + (album.id-1)*50;
	console.log(randomPhotoNum);
	$.ajax({
		url: root + '/photos?albumId=' + album.id + '&id=' + randomPhotoNum,
		method: 'GET'
	}).then(function(randPhoto) {
		console.log(randPhoto);
		var albumLink = document.createElement("a");
		var thumbnail = document.createElement("img");
		var albumTitle = document.createElement("span");
		$(thumbnail).prop('src',randPhoto[0].thumbnailUrl);
		$(thumbnail).addClass("thumbnail");
		$(albumTitle).append(album.title);
		
		$(albumLink).append(thumbnail);
		$(albumLink).append(albumTitle);
		//$("#userAlbums").append(thumbnail);
		//$("#userAlbums").append(albumTitle);
		albumLink.href = "album.html?"+album.id;
		$("#userAlbums").append(albumLink);
	});
}
$(document).ready(function(){
	getUserId(window.location.href);
	outputUserInfo();
	loadPosts();
	loadAlbums();
	$("#loadMore").click(loadAlbums);
})
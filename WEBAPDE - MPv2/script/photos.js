var root = 'http://jsonplaceholder.typicode.com';
latestPhoto = 5000;
currentAlbum = [];
function loadPhotos(){
	for(i=latestPhoto;i>latestPhoto-15;i--){
		$.ajax({
			url: root + '/photos?id=' + i,
			method: 'GET'
		}).then(function(photo) {
			console.log(photo);
			var phContainer = document.createElement("div");
			var thumbnail = document.createElement("img");
			var photoTitle = document.createElement("span");
				
			$(thumbnail).prop('src',photo[0].thumbnailUrl);
			$(thumbnail).addClass("thumbnail");
			$(photoTitle).append(photo[0].title);
				
			$(phContainer).append(thumbnail);
			$(phContainer).append(photoTitle);
				
			$(phContainer).addClass("phContainer");
			$(phContainer).prop('id','photo'+photo[0].id);
			$("#photosContainer").append(phContainer);
		});
	}
	latestPhoto-=15;
}
function photoZoom(id){
	var realId = id.substring(5,id.length);
	$.ajax({
		url: root + '/photos?id=' + realId,
		method: 'GET'
	}).then(function(photo){
		console.log(photo);
		$.ajax({
			url: root + '/albums?id=' + photo[0].albumId,
			method: 'GET'
		}).then(function(album) {
			$.ajax({
				url: root + '/users?id=' + album[0].userId,
				method: 'GET'
			}).then(function(user) {
				currentAlbum = album;
				console.log(user[0]);
				
				$("#photo").prop('src',photo[0].url);
				$("#photoTitle").append(photo[0].title);
				
				var photoAlbum = document.createElement("a");
				var photoPoster = document.createElement("a");
				photoAlbum.href = "album.html?"+album[0].id;
				photoPoster.href = "profile.html?"+album[0].userId;
				
				$(photoAlbum).append(album[0].title);
				$(photoPoster).append(user[0].username + "'s");
				console.log(photoAlbum);
				console.log(user[0].username);
				$("#photoTitle").append(photoPoster);
				$("#photoTitle").append(photoAlbum);
				$("#invisibleChuChu").fadeToggle();
			});
		});
	});
}
$(document).ready(function(){
	console.log("check");
	loadPhotos();
	$(document).on('click', ".phContainer",function(){
		$('#photo').empty();
		$('#photoTitle').empty();
		console.log(this.id);
		photoZoom(this.id);
	});
	$("#invisibleChuChu").click(function(){
		$("#invisibleChuChu").fadeToggle();
	});
	$("#loadMore").click(loadPhotos);
})
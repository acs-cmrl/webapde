var root = 'http://jsonplaceholder.typicode.com';
albumId = 999;
function getAlbumId(url){
	var urlArr = url;
	var id = [];
	for(i=url.length-1;urlArr[i]!='?';i--){
		//console.log(urlArr[i]);
		id.push(urlArr[i]);
	}
	//console.log(id);
	if(id.length == 3)
		albumId = 100;
	else if(id.length == 2)
		albumId = parseInt(id[1] + id[0])
	else
		albumId = parseInt(id[0]);
}
function loadPhotos(){
	$.ajax({
		url: root + '/photos?albumId=' + albumId,
		method: 'GET'
	}).then(function(photo) {
		console.log(photo);
		$.ajax({
			url: root + '/albums?id=' + albumId,
			method: 'GET'
		}).then(function(album) {
			console.log(album);
			$("#albumTitle").append(album[0].title);
		});
		for(i=0;i<50;i++){
			var phContainer = document.createElement("div");
			var thumbnail = document.createElement("img");
			var photoTitle = document.createElement("span");
			var hoverDiv = document.createElement("div");
			
			$(hoverDiv).addClass("hoverDiv");
			$(thumbnail).prop('src',photo[i].thumbnailUrl);
			$(thumbnail).addClass("thumbnail");
			$(photoTitle).append(photo[i].title);
			
			$(phContainer).append(thumbnail);
			$(phContainer).append(hoverDiv);
			$(phContainer).append(photoTitle);
			
			$(phContainer).addClass("phContainer");
			$(phContainer).prop('id','photo'+photo[i].id);
			$("#photosContainer").append(phContainer);
		}
	});
}
function photoZoom(id){
	var realId = id.substring(5,id.length);
	//$('#invisibleChuChu').empty();
	$.ajax({
		url: root + '/photos?id=' + realId,
		method: 'GET'
	}).then(function(photo){
		console.log(photo);
		$("#photo").prop('src',photo[0].url);
		$("#photoTitle").append(photo[0].title);
		
		$("#invisibleChuChu").fadeToggle();
	});
}
$(document).ready(function(){
	console.log("check");
	getAlbumId(window.location.href);
	loadPhotos();
	//var photId = document.getElementsByClassName('.phContainer')[0].id;
	$(document).on('click', ".phContainer",function(){
		$('#photo').empty();
		$('#photoTitle').empty();
		console.log(this.id);
		photoZoom(this.id);
	});
	$("#invisibleChuChu").click(function(){
		$("#invisibleChuChu").fadeToggle();
	});
})
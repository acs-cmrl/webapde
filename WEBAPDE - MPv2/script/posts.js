var root = 'http://jsonplaceholder.typicode.com';
	var mostRecent = 99;
	function loadPosts(){
		for(i=mostRecent;i>mostRecent-10;i--){
			$.ajax({
				url: root + '/posts/' + i,
				method: 'GET'
			}).then(function(data) {
				//console.log(data);
				createPost(data);
			});
		}
		mostRecent-=10;
	}
	function createPost(data){
		console.log(data);
		$.ajax({
			url: root + '/users/' + data.userId,
			method: 'GET'
		}).then(function(user) {
			var title = data.title;
			var content = data.body;
			var username = user.username;
			var postNum = data.id;
			
			var post = document.createElement("div");
			var user = document.createElement("a");
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
			
			$(post).append(postNumber);
			$(post).append(user);
			$(post).append(header);
			$(post).append(body);
			
			if(data.id%2==0)$("#evenPosts").append(post);
			else $("#oddPosts").append(post);
		});
	}
	$(document).ready(function(){
        loadPosts(); 
		$("#loadMore").click(loadPosts);
    })
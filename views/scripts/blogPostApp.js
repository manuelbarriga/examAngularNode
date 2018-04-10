angular.module('blogPostApp', []).controller('blogPostController', function($sce, $http){
	
	var blogs = this;

	blogs.toggleModal = false;
	blogs.emptyTitle = false;
	blogs.emptyBody = false;
	blogs.postInPage = 3;
	blogs.page = [];
	blogs.list = [];

	blogs.getList = function () {
		blogs.list = [];
		$http.get("/list").then(function (response) {
			for (var i = 0; i < response.data.length; i++) {
				blogs.list.push({
					title: response.data[i].title,
					body: response.data[i].body,
					category: response.data[i].category,
					url: response.data[i].url.trim() == '' ? '' : $sce.trustAsResourceUrl(response.data[i].url)
				});
			}
		});
	};

	blogs.submitPost = function () {
		var cat = document.getElementById("postCategory");
		var catValue = cat.options[cat.selectedIndex].value; 
		if (document.getElementById("postTitle").value == '') {
			blogs.emptyTitle = true;
		} else {
			blogs.emptyTitle = false;
		}
		if (document.getElementById("postBody").value == '') {
			blogs.emptyBody = true;
		} else {
			blogs.emptyBody = false;
		}
		if (!blogs.emptyTitle && !blogs.emptyBody) {
			var param = {title: document.getElementById("postTitle").value, body: document.getElementById("postBody").value, category: catValue, url: document.getElementById("postURL").value};
			$http({
				method: 'POST',
				url: '/submit',
				data: JSON.stringify(param),
				headers : {
					'Content-Type': 'application/json'
				}
			});
			blogs.emptyTitle = false;
			blogs.emptyBody = false;			
			blogs.toggleModal = false;
			// blogs.displayPagination();
			alert("New Data Added");
			blogs.getList();
		}
	};

	blogs.retrieveNumber = function () {
		console.log(blogs.list.length);
	};

	blogs.displayPagination = function () {
		// retrieve all data in database
		// get reminder and subtract it to total
		// remianing divided by the postInpage value
		// if reminder is not equals to 0, plus 1
		// set it to an array and display it
		blogs.page = [];
		$http.get("/total").then(function (response) {
			var totalLength = parseInt(response.data);
			var rem = totalLength % blogs.postInPage;
			totalLength = totalLength - rem;
			pages = totalLength / blogs.postInPage;
			if (rem > 0) {
				pages++;
			}
			for (var b = 1; b <= pages; b++) {
				blogs.page.push(b);
			}
		});
	};

	blogs.selectPage = function ($e) {
		// select page
		// get the page number
		// (page number - 1) x postInpage + 1;
		// set it as starting number of the query will be called limit by the postInpage
		var target = angular.element($e.currentTarget);
		var pageNumber = parseInt(target[0].innerHTML);
		var sartNumber = 0;
		if (pageNumber > 1) {
			pageNumber--;
			sartNumber = pageNumber * blogs.postInPage;
		} 
		$http.get("/list?page=" + sartNumber + "&limit=" + blogs.postInPage).then(function (response) {
			blogs.list = [];
			for (var i = 0; i < response.data.length; i++) {
				blogs.list.push({
					title: response.data[i].title,
					body: response.data[i].body,
					category: response.data[i].category,
					url: response.data[i].url.trim() == '' ? '' : $sce.trustAsResourceUrl(response.data[i].url)
				});
			}
		});
	};
});


// TODO
// finish pagination - 
// page must not load when new post added -
// finish angular http request -
// finish all srvices (submit, retrieve all, retrive with parameters) -
// validation (front end and back end) -
// Combo box for the category - 
// trim value -


// check SQL injection security 
// Make a github repo
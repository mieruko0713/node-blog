var blogData = $('#blog-data');
var search = blogData.data('search');
var total = blogData.data('total');
var page = blogData.data('page');
var pageSize = blogData.data('pagesize');
var isFirstPage = blogData.data('isfirstpage');
var isLastPage = blogData.data('islastpage');

var end = Math.ceil(total/pageSize);

var pagination = '<nav><ul class="pagination">';

if(search) {
	if(isFirstPage) {
		pagination += '<li class="disabled"><a href="#" aria-label="Previous">'+
						'<span aria-hidden="true">&laquo;</span></a></li>';
	} else {
		pagination += '<li><a href="?title='+ search +'&page='+ (page-1) +'" aria-label="Previous">'+
						'<span aria-hidden="true">&laquo;</span></a></li>';
	}


	if(end > 10){
		if(page <= 6) {
			for(var i = 1; i <= 10; i++) {
				if(page == i) {
					pagination += '<li class="active"><a href="#">'+ i +'</a></li>';
				} else {
					pagination += '<li><a href="?title='+ search +'&page='+ i +'">'+ i +'</a></li>';
				}
			}
		} else if(page >= end - 4) {
			for(var i = end-9; i <= end; i++) {
				if(page == i) {
					pagination += '<li class="active"><a href="#">'+ i +'</a></li>';
				} else {
					pagination += '<li><a href="?title='+ search +'&page='+ i +'">'+ i +'</a></li>';
				}
			}
		} else {
			for(var i = page-5; i <= page+4; i++) {
				if(page == i) {
					pagination += '<li class="active"><a href="#">'+ i +'</a></li>';
				} else {
					pagination += '<li><a href="?title='+ search +'&page='+ i +'">'+ i +'</a></li>';
				}
			}
		}
	} else {
		for (var i = 1; i <= end; i++) {
			if(page == i) {
				pagination += '<li class="active"><a href="#">'+ i +'</a></li>';
			} else {
				pagination += '<li><a href="?title='+ search +'&page='+ i +'">'+ i +'</a></li>';
			}
		}
	}

	if(isLastPage) {
		pagination += '<li class="disabled"><a href="#" aria-label="Next">'+
						'<span aria-hidden="true">&raquo;</span></a></li>';
	} else {
		pagination += '<li><a href="?title='+ search +'&page='+ (page+1) +'" aria-label="Next">'+
						'<span aria-hidden="true">&raquo;</span></a></li>';
	}

} else {

	if(isFirstPage) {
		pagination += '<li class="disabled"><a href="#" aria-label="Previous">'+
						'<span aria-hidden="true">&laquo;</span></a></li>';
	} else {
		pagination += '<li><a href="?page='+ (page-1) +'" aria-label="Previous">'+
						'<span aria-hidden="true">&laquo;</span></a></li>';
	}


	if(end > 10){
		if(page <= 6) {
			for(var i = 1; i <= 10; i++) {
				if(page == i) {
					pagination += '<li class="active"><a href="#">'+ i +'</a></li>';
				} else {
					pagination += '<li><a href="?page='+ i +'">'+ i +'</a></li>';
				}
			}
		} else if(page >= end - 4) {
			for(var i = end-9; i <= end; i++) {
				if(page == i) {
					pagination += '<li class="active"><a href="#">'+ i +'</a></li>';
				} else {
					pagination += '<li><a href="?page='+ i +'">'+ i +'</a></li>';
				}
			}
		} else {
			for(var i = page-5; i <= page+4; i++) {
				if(page == i) {
					pagination += '<li class="active"><a href="#">'+ i +'</a></li>';
				} else {
					pagination += '<li><a href="?page='+ i +'">'+ i +'</a></li>';
				}
			}
		}
	} else {
		for (var i = 1; i <= end; i++) {
			if(page == i) {
				pagination += '<li class="active"><a href="#">'+ i +'</a></li>';
			} else {
				pagination += '<li><a href="?page='+ i +'">'+ i +'</a></li>';
			}
		}
	}

	if(isLastPage) {
		pagination += '<li class="disabled"><a href="#" aria-label="Next">'+
						'<span aria-hidden="true">&raquo;</span></a></li>';
	} else {
		pagination += '<li><a href="?page='+ (page+1) +'" aria-label="Next">'+
						'<span aria-hidden="true">&raquo;</span></a></li>';
	}
}


pagination += '</nav></ul>';

$('#pagination-box').html(pagination);

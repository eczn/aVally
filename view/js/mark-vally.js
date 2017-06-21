// mark-vally.js
function linkto(str){
	window.location.href = str; 
}

$(window).scroll(function(e){
    var rate = getRate(); 
    var rateStr = rate * 100 + '%'; 
    // console.log(rate, rateStr)
    $('.top').css('width', rateStr); 
}); 

function getRate(){
	var $b = $('body'); 

	var cha = parseInt($b.css('margin-top')) + parseInt($b.css('margin-bottom'));

	var total = $b.height() + cha - window.innerHeight; 
	var now = $b.scrollTop(); 
	// console.log('now, total', now, total); 
	// console.log('rate:', now / total); 

	return now / total; 
}

function totop(){
	// $('body').scrollTop(0); 
	Jump('html', {
		duration: 500,
		offset: 0,
		callback: function(e){
			console.log(e); 

			var $body = $('body'); 
			var f = $body.css('margin-top'); 

			$body.css('margin-top', '150px'); 
			setTimeout(function(){
				$body.css('margin-top', 0); 
			}, 200)
		},
		a11y: false
	})
}

$(function(){
	var list = []; 

	$('img').click(function(e){
		var src = $(this).attr('src'); 
		$imgClick = $('.img-clicked'); 
		
		if (window.innerWidth < 700){
			window.open(src); 
			return ; 
		}

		if ($imgClick.attr('active') !== '√'){
			$('html').addClass('no-scroll'); 

			$imgClick.empty(); 
			$imgClick.html('<img src="' + src + '" />').attr('active', '√'); 

			list.push({
				target: e.target,
				close: function(){
					$imgClick.attr('active', '×'); 

					$('html').removeClass('no-scroll'); 
				}
			})
		}
	}); 

	$(document).click(function (e) {
		var target = e.target;

		// 复写 
		list = list.filter(toCheck => {
			var flag = target !== toCheck.target; 

			if (flag){
				toCheck.close(); 
			}
			// close 过的不能保留
			return !flag; 
		}); 

	});

})
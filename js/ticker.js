$(document).ready(function () {
    //rotation speed and timer
    var speed = 5500;
    
    var run = setInterval(rotate, speed);
    var slides = $('.slides9000');
    var container = $('#slides9000 ul');
    var elm = container.find(':first-child').prop("tagName");
    var item_width = container.width();
    var previous = 'prev'; //id of previous button
    var next = 'next'; //id of next button
    slides.width(item_width); //set the slides to the correct pixel width
    container.parent().width(item_width);
    container.width(slides.length * item_width); //set the slides container to the correct total width
    container.find(elm + ':first').before(container.find(elm + ':last'));
    resetSlides();
    
    
    //if user clicked on prev button
    
    $('#buttons a').click(function (e) {
        //slide the item
        
        if (container.is(':animated')) {
            return false;
        }
        if (e.target.id == previous) {
            container.stop().animate({
                'left': 0
            }, 1500, function () {
                container.find(elm + ':first').before(container.find(elm + ':last'));
                resetSlides();
            });
        }
        
        if (e.target.id == next) {
            container.stop().animate({
                'left': item_width * -2
            }, 1500, function () {
                container.find(elm + ':last').after(container.find(elm + ':first'));
                resetSlides();
            });
        }
        
        //cancel the link behavior            
        return false;
        
    });
    
    //if mouse hover, pause the auto rotation, otherwise rotate it    
    container.parent().mouseenter(function () {
        clearInterval(run);
    }).mouseleave(function () {
        run = setInterval(rotate, speed);
    });
    
    
    function resetSlides() {
        //and adjust the container so current is in the frame
        container.css({
            'left': -1 * item_width
        });
    }
    
});
//a simple function to click next link
//a timer will call this function, and the rotation will begin

function rotate() {
    $('#next').click();
}
/*var speed = 30000;
var canTick = true;

$(document).ready(function() {
	$('.ticker-container ul div').each(function(i) {
		if ($(window).width() >= 500) {
			$(this).find('li').width($(window).width() - parseInt($(this).css('left')));
		}
		if (i == 0) {
			$(this).addClass('ticker-active');
		} else {
			$(this).addClass('not-active');
		}
		if ($(this).find('li').height() > 30) {
			$(this).find('li').css({
				'height': '20px',
				'width': '200%',
				'text-align': 'left',
				'padding-left': '5px'
			});
			$(this).find('li').css('width', $(this).find('li span').width());
		}
	});
	//startTicker();
	//animateTickerElementHorz();
});

$(window).resize(function() {
	$('.ticker-container ul div').each(function(i) {
		if ($(this).find('li').height() > 30) {
			$(this).css({
				'height': '20px',
				'width': '200%',
				'text-align': 'left',
				'padding-left': '5px'
			});
			$(this).find('li').css('width', $(this).find('li span').width());
		}
	});
});

function startTicker() {
	setInterval(function() {
		if (canTick) {
			$('.ticker-container ul div.ticker-active')
				.removeClass('ticker-active')
				.addClass('remove');
			if ($('.ticker-container ul div.remove').next().length) {
				$('.ticker-container ul div.remove')
					.next()
					.addClass('next');
			} else {
				$('.ticker-container ul div')
					.first()
					.addClass('next');
			}
			$('.ticker-container ul div.next')
				.removeClass('not-active next')
				.addClass('ticker-active');
			setTimeout(function() {
				$('.ticker-container ul div.remove')
					.css('transition', '0s ease-in-out')
					.removeClass('remove')
					.addClass('not-active finished');
				if ($(window).width() < 500) {
					if ($('.ticker-container ul div.finished li').width() < $(window).width()) {
						$('.ticker-container ul div.finished').removeClass('finished');
					}
				} else {
					if ($('.ticker-container ul div.finished li').width() < ($(window).width() - (parseInt($('.ticker-container ul div.ticker-active').css('left')) + 15))) {
						$('.ticker-container ul div.finished').removeClass('finished');
					}
				}
				setTimeout(function() {
					$('.ticker-container ul div')
						.css('transition', '0.25s ease-in-out');
				}, 75);
				animateTickerElementHorz();
			}, 250);
		}
	}, speed/2);
}

function animateTickerElementHorz() {
	if ($(window).width() < 500) {
		if ($('.ticker-container ul div.ticker-active li').width() > $(window).width()) {
			setTimeout(function() {
				$('.ticker-container ul div.ticker-active li').animate({
					'margin-left': '-' + (($('.ticker-container ul div.ticker-active li').width() - $(window).width()) + 15)
				}, speed - (speed / 5), 'swing', function() {
					setTimeout(function() {
						$('.ticker-container ul div.finished').removeClass('finished').find('li').css('margin-left', 0);
					}, ((speed / 5) / 2)); 
				});
			}, ((speed / 5) / 2));
		}
	} else {
		if ($('.ticker-container ul div.ticker-active li').width() > ($(window).width() - parseInt($('.ticker-container ul div.ticker-active').css('left')))) {
			setTimeout(function() {
				$('.ticker-container ul div.ticker-active li').animate({
					'margin-left': Math.abs($('.ticker-container ul div.ticker-active li').width() - ($(window).width() - parseInt($('.ticker-container ul div.ticker-active').css('left'))) + 15) * -1
				}, speed - (speed / 5), 'swing', function() {
					setTimeout(function() {
						$('.ticker-container ul div.finished').removeClass('finished').find('li').css('margin-left', 0);
					}, ((speed / 5) / 2)); 
				});
			}, ((speed / 5) / 2));
		}
	}
}

$('.ticker-container').on('mouseover', function() {
	canTick = false;
});

$('.ticker-container').on('mouseout', function() {
	canTick = true;
});*/
;(function($, window) {
	/** Settings **/

	// List of background images to use, the default image will be the first one in the list
	var backgrounds = [
    	'images/backgrounds/temperateRainforest.jpg',
	    'images/backgrounds/approachingStorm.jpg',
	    'images/backgrounds/atLastLight.jpg',
	    'images/backgrounds/cataclysm3.jpg',
	    'images/backgrounds/jewel.jpg',
	    'images/backgrounds/neptuneSkies.jpg',
	    'images/backgrounds/shadowOfIo.jpg',
	    'images/backgrounds/stJohnsBridge.jpg',
	    'images/backgrounds/stormySeattle.jpg',
	    'images/backgrounds/inDarknessLight.jpg',
	    'images/backgrounds/seasonalWinds.jpg',
	    'images/backgrounds/sunrise.jpg',
	    'images/backgrounds/pacificCoast.jpg',
	    'images/backgrounds/druidTree.jpg',
	    'images/backgrounds/intoTheMist.jpg',
	    'images/backgrounds/craterLakeWest.jpg'
	],
	
	// Background options - see documentation
	backgroundOptions = {
		
	},
	
	// Twitter username
	twitterUsername = 'ThemeCatcher',
		
	// Number tweets to show, set to 0 to disable
	tweetCount = 2,
	
	// The final percentage the bar should animate to
	progressPercentage = 70,
	
	// The time to complete the bar animation in milliseconds, 1000 = 1 second
	progressAnimationSpeed = 2000,
	
	// Enter your launch date
	launchDate = {
		day: 31,
		month: 11,
		year: 2011,
		hour: 12,
		min: 0,
		sec: 0	
	},
	
	// Months
	months = {
		1: 'Jan',
		2: 'Feb',
		3: 'Mar',
		4: 'Apr',
		5: 'May',
		6: 'Jun',
		7: 'Jul',
		8: 'Aug',
		9: 'Sep',
		10: 'Oct',
		11: 'Nov',
		12: 'Dec'
	};
	
	/** End settings **/
	
	$('html').addClass('js-enabled');
		
	$(document).ready(function() {		
		$.fullscreen(
			$.extend(backgroundOptions, {
				backgrounds: window.backgrounds || backgrounds,
				backgroundIndex: window.backgroundIndex
			})
		);
				
		$('.fancybox-portfolio a.portfolio-thumb-link').fancybox({
			'transitionIn': 'elastic',
			'transitionOut': 'elastic',
			'speedIn': 600, 
			'speedOut': 200,
			'overlayColor': '#111',
			onStart: $.fullscreen.unbindKeyboard,
			onClosed: $.fullscreen.bindKeyboard
		});	
		
		// Footer pop out boxes
		$('.footer-pop-out-trigger', '#footer').click(function () {
			var $trigger = $(this);
			var $allBoxes = $('.footer-pop-out-box', '#footer');
			if ($allBoxes.is(':animated')) {
				return false;
			}
			
			var thisId = $trigger.attr('id').substring(16);
			var $thisBox = $('#' + thisId + '-pop-out');
			if ($thisBox.is(':visible')) {
				$('.footer-pop-out-trigger').removeClass('footer-pop-active');
				$thisBox.slideUp();
			} else {
				if ($allBoxes.is(':visible')) {
					$('.footer-pop-out-trigger').removeClass('footer-pop-active');
					$allBoxes.filter(':visible').slideUp(function() {
						$trigger.addClass('footer-pop-active');
						$thisBox.slideDown();
					});
				} else {
					$trigger.addClass('footer-pop-active');
					$thisBox.slideDown();
				}
			}
			
			return false;
		});		

		// Make the form inputs clear value when focused
		$('.toggle-val').toggleVal({ populateFrom: 'label', removeLabels: true });
		
		// Create the gallery rollover effect
		$('li.one-portfolio-item a').append(
			$('<div class="portfolio-hover"></div>').css({ opacity: 0, display: 'block' })
		).live('mouseenter', function() {
			$(this).find('.portfolio-hover').stop().fadeTo(400, .5);
		}).live('mouseleave', function() {
			$(this).find('.portfolio-hover').stop().fadeTo(400, 0.0);
		});
		
		$('.social-list-small a').css({ opacity: 0.3 }).live('mouseenter', function() {
			$(this).stop().fadeTo(400, 0.8);
		}).live('mouseleave', function() {
			$(this).stop().fadeTo(400, 0.3);
		});
		
		$('#tabs').tabs({ fx: { opacity: 'toggle', duration: 'slow' }});
	}); // End (document).ready
	
	$(window).load(function() {
		
	}); // End (window).load	

	// Any images to preload
	window.preload([
        'images/close1.png',
 		'images/close.png',
 		'images/minimise1.png',
		'images/minimise.png',
 		'images/3-col-hover.png',
 		'images/light-bg-rep.png',
		'images/dark-bg-rep.png',
		'images/dark-play.png',
		'images/dark-pause.png',
		'images/light-play.png',
		'images/light-pause.png'	
	]);
})(jQuery, window);
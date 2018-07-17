'use strict';

$(function() {

$('body').addClass('anim-fade');



$('.lazy').lazy({
		// your configuration goes here
		scrollDirection: 'vertical',
		effect: 'fadeIn',
		visibleOnly: true,
		placeholder: "img/ajax-loader.gif",
		onError: function(element) {
				console.log('error loading ' + element.data('src'));
		}
});

var words = ["Гинекология", "Акушерство", "Кардиология"];

//var words = "Гинекология";
	var wordsCounter = 0;

	setInterval(function() {

		var $field = $('.js-field'),
				i = 0 , length = words[wordsCounter].length, loop, loop2;
				
		function typeWords () {
			var type = false;

			$field.append(words[wordsCounter].substr(i, 1));

			if(i <= length) {
				loop = setTimeout(typeWords, 100)
			} else {
				clearInterval(loop);
				loop2 = setInterval(clearString, 1000);
				if(wordsCounter >= words.length - 1 ) {
					wordsCounter = 0;
				} else {
					wordsCounter++;
				};
			};

			i++;
		};

		function clearString() {
				var j = 0;

				$field.text($field.text().slice(j,-1))

				if(j < $field.text().length) {
					var loop = setTimeout(clearString, 100)
				} else {
					clearInterval(loop);
					clearInterval(loop2);
				};

				j++;
		};

		typeWords();

	}, 5000);

	setInterval(function () {
		$('.separate').toggleClass('hidden');
	}, 800);
var counter = 0;
    $('body').on('mousewheel', function(e){
    	if($('.capsules').hasClass('uk-slide-up')) {
    		
        if(e.originalEvent.wheelDelta > 0) {
        	counter++;
        	console.log(counter)
        	if(counter > 10) {
        		counter = 10;
        	}
        	$('.capsules').css({'top': (100+(counter*15))+'px'});
        }
        else {
        	counter--;
        	console.log(counter)
        	if(counter < -10) {
        		counter = -10;
        	}
        	$('.capsules').css({'top': (100+(counter*15))+'px'});
        	console.log(counter)	

        }
    	} 

    });

});
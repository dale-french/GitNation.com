

$(function() {

	/*---------------------------------------------------*/
	// Smiles generation

	var smileWidth = $('.smiles__img').width();
	var smileHeight = $('.smiles__img').height();
	var sectionWidth = $('.smiles').width();
	var sectionHeight = $('.smiles').height();
	var smilesInRow = Math.round(sectionWidth / smileWidth + 1);
	var rowsInSection = Math.round(sectionHeight / smileHeight + 1);

	var newArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];

	for (var j = 0; j < rowsInSection; j++) {
		var rndArray = shuffle(newArray);

		for (var i = 0; i < smilesInRow; i++) {
			$('.smiles').append('<div class="smiles__row"></div>')

			for (var i = 0; i < smilesInRow; i++) {
				$('.smiles__row').last().append('<svg class="smiles__img" role="img" aria-hidden="true"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/smiles.svg#smile_' + rndArray[i] + '"></use></svg>');
			}
		}
	}

	rotateLast()

	function rotateLast(){
		if ( rowsInSection % 2 == 0 ) {
			$('.smiles__row:nth-child('+ (rowsInSection - 2) + ') .smiles__img:nth-child('+ (smilesInRow - 2) +')').attr('transform', 'rotate(-90)');
		} else {
			$('.smiles__row:nth-child('+ (rowsInSection - 2) + ') .smiles__img:nth-child('+ (smilesInRow - 1) +')').attr('transform', 'rotate(-90)');
		}
	}

	function shuffle(array) {
		var i = array.length,
			j = 0,
			temp;

		while (i--) {

			j = Math.floor(Math.random() * (i+1));

			temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}

		return array;
	}

	setInterval(function() {
		var totalRows = Array.from({length: rowsInSection + 1}, (v, i) => i).slice(1);
		var rndRow = totalRows[Math.floor(Math.random()*totalRows.length)];
		var totalSmiles = Array.from({length: smilesInRow + 1}, (v, i) => i).slice(1);
		var rndSmile = totalSmiles[Math.floor(Math.random()*totalSmiles.length)];
		var numItems = $('svg.smiles__img').length;
		var selectedSmile = $('.smiles__row:nth-child('+ rndRow +') .smiles__img:nth-child('+ rndSmile +')');

		selectedSmile.replaceWith('<svg class="smiles__img" role="img" aria-hidden="true"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/smiles.svg#smile_'+ rndSmile +'"></use></svg>');


		rotateLast()

	}, 1000);

	/*---------------------------------------------------*/

	$(function() {
		$('a[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 400);
					return false;
				}
			}
		});
	});

	/*---------------------------------------------------*/

	$('.menu-btn').click(function(){
		$(this).toggleClass("close"),
		$(this).siblings(".main-nav").toggleClass("closed");
	});

});

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	yaMap()
} )

const yaMap = () => {
	ymaps.ready(init);
	function init(){
		var myMap = new ymaps.Map("ya-map", {
			center: [55.756690, 37.610188],
			zoom: 17
		});

		var myPlacemark = new ymaps.Placemark([55.756690, 37.610188], null, {
			preset: 'islands#redDotIcon'
		});
		myMap.geoObjects.add(myPlacemark);
	}

}


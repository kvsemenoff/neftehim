$(document).ready(function(){
	ymaps.ready(init);

	function init() {
    var center = [55.72858056899627,37.454141999999955];
    var center1 = [55.59113656911934,37.88662649999996];
    var myMap1 = new ymaps.Map('mape-ofice', {
        center: center,
        controls: [],
        zoom: 16
    });
   
    myMap1.behaviors.disable('scrollZoom');
    var myMap2 = new ymaps.Map('mape-sclad', {
        center: center1,
        controls: [],
        zoom: 16
    });
    myMap2.behaviors.disable('scrollZoom');
    var myPlacemark1 = new ymaps.Placemark(center, {
        // Свойства.
        // Содержимое иконки, балуна и хинта.
    	  balloonContent: 'улица Ивана Франко, 4к4',
        hintContent: 'улица Ивана Франко, 4к4'
    }, {
        // Опции.
        iconLayout: 'default#image',
        iconImageHref: 'img/map-ic.png',
        iconImageSize: [42, 42]
        // preset: 'twirl#violetIcon'
    });
    var myPlacemark2 = new ymaps.Placemark(center, {
        // Свойства.
        // Содержимое иконки, балуна и хинта.
        balloonContent: 'Колхозная улица, 4',
        hintContent: 'Колхозная улица, 4'
    }, {
        // Опции.
        // Стандартная фиолетовая иконка.
        iconLayout: 'default#image',
        iconImageHref: 'img/map-ic.png',
        iconImageSize: [42, 42],
        preset: 'twirl#violetIcon'
    });
    myMap1.geoObjects.add(myPlacemark1);
    myMap2.geoObjects.add(myPlacemark2);
	}
});
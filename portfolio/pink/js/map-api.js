  function initialize() {
    var myLatlng = new google.maps.LatLng(59.9387942, 30.3230833);

    var myOptions = {
      zoom: 14,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(document.querySelector(".map__google-map"), myOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title:"Большая Конюшенная ул., 19, Санкт-Петербург, 191186"
    });

    var infowindow = new google.maps.InfoWindow({
      content: "Большая Конюшенная ул., 19, Санкт-Петербург"
    });

    google.maps.event.addListener(marker, "click", function() {
      infowindow.open(map, marker);
    });

    google.maps.event.addListener(map, "zoom_changed", function(){
        map.setCenter( marker.getPosition() );
    });

  }


window.onload = initialize();

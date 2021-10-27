$(document).ready(function (){
  initMap();
});

var map, service, add, response;
function initMap(){
  $.ajax({
    url:"https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-10-01&endtime=2021-10-15&minmagnitude=5",
    datatype:"json",
    success: function(data){
      response = data;
      utd = new google.maps.LatLng(2.8, -187.3),
      map = new google.maps.Map(document.getElementById("map"),{
        center:utd,
        zoom:2,
        mapTypeId : "roadmap",
      });
      
      var place;
      for (var i = 0; i < response.features.length; i++) {
        if (response.features[i].properties.place != null) {
          place = response.features[i].properties.place;
          place = place.toLowerCase();
        } else {
          place=""
        }
        const latLng = new google.maps.LatLng(response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]);
        new google.maps.Marker({
          map,
          title: response.features[i].properties.place,
          icon: getCircle(response.features[i].properties.mag),
          position: latLng,
        });
      }

    },
    error: function(err){
      console.log(err);
    },
  });
}

function exactPlaceEq() {
  add = document.getElementById("address").value; //get the address the value from the html
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: add }, function (results, status) {
    loc = results[0].geometry.location;
    var utd = new google.maps.LatLng(loc.lat(), loc.lng());

    map = new google.maps.Map(document.getElementById("map"), {
      center: utd,
      zoom: 6,
      mapTypeId: "roadmap",
    });

    var req = {
      location: utd,
      radius: "1500",
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(req, callBack);
  });
}

function callBack(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var place;
    for (var i = 0; i < response.features.length; i++) {
      if (response.features[i].properties.place != null) {
        place = response.features[i].properties.place;
        place = place.toLowerCase();
      } else {
        place = ""
      }
      if (place.search(add.toLowerCase())!=-1) {
        const latLng = new google.maps.LatLng(response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]);
        new google.maps.Marker({
          map,
          icon:getCircle(response.features[i].properties.mag),
          title: response.features[i].properties.place,
          position: latLng,
        });
      }
    }
  }
}

function getCircle(magnitude) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: "red",
    fillOpacity: 0.2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: "white",
    strokeWeight: 0.5,
  };
}

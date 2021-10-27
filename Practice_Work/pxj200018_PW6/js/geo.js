var map;
var service;

function init() {
  var loc; //for location
  var add = document.getElementById("address").value; //get the address the value from the html
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: add }, function (results, status) {
    loc = results[0].geometry.location;
    //console.log("latlong " + loc.lng());
    var utd = new google.maps.LatLng(loc.lat(), loc.lng());

    map = new google.maps.Map(document.getElementById("map"), {
      center: utd,
      zoom: 18,
    });

    var req = {
      location: utd,
      radius: "1500",
      type: ["hospital"],
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(req, callBack);
  });
}

function callBack(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      new google.maps.Marker({
        map,
        title: results[i].name,
        position: results[i].geometry.location,
      });
    }
  }
}

//SONGQI HOU
//ASSIGNMENT: POLICE-SHOOTING
// Function to draw your map
var map;

var drawMap = function() {
  // Create map and set viewd
  map = L.map('container');
  map.setView([40, -100],4);
  // Create an tile layer variable using the appropriate url
  // Add the layer to your map
  var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
  getData();
 }

//Function for getting data
var getData = function() {
 	var data;
 	$.ajax({
 	    url:'data/response.json',
 	    type: "get",
 	    success: function(dat) {
 	    	data = dat;
 	    	customBuild(dat);
 	    },
 	   dataType:"json"
 	})
}

// Do something creative with the data here!  
var customBuild = function(data) {
  var array = [];
  data.map(function(d){
  var opa;
  if(d['Hit or Killed?'] == 'Hit') {
    opa = .5;
  } else {
    opa = 1;
  }
  var race;
  if(d['Race'] == 'White') {
    race = 'white'
  } else if (d['Race'] == 'Black or African American') {
    race = 'black'
  } else if (d['Race'] == 'Asian'){
    race = 'rgb(253,236,80)'
  } else {
    race = 'rgb(156, 255, 176)'
  }

  var size;
  if(d["Victim's Age"] <= '18') {
    size = 600;
  } else if (d["Victim's Age"] <= '30') {
    size = 400;
  } else {
    size = 200;
  }
  var circle = new L.circle([d.lat, d.lng], size, {color:race, opacity: opa}).addTo(map)
  
  var date =  d['Date Searched'];
  var race = d['Race'];
  var arm = d['Armed or Unarmed?'];
  var lik = d['Source Link'];
  var HK = d['Hit or Killed?'];
  circle.bindPopup('DATE: ' + date + '<br>' +
                   'RACE: ' + race + '<br>' +
                   'ARM:  ' + arm  + '<br>' +
                   'HIT/KILLED: '+ HK+'<br>'+
                   'LINK: ' + lik.link()
                    );
  array.push(d['City']);
  })

  var a = L.layerGroup(array);
  var overlay = {
    "Position": a
  }
  L.control.layers(null, overlay).addTo(map);

}



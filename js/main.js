// Using Leaflet for creating the map and adding controls for interacting with the map

//
//--- Part 1: adding base maps ---
//

//creating the map; defining the location in the center of the map (geographic coords) and the zoom level. These are properties of the leaflet map object
//the map window has been given the id 'map' in the .html file
var map = L.map('map', {
	center: [35.786679, -78.836664],
	zoom: 10
});

//adding three base maps 
var landscape = L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
	attribution: 'Tiles from Thunderforest'});

var toner = L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>' });
	//toner.addTo(map);

var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
});

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
esri.addTo(map);

// for using the base maps in the layer control, I defined a baseMaps variable
// the text on the left is the label shown in the layer control; the text right is the variable name
var baseMaps = {
	"Thunderforest landscape": landscape,
	"Toner": toner,
    "ESRI":esri,
    "Openstreet mapnik":OpenStreetMap_Mapnik
	}

//
//---- Part 2: Adding a scale bar
//

L.control.scale({imperial:false,maxwidth:50}).addTo(map)

//
//---- Part 3: Adding symbols ---- 
//


//Marker Version 1
var mark1=L.marker([47, 14], {title:'marker1', clickable:true}).addTo(map).bindPopup("popup of marker 1");

	
//Marker Version 2
var mark = L.marker([47, 12], {title:'marker2', clickable:true}).addTo(map);
mark.bindPopup("this is my popup of marker 2");


//Marker Version 3	- using a specific symbol
var myIcon = L.icon({
iconUrl: 'css/images/stadium.svg',
iconSize: [32, 32]
});

L.marker([48, 13], {icon: myIcon, title:'theHouse'}).addTo(map);






// var myIconsummit = L.icon({
// iconUrl: 'css/images/Summit.png',
// iconSize: [25, 25],
// });

var image_path='css/images/park.jpg';


var parks = L.geoJson(parks, {
	pointToLayer: function(feature, latlng) {
    return  L.marker(latlng,{icon:myIcon});
	},
	onEachFeature: function(feature, marker) {
			marker.bindPopup("<center><br><b><img width=150 height=100 src="+image_path+"><br>Name:"+feature.properties.name+"<br>Address: " +feature.properties.fulladdr+ "<br>Location: " + marker.getLatLng() + 
			"</b></center>" );
	}
});
parks.addTo(map);

var bouds = L.geoJson(bounds, {
		onEachFeature: function(feature, marker) {
			marker.bindPopup("<center><b>Name:"+feature.properties.CO_NAME+"</b></center>")
	}
});
bouds.addTo(map);

//
//---- Part 6: Adding a click event to our map
//


//when you click in the map, an alert with the latitude and longitude coordinates of the click location is shown
// e is the event object that is created on mouse click

/*
map.addEventListener('click', function(e) {
    alert(e.latlng);
});
*/


/*
//the same functionality can be realized with reference to the function onClick

//definition of the function onClick
function onClick(evt){
	alert(evt.latlng);
}

map.addEventListener('click', onClick);
*/


//
//---- Part 7: Adding interactive features to GeoJSON Polygons
//


//adding a GeoJSON polygon feature set
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
}


function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}






//
//---- Part 8: Adding combined interactive features to GeoJSON Polygons
//

/*

function highlightFeature(e) {
    var activefeature = e.target;  //access to activefeature that was hovered over through e.target
	
    activefeature.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
	
    if (!L.Browser.ie && !L.Browser.opera) {
        activefeature.bringToFront();
    }
}

//function for resetting the highlight
function resetHighlight(e) {
	fedstate.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//to call these methods we need to add listeners to our features
//the word on is a short version of addEventListener

function interactiveFunction(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
   } );
}


var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
}

fedstate = L.geoJson(federalstateSBG, {
    style: myStyle,
    onEachFeature: interactiveFunction
}).addTo(map);

*/

//
//---- Part 9: Adding a layer control for base maps and feature layers
//

//the variable features lists layers that I want to control with the layer control
var features = {
    "Recreation areas":parks,
    "Boundaries":bouds
}

//the legend uses the layer control with entries for the base maps and two of the layers we added
//in case either base maps or features are not used in the layer control, the respective element in the properties is null

var legend = L.control.layers(baseMaps,features, {position:'bottomleft', collapsed:true}).addTo(map);


// Store our API endpoint inside queryUrl
var queryUrl = "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Natural_Gas_Compressor_Stations/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson";
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(data.features);
  createFeatures(data.features);
});
function createFeatures(gasData) {
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the Gas Compressor
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.NAME + " <hr> "+ feature.properties.PIPECO +
  "</h3><hr><p>"+ feature.properties.CITY+" , "  + feature.properties.STATE +
  " , " +feature.properties.ZIP+ "</p>");
  }
  // Create a GeoJSON layer containing the features array on the GasData object
  // Run the onEachFeature function once for each piece of data in the array
  var gas = L.geoJSON(gasData, {
    onEachFeature: onEachFeature
  });
  // Sending our Gas Compressor layer to the createMap function
  createMap(gas);
}
function createMap(gas) {
  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });
var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
"access_token=pk.eyJ1IjoibWV0YWxpY2FydXMiLCJhIjoiY2thN2V1bDBxMDJ5bTJ4bGo1a29temsxNCJ9.5DGFqjLK2yLYd9Uab-EyrQ");
var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?" +
"access_token=pk.eyJ1IjoibWV0YWxpY2FydXMiLCJhIjoiY2thN2V1bDBxMDJ5bTJ4bGo1a29temsxNCJ9.5DGFqjLK2yLYd9Uab-EyrQ");
var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
"access_token=pk.eyJ1IjoibWV0YWxpY2FydXMiLCJhIjoiY2thN2V1bDBxMDJ5bTJ4bGo1a29temsxNCJ9.5DGFqjLK2yLYd9Uab-EyrQ");
var tectLine=new L.LayerGroup();

d3.json(queryUrl,function(data){
  L.geoJson(data,{
          color:"orange",
          weight:2
  }).addTo(tectLine);
});
  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    // "Street Map": streetmap,
    // "Dark Map": darkmap,
      "Satellite": satellite,
      "Grayscale": grayscale,
      "Outdoor":outdoors
  };
  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    GasCompanys: gas
  };
  // Create our map, giving it the streetmap and Gas Compressor layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, gas]
  });
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

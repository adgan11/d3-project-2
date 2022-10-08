

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
//display a map like ../images/BasicMap.png
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    worldCopyJump: true
});

//add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "streets-v11",
    accessToken: "pk.eyJ1IjoibW1jZ2xhc2giLCJhIjoiY2tlendmbmcyMTduNjJ3bWZ4M2x1eGE2eiJ9.bp4h8F5cMPHDFqm90hlYtg"
}).addTo(myMap);

//get the data with d3
d3.json(url, function(data) {
    //create a function to determine the marker size based on the magnitude
    function markerSize(magnitude) {
        return magnitude * 3;
    }

    //create a function to determine the marker color based on the magnitude
    function markerColor(magnitude) {
        if (magnitude < 1) {
            return "#ccff33"
        }
        else if (magnitude < 2) {
            return "#ffff33"
        }
        else if (magnitude < 3) {
            return "#ffcc33"
        }
        else if (magnitude < 4) {
            return "#ff9933"
        }
        else if (magnitude < 5) {
            return "#ff6633"
        }
        else {
            return "#ff3333"
        }
    }

    //create a function to determine the marker style based on the magnitude
    function markerStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: markerColor(feature.properties.mag),
            color: "#000000",
            radius: markerSize(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    //create a GeoJSON layer containing the features array on the earthquakeData object
    //run the onEachFeature function once for each piece of data in the array
    L.geoJson(data, {
        //create a circle marker for each feature
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        //set the style for each circle marker using the markerStyle function
        style: markerStyle,
        //create a popup for each marker to display the magnitude and location of the earthquake
        //after the feature is created, bind a popup with the magnitude and location of the earthquake
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(myMap);

    //create a legend
    let legend = L.control({position: "bottomright"});

    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let grades = [0, 1, 2, 3, 4, 5];
        let colors = [
            "#ccff33",
            "#ffff33",
            "#ffcc33",
            "#ff9933",
            "#ff6633",
            "#ff3333"
        ];
    }})


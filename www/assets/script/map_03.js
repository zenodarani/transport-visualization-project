// code based on the following projects
// https://codepen.io/nettaben/pen/qBEGPyO
// https://leafletjs.com/examples/choropleth/

function map03(){ 
    const map_contaier = "map03";
    let min_zoom = 4;
    let max_zoom = 8;
    let map_center = [37.8, -96];

    const data_link = "assets/data/choropleth-map.json";

    // markers
    let myIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    fetch(data_link)
        .then(response => response.json())
        .then((data) => {
            const myData = data
            load_map(myData);
        })
    
    function load_map(data){

        let map = L.map(map_contaier, {
            center: map_center,
            zoom: min_zoom
        });
        
        // get the color according to a proprierty
        function getColor(d) {
            let color = ""
            if (d > 1000){
                color = "#BD0026"
            }
            else if (d > 500 ) {
                color = "#800026"
            }
            else if (d > 200) {
                color = "#E31A1C"
            }
            else if (d > 100) {
                color = "#FC4E2A"
            }
            else if (d > 50) {
                color = "#FD8D3C"
            }
            else if (d > 20) {
                color = "#FEB24C"
            }
            else if (d > 10) {
                color = "#FED976"
            }
            else {
                color = "#FFEDA0"
            }
            return color;
        }

        // set the style of the countries
        function style(feature) {
            return {
                fillColor: getColor(feature.properties.density),
                weight: 2,
                opacity: 1,
                color: "white",
                fillOpacity: 0.7
            };
        }

        function tooltip(feature, layer) {
            let name = feature.properties.name
            let density = feature.properties.density
            let tooltip = name + "<br/>" + density

            layer.bindTooltip(tooltip)
        }

        // make the map
        function make_map(){ 
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: max_zoom,
                minZoom: min_zoom,
                tileSize: 256
            })
            .addTo(map);

            // add the choroplet layer
            let the_map = L.geoJson(data, {
                style: style,
                onEachFeature: tooltip
            }).addTo(map);
        }
        make_map();
    } 
}

window.addEventListener("load", function(){
    map03()
})

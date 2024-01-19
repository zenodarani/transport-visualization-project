// code based on the following projects
// https://codepen.io/nettaben/pen/qBEGPyO
// https://leafletjs.com/examples/choropleth/

function map04(){ 
    const map_contaier = "map04";
    let min_zoom = 3;
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

    let category = "A"
    let data;

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
        
        // get the color according to a property
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
        function myStyle(feature) {
            if (category=="A"){
                return {
                    fillColor: getColor(feature.properties.A),
                    weight: 2,
                    opacity: 1,
                    color: "white",
                    fillOpacity: 0.7,
                    className: "A"
                };
            }
            else {
                return {
                    fillColor: getColor(feature.properties.B),
                    weight: 2,
                    opacity: 1,
                    color: "white",
                    fillOpacity: 0.7,
                    className: "B"
                };
            } 
        }

        function tooltip(feature, layer) {
            let name = feature.properties.name
            // let density = feature.properties.density

            if(category == "A"){
                property = feature.properties.A
            }
            else {
                property = feature.properties.B
            }
            let tooltip = name + "<br/>" + property

            layer.bindTooltip(tooltip)
        }

        // make the map
        function make_map(category){ 
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: max_zoom,
                minZoom: min_zoom,
                tileSize: 256
            })
            .addTo(map);

            // add the choroplet layer
            let the_map = L.geoJson(data, {
                style: myStyle,
                onEachFeature: tooltip
            }).addTo(map);
        }
        make_map();

        // make the sidebar
        function mySidebar(category){
            const sidebar = document.getElementById("sidebar_map04")
            sidebar.innerHTML = "";
            
            data.features.forEach(function(entry,id){
                let name = entry.properties.name 
                let lat = entry.geometry.coordinates[0];
                let lon = entry.geometry.coordinates[1];

                if(category == "A"){
                    property = entry.properties.A
                }
                else {
                    property = entry.properties.B
                }

                // let item = document.createElement("li");

                // item.innerHTML =  (id+1) + ". " + name + " (" + property  + ")";
    
                // sidebar.appendChild(item);

                let list_item = document.createElement("li");
                let image = document.createElement("img");

                image.src = "assets/dataviz/sidebar_01/" + category + "_" + id + ".png"

                list_item.innerHTML =  name + "</br>";
                
                list_item.appendChild(image);
                sidebar.appendChild(list_item);
            })
        }
        mySidebar(category)

        // filter items by category
        map_select = document.getElementById("map04_select")

        map_select.addEventListener ("change", function () {
            category = this.value;

            make_map(category);
            mySidebar(category);
        })
    } 
}

window.addEventListener("load", function(){
    map04()
})

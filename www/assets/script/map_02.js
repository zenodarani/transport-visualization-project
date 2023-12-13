function map02(){
    const map_contaier = "map02";
    let min_zoom = 10;
    let max_zoom = 15;
    let map_center = [8.976,45.593];

    const data_link = "assets/data/map-data.json";

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
    
        function make_map(){ 
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: max_zoom,
                minZoom: min_zoom,
                tileSize: 256
            })
            .addTo(map);
        }

        function set_map(){
            map.fitBounds(bounds, {
                "padding": [20, 20],
                "animate": true,
                "duration": 2
            });			
        }

        function mySidebar(category){
            const sidebar = document.getElementById("sidebar_map02")
            sidebar.innerHTML = "";

            let features = data.features;

            let filter = features.filter(function(a,b){
                return a.properties.category == category
            })
            
            filter.forEach(function(entry){
                let name = entry.properties.name 
                let lat = entry.geometry.coordinates[0];
                let lon = entry.geometry.coordinates[1];

                let item = document.createElement("li");

                item.innerHTML =  name + "</br>" + lat + " - "+lon;

                sidebar.appendChild(item);
            })
        }

        // append markers
        function append_markers(category){

            let features = data.features;
            bounds = [];

            let filter = features.filter(function(a,b){
                return a.properties.category == category
            })

            filter.forEach(function(entry){

                let name = entry.properties.name 
                let tooltip = "<span class='tooltip'>" + name + "</span>";

                let lat = entry.geometry.coordinates[0];
                let lon = entry.geometry.coordinates[1];

                markers = L.marker([lon,lat], {
                    icon: myIcon
                })
                .bindPopup(tooltip, {
                    "maxWidth": 200,
                    "className": "popup building " + entry.id + " " + entry.properties.category
                })
                .addTo(map);

                bounds.push([lon,lat])
            })
        }
        make_map();
        append_markers(category);
        set_map();
        mySidebar(category);


        // filter items by category
        map_select = document.getElementById("map02_select")

        map_select.addEventListener ("change", function () {
            category = this.value;

            // remove markers
            map.eachLayer(function(layer){
                map.removeLayer(layer);
            })

            make_map();
            append_markers(category);	
            set_map();
            mySidebar(category);
        })
    } 
}


window.addEventListener("load", function(){
    map02()
})

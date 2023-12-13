// code based on the following projects
// https://codepen.io/nettaben/pen/qBEGPyO
// https://leafletjs.com/examples/choropleth/

function map05(){ 
    const map_contaier = "map05";
    let min_zoom = 2;
    let max_zoom = 8;
    let map_center = [0, 0];

    const data_link = "assets/data/food-map.json";

    // markers
    let myIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    let prev_category = "1990"
    let new_category = "1990"
    let data;
    let the_map;

    fetch(data_link)
        .then(response => response.json())
        .then((data) => {
            const myData = data
            load_map(myData);
            // console.log(data)
        })
    
    function load_map(data){

        let map = L.map(map_contaier, {
            center: map_center,
            zoom: min_zoom
        });
        
        // get the color according to a property
        function getColor(d) {
            let b;
            let color = "white"

            let min = 0.02
            let max = 23

            if (d != undefined){
                b = parseFloat(d)
                hue =  80 - (b*2.5)

                color = 'hsl(' + hue +',100%,50%)' 
                // console.log(color)
            }

            return color;
        }

        // set the style of the countries
        function myStyle(feature) {
            let color;

            switch (new_category) {
                case "1990": color = feature.properties.y1990 
                    break;
                case "1991": color = feature.properties.y1991 
                    break;
                case "1992": color = feature.properties.y1992 
                    break;
                case "1993": color = feature.properties.y1993 
                    break;
                case "1994": color = feature.properties.y1994 
                    break;
                case "1995": color = feature.properties.y1995 
                    break;
                case "1996": color = feature.properties.y1996 
                    break;
                case "1997": color = feature.properties.y1997 
                    break;
                case "1998": color = feature.properties.y1998 
                    break;
                case "1999": color = feature.properties.y1999 
                    break;
                case "2000": color = feature.properties.y2000 
                    break;
                case "2001": color = feature.properties.y2001 
                    break;
                case "2002": color = feature.properties.y2002 
                    break;
                case "2003": color = feature.properties.y2003 
                    break;
                case "2004": color = feature.properties.y2004 
                    break;
                case "2005": color = feature.properties.y2005 
                    break;
                case "2006": color = feature.properties.y2006 
                    break;
                case "2007": color = feature.properties.y2007 
                    break;
                case "2008": color = feature.properties.y2008 
                    break;
                case "2008": color = feature.properties.y2008 
                    break;
                case "2009": color = feature.properties.y2009 
                    break;
                case "2010": color = feature.properties.y2010 
                    break;
                case "2011": color = feature.properties.y2011 
                    break;
                case "2012": color = feature.properties.y2012 
                    break;
                case "2013": color = feature.properties.y2013 
                    break;
                case "2014": color = feature.properties.y2014 
                    break;
                case "2015": color = feature.properties.y2015 
                    break;
                case "2016": color = feature.properties.y2016 
                    break;
                case "2017": color = feature.properties.y2017 
                    break;
                case "2018": color = feature.properties.y2018 
                    break;
                case "2019": color = feature.properties.y2019 
                    break;
                case "2020": color = feature.properties.y2020 
                    break;
                case "2021": color = feature.properties.y2021 
                    break;
            }

            // console.log(color,prev_category,new_category)

            return {
                fillColor: getColor(color),
                weight: 2,
                opacity: 1,
                color: "white",
                fillOpacity: 0.7,
                className: new_category
            };
        }

        function tooltip(feature, layer) {
            let name = feature.properties.name
            // let density = feature.properties.density

            switch (new_category) {
                case "1990": property = feature.properties.y1990 
                    break;
                case "1991": property = feature.properties.y1991 
                    break;
                case "1992": property = feature.properties.y1992 
                    break;
                case "1993": property = feature.properties.y1993 
                    break;
                case "1994": property = feature.properties.y1994 
                    break;
                case "1995": property = feature.properties.y1995 
                    break;
                case "1996": property = feature.properties.y1996 
                    break;
                case "1997": property = feature.properties.y1997 
                    break;
                case "1998": property = feature.properties.y1998 
                    break;
                case "1999": property = feature.properties.y1999 
                    break;
                case "2000": property = feature.properties.y2000 
                    break;
                case "2001": property = feature.properties.y2001 
                    break;
                case "2002": property = feature.properties.y2002 
                    break;
                case "2003": property = feature.properties.y2003 
                    break;
                case "2004": property = feature.properties.y2004 
                    break;
                case "2005": property = feature.properties.y2005 
                    break;
                case "2006": property = feature.properties.y2006 
                    break;
                case "2007": property = feature.properties.y2007 
                    break;
                case "2008": property = feature.properties.y2008 
                    break;
                case "2008": property = feature.properties.y2008 
                    break;
                case "2009": property = feature.properties.y2009 
                    break;
                case "2010": property = feature.properties.y2010 
                    break;
                case "2011": property = feature.properties.y2011 
                    break;
                case "2012": property = feature.properties.y2012 
                    break;
                case "2013": property = feature.properties.y2013 
                    break;
                case "2014": property = feature.properties.y2014 
                    break;
                case "2015": property = feature.properties.y2015 
                    break;
                case "2016": property = feature.properties.y2016 
                    break;
                case "2017": property = feature.properties.y2017 
                    break;
                case "2018": property = feature.properties.y2018 
                    break;
                case "2019": property = feature.properties.y2019 
                    break;
                case "2020": property = feature.properties.y2020 
                    break;
                case "2021": property = feature.properties.y2021 
                    break;
            }
            let tooltip = name + "<br/>" + property
            // console.log(new_category)

            layer.bindTooltip(tooltip)
        }

        // make the map
        function make_map(prev_category){ 
            base_map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: max_zoom,
                minZoom: min_zoom,
                tileSize: 256
            })
            .addTo(map);
            
            the_map = L.geoJson(data, {
                style: myStyle,
                onEachFeature: tooltip
            }).addTo(map);
        }
        make_map();

        function update_map(prev_category,new_category) {

            // console.log(prev_category,new_category)
            if (prev_category != new_category){
                map.removeLayer(the_map);

                the_map = L.geoJson(data, {
                    style: myStyle,
                    onEachFeature: tooltip
                }).addTo(map);
            }
        }

        // make the sidebar
        function mySidebar(new_category){
            const sidebar = document.getElementById("sidebar_map05")
            sidebar.innerHTML = "";
            
            data.forEach(function(entry,id){
                let name = entry.properties.name; 
                let lat = entry.geometry.coordinates[0];
                let lon = entry.geometry.coordinates[1];

                switch (new_category) {
                    case "1990": property = entry.properties.y1990;
                    case "1991": property = entry.properties.y1991;
                    case "1992": property = entry.properties.y1992;
                    case "1993": property = entry.properties.y1993;
                    case "1994": property = entry.properties.y1994;
                    case "1995": property = entry.properties.y1995;
                    case "1996": property = entry.properties.y1996;
                    case "1997": property = entry.properties.y1997;
                    case "1998": property = entry.properties.y1998;
                    case "1999": property = entry.properties.y1999;
                    case "2000": property = entry.properties.y2000;
                    case "2001": property = entry.properties.y2001;
                    case "2002": property = entry.properties.y2002;
                    case "2003": property = entry.properties.y2003;
                    case "2004": property = entry.properties.y2004;
                    case "2005": property = entry.properties.y2005;
                    case "2006": property = entry.properties.y2006;
                    case "2007": property = entry.properties.y2007;
                    case "2008": property = entry.properties.y2008;
                    case "2008": property = entry.properties.y2008;
                    case "2009": property = entry.properties.y2009;
                    case "2010": property = entry.properties.y2010;
                    case "2011": property = entry.properties.y2011;
                    case "2012": property = entry.properties.y2012;
                    case "2013": property = entry.properties.y2013;
                    case "2014": property = entry.properties.y2014;
                    case "2015": property = entry.properties.y2015;
                    case "2016": property = entry.properties.y2016;
                    case "2017": property = entry.properties.y2017;
                    case "2018": property = entry.properties.y2018;
                    case "2019": property = entry.properties.y2019;
                    case "2020": property = entry.properties.y2020;
                    case "2021": property = entry.properties.y2021;
                }
                
                // console.log(prev_category, name, property)

                let list_item = document.createElement("li");
                let image = document.createElement("img");

                image.src = "assets/dataviz/sidebar_02/" + new_category + "_" + name + ".png"

                list_item.innerHTML =  name + "</br>";
                
                list_item.appendChild(image);
                sidebar.appendChild(list_item);
            })
        }
        mySidebar(prev_category)

        // filter items by category
        map_select = document.getElementById("map05_slider")
        map05_slider_value = document.getElementById("map05_slider_value")

        map_select.addEventListener ("change", function () {
            new_category = this.value
            map05_slider_value.innerHTML = this.value

            // console.log(prev_category,new_category)

            update_map(prev_category,new_category);
            mySidebar(new_category);
        })
    } 
}

window.addEventListener("load", function(){
    map05()
})

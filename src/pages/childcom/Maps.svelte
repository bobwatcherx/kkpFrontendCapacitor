<script >
    import iconurl from '@/assets/img/people.png'
import {LeafletMap,Marker,
    Icon,Polyline,Popup, TileLayer} from 'svelte-leafletjs';
import 'leaflet/dist/leaflet.css';
  export let cord;
  export let curentlat;
  export let curentlong;
var temp = new Array();
const arr = cord.split(",");
let latitudemain = arr[0]
let longitudemain= arr[1]
console.log("mainnay" + latitudemain + " " + longitudemain)
     const mapOptions = {
        center: [latitudemain, longitudemain],
        zoom: 11,
    };
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };

    let leafletMap;
     const polyline1 = [[curentlat, curentlong],
     [latitudemain,longitudemain]]
      const iconOptions = {
        iconUrl: iconurl,
        iconSize: [61, 61],
        iconAnchor: [20, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16. -28],
    };
</script>
  <LeafletMap
 bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        <Marker latLng={[latitudemain, longitudemain]}/>
        <Marker latLng={[curentlat, curentlong]}>
  <Icon options={iconOptions}/>
        </Marker>
       <Polyline latLngs={polyline1}>
        </Polyline>
    </LeafletMap>

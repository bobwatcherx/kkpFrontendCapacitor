<script >
  import store from '../js/store.js'
 import {
    Page,
    Button,
    Icon,
    Row,
    Col,
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    BlockTitle,
    Link,
    Popup,
    NavRight,
Navbar
  } from 'framework7-svelte'
  let citytext;
  let localresult;
  import Listfood from './childcom/Listfood.svelte'
import { Geolocation } from '@capacitor/geolocation';
 import axios from 'axios'
 import {onMount} from 'svelte'
 // state
 let popupOpened =  false;
let latitudetext = "";
  let longitudetext = "";
  //functions
onMount(()=>{
  getgeo()
})
 async function getgeo(){
    if(navigator.geolocation){
      navigator.geolocation.watchPosition(showPos)
    }

  }
  function showPos(coordinates){
    console.log("datany" + coordinates.coords.latitude)
  latitudetext = coordinates.coords.latitude;
  longitudetext = coordinates.coords.longitude;
  if(latitudetext !== "" && longitudetext !=="" ){
    axios.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.0486f5d01fff6030f298b85565ca8046&lat=${latitudetext}&lon=${longitudetext}&format=json`)
    .then((res)=>{
      console.log(res.data.local_result)
      console.log(res.data)
      citytext = res.data.address.suburb
      localresult = res.data.data;

    })
    console.log(latitudetext + " " + longitudetext)
  }
  }
</script>
<Page >
 <div style="background-color: #ff6b22;
 border-bottom-left-radius: 90px;
 border-bottom-right-radius: 90px;">
    <Row style="padding:20px">
    <Col width="80">
      <Icon material="menu" style="color:white"size="30"></Icon>
    </Col>
    <Col width="20">
     <Link href="/transaksi">
      <Icon material="account_circle" 
      style="color:white" size="30"></Icon>
   </Link>
    </Col>
  </Row>
  <Row style="padding:20px">
    <h3 style="font-size: 20px;color: white">Temukan Tempat Favorite <br/> Di sekitarmu
    </h3>
   
  </Row>
  </div>

  <Listfood latitudetext={latitudetext}
  longitudetext={longitudetext}/>

  </Page>

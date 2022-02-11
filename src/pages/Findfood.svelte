<script >
import Maps from './childcom/Maps.svelte'
import axios from 'axios'
import {supabase} from '../Supabase.js';
	import * as turf from '@turf/turf'
	import {
		Page,
		Button,
		Icon,Row,Col,Card,
		Popup,
		Navbar,
NavRight,
Link,
List,
ListInput,
Block
	}from 'framework7-svelte'
	  export let f7router;
      export let f7route;
      export let maps;
      export let nama_makanan;
      export let cordinate;
      var newtemp = new Array();
const arr = cordinate.split(",");
let latmain = arr[0]
let longmain= arr[1]
      export let gambar;
      export let status;
      export let alamat;
      export let harga;
export let latitudetext;
export let longitudetext;
let ondisabled = false;
let popupOpened = false;
let nama_pengirim = "";
let email = "";
let alamat_pengirim = "";
let phone = "";
let token_order_id = "";
let token_id = "";
	//jarak
let from = turf.point([latitudetext,longitudetext])
let to = turf.point([latmain,longmain])
var options = {units:'kilometers'};
var jarak = turf.distance(from,to,options)
var bulatjarak = jarak.toString().substring(0,4)
var ongkir = parseInt(bulatjarak)* 3000
	let jumlah_pesan = 1;
let grandtotal = parseInt(harga) + ongkir * jumlah_pesan
console.log(grandtotal)
console.log(ongkir);
console.log("jarak = " + bulatjarak)
	function increment(){
		jumlah_pesan++
	}

async function showbliling(){
	ondisabled = true
	await axios.post("https://twilight-dream-y1kzn.cloud.serverless.com/api",{
		totalharga:grandtotal,
		nama_pengirim:nama_makanan,
		alamat:alamat_pengirim,
		email:email,
		phone:phone
	})
	.then((res)=>{
		if(res.data.id){
			token_order_id = res.data.id
		}
		if(res.data.token){
			token_id = res.data.token
		 getsupa()
			popupOpened = false
		 window.snap.pay(res.data.token);	
		}
		else{
			ondisabled = false

		}
		console.log(res.data)
	})
	.catch(err=>{
		alert(err)
			ondisabled = false
		
	})
}
async function getsupa(){
	const { data, error } = await supabase
  .from('tblpesanan')
  .insert([
  {
  	nama_pengirim:nama_pengirim,
  	alamat:alamat,
  	lokasi_pengirim:alamat_pengirim,
  	pesanan_obj:{
  		nama_makanan:nama_makanan,
  		jumlah_pesan:jumlah_pesan,
  		harga:harga
  	},
  	email:email,
  	grand_total:grandtotal,
  	pay_status:false,
  	phone:phone,
  	order_id:token_order_id,
  	token_id:token_id,
  	tgl_bayar: new Date().toISOString().slice(0,10)
  }
  ])
  const { xdata, xerror } = await supabase
  .from('tbldelivery')
  .insert([
  {
  	order_id:token_order_id,
  	nama_pembeli:nama_pengirim,
  }
  ])
}
</script>
<Page>
	<Navbar title="Details" 
	style="background-color: orange;
	"backLink="Back"></Navbar>
	<div style="height:60%;position: relative;z-index: -30;">
	<Maps cord={cordinate} curentlat={latitudetext}
	curentlong={longitudetext}/>
	</div>
	<div style="position: absolute;
	background-color: white;
	border-radius: 100;
	color: orange;
	z-index: 30;
	right: 5%;
	top:43%;padding: 10px;border-radius:30px">
	<h1>{bulatjarak} KM</h1>
	</div>
	<div style="background-color: orange;
	position: absolute;z-index: 10;
	border-top-left-radius: 50px;
	border-top-right-radius: 50px;
	top:55%;padding: 5px;
	box-sizing: border-box;">
		<h1>{nama_makanan}</h1>
	</div> 

	<div style="position: absolute;
	top:70%;height:1000px">
		<div >
		<br/>
		<br/>
		<Row>
			<Col width="70">
				<Icon material="room" size="30px"></Icon>
				{alamat}
				<br/>
				{status}
			</Col>
		<Col width="30">
		<img src={gambar} style="border-radius: 30px;"/>
		</Col>
		</Row>
			<Card style="padding: 10px;width: 100%;">
			<h3>Harga : Rp. {harga}/porsi</h3>
			<h3
			style="color:red">Onkir : Rp. {ongkir}</h3>
			<h3>Jumlah : {jumlah_pesan}Pcs</h3>
			<h2
		style="color:green">Grand Total : Rp. {(parseInt(harga) + ongkir) * jumlah_pesan} </h2>
			
		<h3>Jumlah Pesanan</h3>
		<br/>
		<Row>
			<Col width="40">
			<Button fill 
			on:click={increment}>+</Button>
			</Col>

			<Col width="20">
			<h3 >{jumlah_pesan}</h3>
			</Col>

			<Col width="40">
			<Button fill 
			on:click={()=>{
				jumlah_pesan--
				if(jumlah_pesan == 0){
					jumlah_pesan = 1
				}
			}}>-</Button>
			</Col>
		</Row>
		</Card>
		
	</div>

	</div>

<div style="position:fixed;
width: 100%;bottom:0">
	<Button
	on:click={()=>popupOpened = true}
			style="background-color: orange;
			color:white;height: 60px;"
			>PESAN SEKARANG</Button>
</div>
 <Popup class="demo-popup" opened={popupOpened} onPopupClosed={() => popupOpened = false}>
   <Page>
   	<Navbar title="Pembayaran"
   	style="background-color: red;">
        <NavRight>
          <Link popupClose>Close</Link>
        </NavRight>
      </Navbar>
      <Block>
      <h3
      style="font-size: 30px;"
      >Masukkan Informasi <br/>Pengiriman</h3>
      <br/>
      <List inlineLabels noHairlinesMd >
  <ListInput
    label="Name"
    type="text"
    placeholder="Your name"
    clearButton
    bind:value={nama_pengirim}
  >
    <i class="icon demo-list-icon" slot="media"/>
  </ListInput>
  <ListInput
    label="Alamat"
    type="textarea"
    placeholder="Address"
    clearButton
    bind:value={alamat_pengirim}

  >
    <i class="icon demo-list-icon" slot="media"/>
  </ListInput>
  <ListInput
    label="Email"
    type="email"
    placeholder="E-mail"
    clearButton
    bind:value={email}

  >
    <i class="icon demo-list-icon" slot="media"/>
  </ListInput>
  <ListInput
    label="Phone"
    type="phone"
    placeholder="Phone"
    clearButton
    bind:value={phone}

  >
    <i class="icon demo-list-icon" slot="media"/>
  </ListInput>
</List>
<Button fill 
disabled={ondisabled} on:click={showbliling}>Bayar Sekarang</Button>
  </Block>
   	</Page>
 </Popup>
</Page>
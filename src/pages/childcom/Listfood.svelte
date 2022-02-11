<script >
	 import {onMount} from 'svelte'
  import axios from 'axios'
 import {
   Row,
    Col,
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    BlockTitle,
    Button,
    Link,
    Icon
  } from 'framework7-svelte'
	  let postfood = [];
      export let f7router;
      export let latitudetext;
      export let longitudetext;
  onMount(()=>{
 getpost()
  })
  function getpost(){
       axios.get("https://sheetdb.io/api/v1/851iqurqoytc7")
    .then((res)=>{
      postfood = res.data
    })
  }
  let online = window.navigator.onLine;
  console.log("online" + online)
</script>
<div>
	<h3 style="margin-left: 20px;
  font-size: 30px;">All Foods</h3>
  {#if !postfood }
 <h1> loading...</h1>
  {:else}
   {#each postfood as p}
    <Card style="padding:10px;border-top:10px solid orange;">
      <CardHeader
      style="color:#ff232e;font-weight: 700">{p.nama_makanan}</CardHeader>
       <CardContent>
         <Row>
          <Col width="60">
            <img src={p.gambar} />
          </Col>
          <Col width="40">
            <Icon material="room"></Icon>{p.alamat}
            <br/>
            <Icon material="favorite"></Icon>{p.ratting} suka
            <br/>
            <Icon material="description"></Icon>{p.bawa_pulang}
          </Col>
        </Row>
        <Row>
          <h3>Harga : Rp. {p.harga} /porsi</h3>
        </Row>
       </CardContent>
       <CardFooter>
       <Link href="/findfood/"
       routeProps={
        { 
          maps: p.maps_google,
          cordinate:p.cordinate,
          nama_makanan:p.nama_makanan,
          type:p.type,
          ulasan:p.ulasan,
          alamat:p.alamat,
          gambar:p.gambar,
          ratting:p.ratting,
          status:p.status,
          harga:p.harga,
          latitudetext:latitudetext,
          longitudetext:longitudetext
         }
      } >Details</Link>
       </CardFooter>

    </Card>
  {/each}
  {/if}
</div>
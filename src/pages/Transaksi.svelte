<script >
	import{
		Page,
		Icon,
		Button,
		Row,
		Col
	}from 'framework7-svelte'
	let transaksi = [];
import {onMount} from 'svelte'
	export let f7router;
	import {supabase} from '../Supabase.js'
	async function gettrans(){
		const { data, error } = await supabase
  .from('tblpesanan')
  .select()
  .order("id",{ascending:false})
  transaksi = data
  if(error){
  	console.log(error)
  }
  console.log(data)
	}

onMount(()=>{
	gettrans()
})
async function deletedata(id){
	const { data, error } = await supabase
  .from('tblpesanan')
  .delete()
  .match({ id: id })

gettrans()
}
  
</script>
<Page >
	<div style="margin:10px">
		<Row>
		<Col width="20">
	<Button onClick={()=>f7router.back()}>
	<Icon material="chevron_left" size="30px"></Icon>
	</Button>
		</Col> 
	</Row>
	<Row >
		<Col width="80">
			<h2>Transaksi Pembayaran</h2>
		</Col>
	</Row>
	<h3>Terbaru</h3>
	<Row style="margin-left:10px;">
		<Col>
			{#each transaksi as tr}

				<div style="background-color: #eb9234;
				padding:5px;margin-bottom: 20px;">
				<div style="background-color: green;
				color: white;">
					<h3> Total : {tr.pesanan_obj.harga}</h3>
				</div>
				<span style="font-weight: 400;
				color:black">
					{tr.pesanan_obj.nama_makanan}
				</span>
				<br/>
				<span
				style="font-size: 12px;">
					jumlah pesanan {tr.pesanan_obj.jumlah_pesan}
				</span>
					<Row>
						<Col width="30">
						<h5>{tr.nama_pengirim}</h5>
					<span style="font-size:13px">
						{tr.email}
					</span>
					</Col>
					<Col width="40">
						<h3>{tr.pay_status == true ? "terbayar": "Belum terbayar"}</h3>
					<span style="font-size:13px">
						Rp. {tr.grand_total}
					</span>
					{#if tr.pay_status == false}
						<Button
						style="background-color: red;
						color: white;"
						on:click={deletedata(tr.id)}>Hapus </Button>
					{:else}
						<Icon material="done" size="30px" style="color: green;"></Icon>
					{/if}

				</Col>
					</Row>
				</div>
			{/each}

		</Col>
	</Row>
	</div>
	</Page>
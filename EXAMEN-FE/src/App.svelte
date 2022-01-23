<script>
	import { onMount } from 'svelte';
	import Movie from './components/movie.svelte';
	let age =20;
	let movies = [];
	let pagination = {};
	const take=10;
	var skip=0;
	var cp=1;
	var sp=1;
	var ep=10;	

  //getting data from expressjs project
	async function getMovies(skip){
		fetch("http://localhost:8000/movies?take=10&skip="+skip)
		.then((res) => res.json())
		.then( function(res){
			movies=res.data;
			pagination=res.pagination;
			console.log(movies.length);
		})
		
	}
	//function to get the id and calling the paginate function
	function page(event){
		var k =event.target.id;
		paginate(k);
	}
	//this function call the function getMovies when the component become mounted
	onMount(async function() {
		getMovies(1);
		paginate(1);
	});
	//function to get the previous page
	function precedente(){
		console.log(cp);
		if(cp-1<1)paginate(1)
		else paginate(cp-1)
	}
	//function to get the next page
	function suivante(){
		if(cp+1>100)paginate(1)
		else paginate(cp+1)
	}
  //the paginate function
	function paginate(skip){
		var l=(skip-1)*take;
		console.log(l)
		getMovies(l);
		cp = skip;
		sp= (cp-5)<1 ? 1 : cp-5;
		ep=(sp+10)>100 ? 100 : sp+10;
		update(sp,ep);
	}
	//function  to update the page bar
	function update(sp,ep){
		const el=document.getElementById("cont");
		el.innerHTML="<button>Previous</button>";
		for(var i=sp;i<=ep;i++){
el.innerHTML += "<button id="+i+" > "+i+"</button>";
		}
		el.innerHTML+="<button>Next</button>";
		for(var i=1;i<=11;i++){
			if(cp==i){el.children[i].className="btn btn-success"}
         el.children[i].addEventListener("click",page);
		}
		el.children[0].addEventListener("click", precedente);
		el.children[12].addEventListener("click",suivante);
	
	}

</script>

<main>
	
	<div class="container-fluid  ml-5 p-5">

<h2 class="header mb-5 fst-italic">La liste des films: </h2>
		<table class="table ">
			<thead class="bg-secondary">
			  <tr>
				<th scope="col">title</th>
				<th scope="col">genres</th>
				<th scope="col">year</th>
			  </tr>
			</thead>
			<tbody class="bg-light">
				{#each movies as movie}
			  <tr>
				<td>{movie.title}</td>
				<td><div class=" d-flex " id="c">
					{#each movie.genres as genre}
					<div value="{genre}" class="">{genre}</div>
					
					{/each}
				
				</div></td>
				<td>{movie.year}</td>
			  </tr>
			  {/each}
			</tbody>
			
		  </table>
	</div>
	<footer>
		<ul id="cont"></ul>
		</footer>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	#c , div{
margin : 5px;
	}
</style>
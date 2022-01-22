<script>
	import { onMount } from 'svelte';
	export let name;
	import Movie from './components/movie.svelte';
	let age =20;
	let movies = [];
	let pagination = {};
	async function getMovies(){
		fetch("http://localhost:8000/movies")
		.then((res) => res.json())
		.then( function(res){
			movies=res.data;
			pagination=res.pagination;
			console.log(movies[0].genres)
		})	
		
	}
	
	onMount(async function() {
		getMovies();
	});
	
	
</script>

<main>
	
	<div class="container-fluid w-75 ml-5 p-5">
<h3 class="header mt-3 mb-3 ">La liste des films: </h3>
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
				<td><select name="" id="">
					{#each movie.genres as genre}
					<option value="{genre}">{genre}</option>
					{/each}
					</select></td>
				<td>{movie.year}</td>
			  </tr>
			  {/each}
			</tbody>
			
		  </table>
	</div>
	
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
</style>
<script>
 /** @type {import('./$types').PageData} */
 export let data;

 import Flippable from '$lib/Flippable.svelte';
 let flip = false;
/* data.data.push({
*    "Timestamp": "9/6/2023 18:35:21",
*    "Official Given (\"First\") Name ": "Matt",
*    "Family (\"Last\") Name ": "Price",
*    "Preferred Name (If Different)": "",
*    "Please upload a picture of yourself": "https://drive.google.com/open?id=18D4GROL4Lh3TTWg1SrqbzGVG1G2rf39n",
*    "Major": "History and Philosophy of Science",
*    "Why are you taking this class?": "I have to!!!",
*    "Superhero Name": "Titaniumbones",
*    "Origin Story": "It's secret, you'll have to wait.",
*    "Superpowers": "Falling off cliffs.",
*    "Please upload a picture of yourself in costume (if you have one)": "https://drive.google.com/open?id=1IwuBc03aKUapPWcI9eoRd1kE1fBuwCYx"
*  }) */
</script>


<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<main class="cardcontainer">
{#each data.data as person}
  <Flippable {flip} {person}>
  </Flippable>
{/each}
</main>

<style>
main.cardcontainer {
    padding: 0 2rem 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    grid-gap: 2rem;
}


	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>

<script>
 /** @type {import('./$types').PageData} */
 let { data } = $props();

 import Card from '$lib/Card.svelte';
 import courseConfig from '$lib/config/course.json';
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
  <title>{courseConfig.courseCode} - {courseConfig.courseName}</title>
  <meta name="description" content="{courseConfig.heroesTitle} roster for {courseConfig.courseCode} {courseConfig.term}" />
</svelte:head>

<main class="cardcontainer">
{#each data.data as person}
  <Card {person} />
{/each}
</main>

<style>
main.cardcontainer {
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 2rem;
    justify-items: center;
}

@media (max-width: 640px) {
    main.cardcontainer {
        grid-template-columns: 1fr;
        padding: 1rem;
    }
}
</style>

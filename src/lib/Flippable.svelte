<script>
    export let flip = false;
    export let height = "30rem";
 export let width = "18rem";
 export let person = {
   "Timestamp": "9/6/2023 18:35:21",
   "Official Given (\"First\") Name ": "Matt",
   "Family (\"Last\") Name ": "Price",
   "Preferred Name (If Different)": "",
   "Please upload a picture of yourself": "https://drive.google.com/open?id=18D4GROL4Lh3TTWg1SrqbzGVG1G2rf39n",
   "Why are you taking this class?": "I have to!!!",
   "Superhero Name": "Titaniumbones",
   "Origin Story": "It's secret, you'll have to wait.",
   "Superpowers": "Falling off cliffs.",
   "Please upload a picture of yourself in costume (if you have one)": "https://drive.google.com/open?id=1IwuBc03aKUapPWcI9eoRd1kE1fBuwCYx"
 }
</script>

<div class="flip-card" style="width: {width}; height: {height};"  on:click={() => (flip = !flip)}>
  <div class:flip class="flip-card-inner">
    <div class="flip-card-front">
      <section>
      {#if person["Please upload a picture of yourself"]}
        <img src="https://drive.google.com/uc?id={person["Please upload a picture of yourself"].match(/\?id=(.*)/)[1]}"/>
      {:else}
        <div class="placeholder"></div>
      {/if}
      </section>
      <h2 class="name">{person["Preferred Name (If Different)"] || person["Official Given (\"First\") Name "]} {person["Family (\"Last\") Name "]}</h2>
      <div class="story">
           <h3 class="powers">{person["Major"]}</h3>
           <p>{person["Why are you taking this class?"]}</p>
      </div>
    </div>
    
    <div class="flip-card-back">
      <section>
        {#if person["Please upload a picture of yourself in costume (if you have one)"]}
        <img src="https://drive.google.com/uc?id={person["Please upload a picture of yourself in costume (if you have one)"].match(/\?id=(.*)/)[1]}"/>
      {:else}
        <div class="placeholder"></div>
      {/if}
      </section>
      
      <h2 class="name">{person["Superhero Name"]}</h2>
      <div class="story">
        <h3 class="powers">{person["Superpowers"]}</h3>
        <p>{person["Origin Story"]}</p></div>
      
    </div>
  </div>
</div>

<style>
    .flip-card {
        background-color: transparent;
        perspective: 1000px; /* Remove this if you don't want the 3D effect */
        border: 2px black solid;
    }

    /* This container is needed to position the front and back side */
    .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }

    .flip {
        transform: rotateY(-180deg);
    }

 img {
     margin-top: 1rem;
     object-fit: cover;
 }
    /* Position the front and back side */
    .flip-card-front, .flip-card-back {
        /* background-color: black; */
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
        /* fix for firefox display bug */
        transform: rotateX(0deg) ;
    }

    /* Default is facing away */
    .flip-card-back {
        transform: rotateY(180deg);
    }




.flip-card-front, .flip-card-back {
    border: 1px solid var(--color-darkGrey) ;
    background-color: var(--color-lightGrey);
    display: grid;
    grid-template-rows:  50% 10% 40%;
    grid-gap: 0rem;
    align-items: stretch;
    justify-items: stretch;
    padding: 0;
}

 .flip-card-inner img {
     max-height: 100%;
     max-width: 100%;
 }
.card-body {
    padding: 0 2rem;
 }
 h2.name {
     font-weight: 800;
     font-size: 1.2rem;
 }

section.card header, section.card footer {
    font-size: 2.2rem;
    text-align: center;
    padding-top: 0.3rem;
    /* background-color: var(--color-success) */
    background-color: var(--color-primary)
}

/* make links visible again! */

section.card header a, section.card footer a {
    color: black;
}

section.card img.profile-image {
    /* height: 100%; */
    /* width: 100%; */
    /* object-fit: contain; */
    /* object-position: 50% 0; */
    
}
 div.placeholder {
     background-color: green;
 }
</style>

<script>
  let { person } = $props();
  let flipped = $state(false);
  
  function getImageId(url) {
    if (!url) return null;
    const match = url.match(/\?id=(.*)/);
    return match ? match[1] : null;
  }
  
  const frontImageId = getImageId(person["Please upload a picture of yourself"]);
  const backImageId = getImageId(person["Please upload a picture of yourself in costume (if you have one)"]);
  const displayName = person["Preferred Name (If Different)"] || person["Official Given (\"First\") Name "];
  
  function handleFlip() {
    console.log('Card clicked, flipping from', flipped, 'to', !flipped);
    flipped = !flipped;
  }
</script>

<button 
  class="card" 
  class:flipped
  onclick={handleFlip}
  aria-label="Flip card for {displayName}"
>
  <div class="card-inner">
    <div class="card-face card-front">
      <div class="card-image">
        {#if frontImageId}
          <img 
            src="https://drive.google.com/uc?id={frontImageId}" 
            alt="{displayName} {person['Family (\"Last\") Name ']}"
            loading="lazy"
          />
        {:else}
          <div class="placeholder" aria-label="No image available"></div>
        {/if}
      </div>
      
      <div class="card-content">
        <h2 class="card-name">
          {displayName} {person["Family (\"Last\") Name "]}
        </h2>
        <h3 class="card-subtitle">{person["Major"] || ""}</h3>
        <p class="card-description">{person["Why are you taking this class?"]}</p>
      </div>
    </div>
    
    <div class="card-face card-back">
      <div class="card-image">
        {#if backImageId}
          <img 
            src="https://drive.google.com/uc?id={backImageId}" 
            alt="{person['Superhero Name']} costume"
            loading="lazy"
          />
        {:else}
          <div class="placeholder superhero" aria-label="No costume image available"></div>
        {/if}
      </div>
      
      <div class="card-content">
        <h2 class="card-name">{person["Superhero Name"]}</h2>
        <h3 class="card-subtitle">{person["Superpowers"]}</h3>
        <p class="card-description">{person["Origin Story"]}</p>
      </div>
    </div>
  </div>
</button>

<style>
  .card {
    all: unset;
    cursor: pointer;
    display: block;
    width: 18rem;
    height: 30rem;
    perspective: 1000px;
    margin: 0;
    padding: 0;
    pointer-events: auto;
    position: relative;
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  .card.flipped .card-inner {
    transform: rotateY(180deg);
  }

  .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: white;
    display: flex;
    flex-direction: column;
  }

  .card-back {
    transform: rotateY(180deg);
  }

  .card-image {
    flex: 0 0 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .placeholder::after {
    content: "👤";
    font-size: 4rem;
    opacity: 0.3;
  }

  .placeholder.superhero::after {
    content: "🦸";
  }

  .card-content {
    flex: 1;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1a202c;
    margin: 0;
    line-height: 1.2;
  }

  .card-subtitle {
    font-size: 0.875rem;
    font-weight: 600;
    color: #718096;
    margin: 0;
  }

  .card-description {
    font-size: 0.875rem;
    color: #4a5568;
    margin: 0;
    flex: 1;
    overflow-y: auto;
    line-height: 1.5;
  }

  .card:hover .card-inner {
    transform: rotateY(5deg);
  }

  .card.flipped:hover .card-inner {
    transform: rotateY(185deg);
  }

  .card:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
    border-radius: 0.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .card-inner {
      transition: none;
    }
    
    .card:hover .card-inner {
      transform: none;
    }
    
    .card.flipped .card-inner,
    .card.flipped:hover .card-inner {
      transform: rotateY(180deg);
    }
  }

  @media (max-width: 640px) {
    .card {
      width: 100%;
      max-width: 18rem;
    }
  }
</style>
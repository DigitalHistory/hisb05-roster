<script>
  let { person } = $props();
  let flipped = $state(false);
  
  function getImageId(url) {
    if (!url) return null;
    
    // Handle new format: https://drive.google.com/file/d/FILE_ID/view
    const newFormatMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (newFormatMatch) {
      return newFormatMatch[1];
    }
    
    // Handle old format: https://drive.google.com/open?id=FILE_ID
    const oldFormatMatch = url.match(/\?id=([a-zA-Z0-9_-]+)/);
    if (oldFormatMatch) {
      return oldFormatMatch[1];
    }
    
    return null;
  }
  
  // Try both fields for front image
  const frontImageId = getImageId(person["corrected_selfie"]) || getImageId(person["Please upload a picture of yourself"]);
  const backImageId = getImageId(person["Please upload a picture of yourself in costume (if you have one)"]);
  const displayName = person["Preferred Name (If Different)"] || person["Official Given (\"First\") Name "];
  
  // For static deployment (GitHub Pages), use direct Google Drive URLs
  // These work if the files are publicly shared with "Anyone with the link can view"
  // The lh3.googleusercontent.com domain typically doesn't have CORS issues
  const frontImageUrl = frontImageId ? `https://lh3.googleusercontent.com/d/${frontImageId}=w800` : null;
  const backImageUrl = backImageId ? `https://lh3.googleusercontent.com/d/${backImageId}=w800` : null;
  
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
        {#if frontImageUrl}
          <img
            src={frontImageUrl}
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
        {#if backImageUrl}
          <img 
            src={backImageUrl}
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

  .placeholder.loading::after {
    display: none;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
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

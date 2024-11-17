console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const breedList = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");
  
    // Challenge 1: Fetch and display random dog images
    fetch(imgUrl)
      .then((response) => response.json())
      .then((data) => {
        const imageContainer = document.getElementById("dog-image-container");
        data.message.forEach((imgUrl) => {
          const img = document.createElement("img");
          img.src = imgUrl;
          img.alt = "Cute dog";
          img.style.width = "200px";
          img.style.margin = "10px";
          imageContainer.appendChild(img);
        });
      })
      .catch((error) => console.error("Error fetching images:", error));
  
    // Challenge 2: Fetch and display dog breeds
    fetch(breedUrl)
      .then((response) => response.json())
      .then((data) => {
        const breeds = Object.keys(data.message);
        renderBreeds(breeds);
      })
      .catch((error) => console.error("Error fetching breeds:", error));
  
    // Function to render breeds
    function renderBreeds(breeds) {
      breedList.innerHTML = ""; // Clear list before rendering
      breeds.forEach((breed) => {
        const li = document.createElement("li");
        li.textContent = breed;
        li.style.cursor = "pointer";
  
        // Challenge 3: Change font color on click
        li.addEventListener("click", () => {
          li.style.color = li.style.color === "blue" ? "black" : "blue";
        });
  
        breedList.appendChild(li);
      });
    }
  
    // Challenge 4: Filter breeds by dropdown selection
    breedDropdown.addEventListener("change", (event) => {
      const selectedLetter = event.target.value;
      fetch(breedUrl)
        .then((response) => response.json())
        .then((data) => {
          const filteredBreeds = Object.keys(data.message).filter((breed) =>
            breed.startsWith(selectedLetter)
          );
          renderBreeds(filteredBreeds);
        })
        .catch((error) => console.error("Error fetching filtered breeds:", error));
    });
  });
  
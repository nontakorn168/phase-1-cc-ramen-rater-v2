// fetch('http://localhost:3000/ramens')
// .then(res => console.log(res))
// // index.js
// // Callbacks
// const handleClick = (ramen) => {
//   // Add code
//   fentch('http://localhost:3000/ramens', {
//     method: 'POST',
//     headers: {
//       'Context-Type': 'application/json'
//     },
//     body: JSON.stringify(ramen)
//   })
//   .then(res => res.json())
//   .thne(ramen => console.log(ramen))
// };

// const addSubmitListener = () => {
//   // Add code
// }

// const displayRamens = () => {
//   // Add code
//   let card = 
//   fentch('http://localhost:3000/ramens', {
//   .then(res => res.json())
//   .then(ramens => ramens.forEach(ramens => ))
//   })

// };

// const main = () => {
//   // Invoke displayRamens here
//   // Invoke addSubmitListener here
//   const displayRamens = document.getElementById(ramen-menu)

//   }))
// }

// main()

// // Export functions for testing
// export {
//   displayRamens,
//   addSubmitListener,
//   handleClick,
//   main,
// };


const baseURL = 'http://localhost:3000/ramens';

// Display all ramen images
function displayRamens() {
  fetch(baseURL)
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.dataset.id = ramen.id;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
      handleClick(ramens[0]); // Show first ramen on load
    });
}

// Handle click event for ramen images to display details
function handleClick(ramen) {
  const ramenDetail = document.getElementById('ramen-detail');
  const name = document.querySelector('.name');
  const restaurant = document.querySelector('.restaurant');
  const rating = document.getElementById('rating-display');
  const comment = document.getElementById('comment-display');
  const img = ramenDetail.querySelector('img');

  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  rating.textContent = ramen.rating;
  comment.textContent = ramen.comment;
  img.src = ramen.image;

  // Attach ramen id to update for the edit form
  img.dataset.id = ramen.id;
}

// Add event listener for the "Add New Ramen" form
function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', event => {
    event.preventDefault();

    const newRamen = {
      name: event.target['new-name'].value,
      restaurant: event.target['new-restaurant'].value,
      image: event.target['new-image'].value,
      rating: event.target['new-rating'].value,
      comment: event.target['new-comment'].value
    };

    addRamenToMenu(newRamen);
    addRamenToServer(newRamen);
    form.reset();
  });
}

// Add new ramen image to the menu
function addRamenToMenu(ramen) {
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.dataset.id = ramen.id;
  img.addEventListener('click', () => handleClick(ramen));
  document.getElementById('ramen-menu').appendChild(img);
}

// Persist new ramen to the server
function addRamenToServer(newRamen) {
  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRamen),
  })
  .then(response => response.json())
  .then(ramen => {
    addRamenToMenu(ramen);
  });
}

// Add event listener to the "Edit Ramen" form
function addEditListener() {
  const editForm = document.getElementById('edit-ramen');
  editForm.addEventListener('submit', event => {
    event.preventDefault();
    const ramenId = document.querySelector('#ramen-detail img').dataset.id;
    const updatedData = {
      rating: document.getElementById('edit-rating').value,
      comment: document.getElementById('edit-comment').value,
    };

    // Update the displayed rating and comment
    document.getElementById('rating-display').textContent = updatedData.rating;
    document.getElementById('comment-display').textContent = updatedData.comment;

    updateRamen(ramenId, updatedData);
    editForm.reset();
  });
}

// Update the ramen on the server
function updateRamen(ramenId, updatedData) {
  fetch(`${baseURL}/${ramenId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
}

// Initialize the application
function main() {
  displayRamens();
  addSubmitListener();
  addEditListener();
}

document.addEventListener('DOMContentLoaded', main);

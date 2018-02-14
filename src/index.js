import reddit from './reddit.api';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Submit del Form
searchForm.addEventListener('submit', event => {
   // Obtener el ordenamiento
   const sortBy = document.querySelector('input[name="sortby"]:checked').value;
   // Obtener el limite
   const searchLimit = document.getElementById('limit').value;
   // Obtener los términos de busqueda
   const searchTerm = searchInput.value;

   // Validar el término de busqueda
   if (searchTerm === '') {
      // Si esta vacio muestra el msj de error
      showMessage('Debe ingresar un término de búsqueda', 'alert-danger');
   }

   // Limpiar el input
   searchInput.value = '';

   // Buscar en reddit
   reddit.search(searchTerm, searchLimit, sortBy)
      .then(results => {
         let output = '<div class="card-columns">';
         results.forEach(post => {
            // Validar la img
            let image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
            output += `
                     <div class="card mb-2">
                        <img class="card-img-top" src="${image}" alt="Card image cap">
                        <div class="card-body">
                           <h4 class="card-title">${post.title}</h4>
                           <p class="card-text">${truncateString(post.selftext, 100)}</p>
                           <a href="${post.url}" target="_blank" class="btn btn-primary">Leer más</a>
                        <hr>
                        <span class="badge badge-dark">Score: ${post.score}</span>
                        <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span> 
                        </div>
                     </div>
        `;
         });
         output += '</div>';
         document.getElementById('results').innerHTML = output;
      });

   event.preventDefault();

});

// Mostrar mensaje
function showMessage(msg, className) {
   // Crear el div
   const div = document.createElement('div');
   // Agregar las clases de css
   div.className = `alert ${className}`;
   // Agregar el texto
   div.appendChild(document.createTextNode(msg));
   // Obtener el contenedor padre
   const searchContainer = document.getElementById('search-container');
   // Obtener el elemento anterior
   const search = document.getElementById('search');

   // Insertar el div con la alerta
   searchContainer.insertBefore(div, search);

   // El timeout para que la alerta se vaya
   setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// Truncar string
function truncateString(myString, limit) {
   const shortened = myString.indexOf(' ', limit);
   if (shortened == -1) return myString;
   return myString.substring(0, shortened);
}
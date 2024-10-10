const firebaseConfig = {
    apiKey: "AIzaSyBYoA4RTY1GEY60r_vNr6uj8bb0auwPjxo",
    authDomain: "formdemo-1ba85.firebaseapp.com",
    projectId: "formdemo-1ba85",
    storageBucket: "formdemo-1ba85.appspot.com",
    messagingSenderId: "642058767843",
    appId: "1:642058767843:web:2acbdf81bdebac5303a4d6"
  };

firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase

const db = firebase.firestore();// db representa mi BBDD //inicia Firestore

// //Función auxiliar para pintar una foto en el album
// const printPhoto = (title, url, docId) => {
//   let card = document.createElement('article');
//   card.setAttribute('class', 'card');
//   let picture = document.createElement('img');
//   picture.setAttribute('src', url);
//   picture.setAttribute('style', 'max-width:250px');
//   let caption = document.createElement('p');
//   caption.innerHTML = title;
//   let id = document.createElement('p');
//   id.innerHTML = docId;
//   const album = document.getElementById('users');
//   card.appendChild(picture);
//   card.appendChild(caption);
//   card.appendChild(id);
//   album.appendChild(card);
// };

//CreateForm
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const nombre = event.target.nombre.value;
    const email = event.target.email.value;
    const mensaje = event.target.mensaje.value;
    const url = event.target.imageUrl.value;
//   if (!title || !url) {
//     alert("Hay un campo vacio. No se ha salvado");
//     return
  
  createUsuario({
    nombre,
    email,
    mensaje,
    url,
  });
});

//Create
document.getElementById("create").addEventListener("click", () => {
    const title = prompt("Introduce el título de tu foto");
    const url = prompt("Introduce la url de tu foto");
    if (!title || !url) {
      alert("Hay un campo vacio. No se ha salvado");
      return
    }
    createPicture({
      title,
      url,
    });
  });
  
  //Read all
  document.getElementById("read-all").addEventListener("click", () => {
    readAll();
  });
  
  //Read one
  document.getElementById('read-one').addEventListener("click", () => {
    const id = prompt("Introduce el id a buscar");
    readOne(id);
  });
  
  //Delete one
  document.getElementById('delete').addEventListener('click', () => {
    deletePicture();
  });
  
  //Clean
  document.getElementById('clean').addEventListener('click', () => {
    cleanAlbum();
  });
  
  //********FIRESTORE USERS COLLECTION******
  


//**********EVENTS**********

//Create
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const nombre = event.target.nombre.value;
    const email = event.target.email.value;
    const mensaje = event.target.mensaje.value;
    const url = event.target.imageUrl.value;
//   if (!title || !url) {
//     alert("Hay un campo vacio. No se ha salvado");
//     return
  
  createUsuario({
    nombre,
    email,
    mensaje,
    url,
  });
});


//Create
const createPicture = (picture) => {
    db.collection("album")//si no existe la crea, se usa la misma linea
      .add(picture)//añadir el objeto por parametro
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id)
        readAll();
      })
      .catch((error) => console.error("Error adding document: ", error));
  };
  // del form
  const createUsuario = (user) => {
    db.collection("user")//si no existe la crea, se usa la misma linea
      .add(user)//añadir el objeto por parametro
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id)
        readAll();
      })
      .catch((error) => console.error("Error adding document: ", error));
  };




  //Read all
  const readAll = () => {
    // Limpia el album para mostrar el resultado
    cleanAlbum();
  
    //Petición a Firestore para leer todos los documentos de la colección album
    db.collection("album")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          printPhoto(doc.data().title, doc.data().url, doc.id)
        });
  
      })
      .catch(() => console.log('Error reading documents'));;
  };
  
  //Delete
  const deletePicture = () => {
    const id = prompt('Introduce el ID a borrar');
    db.collection('album').doc(id).delete().then(() => {
      alert(`Documento ${id} ha sido borrado`);
      //Clean
      document.getElementById('album').innerHTML = "";
      //Read all again
      readAll();
    })
      .catch(() => console.log('Error borrando documento'));
  };
  
  //Clean 
  const cleanAlbum = () => {
    document.getElementById('album').innerHTML = "";
  };
  
  //Show on page load
  /* readAll(); */
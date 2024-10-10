const firebaseConfig = {
  apiKey: "AIzaSyBYoA4RTY1GEY60r_vNr6uj8bb0auwPjxo",
  authDomain: "formdemo-1ba85.firebaseapp.com",
  projectId: "formdemo-1ba85",
  storageBucket: "formdemo-1ba85.appspot.com",
  messagingSenderId: "642058767843",
  appId: "1:642058767843:web:2acbdf81bdebac5303a4d6"
};





firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


//Create: añade los datos a Firestone
const addData = (contact) => {
  db.collection("usuario")
    .add(contact)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      readAll(); // Volver a leer todos los contactos después de añadir uno nuevo
    })
    .catch((error) => console.error("Error adding document: ", error));
};

//Read all
const readAll = () => {
  cleanContactList();

  // Leer todos los documentos de la colección "usuario"
  db.collection("usuario")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const contact = doc.data();
        printContact(contact.nombre, contact.email, contact.mensaje, contact.url, doc.id);
      });
    })
    .catch((error) => console.log('Error reading documents:', error));
};

// Función para limpiar la lista de contactos
const cleanContactList = () => {
  document.getElementById('contactList').innerHTML = "";
};

// Función para mostrar un contacto en la lista
const printContact = (nombre, email, mensaje, urlImagen, id) => {
  const listaDeContactos = document.getElementById("contactList");

  let elementoLista = document.createElement("li");
  let contenidoContacto = "<strong>" + nombre + "</strong> (" + email + ")<br>" + mensaje;

  // Mostrar imagen si existe la URL
  if (urlImagen) {
    contenidoContacto += "<br><img src='" + urlImagen + "' alt='Imagen de contacto' width='50'>";
  }

  elementoLista.innerHTML = contenidoContacto;

  // Crear botón para borrar el contacto
  let botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Borrar";
  botonBorrar.dataset.id = id; // Guardar el ID del documento en el botón

  // Borrar contacto de Firestore al hacer clic
  botonBorrar.addEventListener("click", function () {
    let id = this.dataset.id;
    borrarContacto(id);
  });

  elementoLista.appendChild(botonBorrar);
  listaDeContactos.appendChild(elementoLista);
};

// Función para borrar un contacto de Firestore
const borrarContacto = (id) => {
  db.collection("usuario").doc(id).delete()
    .then(() => {
      console.log("Document successfully deleted!");
      readAll(); // Volver a leer los contactos después de borrar uno
    })
    .catch((error) => console.error("Error removing document: ", error));
};

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  let formularioDeContacto = document.getElementById("contactForm");
  let botonBorrarTodos = document.getElementById("clearAll");

  readAll(); // Mostrar los contactos guardados en Firestore al cargar la página

  // Cuando el formulario se envía
  formularioDeContacto.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = event.target.nombre.value;
    const email = event.target.email.value;
    const mensaje = event.target.mensaje.value;
    const url = event.target.imageUrl.value;

    addData({ nombre, email, mensaje, url });
    formularioDeContacto.reset(); // Reiniciar el formulario
  });

  botonBorrarTodos.addEventListener("click", function () {
    db.collection("usuario").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
      readAll();
    });
  });
});
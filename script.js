function verOfertas() {
  alert("¡Explora nuestras ofertas con hasta 50% de descuento!");
}

function enviarMensaje(e) {
  e.preventDefault();
  alert("¡Gracias por contactarnos! Pronto responderemos tu mensaje.");
}

const productos = [
  {
    id: 1,
    nombre: "MARVEL Spider-Man, VenomVersus, Epic World of Action",
    categoria: "Marvel",
    descripcion: "Figura detallada Mafex con múltiples accesorios.",
    precio: 5400,
    stock: 3,
    imagen: "MARVEL Spiderman.jpg"
  },
  {
    id: 2,
    nombre: "Batman Bust",
    categoria: "DC Comics",
    descripcion: "Busto coleccionable de edición limitada de Batman.",
    precio: 2200,
    stock: 5,
    imagen: "Bust Batman.jpg"
  },
  {
    id: 3,
    nombre: "LEGO Star Wars X-Wing",
    categoria: "Star Wars",
    descripcion: "Set LEGO de la nave X-Wing con minifiguras.",
    precio: 3250,
    stock: 2,
    imagen: "LEGO Star Wars.jpg"
  },
  {
    id: 4,
    nombre: "Iron Man Marvel Legends",
    categoria: "Marvel",
    descripcion: "Figura articulada de Iron Man con efectos.",
    precio: 1200,
    stock: 5,
    imagen: "Iron Man.jpg"
  },
  {
    id: 5,
    nombre: "Superman Classic",
    categoria: "DC Comics",
    descripcion: "Estatua premium de Superman volando.",
    precio: 2800,
    stock: 4,
    imagen: "Superman.jpg"
  },
  {
    id: 6,
    nombre: "Estatua de Batman",
    categoria: "DC Comics",
    descripcion: "Estatua coleccionable con capa dinámica.",
    precio: 2100,
    stock: 3,
    imagen: "Estatua Batman.jpg"
  },
  {
    id: 7,
    nombre: "Funko Superman",
    categoria: "DC Comics",
    descripcion: "Figura Funko Pop de Superman clásico.",
    precio: 350,
    stock: 10,
    imagen: "Superman Funko.jpg"
  },
  {
    id: 8,
    nombre: "Star Wars The Black Series The Mandalorian",
    categoria: "Star Wars",
    descripcion: "The Mandalorian Figura de acción Coleccionable de 15 cm.",
    precio: 3250,
    stock: 2,
    imagen: "Mandalorian.jpg"
  },
  {
    id: 9,
    nombre: "Funko Pop Ahsoka",
    categoria: "Star Wars",
    descripcion: "Figura Funko del Personaje Ahsoka.",
    precio: 3250,
    stock: 2,
    imagen: "Funko pop Ahsoka.jpg"
  },
  {
    id: 10,
    nombre: "Funko Pop The Thing",
    categoria: "Marvel",
    descripcion: "Figura Funko del Personaje de los 4 Fantásticos.",
    precio: 1200,
    stock: 5,
    imagen: "The thing funko.jpg"
  },
  {
    id: 11,
    nombre: "LEGO Marvel X-Jet de los X-Men",
    categoria: "Marvel",
    descripcion: "Kit de Modelo de avión de Juguete construible 76281.",
    precio: 2800,
    stock: 4,
    imagen: "Lego X men.jpg"
  },
  {
    id: 12,
    nombre: "Sudadera",
    categoria: "Mercancia",
    descripcion: "Sudadera conmemorativa de la tienda",
    precio: 700,
    stock: 5,
    imagen: "Sudadera.jpg"
  },
];

let carrito = [];

function mostrarCategoria(categoria) {
  const contenedor = document.getElementById("lista-productos");
  if (!contenedor) return;
  contenedor.innerHTML = "";

  const productosFiltrados = categoria === 'todos' ? productos : productos.filter(p => p.categoria === categoria);

  productosFiltrados.forEach(producto => {
    const div = document.createElement("div");
    div.className = "producto-item";
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" width="100%">
      <h4>${producto.nombre}</h4>
      <p>${producto.descripcion}</p>
      <p><strong>$${producto.precio.toFixed(2)}</strong></p>
      <p>Disponibles: ${producto.stock}</p>
      <button id="btn-${producto.id}" onclick="agregarAlCarrito(${producto.id})" ${producto.stock === 0 ? 'disabled' : ''}>${producto.stock === 0 ? 'Agotado' : 'Agregar al carrito'}</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto && producto.stock > 0) {
    producto.stock--;
    carrito.push(producto);
    actualizarCarrito();
    mostrarCategoria(producto.categoria);

    if (producto.stock === 0) {
      const boton = document.getElementById(`btn-${producto.id}`);
      if (boton) {
        boton.disabled = true;
        boton.textContent = "Agotado";
      }
    }
  } else {
    alert("Producto agotado");
  }
}

function actualizarCarrito() {
  const lista = document.getElementById("items-carrito");
  const total = document.getElementById("total-carrito");
  if (!lista || !total) return;

  lista.innerHTML = "";
  const resumen = {};
  carrito.forEach(p => {
    resumen[p.nombre] = (resumen[p.nombre] || 0) + 1;
  });

  let totalPrecio = 0;
  for (let nombre in resumen) {
    const cantidad = resumen[nombre];
    const precio = productos.find(p => p.nombre === nombre).precio;
    totalPrecio += cantidad * precio;
    const li = document.createElement("li");
    li.textContent = `${nombre} x${cantidad} — $${(cantidad * precio).toFixed(2)}`;
    lista.appendChild(li);
  }

  total.textContent = `Total: $${totalPrecio.toFixed(2)}`;
}

function abrirModal(producto) {
  document.getElementById("modalImagen").src = producto.imagen;
  document.getElementById("modalNombre").textContent = producto.nombre;
  document.getElementById("modalDescripcion").textContent = producto.descripcion;
  document.getElementById("modalPrecio").textContent = `Precio: $${producto.precio}`;
  document.getElementById("modalStock").textContent = `En stock: ${producto.stock}`;
  document.getElementById("btnAgregarCarrito").onclick = () => {
    agregarAlCarrito(producto.id);
    cerrarModal();
  };
  document.getElementById("modalProducto").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modalProducto").style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".producto").forEach(carta => {
    const nombre = carta.querySelector("strong")?.textContent?.trim();
    const producto = productos.find(p => p.nombre.includes(nombre));
    if (producto) {
      carta.style.cursor = "pointer";
      carta.onclick = () => abrirModal(producto);
    }
  });
});

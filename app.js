// Array inicial de productos
//let productos = [
    //{ nombre: "Laptop", marca:"Lenovo", precio: 1000 },
   // { nombre: "Auriculares", marca:"LG", precio: 50 },
    //{ nombre: "Teclado", marca:"Rii", precio: 25 },
//];


let productos = []; //defino el array vacio
// Cargamos datos del archivo JSON
fetch('./datos.json')
  .then(response => response.text()) // Obtener el contenido como texto
  .then(jsonString => {
    productos = JSON.parse(jsonString); // Parsear y asignar al array productos
   console.log("Productos cargados:", productos); // Verificar en la consola
   //return productos

// Función para renderizar los productos
function renderProductos() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    productos.forEach(producto => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <h3>${producto.nombre}</h3>
            <h4>${producto.marca}</h4>
            <p><strong>Precio:</strong> $${producto.precio}</p>
        `;

        productList.appendChild(productCard);
    });
}

// Evento para añadir productos
document.getElementById("product-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("product-name").value.trim();
    const brand = document.getElementById("product-brand").value.trim();
    const price = parseFloat(document.getElementById("product-price").value);

    if (name && brand && price) {
        productos.push({ nombre: name, marca: brand, precio: price });
        renderProductos();
        this.reset();
    }
});

// Evento para modificar el precio de un producto
document.getElementById("update-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("update-name").value.trim();
    const brand = document.getElementById("update-brand").value.trim();
    const price = parseFloat(document.getElementById("update-price").value);

    const product = productos.find(p => p.nombre.toLowerCase() === name.toLowerCase() && p.marca.toLowerCase() === brand.toLowerCase() && p.precio.parseFloat() === price.parseFloat());
    if (product) {
        product.nombre = name;
        product.marca = brand;
        product.precio = price;
        renderProductos();
        this.reset();
    } else {
        alert("Producto no encontrado.");
        renderProductos();
        this.reset();
    }

});

// Función para eliminar un producto
function eliminarProducto(nombre, marca, precio) {
    const index = productos.findIndex(
        (producto) => producto.nombre === nombre && producto.marca === marca && producto.precio === parseFloat(precio)
    );

    if (index !== -1) {
        productos.splice(index, 1);
        alert(`El producto "${nombre}" ha sido eliminado correctamente.`);
        renderProductos();
    } else {
        alert("Producto no encontrado. Verifica el nombre y precio.");
    }
}

// Manejo del evento para eliminar producto
document.getElementById("delete-product-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("delete-name").value.trim();
    const marca = document.getElementById("delete-brand").value.trim();
    const precio = document.getElementById("delete-price").value.trim();

    eliminarProducto(nombre, marca, precio);

    // Limpiar campos del formulario
    e.target.reset();
});


 
// Renderizar productos inicialmente
renderProductos();
});
  

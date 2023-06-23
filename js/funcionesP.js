

const url = 'http://localhost:8087/api/producto'


const listarProducto = async () => {
    let body = document.getElementById('contenido')
    if (body) {
        let mensaje = ''


        fetch(url)//Permite llamar la API
            .then(res => res.json())
            .then(function (data) {
                let listarProducto = data.msg
                listarProducto.map((producto) => {
                    mensaje +=
                        `<tr>
                        <td>${producto.nombre}</td>` +
                        `<td>${producto.precio}</td>` +
                        `<td>${producto.cantidad}</td>` +
                        `<td>${producto.descripcion}</td>` +
                        `<td>${producto.estado}</td>` +
                        
                        `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(producto)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${producto._id}")'>Eliminar</a>
                </td></tr>`
                    body.innerHTML = mensaje
                })
            })
    }
}

listarProducto()

const registrarProducto = async () => {
    

    let nombre = document.getElementById('nombre').value
    let precio = document.getElementById('precio').value
    let cantidad = document.getElementById('cantidad').value
    let descripcion = document.getElementById('descripcion').value
    let estado = document.getElementById('estado').value
   

    let producto = {
       
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        descripcion: descripcion,
        estado: estado
    }

   
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(producto),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json()) //La respuesta del método POST de la API
            .then(data => {
                console.log(data)
                alert(data.producto + ' producto registrado con exito');
                window.location.href = "listarProductos.html";
            });
   
}

const editar = (producto) => {
    let _id =document.getElementById('_id').value = '';
    let nombre= document.getElementById('nombre').value = '';
    let precio= document.getElementById('precio').value = '';
    let cantidad= document.getElementById('cantidad').value = '';
    let descripcion= document.getElementById('descripcion').value = '';
    let estado= document.getElementById('estado').value = '';
    

    document.getElementById('_id').value = producto._id
    document.getElementById('nombre').value = producto.nombre
    document.getElementById('precio').value = producto.precio
    document.getElementById('cantidad').value = producto.cantidad
    document.getElementById('descripcion').value = producto.descripcion
    document.getElementById('estado').value = producto.estado
   

}

const actualizarProducto = async () => {
    //Captura de valores de datos enviados desde el formulario

   
    let nombre = document.getElementById('nombre').value
    let precio = document.getElementById('precio').value
    let cantidad = document.getElementById('cantidad').value
    let descripcion = document.getElementById('descripcion').value
    let estado = document.getElementById('estado').value
   

    let producto = {
        _id: document.getElementById('_id').value,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        descripcion: descripcion,
        estado: estado

      
    }

    if (producto !== null) {
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(producto),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json()) //La respuesta del método POST de la API
            .then(json => {
                alert(json.mensaje);
                alert("Producto editado correctamente");
                window.location.href = "listarProductos.html";
            })

    } else {
        alert('No se pudo editar el producto')
    }
}

const eliminar = (_id) => {
    if (confirm('¿Está seguro de realizar la eliminación?')) {
        //Captura de valores de datos enviados desde el formulario
        const producto = {
            _id: _id
        }

        //console.log(usuario)

        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(producto),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json()) //La respuesta del método POST de la API
            .then(data => {
                alert(data.mensaje);
                window.location.href = "listarProductos.html";
            })
    }
}




if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarProducto)
}

if (document.querySelector('#btnActualizar')) {
    document.querySelector('#btnActualizar')
        .addEventListener('click', editar)

    console.log(_id)
}


const editarButton= document.querySelector('#btnEditar');

if(editarButton){
    editarButton.addEventListener('click', actualizarProducto)
}


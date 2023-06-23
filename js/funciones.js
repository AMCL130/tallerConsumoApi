

const url = 'http://localhost:8087/api/cliente'


const listarCliente = async () => {
    let body = document.getElementById('contenido')
    if (body) {
        let mensaje = ''


        fetch(url)//Permite llamar la API
            .then(res => res.json())
            .then(function (data) {
                let listarCliente = data.msg
                listarCliente.map((cliente) => {
                    mensaje +=
                        `<tr>
                        <td>${cliente.tipo}</td>` +
                        `<td>${cliente.doc}</td>` +
                        `<td>${cliente.nombre}</td>` +
                        `<td>${cliente.celular}</td>` +
                        `<td>${cliente.direccion}</td>` +
                        `<td>${cliente.correo}</td>` +
                        `<td>${cliente.estado}</td>` +
                        `<td>${cliente.contrasena}</td>` +
                        `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(cliente)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${cliente._id}")'>Eliminar</a>
                </td></tr>`
                    body.innerHTML = mensaje
                })
            })
    }
}

listarCliente()

const registrarCliente = async () => {
    document.querySelector('#formCreareCliente').addEventListener('submit', e=>e.preventDefault())
    //Captura de valores de datos enviados desde el formulario
    let tipo = document.getElementById('tipo').value
    let doc = document.getElementById('doc').value
    let nombre = document.getElementById('nombre').value
    let celular = document.getElementById('celular').value
    let direccion = document.getElementById('direccion').value
    let correo = document.getElementById('correo').value
    let estado = document.getElementById('estado').value
    let contrasena = document.getElementById('contrasena').value
    let confirmarContrasena = document.getElementById('confirmarContrasena').value

    let cliente = {
        tipo: tipo,
        doc: doc,
        nombre: nombre,
        celular: celular,
        direccion: direccion,
        correo: correo,
        estado: estado,
        contrasena: contrasena,
        confirmarContrasena: confirmarContrasena
    }

    if ((contrasena.length > 0 && confirmarContrasena.length > 0) && (contrasena == confirmarContrasena)) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(cliente),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json()) //La respuesta del método POST de la API
            .then(data => {
                console.log(data)
                alert(data.cliente + ' cliente registrado con exito');
                window.location.href = "/listarClientes.html";
            });
    }
    else {
        alert('Las contraseñas no coinciden')
    }
}

const editar = (cliente) => {
    let _id =document.getElementById('_id').value = '';
    let tipo= document.getElementById('tipo').value = '';
    let doc= document.getElementById('doc').value = '';
    let nombre= document.getElementById('nombre').value = '';
    let celular= document.getElementById('celular').value = '';
    let direccion= document.getElementById('direccion').value = '';
    let correo= document.getElementById('correo').value = '';
    let estado= document.getElementById('estado').value = '';
    let contrasena= document.getElementById('contrasena').value = '';
    let confirmarContrasena= document.getElementById('confirmarContrasena').value = '';

    document.getElementById('_id').value = cliente._id
    document.getElementById('tipo').value = cliente.tipo
    document.getElementById('doc').value = cliente.doc
    document.getElementById('nombre').value = cliente.nombre
    document.getElementById('celular').value = cliente.celular
    document.getElementById('direccion').value = cliente.direccion
    document.getElementById('correo').value = cliente.correo
    document.getElementById('estado').value = cliente.estado
    document.getElementById('contrasena').value = cliente.contrasena
    document.getElementById('confirmarContrasena').value = cliente.confirmarContrasena


}

const actualizarCliente = async () => {
    //Captura de valores de datos enviados desde el formulario

    let tipo = document.getElementById('tipo').value
    let doc = document.getElementById('doc').value
    let nombre = document.getElementById('nombre').value
    let celular = document.getElementById('celular').value
    let direccion = document.getElementById('direccion').value
    let correo = document.getElementById('correo').value
    let estado = document.getElementById('estado').value
    let contrasena = document.getElementById('contrasena').value
    let confirmarContrasena = document.getElementById('confirmarContrasena').value

    let cliente = {
        _id: document.getElementById('_id').value,
        tipo: tipo,
        doc: doc,
        nombre: nombre,
        celular: celular,
        direccion: direccion,
        correo: correo,
        estado: estado,
        contrasena: contrasena,
        confirmarContrasena: confirmarContrasena

        // tipoModificacion: 'Unitaria'
    }

    if ((contrasena.length > 0 && confirmarContrasena.length > 0) && (contrasena == confirmarContrasena)) {
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(cliente),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json()) //La respuesta del método POST de la API
            .then(json => {
                alert(json.mensaje);
                alert("Cliente editado correctamente");
                window.location.href = "listarClientes.html";
            })

    } else {
        alert('El contraseña y la confirmación de la contraseña no coinciden. Por favor verifique')
    }
}

const eliminar = (_id) => {
    if (confirm('¿Está seguro de realizar la eliminación?')) {
        //Captura de valores de datos enviados desde el formulario
        const cliente = {
            _id: _id
        }

        //console.log(usuario)

        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(cliente),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json()) //La respuesta del método POST de la API
            .then(data => {
                alert(data.mensaje);
                window.location.href = "listarClientes.html";
            })
    }
}




if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarCliente)
}

if (document.querySelector('#btnActualizar')) {
    document.querySelector('#btnActualizar')
        .addEventListener('click', editar)

    console.log(_id)
}


const editarButton= document.querySelector('#btnEditar');

if(editarButton){
    editarButton.addEventListener('click', actualizarCliente)
}

//Installar en la api(backend) los paquetes:
//cors
//body-parser
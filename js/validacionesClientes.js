const formulario1= document.getElementById('formCreareCliente');
formulario1.addEventListener('submit', (e) =>{
    e.preventDefault();

    const expressionNombre= /^[a_zA-Z\s]+$/;
    const expressionCelular = /^3\d{9}$/;
    const expressionCorreo = /^\S+@\S+\.\S+$/
    const expressionfecha = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/;

    const nombreCliente = document.getElementById('nombre').value;
    const correoCliente = document.getElementById('correo').value;
    const celularCliente= document.getElementById('celular').value;
    const ndocCliente = document.getElementById('doc').value;
    const direccionCliente= document.getElementById('direccion').value;
    const contraseñaC = document.getElementById('contrasena').value; 
    const confirmacionC = document.getElementById('confirmacionContrasena').value; 



    try{
        if(nombreCliente=='' || correoCliente=='' || ndocCliente=='' || celularCliente=='' || direccionCliente=='' || contraseñaC==''|| confirmacionC==''){
            throw 'por favor llenar todos los campos'
        }
        if(!expressionNombre.test(nombreCliente)){
            throw 'nombre no valido'
        }
        if(!expressionCelular.test(celularCliente)){
                throw 'celular no valido'
        }
        if(!expressionCorreo.test(correoCliente)){
                throw 'correo no valido'
        }
        
        if(confirmacionC != contraseñaC){
                throw 'Las contraseñas no coinciden'
        }
            alert ('cliente creado con exito')
        
        

    }catch(e){
        alert(e)
    }

})
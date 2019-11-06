var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {

        console.log('Usuarios conectados: ', resp);

    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Crear Mensaje
// socket.emit('crearMensaje', {
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });



// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(personas) {

    console.log(personas);

});


//Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje privado:', mensaje);

});
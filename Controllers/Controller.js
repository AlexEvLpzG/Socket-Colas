const socketController = ( socket ) => {
    socket.on( 'enviar-mensaje', ( payload, callback ) => {
        const id = 12345;
        
        callback({ id, fecha: new Date().getTime() });
        
        socket.broadcast.emit( 'enviar-mensaje', payload );
    });
}

module.exports = { socketController };
const TicketControl = require( '../Models/Ticket-Control' );

const ticketControl = new TicketControl();

const socketController = ( socket ) => {
    socket.emit( 'ultimo-ticket', ticketControl.ultimo );
    
    socket.on( 'siguiente-ticket', ( payload, callback ) => {
        const siguiente = ticketControl.siguiente();
        callback( siguiente );

        // TODO: Notificar que hay un nuevo ticket pendiente de asignar
    });

    socket.on( 'atender-ticket', ({ escritorio }, callback ) => {
        if( !escritorio ) {
            return callback({ ok: false, msg: 'El escritorio es obligatorio' });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        // Todo: Notificar cambio en los ultimos4

        if( !ticket ) {
            callback({ ok: false, msg: 'Ya no hay tockets pendientes' });
        } else {
            callback({ ok: true, ticket });
        }
    });
}

module.exports = { socketController };
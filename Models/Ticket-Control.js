const path = require( 'path' );
const fs   = require( 'fs' );

class TicketControl {
    constructor() {
        this.ultimo   = 0;
        this.hoy      = new Date().getDate();
        this.tikets   = [];
        this.ultimos4 = []; 

        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tikets: this.tikets,
            ultimos4: this.ultimos4
        }
    }

    init() {
        const { hoy, tikets, ultimos4, ultimo } = require( '../db/data.json' );
        
        if( hoy == this.hoy ) {
            this.tikets   = tikets;
            this.ultimo   = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            // * Es Otro dia
            this.guardarDB();
        }
    }

    guardarDB() {
        const dbPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) );
    }
}

module.exports = TicketControl;
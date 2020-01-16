//llamar al modulo de express
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

//llamar rutas del servidor
import producto from './routes/producto';
import categoria from './routes/categoria';

// clase
class Server 
{
    public app: express.Application;

    constructor()
    {
        this.app=express();
        this.config();
        this.routes();
    }
    config(){
        this.app.set('port',process.env.PORT||3000);
        // CONEXIÓN A LA BDD
        const MONGO_URI = 'mongodb://localhost:27017/tienda'
        mongoose.connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true}).then(()=>{
            console.log("BDD OK");
        });
        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO 
        this.app.use(morgan('dev'));
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors());
        // RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express.urlencoded({extended:false}));

    }
    routes(){
        this.app.use('/api/producto',producto);
        this.app.use('/api/categoria',categoria);

    }

    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log("SERVIDOR FUNCIONANDO EN EL PUERTO 3000 OK");
        });
    }
}

//instanciar la clase
const server= new Server();
server.start();


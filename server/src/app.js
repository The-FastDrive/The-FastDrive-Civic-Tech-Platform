import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import corsOptions from './configs/corsOptions.js'
import indexRoutes from './routes/index.route.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());
app.use(helmet());
app.use(hpp());
app.use(cors(corsOptions));

app.get('/', (req, res)=>{
    res.end('Hello World!');
});

app.get('/status/healthz', (req, res)=>{
    res.status(200).json({
        status: "ok"
    });
});

app.get('/status/readyz', (req, res)=>{
    res.status(200).json({
        status: "ok"
    });
});

app.use(indexRoutes);

export default app;
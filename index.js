import express from 'express';
import 'dotenv/config';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
//DB connection
import atlasConnection from './database/database.js';
//Middlewares
import notFoundMiddleware from './middlewares/notFound.middleware.js';
import logMiddleware from './middlewares/log.middleware.js';
//Routes
import clientRouter from './routes/client.routes.js';
import internalRouter from './routes/internal.routes.js';
import itemRouter from './routes/item.routes.js';
import orderRouter from './routes/order.routes.js';


const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info:{
            title: 'ChrPtrOSAPI',
            version: '1.0.0',
            description: 'A sample API',
            contact: {
                name: 'Pietro Chiartano',
                email: 'dummy@email.com'
            },
        },
    },
    servers: [
        {
            url: 'http://localhost:4444',
            description: "OSAPI doc",
        },
    ],
    apis: ['apps.js','./routes/client.routes.js','./routes/item.routes.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

await atlasConnection();
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));
app.use(express.json());
app.use(logMiddleware);

app.use(clientRouter);
app.use(internalRouter);
app.use(itemRouter);
app.use(orderRouter);

app.use(notFoundMiddleware);

app.listen(4444);


export default app;
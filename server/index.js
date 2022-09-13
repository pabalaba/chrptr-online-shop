import express from 'express';
import 'dotenv/config';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import next from 'next';
//DB connection
import atlasConnection from './database/database.js';
//Middlewares
import notFoundMiddleware from './middlewares/notFound.middleware.js';
import logMiddleware from './middlewares/log.middleware.js';
//Routes
import customerRouter from './routes/customer.routes.js';
import internalRouter from './routes/internal.routes.js';
import itemRouter from './routes/item.routes.js';
import orderRouter from './routes/order.routes.js';

const port = parseInt(process.env.PORT) || 3000;
const dev = 'production'
const appNext = next({dev});
const handle = appNext.getRequestHandler();


appNext
    .prepare()
    .then(async () => {
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
            apis: ['apps.js','./routes/customer.routes.js','./routes/item.routes.js'],
        };

        const swaggerDocs = swaggerJsDoc(swaggerOptions);

        await atlasConnection();

        app.use(express.json());
        //app.use(logMiddleware);

        app.use(customerRouter);
        app.use(internalRouter);
        app.use(itemRouter);
        app.use(orderRouter);

        app.get('*',(req,res)=> {
            return handle(req,res);
        })

        app.listen(4444);
    }
)
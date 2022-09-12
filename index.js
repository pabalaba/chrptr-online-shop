import express from 'express';
import 'dotenv/config';
//DB connection
import atlasConnection from './database/database.js';
//Middlewares
import notFoundMiddleware from './middlewares/notFound.middleware.js';
import logMiddleware from './middlewares/log.middleware.js';
//Routes
import clientRouter from './routers/client.routes.js';
import internalRouter from './routers/internal.routes.js';
import itemRouter from './routers/items.routes.js';


const app = express();

await atlasConnection();

app.use(express.json());
app.use(logMiddleware);

app.use(clientRouter);
app.use(internalRouter);
app.use(itemRouter);

app.use(notFoundMiddleware);

app.listen(4444);


export default app;
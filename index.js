import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import router from './router/web.router.js';
import dbConnection from './config/dbConnection.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(router);

dbConnection();



app.listen(port, () => {
    console.log(`Server is listening at :${port}`);
});

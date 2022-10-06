import express, {Express} from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { pr_Router } from './pr_Router';
import config from '../config/config';
import cors from "cors";

// initializing the express app
const app: Express = express();
// using json
app.use(json());
// using the pull requests router
app.use(pr_Router);
// using cores inorder for the client to reach the server
app.use(cors());

// connecting to the db
const uri = `mongodb+srv://${config.USER_NAME}:${config.PASSWORD}@${config.CLUSTER}.oe46tw3.mongodb.net/pull_requests?retryWrites=true&w=majority`;
mongoose.connect(uri).then(() => {
    console.log('====================================');
    console.log('[DB]: connected to the database');
    console.log('====================================');
}).catch((e) => {
    console.log('====================================');
    console.log(`[DB] - [Error]: ${e.message}`);
    console.log('====================================');
});

// running the server
app.listen(config.PORT, () =>{
    console.log('====================================');
    console.log(`[server]: Server is running at http://localhost:${config.PORT}`);
    console.log('====================================');
});
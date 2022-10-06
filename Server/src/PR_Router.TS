import express, { Request, Response } from 'express'
import { PR } from '../models/PR'

// creating the router
const router = express.Router()

// defining the get rout
router.get('/prs', async (req: Request, res: Response) => {
    try {
        // fetching data from the db
        const pr = await PR.find({});
        console.log(`[Server]: Succssesfully fetched the data ${new Date().toISOString()}`);
        // returning the data
        return res.status(200).send(pr);
    } catch (error) {
        var result = (error as Error).message
        // returning an error if fetching faild
        return res.status(500).send(result);
    }  
})

// defining the post route
router.post('/prs', async (req: Request, res: Response) => {
    // collecting all the data from the request
    const { PR_number, Title, Description, Author, Status, Labels, Creation_Date} = req.body;
    // building a pull request object
    const pr = PR.build({PR_number, Title, Description, Author, Status, Labels, Creation_Date});
    try {
        // saving the object in the DB
        await pr.save();
    } catch (error) {
        var result = (error as Error).message
        // returning an error if saving faild
        return res.status(500).send(result);
    }
    console.log(`[Server]: Succssesfully added pull request into the db, id:${pr._id}`);
    return res.status(201).send(pr);
})

export {router as pr_Router}

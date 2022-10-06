import mongoose from "mongoose";
import { Status } from './Status'; 

// interface of the pull request
interface IPR {
    PR_number: Number;
    Title: String;
    Description: String;
    Author: String;
    Status: Status;
    Labels: Array<String>;
    Creation_Date: Date;
}


// interface for representing the functinality of the pull requests class
interface PRModelInterface extends mongoose.Model<PRDoc> {
    build(attr: IPR): PRDoc
}

// interface for representing the pull requests document
interface PRDoc extends mongoose.Document {
    PR_number: Number;
    Title: String;
    Description: String;
    Author: String;
    Status: Status;
    Labels: Array<String>;
    Creation_Date: Date;
}

// pull requests db schema
const PRSchema = new mongoose.Schema({
    PR_number: {
        type: Number,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: Status,
        required: true
    },
    Labels: {
        type: Array<String>,
        required: true
    },
    Creation_Date: {
        type: Date,
        required: true
    }
})

// build pull request function
PRSchema.statics.build = (attr: IPR) => {
    return new PR(attr);
}

// creating the PR class
const PR = mongoose.model<PRDoc, PRModelInterface>('PR', PRSchema)

export { PR }


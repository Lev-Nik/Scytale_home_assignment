import {Status} from './models/Status'

interface IPR {
    _id: string;
    PR_number: Number;
    Title: String;
    Description: String;
    Author: String;
    Status: Status;
    Labels: Array<String>;
    Creation_Date: Date;
    __v: number
}

interface PRProps {
    pr: IPR
}

type ApiDataType = {
    message: string;
    status: string;
    prs?: IPR[]
    pr?: IPR
}

type PR_keys = keyof IPR[0]

type SortOrder = "ascn" | "desn"


import axios, { AxiosResponse } from "axios";
import { IPR } from "./type";

// in order to deal with cors issues a proxy was added to the project
// see package.json
const baseUrl: string = "http://localhost:3000"

// getting all the pull requests from the server
export const getPRs = async (): Promise<AxiosResponse<IPR[]>> => {
    try {
        const prs: AxiosResponse<IPR[]> = await axios.get(baseUrl + '/prs');
        console.log(prs.data);
        console.log(prs.status);
        return prs;
    } catch (error) {
        var result = (error as Error).message
        throw new Error(result);
    }
}

// adding a pull request
export const addPR = async (formData: IPR): Promise<AxiosResponse<IPR>> => {
    try {
        const pr: Omit<IPR, "_id" | "__v"> = {
            PR_number: formData.PR_number as number,
            Author: formData.Author,
            Title: formData.Title,
            Description: formData.Description,
            Labels: formData.Labels,
            Status: formData.Status,
            Creation_Date: new Date()
        }
        const savePR: AxiosResponse<IPR> = await axios.post(baseUrl + '/prs', pr);
        return savePR;
    } catch (error) {
        var result = (error as Error).message
        throw new Error(result)
    }
}
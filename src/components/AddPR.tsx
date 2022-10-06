import React, {useState, useEffect} from 'react';
import { IPR } from "../type";
import { Status } from '../models/Status';
import {Button, Form, Row, Col, Dropdown} from 'react-bootstrap';


type props ={
    savePR: (e: React.FormEvent, formData: IPR | any) => void
}

const AddPR: React.FC<props> = ({ savePR }) => {
    // setting all the stateful values
    const [formData, setFormData] = useState<IPR | {}>();
    const [currentStatus, setCurrentStatus] = useState<Status>(Status.Draft);
    const [label, setLable] = useState<string>("No Labels");
    const [labels, setLables] = useState<string>("");

    // function to update the formData request field
    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        });
    }

    // updating the labels and status when their state gets updated
    useEffect(() => { 
        setFormData({
            ...formData,
            ['Labels']: labels.split(','),
            ['Status']: currentStatus
        });
    }, [labels, formData, currentStatus]);
    
    // updating the label field
    const addLabel = (): void => {
        setLables(labels + label + ' ,');
    }

    return (
        <Form onSubmit={(e) => savePR(e, formData)}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="Pull request number">
                        <label htmlFor='pull request number'>PR Number</label>
                        <Form.Control onChangeCapture={handleForm} type='text' id='PR_number'/> 
                    </Form.Group>
                    <Form.Group as={Col} controlId="Title">
                        <label htmlFor='Title'>Title</label>
                        <Form.Control onChangeCapture={handleForm} type='text' id='Title'/> 
                    </Form.Group>
                    <Form.Group as={Col} controlId="Author">
                        <label htmlFor='Author'>Author</label>
                        <Form.Control onChangeCapture={handleForm} type='text' id='Author'/> 
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="Description">
                        <label htmlFor='Description'>Description</label>
                        <Form.Control placeholder='description' onChangeCapture={handleForm} type='text' id='Description'/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <label htmlFor='Status'>Status</label>
                        <Form.Select id='Status' value={currentStatus}
                        onChange={(e) => {
                            setCurrentStatus(Status[e.target.value as keyof typeof Status]);
                            }}>
                            {Object.keys(Status).map((key, index) => (
                                <option key={index} value={key}>
                                    {key}
                                </option>
                            ))}   
                        </Form.Select> 
                    </Form.Group>
                    <Form.Group as={Col}>
                        <label htmlFor='Labels'>Labels</label>
                        <Dropdown>
                            <Dropdown.ItemText>{labels}</Dropdown.ItemText>
                            <Form.Control placeholder='insert label' onChange={(e) =>{
                                setLable(e.target.value);
                            } }></Form.Control>
                            <Button variant='outline-primary' onClick={addLabel}>Add</Button>
                            <Button variant='outline-danger' onClick={(e) => {
                                setLables("");
                            }}>clear</Button>
                        </Dropdown>
                    </Form.Group>
                </Row>
            <Button variant='outline-success' disabled={formData === undefined? true: false} onClick={(e) => {
                        savePR(e, formData);
                }}>
                 Add Pull request
            </Button>
        </Form>
    )
}


export default AddPR
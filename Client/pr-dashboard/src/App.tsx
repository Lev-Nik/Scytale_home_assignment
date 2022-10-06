import React, {useEffect, useState} from 'react';
import './App.css';
import { IPR } from './type';
import { getPRs, addPR } from './API';
import AddPR from './components/AddPR';
import PRsTable from './components/PRsTable';
import {Form, Row} from 'react-bootstrap';

const App: React.FC = () => {
  const [prs, setPRs] = useState<IPR[]>([])


  useEffect(() => {
    fetchPRs()
  }, [])

  // getting the data from the server
  const fetchPRs = (): void => {
    getPRs().then(({status, data}) => {
      setPRs(data);
    })
    .catch((err: Error) => {
      console.log('====================================');
      console.log(`[Client] - [Error]: ${err.message}`);
      console.log('====================================');
    })
  };

  //adding a pull request
  const handleAddPR = (e: React.FormEvent, formData: IPR): void => {
    e.preventDefault();
    addPR(formData).then(({status, data}) => {
      if(status !== 201){
        throw new Error(`[Client] - [Error]: could not save the pull request`)
      }
      fetchPRs();
    }).catch((err) => console.log((err as Error).message))
  }

  return (
    <main className="App">
      <div className='myDiv'>
        <h1> Pull Requests Manager </h1>
      </div>
      <div className='addDiv'>
        <Row className=''>
          <Form>
            <AddPR savePR={handleAddPR}/>
          </Form>
        </Row>
      </div>
      <div className='tableDiv'>
        <PRsTable data={prs}/>
      </div>

  </main>
  );
}

export default App;

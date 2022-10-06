import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Status } from '../models/Status';
import { IPR } from "../type";
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';


type props ={
    data: IPR[]
}

const PRsTable: React.FC<props> = ({data}) => {
  // setting the selection status
    const selectStatus = {
        'Draft': 'Draft',
        'Open': 'Open',
        'Closed': 'Closed'
      };
      // defining the columns of the table
      // if we want to sort by that field we define sort as true
      // if we want to filter by a field we add to the column a filter type
      const columns = [
        {
            dataField: 'PR_number',
            text: 'PR Number',
            sort: true,
        },
        {
            dataField: 'Title',
            text: 'Title',
            sort: true
        },
        {
            dataField: 'Description',
            text: 'Description',
            sort: false
        },
        {
            dataField: 'Author',
            text: 'Author',
            sort: false
        },
        {
            dataField: 'Status',
            text: 'Status',
            formatter: (cell:Status) => selectStatus[cell],
            filter: selectFilter({
              style: { display: 'inline-grid' },
              options: selectStatus
            }),
            sort: false
        },
        {
            dataField: 'Labels',
            text: 'Labels',
            filter: textFilter({
              style: { display: 'inline-grid' }
            }),
            sort: false
        },
        {
            dataField: 'Creation_Date',
            text: 'Creation Date',
            sort: false
        },
      ];
    
      // options of the page ination 
      const customTotal = (from: number, to: number, size: number) => (
        <span className="react-bootstrap-table-pagination-total">
          Showing { from } to { to } of { size } Results
        </span>
      );
      const options = {
        paginationSize: 5,
        pageStartIndex: 0,
        totalSize: data.length,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [{
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
          text: 'All', value: data.length
        }],

      };

      return(
        <BootstrapTable striped hover condensed bootstrap4 keyField='PR_number'
        data={data} columns={columns} bordered={true} filter={ filterFactory() }
         pagination={paginationFactory(options)}/>
      )
}

export default PRsTable
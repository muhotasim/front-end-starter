import React from "react";
import DataTable from "../../components/datatable";

const DashboardPage:React.FC = ()=>{
    return <div className='page dashboard-page'>
        <DataTable  columns={[
            {label: 'Id', key: 'id', dataIndex: 'id'},
            {label: 'Name', key: 'name', dataIndex: 'name'},
            {label: 'Details', key: 'details', dataIndex: 'details'},
            {label: 'Details2', key: 'details2', dataIndex: 'details2'},
        ]} data={[
            {id: 1, name: 'test', details: 'hello world'},
            {id: 2, name: 'test 2', details: 'hello world'},
            {id: 3, name: 'test 3', details: 'hello world'},
            {id: 4, name: 'test 4', details: 'hello world'},
            {id: 5, name: 'test 5', details: 'hello world'},
        ]} isLoading={false}/>
    </div>
}
export  default DashboardPage;
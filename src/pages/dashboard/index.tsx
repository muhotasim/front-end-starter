import React from "react";
import DataTable from "../../components/datatable";
import Select from "../../components/select";

const DashboardPage:React.FC = ()=>{
    return <div className='page dashboard-page'>
        <DataTable  columns={[
            {label: 'Id', key: 'id', dataIndex: 'id', searchable: false},
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
        <Select placeHolder="Select"  allowSearch onSearch={(option, searchText)=>{
            return option.value.toString().includes(searchText)
        }} value={2} options={[...new Array(500)].map((val, index)=>({label: (index+1)+'', value: index+1}))} onChange={(val)=>{
            console.log(val)
        }}/>
    </div>
}
export  default DashboardPage;
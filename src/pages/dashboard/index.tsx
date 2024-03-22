import React from "react";
import DataTable from "../../components/datatable";
import Select from "../../components/select";
import Checkbox from "../../components/checkbox";

const DashboardPage:React.FC = ()=>{
    return <div className='page dashboard-page animate-fade-in'>
        <h1>Header 1</h1>
        <h2>Header 2</h2>
        <h3>Header 3</h3>
        <h4>Header 4</h4>
        <h5>Header 5</h5>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
        <p className="text-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
        <a href="" className="text-link">Test</a>
        <Checkbox label="Test" checked onChange={()=>{}}/>
        <div className="form-group">
            <label className="form-label">User Name</label>
        <input type="text" className="input" />
            <label className="form-label">Validation Error</label>
        <input type="text" className="input validation-error mt-5" />
        </div>
        <div>
        <Select style={{marginTop: '15px'}} value={2} options={[{label: '1', value: 1},{label: '2', value: 2},{label: '3', value: 3}]}/>
        </div>
    </div>
}
export  default DashboardPage;
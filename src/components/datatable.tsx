import React from 'react';

interface DataTableColumnInterface {
    label: string,
    key: string,
    dataIndex: string
}

interface DataTableDataInterface { 
    [key: string]: any 
}

interface DataTableInterface {
    columns: DataTableColumnInterface[],
    data: DataTableDataInterface[],
    onRowClick?: (data: DataTableDataInterface) => void,
    isLoading: boolean,
    paginationOptions?: PaginationInterface
}

const DataTable: React.FC<DataTableInterface> = ({ columns, data, isLoading, onRowClick, paginationOptions }) => {
    return (
        <div className="data-table">
            <table>
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isLoading?<tr ><td colSpan={columns.length} className='table-loader__holder'><span className='fa fa-sync fa-spin'></span></td></tr>:data.map((rowData, rowIndex) => (
                        <tr key={rowIndex} onClick={()=>{ if(onRowClick) onRowClick(rowData); }}>
                            {columns.map(column => (
                                <td key={column.key}>{rowData[column.dataIndex]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {(paginationOptions)&&<Pagination currentPage={paginationOptions.currentPage} totalPages={paginationOptions.totalPages} onPageChange={paginationOptions.onPageChange}/>}
        </div>
    );
}
interface PaginationInterface {
    currentPage: number,
    totalPages: number,
    onPageChange: (page:number)=>void | null
}
const Pagination:React.FC<PaginationInterface> = ({ currentPage = 1, totalPages = 0, onPageChange=null }) => {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            if(onPageChange) onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            if(onPageChange) onPageChange(currentPage + 1);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            <ul className="page-numbers">
                {getPageNumbers().map(page => (
                    <li key={page}>
                        <button onClick={() => {
                            if(onPageChange) onPageChange(page)
                        }} className={currentPage === page ? 'active' : ''}>{page}</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};
export default DataTable;

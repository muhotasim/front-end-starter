import React, { useEffect, useState } from 'react';

interface DataTableColumnInterface {
    label: string,
    key: string,
    dataIndex: string,
    searchable?: boolean,
    searchVal?: string | number,
    openSearch?: boolean,
}

interface DataTableDataInterface {
    [key: string]: any
}

interface DataTableInterface {
    columns: DataTableColumnInterface[],
    data: DataTableDataInterface[],
    onRowClick?: (data: DataTableDataInterface) => void,
    isLoading?: boolean,
    paginationOptions?: PaginationInterface,
    onSearch?: (columns: DataTableColumnInterface[]) => void
}

const DataTable: React.FC<DataTableInterface> = ({ columns, data, isLoading, onRowClick, paginationOptions, onSearch }) => {
    const [processedColumns, setPColumns] = useState<DataTableColumnInterface[]>([])

    const toggleSearch = (clIndex: number) => {
        let columnList = [...processedColumns];
        columnList[clIndex].openSearch = !columnList[clIndex].openSearch;
        setPColumns(columnList);
    }
    const onChangeSearchVal = (val: string, index: number) => {

        let columnList = [...processedColumns];
        columnList[index].searchVal = val;
        setPColumns(columnList);
    }
    const onSearchReset = (index: number) => {
        let columnList = [...processedColumns];
        columnList[index].searchVal = '';
        if (onSearch) onSearch(columnList);
        setPColumns(columnList);
    }
    useEffect(() => {
        setPColumns(columns.map(column => {
            if (column.searchable) {
                column.searchVal = '';
                column.openSearch = false;
            }
            return column;
        }))
    }, [columns])
    return (
        <div className="data-table">
            <table>
                <thead>
                    <tr>
                        {processedColumns.map((column, index) => (
                            <th key={column.key}>{column.label} {column.searchable && <span onClick={() => toggleSearch(index)} className='data-table-search float-right fa fa-search'></span>}
                                {column.openSearch ? <div className='column-search-box'>
                                    <input type="text" className='input' value={column.searchVal} onChange={(e) => onChangeSearchVal(e.target.value, index)} />  <button onClick={() => {
                                        if (onSearch) {
                                            onSearch(processedColumns);
                                        }
                                    }}><span className='fa fa-search'></span></button> <button onClick={() => { onSearchReset(index) }}><span className='fa fa-refresh'></span></button>
                                </div> : null}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <tr ><td colSpan={processedColumns.length} className='table-loader__holder'><span className='fa fa-sync fa-spin'></span></td></tr> : data.map((rowData, rowIndex) => (
                        <tr key={rowIndex} onClick={() => { if (onRowClick) onRowClick(rowData); }}>
                            {processedColumns.map(column => (
                                <td key={column.key}>{rowData[column.dataIndex]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {(paginationOptions) && <Pagination currentPage={paginationOptions.currentPage} totalPages={paginationOptions.totalPages} onPageChange={paginationOptions.onPageChange} />}
        </div>
    );
}
interface PaginationInterface {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void | null
}
const Pagination: React.FC<PaginationInterface> = ({ currentPage = 1, totalPages = 0, onPageChange = null }) => {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            if (onPageChange) onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            if (onPageChange) onPageChange(currentPage + 1);
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
            <ul className="page-numbers">

                {currentPage === 1 ? null : <li  ><button onClick={handlePreviousPage}>Previous</button></li>}
                {getPageNumbers().map(page => (
                    <li key={page}>
                        <button onClick={() => {
                            if (onPageChange) onPageChange(page)
                        }} className={currentPage === page ? 'active' : ''}>{page}</button>
                    </li>
                ))}
                {currentPage === totalPages ? null : <li  ><button onClick={handleNextPage}>Next</button></li>}
            </ul>
        </div>
    );
};
export default DataTable;

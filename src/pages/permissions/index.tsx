import React, { useEffect } from "react";
import DataTable from "../../components/datatable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import FilterGrid from "../../components/filter-grid";
import { Link, useNavigate } from "react-router-dom";
import { permissionActions } from "../../store/permissions.store";

const PermissionPage: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { total, page, perPage, permissions, isLoading, grid, gridFilters } = useSelector((state: RootState) => state.permissions)

    const onDelete = async (id: number | string) => {
        permissionActions.delete(id)(dispatch);
    }

    useEffect(() => {
        permissionActions.list(page, perPage, gridFilters)(dispatch)
    }, [page, gridFilters])

    useEffect(() => {
        return () => {
            dispatch(permissionActions.reset());
        }
    }, [])

    const totalPages = Math.ceil(total / perPage)
    return <div className='page dashboard-page animate-fade-in'>
        <h2 className="mt-15 mb-15">Permissions</h2>
        <FilterGrid grid={grid} onFilter={(filterData) => {
            dispatch(permissionActions.updateState({ gridFilters: filterData, perPage: 10, page: 1 }))
        }} />
        <div style={{ textAlign: 'right' }}>
            <button className="btn btn-md btn-primary mb-15" onClick={() => { navigate('/permissions/create') }}>Create</button>
        </div>
        <DataTable columns={[
            { label: 'Id', key: 'id', dataIndex: 'id', searchable: false },
            { label: 'Name', key: 'name', dataIndex: 'name' },

            { label: 'Permission Key', key: 'permission_key', dataIndex: 'permission_key' },
            
            { label: 'Is Active', key: 'is_active', dataIndex: 'is_active', render: (val) => val ? "Yes" : "No" },
            {
                label: 'Action', key: 'actions', dataIndex: 'actions', render: (text, row) => (<div>
                    <button onClick={() => { navigate('/permissions/' + row.id) }} className="btn btn-sm btn-primary mr-10"><span className="fa fa-edit"></span></button>
                    <button onClick={() => { onDelete(row.id) }} className="btn btn-sm btn-primary"><span className="fa fa-trash"></span></button>
                </div>)
            }
        ]} data={permissions} isLoading={isLoading} paginationOptions={{
            totalPages: totalPages, currentPage: page, onPageChange(cPage) {
                dispatch(permissionActions.updateState({ page: cPage }))
            },
        }} />
    </div>
}
export default PermissionPage;
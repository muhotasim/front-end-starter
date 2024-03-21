import React, { useEffect, useState } from "react";
import DataTable from "../../components/datatable";
import Select from "../../components/select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { notificationActions } from "../../store/notification.store";
import FilterGrid from "../../components/filter-grid";
import { usersActions } from "../../store/users.store";

const UserPage:React.FC = ()=>{

    const dispatch = useDispatch();
    const { total, page, perPage, users, isLoading, grid, gridFilters } = useSelector((state:RootState)=>state.user)

    useEffect(()=>{
        usersActions.list(page, perPage, gridFilters)(dispatch)
    }, [page, gridFilters])

    useEffect(()=>{
        return ()=>{
            dispatch(usersActions.reset());
        }
    },[])

    const totalPages = Math.ceil(total/perPage)
    return <div className='page dashboard-page animate-fade-in'>
        <h2 className="mt-15 mb-15">Users</h2>
        <FilterGrid grid={grid} onFilter={(filterData)=>{
            dispatch(usersActions.updateState({gridFilters: filterData, perPage: 10, page: 1}))
        }}/>
        <DataTable  columns={[
            {label: 'Id', key: 'id', dataIndex: 'id', searchable: false},
            {label: 'Name', key: 'name', dataIndex: 'name'},
            {label: 'Email', key: 'email', dataIndex: 'email'},
            {label: 'Is Superadmin', key: 'is_superadmin', dataIndex: 'is_superadmin', render: (val)=>val?"Yes":"No"},
            {label: 'Is Active', key: 'is_active', dataIndex: 'is_active', render: (val)=>val?"Yes":"No"}
        ]} data={users} isLoading={isLoading} paginationOptions={{totalPages: totalPages, currentPage: page, onPageChange(cPage) {
            dispatch(usersActions.updateState({page: cPage }))
        },}}/>
    </div>
}
export  default UserPage;
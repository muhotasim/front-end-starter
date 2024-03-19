import React, { useEffect, useState } from "react";
import DataTable from "../../components/datatable";
import Select from "../../components/select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { notificationActions } from "../../store/notification.store";

const NotificationPage:React.FC = ()=>{

    const dispatch = useDispatch();
    const { token } = useSelector((state:RootState)=>state.users.user)
    const { total, page, perPage, notifications, isLoading } = useSelector((state:RootState)=>state.notification)

    useEffect(()=>{
        notificationActions.notificationsList(token, page, perPage)(dispatch)
    }, [page])
    const totalPages = Math.ceil(total/perPage)
    return <div className='page dashboard-page animate-fade-in'>
        <h2 className="mt-15 mb-15">Notifications</h2>
        <DataTable  columns={[
            {label: 'Id', key: 'id', dataIndex: 'id', searchable: false},
            {label: 'Title', key: 'message', dataIndex: 'message'},
            {label: 'Time', key: 'created_at', dataIndex: 'created_at'}
        ]} data={notifications} isLoading={isLoading} paginationOptions={{totalPages: totalPages, currentPage: page, onPageChange(cPage) {
            dispatch(notificationActions.updateState({page: cPage }))
        },}}/>
    </div>
}
export  default NotificationPage;
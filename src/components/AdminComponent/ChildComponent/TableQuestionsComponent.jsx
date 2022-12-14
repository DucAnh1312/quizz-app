import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions, setCurrentPage } from "../../../redux/adminQuestionSlice";
import { Table, Space, Button,  Typography, Image } from 'antd';
import 'antd/dist/antd.css';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { defaultThumbnail } from "../../../config/regex";
import ModalUpdate from "../Modal/ModalUpdateQuestion";
import { setIdQuestion, setIsOpenDelete, setIsOpenUpdate } from "../../../redux/modalSilce";
import ModalDeleteQuestion from "../Modal/ModalDeleteQuestion";
const { Column } = Table;

const TableComponent = () => {
    const moment = require("moment");
    const { Text } = Typography;
    const dispatch = useDispatch()
    const questions = useSelector(state => state.questionsAdminSlice.questions)
    const total = useSelector(state => state.questionsAdminSlice.total)
    const loading = useSelector(state => state.questionsAdminSlice.status)
    const pageSize = useSelector(state => state.questionsAdminSlice.pageSize)
    const order = useSelector(state => state.questionsAdminSlice.order)
    const sortField = useSelector(state => state.questionsAdminSlice.sortField)
    const currentPage = useSelector(state => state.questionsAdminSlice.currentPage)
    const isDeleteQuestion = useSelector(state => state.questionsAdminSlice.isDeleteQuestion)
    const title = useSelector(state => state.questionsAdminSlice.title)
    const [data, setData] = useState([])
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: currentPage,
            pageSize: pageSize,
        },
    });
    const handleTableChange = (pagination) => {
        dispatch(setCurrentPage(pagination.current))
        setTableParams({
            pagination,
        });
    };

    useEffect(() => {
        if (currentPage > 0 || isDeleteQuestion) {
            const paramSearch = {
                order: order,
                sortField: sortField,
                page: currentPage,
                size: pageSize,
            }
            if (title !== '') {
                paramSearch['keyWord'] = title
            }
            dispatch(fetchAllQuestions(paramSearch))
        }
    }, [currentPage, isDeleteQuestion])

    useEffect(() => {
        if (questions) {
            const arrData = questions.map((el, index) => {
                return {
                    key: el.id,
                    id: index + (currentPage-1)*pageSize + 1,
                    idQuestion: el.id,
                    title: el.title,
                    thumbnail_link: el.thumbnail_link,
                    createdAt: moment(el.createdAt).format('MMMM Do YYYY, h:mm:ss a')
                }
            })
            setData(arrData)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: total,
                },
            });
        }
    }, [questions])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'idQuestion',
            width: '10%',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (title) => <Text>{title}</Text>,
            align: 'left',
            // width: '10%',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail_link',
            key: 'thumbnail_link',
            render: (key) => <Image
                width='50%'
                src={key ? key : defaultThumbnail}
            />,
            // width: '10%',
            align: 'center'
        },
        {
            title: 'Create Day',
            dataIndex: 'createdAt',
            key: 'createdAt',
            // width: '10%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (dataIndex) => (
                <Space size="middle">
                    <Button type="primary" shape="circle" icon={<EditOutlined />} size={'large'} style={{ backgroundColor: 'green' }}
                        onClick={() => {
                            dispatch(setIsOpenUpdate(true))
                            dispatch(setIdQuestion(dataIndex.idQuestion))
                        }} />
                    {/* <Button type="primary" shape="circle" icon={<EyeOutlined />} size={'large'}
                        onClick={() => {
                            console.log(dataIndex.idQuestion)
                        }}
                    /> */}
                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} size={'large'} danger
                        onClick={() => {
                            dispatch(setIsOpenDelete(true))
                            dispatch(setIdQuestion(dataIndex.idQuestion))
                        }}
                    />

                </Space>
            ),
            align: 'center',
            // width: '10%',
        }

    ];
    return (
        <>
            <Table
                pagination={tableParams.pagination}
                columns={columns}
                dataSource={data}
                scroll={{
                    x: 800,
                    y: 500,
                }}
                loading={loading}
                onChange={handleTableChange}
            />
            <ModalUpdate />
            <ModalDeleteQuestion />
        </>
    )
}

export default TableComponent;
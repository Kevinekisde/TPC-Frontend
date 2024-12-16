import { Breadcrumb, Button, Modal, notification, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import Table from '../../Template/Table'
import { BiCheck, BiCheckDouble, BiX } from 'react-icons/bi'
import StatusText from '../../Template/StatusText'
import { navigate } from 'gatsby'
import Email from './Email'
import useAuthContext from '../../../hooks/useAuthContext'
import Actions from './Actions'
import { normalizeText } from '../../../utils/paragraph'
import Search from './Search'
import { isNotEmpty } from '../../../utils/validations'
import Excel from './Excel'
import { FaEye } from 'react-icons/fa'
import useRequestOC from '../../../hooks/useRequestOC'
import Status from '../../../data/Status.json'
import useProviders from '../../../hooks/useProviders'
import Subir from './Subir'
import RequestOCService from '../../../service/RequestOc'
import { alertSuccess } from '../../../utils/alert'

function RequestOC() {

    const { user } = useAuthContext()

    const { data, isLoading, isSuccess, isError, refetch } = useRequestOC()

    const [api, contextHolder] = notification.useNotification();

    const providers = useProviders()

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [search, setSearch] = useState({
        data: [],
        ticket: ''
    })


    const handleSearch = e => {
        const ticket = normalizeText(e.target.value)
        const result = data.filter(t => normalizeText(t.estado.toString()).includes(ticket) || normalizeText(t.iD_Ticket.toString()).includes(ticket) || normalizeText(t.solped.toString()).includes(ticket) || normalizeText(t.id_OE.toString()).includes(ticket) || normalizeText(t.numero_OC.toString()).includes(ticket) || normalizeText(t.iD_Proveedor.toString()).includes(ticket) || normalizeText(t.detalle).includes(ticket))
        setSearch({
            data: result,
            ticket
        })
    }


    const handleSearchBetweenDates = (date1, date2) => {
        if (!date1 || !date2) {
            return setSearch({
                data: [],
                ticket: ''
            })
        }
        setSearch({
            data: [],
            ticket: ''
        })
        const result = data.filter(t => new Date(t.fecha_Creacion_OC) >= new Date(date1) && new Date(t.fecha_Creacion_OC) <= new Date(date2))

        setSearch({
            data: result,
            ticket: date1 + date2
        })
    }


    const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Space>
                <Button type="link" size="small" onClick={() => api.destroy()}>
                    Cerrar
                </Button>

            </Space>
        );
        api.open({
            message: 'OC Pendiente',
            description:
                'Tienes Ordenes de compras pendientes por liberar',
            btn,
            key,

        });
    };


    const RecepcionTotal = async (ticket) => {

        try {

            RequestOCService.RecepcionTotal(ticket.iD_Ticket)
                .then(response => {
                    console.log(response)
                    alertSuccess({ message: 'Recepcion realizada con éxito' })
                    refetch()
                })


        } catch (e) {
            console.log(e)
        }

    }




    const columns = [
        { title: 'Nº Ticket', dataIndex: 'iD_Ticket', key: 'iD_Ticket', align: 'left', responsive: ['md'] },
        // { title: 'Tipo de solicitud', dataIndex: 'type', key: 'type', align: 'left', responsive: ['md'] },
        {
            title: 'Estado', dataIndex: 'estado', key: 'estado', align: 'center', render: (text, record) => <StatusText status={record.estado} />, filters: Status.map(status => ({ text: status.name, value: status.name })),
            onFilter: (value, record) => record.estado.includes(value),
            filterMode: 'tree',
            filterSearch: true,
            //filtrar por defecto,
            defaultFilteredValue: ['Espera liberacion', 'Recibido', 'OC Liberada', 'OC Enviada']
        },
        { title: 'Fecha', dataIndex: 'fecha_Creacion_OC', key: 'fecha_Creacion_OC', align: 'center', responsive: ['md'], render: (text, record) => new Date(record.fecha_Creacion_OC).toLocaleDateString() },
        {
            title: 'Nº Solped', dataIndex: 'solped', key: 'solped', align: 'center', render: (text, record) => {
                return record.solped == 0 ? 'Sin Solped' : record.solped
            }
        },
        { title: 'Ordenes estadisticas', dataIndex: 'id_OE', key: 'id_OE', align: 'center' }, // Falta Numero de id
        { title: 'Nº OC', dataIndex: 'numero_OC', key: 'oc', align: 'center' },
        {
            title: 'Proveedor', dataIndex: 'iD_Proveedor', key: 'iD_Proveedor', align: 'center', filters: providers.isSuccess && providers.data.map((provider) => ({ text: provider.nombre_Fantasia, value: provider.nombre_Fantasia })),
            onFilter: (value, record) => record.iD_Proveedor.includes(value),
            filterMode: 'tree',
            filterSearch: true,

        }, // Falta Numero de id
        { title: 'Detalle', dataIndex: 'detalle', key: 'detail', align: 'center' },
        {
            title: 'Recepcion', key: 'recepcion', align: 'center', render: (text, record) => {
                console.log(record)
                return (
                    <div className='flex justify-center gap-2'>
                        {
                            record.estado == 'OC Enviada' ?
                                <div className='flex justify-center gap-2'>
                                    <Button className='px-2' onClick={() => RecepcionTotal(record)} >
                                        <BiCheckDouble />
                                    </Button>
                                    <Button onClick={() => navigate(`/requests-oc/reception/${record.iD_Ticket}`, {
                                        state: { ticket: record }
                                    })} className='px-2'>
                                        <BiCheck />
                                    </Button>
                                    <Button className='px-2'>
                                        <BiX />
                                    </Button>
                                </div>
                                : ''
                        }
                    </div>
                )
            }
        },
        {
            title: 'Ver', key: 'detail', align: 'center', responsive: ['md'], render: (text, record) =>
                <div className='flex justify-center gap-2'>
                    <Button onClick={() => navigate(`/requests-oc/reception/${record.iD_Ticket}`, {
                        state: { ticket: record }
                    })} className='px-2'>
                        <FaEye />
                    </Button>
                </div>
        },
        {
            title: 'Acciones', key: 'actions', align: 'center', render: (text, record) => <Actions Solicitud={record} refetch={refetch} />
        },
    ]

    if (user.isAdmin) {
        columns.push(
            {
                title: 'Seleccionar',
                key: 'selection',
                align: 'center',
                render: (text, record) => {
                    return (
                        <div className='flex justify-center gap-2'>
                            {
                                record.estado == 'Espera liberacion' &&
                                <Button
                                    className='px-2'
                                    onClick={() => {
                                        const selected = selectedRowKeys.includes(record.id_U)
                                        if (selected) {
                                            setSelectedRowKeys(selectedRowKeys.filter(key => key !== record.id_U))
                                        } else {
                                            setSelectedRowKeys([...selectedRowKeys, record.id_U])
                                        }
                                    }}
                                >
                                    {selectedRowKeys.includes(record.id_U) ? <BiCheck /> : <BiX />}
                                </Button>
                            }
                        </div>
                    )
                }
            }
        )
    }

    useEffect(() => {
        if (user.isLiberador && data?.some(ticket => ticket.estado === 'Espera liberacion')) {
            openNotification()
        }
    }, [data])




    return (
        <div>
            {contextHolder}
            <Breadcrumb
                items={[
                    {
                        title: <a href="/solicitud">Inicio</a>,
                    },
                    {
                        title: 'Solicitudes OC',
                    },
                ]}

                className='text-sm mb-4'
            />

            <div className='flex justify-between flex-col lg:flex-row items-center mb-4'>
                <p className='font-semibold text-lg leading-none'>
                    Solicitudes OC
                </p>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-2 mb-4">
                <div className="flex-1 order-1">
                </div>
                {
                    user.isAdmin &&
                    <div className="flex gap-x-2 order-2">
                        <Email selectedRowKeys={selectedRowKeys} allId={data?.filter(ticket => ticket.estado == 'Espera de liberacion')} refetch={refetch} />
                        <Excel />
                        <Subir />
                    </div>
                }
                <Search onChange={handleSearch} handleSearchBetweenDates={handleSearchBetweenDates} />
            </div>

            <div>

            </div>

            <Table
                columns={columns}
                data={isSuccess ? (isNotEmpty(search.ticket) ? search.data : data) : []}
                ActiverowSelection
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
            />
        </div>
    )
}

export default RequestOC
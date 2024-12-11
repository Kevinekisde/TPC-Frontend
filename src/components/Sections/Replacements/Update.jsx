import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, Select, DatePicker } from 'antd'
import { alertSuccess } from '../../../utils/alert'
import Providers from '../../../service/Providers'
import { EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { FloatInput, FloatSelect } from 'ant-float-label'
import useUsers from '../../../hooks/useUsers'
import Replacements from '../../../service/Replacements'

const Update = ({ reemplazo }) => {

    console.log(reemplazo)

    const { data, isLoading, isSuccess } = useUsers()

    console.log(data)


    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false)

    const [modal, setModal] = useState(false)

    const [date, setDate] = useState('')

    const [userVacaciones, setUserVacaciones] = useState(null)

    const onFinish = values => {

        setLoading(true)
        try {

            const vacacionesId = typeof values.id_Usuario_Vacaciones == 'string' ? data.find(user => user.nombre_Usuario === values.id_Usuario_Vacaciones).id_Usuario : values.id_Usuario_Vacaciones
            const reemplazanteId = typeof values.id_Usuario_Reemplazante == 'string' ? data.find(user => user.nombre_Usuario === values.id_Usuario_Reemplazante).id_Usuario : values.id_Usuario_Reemplazante

            Replacements.update(reemplazo.iD_Reemplazos, {
                id_Usuario_Vacaciones: vacacionesId.toString(),
                id_Usuario_Reemplazante: reemplazanteId.toString(),
                comentario: values.comentario,
                fecha_Retorno: reemplazo.fecha_Retorno,
                ID_Reemplazos: reemplazo.iD_Reemplazos
            })
                .then((response) => {
                    setLoading(false)
                    setModal(false)
                    alertSuccess({ message: `Reemplazo Actualizada con éxito` })

                })

        } catch (e) {
            setLoading(false)
            setModal(false)
        }
    }

    const onChange = (date, dateString) => {
        var dateParse = new Date(dateString);
        setDate(dateParse)
    }

    useEffect(() => {
        if (modal) {
            form.setFieldsValue(reemplazo)
        }
    }, [modal, reemplazo])

    return (
        <div>
            <Button
                className="px-2"
                onClick={() => setModal(true)}
            >
                {loading ? <LoadingOutlined /> : <EditOutlined twoToneColor="#52c41a" />}
            </Button>

            {modal && <Modal
                open={modal}
                title="Editar Solicitud"
                centered
                zIndex={3000}
                closable={true}
                destroyOnClose={true}
                maskClosable={false}
                keyboard={false}
                onCancel={() => setModal(false)}
                footer={null}
                width={600}
            >

                <Form form={form} name="edit" onFinish={onFinish} preserve={false} className="pt-4 pb-2">


                    <Form.Item
                        className="mb-2"
                        name="id_Usuario_Vacaciones"
                        rules={[{
                            required: true,
                            message: 'Ingrese Nombre de la persona que se va de vacaciones'
                        }]}
                    >
                        <FloatSelect disabled={loading} placeholder="Persona que se va de vacaciones" onChange={(e) =>
                            setUserVacaciones(e)
                        }>
                            {data.map((user, index) => (
                                <Select.Option key={index} value={user.id_Usuario}>{
                                    `${user.nombre_Usuario} ${user.apellido_paterno} ${user.apellido_materno}`
                                }</Select.Option>
                            ))}
                        </FloatSelect>
                    </Form.Item>


                    <Form.Item
                        className="mb-2"
                        name="id_Usuario_Reemplazante"
                        rules={[{
                            required: true,
                            message: 'Ingrese Nombre del reemplazante'
                        }]}
                    >
                        <FloatSelect disabled={loading} placeholder="Reemplazante">
                            {
                                userVacaciones !== null ?
                                    data.map((user, index) => {
                                        if (user.id_Usuario !== userVacaciones) {
                                            return <Select.Option key={index} value={user.id_Usuario}>{
                                                `${user.nombre_Usuario} ${user.apellido_paterno} ${user.apellido_materno}`
                                            }</Select.Option>
                                        }
                                    }) : null
                            }
                        </FloatSelect>
                    </Form.Item>



                    <Form.Item
                        className="mb-2"
                        name="comentario"
                        rules={[{
                            required: true,
                            message: 'Ingrese un comentario'
                        }]}
                    >
                        <FloatInput
                            placeholder="Comentario"
                            disabled={loading}
                        />
                    </Form.Item>

                    {/* <Form.Item
                        className="mb-2"
                        name="fecha_Retorno"
                        rules={[{
                            required: true,
                            message: 'Ingrese la fecha de retorno'
                        }]}
                    >
                        <DatePicker onChange={onChange} disabled={loading} />
                    </Form.Item> */}

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="mt-4 px-5"
                        loading={loading}
                        disabled={loading}
                        block={true}
                    >
                        Editar
                    </Button>

                </Form>
            </Modal>}
        </div>
    )
}

export default Update
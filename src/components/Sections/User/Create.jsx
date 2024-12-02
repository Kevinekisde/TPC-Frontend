import React, { useState } from 'react'
import { Button, Modal, Form, Input, Select } from 'antd'
import { alertSuccess } from '../../../utils/alert'
import User from '../../../service/User'
import { FloatInput, FloatSelect } from 'ant-float-label'

const Create = ({ refetch }) => {

    const [loading, setLoading] = useState(false)

    const [modal, setModal] = useState(false)

    const onFinish = values => {
        setLoading(true)
        try {


            User.post({
                ...values,
                en_Vacaciones: values.en_Vacaciones === '1' ? true : false,
                admin: values.rol === '1' ? true : false
            })
                .then((response) => {
                    setLoading(false)
                    setModal(false)
                    alertSuccess({ message: `Usuario creado con éxito` })
                    refetch()
                })
                .catch((error) => {
                    setLoading(false)
                    setModal(false)
                    console.log(error)
                })

        } catch (e) {
            console.log(e)
            setLoading(false)
            setModal(false)
        }
    }

    return (
        <div>
            <Button
                className="px-5"
                onClick={() => setModal(true)}
            >
                Agregar
            </Button>

            {modal && <Modal
                open={modal}
                title="Agregar Usuario"
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

                <Form name="create" onFinish={onFinish} preserve={false} className="pt-4 pb-2">

                    <Form.Item
                        className="mb-2"
                        name="nombre_usuario"
                        rules={[{
                            required: true,
                            message: 'Ingrese Nombre'
                        }]}
                    >
                        <FloatInput
                            placeholder="Nombre"
                            disabled={loading}
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-2"
                        name="apellido_paterno"
                        rules={[{
                            required: true,
                            message: 'Ingrese Apellido Paterno'
                        }]}
                    >
                        <FloatInput
                            placeholder="Apellido Paterno"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item
                        className="mb-2"
                        name="apellido_materno"
                        rules={[{
                            required: true,
                            message: 'Ingrese Apellido Materno'
                        }]}
                    >
                        <FloatInput
                            placeholder="Apellido Materno"
                            disabled={loading}
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-2"
                        name="Rut_Usuario"
                        rules={[{
                            required: true,
                            message: 'Ingrese Rut'
                        }]}
                    >
                        <FloatInput
                            placeholder="Rut"
                            disabled={loading}
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-2"
                        name="tipo_Liberador"
                        rules={[{
                            required: true,
                            message: 'Ingrese Liberador'
                        }]}
                    >
                        <FloatSelect placeholder="Liberador" disabled={loading}>
                            <Select.Option value="No">No</Select.Option>
                            <Select.Option value="Liberador Financiero">Liberador Financiero</Select.Option>
                            <Select.Option value="Liberador de Departamento ">Liberador Administrativo</Select.Option>
                            <Select.Option value="Ambos">Ambos</Select.Option>
                        </FloatSelect>
                    </Form.Item>

                    <Form.Item
                        className="mb-2"
                        name="Correo_Usuario"
                        rules={[{
                            required: true,
                            message: 'Ingrese Correo'
                        }]}
                    >
                        <FloatInput
                            placeholder="Correo"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item
                        className="mb-2"
                        name="contraseña_Usuario"
                        rules={[{
                            required: true,
                            message: 'Ingrese Contraseña'
                        }]}

                    >
                        <FloatInput
                            type='password'
                            placeholder="Contraseña"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item
                        className="mb-2"
                        name="en_Vacaciones"
                        rules={[{
                            required: true,
                            message: 'Ingrese si esta en vacaciones'
                        }]}
                    >
                        <FloatSelect placeholder="Vacaciones" disabled={loading}>
                            <Select.Option value="1">Si</Select.Option>
                            <Select.Option value="0">No</Select.Option>
                        </FloatSelect>
                    </Form.Item>


                    <Form.Item
                        className="mb-2"
                        name="rol"
                        rules={[{
                            required: true,
                            message: 'Ingrese Rol'
                        }]}
                    >
                        <FloatSelect placeholder="Rol" disabled={loading}>
                            <Select.Option value="1">Administrador</Select.Option>
                            <Select.Option value="0">Usuario</Select.Option>
                        </FloatSelect>
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="mt-4 px-5"
                        loading={loading}
                        disabled={loading}
                        block={true}
                    >
                        Crear
                    </Button>

                </Form>
            </Modal>}
        </div >
    )
}

export default Create
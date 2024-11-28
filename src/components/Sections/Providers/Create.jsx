import React, { useState } from 'react'
import { Button, Modal, Form, Input, Select } from 'antd'
import { alertSuccess, alertError } from '../../../utils/alert'
import Providers from '../../../service/Providers'
import useBienServicio from '../../../hooks/useBienServicio'

const Create = ({ refetch }) => {

    const { data, isLoading, isSuccess } = useBienServicio()
    const [loading, setLoading] = useState(false)

    const [modal, setModal] = useState(false)



    const onFinish = values => {
        const id = data.find(item => item.bien_Servicio == values.iD_Bien_Servicio).iD_Bien_Servicio

        const dataValues = {
            ...values,
            Id_Bien_Servicio: id.toString(),
            Estado: true,
            banco: values.banco ? values.banco : '',
            swift1: values.swift1 ? values.swift1 : '',
            swift2: values.swift2 ? values.swift2 : ''
        }


        setLoading(true)
        try {

            Providers.post(dataValues)
                .then((response) => {
                    setLoading(false)
                    setModal(false)
                    alertSuccess({ message: `Proveedor creado con éxito` })
                    refetch()
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
                title="Agregar Proveedor"
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
                        name="rut_Proveedor"
                        rules={[{
                            required: true,
                            message: 'Ingrese Rut de Proveedor'
                        }]}
                    >
                        <Input
                            placeholder="Rut"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item
                        className="mb-2"
                        name="razon_Social"
                        rules={[
                            {
                                required: true,
                                message: 'Ingrese Razon Social'
                            }
                        ]}
                    >
                        <Input
                            placeholder="Razon Social"
                            disabled={loading}
                        />
                    </Form.Item>


                    <Form.Item
                        className="mb-2"
                        name="nombre_Fantasia"
                        rules={[{
                            required: true,
                            message: 'Ingrese Nombre Fantasía'
                        }]}
                    >
                        <Input
                            placeholder="Nombre Fantasía"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item
                        className="mb-2"
                        name="iD_Bien_Servicio"
                        rules={[{
                            required: true,
                            message: 'Ingrese Bien/Servicio'
                        }]}
                    >
                        {
                            isSuccess &&
                            <Select
                                placeholder="Bien/Servicio"
                                disabled={loading}
                                showSearch={true}

                            >
                                {
                                    data.map((item, index) => (
                                        <Select.Option key={item.bien_Servicio} value={item.bien_Servicio}>{item.bien_Servicio}</Select.Option>
                                    ))
                                }
                            </Select>
                        }

                    </Form.Item>
                    <Form.Item
                        className="mb-2"
                        name="direccion"
                        rules={[{
                            required: true,
                            message: 'Ingrese Direccion'
                        }]}
                    >
                        <Input
                            placeholder="Direccion"
                            disabled={loading}
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-2"
                        name="comuna"
                        rules={[{
                            required: true,
                            message: 'Ingrese Comuna'
                        }]}
                    >
                        <Input
                            placeholder="Comuna"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item
                        className="mb-2"
                        name="correo_Proveedor"
                        rules={[{
                            required: true,
                            message: 'Ingrese Correo'
                        }]}
                    >
                        <Input
                            placeholder="Correo"
                            disabled={loading}
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-2"
                        name="telefono_Proveedor"
                        rules={[{
                            required: true,
                            message: 'Ingrese Contacto'
                        }]}
                    >
                        <Input
                            placeholder="Contacto"
                            disabled={loading}
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-2"
                        name="cargo_Representante"
                        rules={[{
                            required: true,
                            message: 'Ingrese Cargo Representante'
                        }]}
                    >
                        <Input
                            placeholder="Cargo Representante"
                            disabled={loading}
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-2"
                        name="nombre_Representante"
                        rules={[{
                            required: true,
                            message: 'Ingrese Nombre Representante'
                        }]}
                    >
                        <Input
                            placeholder="Nombre Representante"
                            disabled={loading}
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-2"
                        name="email_Representante"
                        rules={[{
                            required: true,
                            message: 'Ingrese Email Representante'
                        }]}
                    >
                        <Input
                            placeholder="Email Representante"
                            disabled={loading}
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-2"
                        name="n_Cuenta"
                        rules={[{
                            required: true,
                            message: 'Ingrese Numero de cuenta'
                        }]}
                    >
                        <Input
                            placeholder="Numero de cuenta"
                            disabled={loading}
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-2"
                        name="banco"
                        rules={[{
                            required: false,
                            message: 'Ingrese Banco'
                        }]}
                    >
                        <Input
                            placeholder="Banco"
                            disabled={loading}
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-2"
                        name="swift1"
                        rules={[{
                            required: false,
                            message: 'Ingrese Swift'
                        }]}
                    >
                        <Input
                            placeholder="Swift"
                            disabled={loading}
                        />
                    </Form.Item>


                    <Button
                        type="primary"
                        htmlType="submit"
                        className="mt-4 px-5"
                        loading={loading}
                        disabled={loading}
                        block={true}
                    >
                        Guardar
                    </Button>

                </Form>
            </Modal>}
        </div>
    )
}

export default Create
import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input } from 'antd'
import { alertSuccess } from '../../../utils/alert'
import Providers from '../../../service/Providers'
import { EditOutlined, LoadingOutlined } from '@ant-design/icons'

const Update = ({ departamento }) => {



    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false)

    const [modal, setModal] = useState(false)

    const onFinish = values => {

        setLoading(true)
        try {

            Providers.post(values)
                .then((response) => {
                    setLoading(false)
                    setModal(false)
                    alertSuccess({ message: `Departamento creado con éxito` })

                })

        } catch (e) {
            setLoading(false)
            setModal(false)
        }
    }

    useEffect(() => {
        if (modal) {
            form.setFieldsValue(departamento)
        }
    }, [modal, departamento])

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
                title="Editar Departamento"
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
                        name="Nombre"
                        rules={[{
                            required: true,
                            message: 'Ingrese Nombre'
                        }]}
                    >
                        <Input
                            placeholder="Nombre"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item
                        className="mb-2"
                        name="Descripcion"
                        rules={[{
                            required: true,
                            message: 'Ingrese Descripcion'
                        }]}
                    >
                        <Input
                            placeholder="Descripcion"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item
                        className="mb-2"
                        name="Encargado"
                        rules={[{
                            required: true,
                            message: 'Ingrese Encargado'
                        }]}
                    >
                        <Input
                            placeholder="Encargado"
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
                        Editar
                    </Button>

                </Form>
            </Modal>}
        </div>
    )
}

export default Update
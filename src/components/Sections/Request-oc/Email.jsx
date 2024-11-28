import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { MdEmail } from 'react-icons/md'
import Correos from '../../../service/Correos'
import { alertError, alertSuccess } from '../../../utils/alert'

function Email({ selectedRowKeys }) {
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)




    const onFinish = async () => {
        try {
            setLoading(true)
            if (selectedRowKeys.length == 0) {
                Correos.post()
                    .then(response => {
                        setLoading(false)
                        setModal(false)
                        alertSuccess({ message: `Correos Enviados con exito` })
                        console.log(response)
                    })
            }
            if (selectedRowKeys.length > 0) {
                Correos.list({
                    subject: 'Solicitud de OC',
                    Lista: selectedRowKeys
                })
                    .then(response => {
                        setLoading(false)
                        setModal(false)
                        alertSuccess({ message: `Correos Enviados con exito` })
                        console.log(response)
                    })
                    .catch(error => {
                        alertError({ message: `Error al enviar el correo` })
                        console.log(error)
                        setLoading(false)
                        setModal(false)
                    })
            }
        } catch (error) {
            alertError({ message: `Error al enviar el correo` })
            console.log(error)
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
                <MdEmail size={20} />
                Correo a Liberadores
            </Button>
            {
                modal && <Modal
                    open={modal}
                    title="Enviar Correo"
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
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p>{
                            selectedRowKeys.length > 0
                                ?
                                `
                                Se enviaran correos a los liberadores de las ${selectedRowKeys.length} solicitudes seleccionadas
                                `
                                : `No se ha seleccionado ninguna solicitud se enviara un correo a todos los liberadores`
                        }</p>
                        <div className='flex  gap-5 items-center'>
                            <Button
                                disabled={loading}
                                className="px-2"
                                onClick={() => setModal(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                disabled={loading}
                                className="px-2"
                                onClick={() => onFinish()}
                            >
                                Enviar
                            </Button>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default Email
import { Button, Form, Modal, Upload } from 'antd'
import React, { useState } from 'react'
import { AiFillFileExcel } from 'react-icons/ai'
import { DownloadOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import Excels from '../../../service/Excel'

function Excel() {

    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState([])

    const downloadExcel = () => {
        setLoading(true)
        try {
            Excels.OC()
                .then(response => {
                    setLoading(false)
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false)
                })

        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const uploadExcel = () => {
        setLoading(true)
        try {
            Excels.OC()
                .then(response => {
                    setLoading(false)
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false)
                })

        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const propsUpload = {
        maxCount: 1,
        onRemove: file => setFile([]),
        beforeUpload: file => {
            setFile([file])
            return false
        },
        fileList: file
    }

    return (
        <div>

            <Button
                className="px-5"
                onClick={() => setModal(true)}
            >
                {loading ? <LoadingOutlined /> :
                    <AiFillFileExcel size={20} color='green' />
                }
            </Button>
            <Modal
                open={modal}
                title="Importar OC"
                centered
                zIndex={3000}
                closable={true}
                destroyOnClose={true}
                maskClosable={false}
                keyboard={false}
                onCancel={() => setModal(false)}
                footer={null}
            >

                <Form name="import" preserve={false} className='flex flex-col gap-5'>

                    <Button icon={<DownloadOutlined />} onClick={() => downloadExcel()} block>
                        Descargar Excel

                    </Button>

                    <Upload  {...propsUpload} className="w-full">
                        <Button icon={<UploadOutlined />} block>Cargar template</Button>
                    </Upload>


                    <Button
                        type="primary"
                        onClick={() => uploadExcel()}
                        block
                        loading={loading}
                        disabled={file.length === 0}
                    >
                        Subir Excel
                    </Button>

                </Form>

            </Modal>
        </div>
    )
}

export default Excel
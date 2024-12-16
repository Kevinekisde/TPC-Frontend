import React from 'react'
import Update from './Update'
import Delete from './Delete'

function Actions({ departamento, refetch }) {
    return (
        <div className='flex items-center justify-center gap-2'>
            <Update departamento={departamento} refetch={refetch} />
            <Delete departamento={departamento} />
        </div>
    )
}

export default Actions
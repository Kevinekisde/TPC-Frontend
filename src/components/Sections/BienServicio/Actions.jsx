import React from 'react'
import Update from './Update'
import Delete from './Delete'


function Actions({ bienServicio, refetch }) {
    return (
        <div className='flex items-center justify-center gap-2'>
            <Update bienServicio={bienServicio} refetch={refetch} />
            <Delete bienServicio={bienServicio} />
        </div>
    )
}

export default Actions
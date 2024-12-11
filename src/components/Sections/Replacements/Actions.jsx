import React from 'react'
import Cancel from './Cancel'
import Update from './Update'

function Actions({ Reemplazo }) {
    return (
        <div className='flex items-center justify-center gap-2'>

            <Update reemplazo={Reemplazo} />
        </div>
    )
}

export default Actions
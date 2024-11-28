import React from 'react'
import Cancel from './Cancel'
import Update from './Update'

function Actions({ reemplazo }) {
    return (
        <div className='flex items-center justify-center gap-2'>

            <Update reemplazo={reemplazo} />
        </div>
    )
}

export default Actions
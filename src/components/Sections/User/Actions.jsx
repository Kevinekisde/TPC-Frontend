import React from 'react'
import Edit from './Edit'
import Delete from './Delete'


function Actions({ user, refetch }) {
    return (
        <div className='flex items-center justify-center gap-2'>
            <Edit user={user} refetch={refetch} />
            <Delete user={user} />
        </div>
    )
}

export default Actions
import React, { useState } from 'react'
import {
    DeleteFilled,
    EditFilled
} from '@ant-design/icons';
import { notification, Spin } from 'antd'
import swal from '@sweetalert/with-react'
import apis from '../../apis/apis';
function Pro(props) {
    const [showInput, setShowInput] = useState(false)
    const [name, setName] = useState(props.project_name.project_name)
    function toggle() {
        setShowInput(!showInput)
    }
    async function edit(id) {
        if (name === props.project_name.project_name) {
            notification.success({
                message: 'No update was made',
                description: 'Name is the same as the previous'
            })
            toggle()
            return swal.close()
        }
        swal(<Spin />, {
            buttons: false
        })
        let response = await apis.updateProjectName(id, name)
        if (response.status === 'success') {
            await props.reload()
            swal.close()
            notification.success({
                message: 'Update Successful',
            })
            toggle()

        }
        else if (response.status === "failed") {
            swal.close()
            notification.error({
                message: 'Name already exist',
            })
            setName(props.project_name.project_name)
            toggle()
        }
        else {
            swal.close()
            notification.error({
                message: 'Update failed',
                description: 'Bad internet connection or error, please retry'
            })
            toggle()
        }

    }

    async function deleteName(id) {

        swal(<Spin />, {
            buttons: false
        })
        let response = await apis.deleteProjectName(id)
        if (response.status === 'success') {
            await props.reload()
            swal.close()
            notification.success({
                message: 'Deleted Successfully',
            })

        }
        else {
            swal.close()
            notification.error({
                message: 'Delete failed',
                description: 'Bad internet connection or error, please retry'
            })
        }
        toggle()
    }
    return (
        <div className="each_p">
            {
                showInput ?
                    <div className="pro">
                        <input value={name} onChange={(e) => setName(e.target.value)} autoFocus={true} placeholder="project name" />
                        <span className="btn bg-primary text-light ml-1" onClick={() => { edit(props.project_name._id) }}>Submit</span>
                        <span className="btn bg-light text-danger ed" onClick={() => toggle()}>Cancel</span>
                    </div>

                    :
                    <>
                        <span style={{ cursor: 'pointer' }} onClick={() => toggle()}> <h4>{name}</h4></span>

                        <div>
                            <span className="btn bg-light text-primary" onClick={() => toggle()}><span className="ic_"><EditFilled /> </span></span>
                            <span className="btn bg-light text-danger ed" onClick={() => deleteName(props.project_name._id)}> <span className="ic_"><DeleteFilled /> </span></span>
                        </div>
                    </>

            }



        </div>
    )
}

export default Pro

import React, { useContext, useState, useEffect, Fragment } from 'react'
import Pro from './EachProjectName'
import {
    PlusOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import {withRouter } from 'react-router-dom'
import apis from '../../apis/apis';
import { AppContextProvider } from '../../context/AppContext/AppContext';
import { notification, Spin } from 'antd'
import swal from '@sweetalert/with-react'
function ProjectNames(props) {
    const { loadProjectNames } = useContext(AppContextProvider)
    const [names, setNames] = useState([])
    const [t, setT] = useState(false)
    useEffect(() => {
        loadNames()
    }, [t])
    async function loadNames() {
        swal(<Spin />, {
            buttons: false
        })

        let projectNames = await loadProjectNames()
        setNames(projectNames)
        swal.close()
    }

function addProjectName(){
    swal({
        text: 'Enter project name',
        content: "input",
        button: {
            text: "Submit",
            closeModal: true,
        },
    })
        .then(async (e) => {

            if (e) {
                swal(<Spin />, {
                    buttons: false
                })
                let response = await apis.insertProjectName(e)
                if (response.status === 'success') {
                    await loadNames()
                    swal.close()
                    notification.success({
                        message: 'Name added',
                    })
                  return
                }
                else if(response.status === 'failed'){
                    swal.close()
                    notification.error({
                        message: 'Name already used',
                    })
                  return
                }
                else {
                    swal.close()
                    notification.error({
                        message: 'failed',
                        description: 'Bad internet connection or error, please retry'
                    })
                    return
                }
            }
            return swal('', 'Please enter project name', 'error')

        })
}
    

    return (
        <div className="container">
             <div className="p-1 ml-3 mt-3 btn btn-light" onClick={()=>{
                props.history.push('/')
            }}>
               <ArrowLeftOutlined/>
            </div>
            <div className="row justify-content-end d-flex py-4 pr-3">
                <div onClick={()=> addProjectName()} className="btn btn-primary btn-sm">
                    <span> <PlusOutlined /></span> Add Name
                </div>
            </div>
            <div className="row d-flex justify-content-start">
                {names.length === 0 &&
                    <h4 className="mt-4  mb-4 pl-4">No project name added </h4>
                }
                <div className="col-md-8 offset-md-1 p_cont">
                    {names.map(project_name => {
                        return <Fragment key={project_name._id}> <Pro project_name={project_name} reload={() => loadNames()} /> </Fragment>
                    })}
                </div>

            </div>


        </div>
    )
}

export default withRouter(ProjectNames)

import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from "react-router-dom"
import { notification, Spin } from 'antd'
import swal from '@sweetalert/with-react'
import {
    SearchOutlined,
    ArrowRightOutlined,
    CheckCircleFilled,
    ArrowLeftOutlined
} from '@ant-design/icons';

import data from './mockData';
import { AppContextProvider } from '../../context/AppContext/AppContext';
import apis from '../../apis/apis';
function Page1(props) {
    const { loadProjects, projects } = useContext(AppContextProvider)
    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState([])
    const [projectList, setProjectList] = useState([])
    const [state, setStateChanged] = useState(false)
    useEffect(() => {
        loadProjects().then(({ projects, formatedProjects }) => {
            setUsers(projects)
            setProjectList(formatedProjects)
        })
    }, [state])
    function search(query) {
        if (query === "") {
            setUsers(users)
        }
        setQuery(query)
        let filter = []
        const regex_query = new RegExp(query, 'i')
        for (let i of users) {
            if (i.firstname.search(regex_query) >= 0 || i.lastname.search(regex_query) >= 0 || i.username.search(regex_query) >= 0 || i.email.search(regex_query) >= 0 || i.project.search(regex_query) >= 0) {
                filter = [...filter, i]
            }
        }

        setFilter(filter)
    }

    async function toggleReview(id, reviewed) {
        swal(<Spin />, {
            buttons: false
        })
        let response = await apis.updateReview(id, reviewed)
        if (response.status === 'success') {
            const { projects, formatedProjects } = await loadProjects()
            setUsers(projects)
            setProjectList(formatedProjects)
            search(query)
            swal.close()
            notification.success({
                message: response.data.reviewed ? 'Mark reviewed' : 'Mark Unreviewed',
            })
        }
    }
    return (
        <div>
            <div className="p-1 ml-3 mt-3 btn btn-light" onClick={() => {
                props.history.push('/')
            }}>
                <ArrowLeftOutlined />
            </div>
            <div className="inp d-flex justify-content-end">
                <input onChange={(e) => search(e.target.value)} type="text" placeholder="search project name, email or name" />
                <span className="s_i"><SearchOutlined /></span>

            </div>
            <div className="ml-4 col-md-12">
                {query.length > 0 && <p>Search Result</p>}
            </div>

            { query ?
                <div className="container-fluid p-0">
                <div className="row px-2">
                    {
                        filter.map((user, i) => {
                            return (
                                <div className="col-md-4" key={i}>
                                    <div className="user tttp">
                                        {
                                            user.reviewed ?
                                                <span className="checked">
                                                    <CheckCircleFilled />
                                                </span>
                                                :
                                                <span className="checked warn">

                                                </span>
                                        }

                                        <div>
                                            <h5>{user.firstname} {user.lastname}</h5>
                                        </div>
                                        <div className="mt-2">
                                            <h6><b>Username: </b> {user.username}</h6>
                                        </div>
                                        <div className="mt-1">
                                            <h6><b>Email: </b> {user.email}</h6>
                                        </div>
                                        <div className="mt-0">
                                            <h6><b>Project No: </b> {user.project}</h6>
                                        </div>
                                        <div style={{ marginTop: -7 }} className="">
                                            <small><b>Submitted: </b> {new Date(user.date_submitted).toDateString()}-{new Date(user.date_submitted).toLocaleTimeString()}</small>
                                        </div>
                                        <hr />
                                        <div className="mt-3">
                                            <a href={user.project_link} rel="noopener noreferrer" target="_blank" className="btn btn-primary">
                                                Open Project
                                            </a>
                                            <div onClick={() => toggleReview(user._id, user.reviewed)} className={`btn text-primary ml-1`}>
                                                {user.reviewed ? 'Mark as Unreviewed' : 'Mark as reviewed'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>
</div>

                :
                <>
                    { projectList.length > 0 ?
                        projectList.map((project, i) => {
                            return (
                                <div key={i} onClick={() => props.history.push({ pathname: '/each-project', state: { project } })} className="each_pro">
                                    <h4>{project._id}</h4> <span ><ArrowRightOutlined /></span>
                                </div>
                            )
                        })
                        :
                        <div className="row d-flex justify-content-center">
                            <Spin />
                        </div>

                    }
                </>
            }


        </div>
    )
}

export default withRouter(Page1)

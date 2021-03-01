import React, { useState, Fragment, useContext } from 'react'
import { notification, Spin } from 'antd'
import swal from '@sweetalert/with-react'
import {
    SearchOutlined,
    CheckCircleFilled,
    ArrowLeftOutlined
} from '@ant-design/icons';

import ProjectNames from './ProjectNames';
import { AppContextProvider } from '../../context/AppContext/AppContext';
import apis from '../../apis/apis';
function Users(props) {
    const { project } = props.location.state
    const { loadProjects } = useContext(AppContextProvider)

    const [page, setPage] = useState(1)
    const [users, setUsers] = useState(project.users)
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState([])
    function toggle() {
        if (page === 1) {
            return setPage(2)
        }
        setPage(1)
    }

    async function toggleReview(id, reviewed) {
        swal(<Spin />, {
            buttons: false
        })
        let response = await apis.updateReview(id, reviewed)
        if (response.status === 'success') {
            let newProjects = await loadProjects()
            let updatedProject = newProjects.formatedProjects.find((p) => p._id === project._id)
            setUsers(updatedProject.users)
            swal.close()
            notification.success({
                message: response.data.reviewed ? 'Marked reviewed' : 'Marked Unreviewed',
            })

        }
    }
    function checkReviewed() {
        let result = []
        for (let i of users) {
            if (i.reviewed) {
                result = [...result, i]
            }
        }
        setQuery('Project reviewed')
        return setFilter(result)
    }

    function checkUnReviewed() {
        let result = []
        for (let i of users) {
            if (!i.reviewed) {
                result = [...result, i]
            }
        }
        setQuery('Project Unreviewed')
        return setFilter(result)
    }
    function search(query) {
        if (query === "") {
            setUsers(users)
        }
        setQuery(query)
        let filter = []
        const regex_query = new RegExp(query, 'i')
        for (let i of users) {
            if (i.name.search(regex_query) >= 0 || i.email.search(regex_query) >= 0 || i.project.search(regex_query) >= 0) {
                filter = [...filter, i]
            }
        }
        setFilter(filter)
    }
    return (
        <div className="container">

            {/* <div className="svg">
                <img src="https://c7.uihere.com/files/146/673/171/5c3b1fc3cfd8c.jpg" alt="checking" />
            </div> */}
            <div className="row">
                <div className="col-md-12 offset-md-0">
                    <div className="p_c">
                        <div className="row d-flex justify-content-around selector">
                            <span className={page !== 1 ? "default" : "current"} onClick={() => props.history.push('/projects')}>
                                All Projects
                            </span>
                            <span onClick={() => toggle()} className={page !== 2 ? "default" : "current"}>
                                Project Names
                            </span>
                        </div>

                        {
                            page === 1 ?
                                <Fragment>

                                    <div className="inp d-flex justify-content-end">
                                        <input value={query} onChange={(e) => search(e.target.value)} type="text" placeholder="search by name, email" />
                                        <span className="s_i"><SearchOutlined /></span>
                                        {/* <span className="btn btn-primary">
                                            Search <span><SearchOutlined /></span>
                                        </span> */}
                                    </div>

                                    <div className="row user_row">
                                        {
                                            !query && <div className="col-md-12">
                                                <h4 className="ml-2">{project._id}</h4>
                                            </div>
                                        }

                                        <div className="ml-4 col-md-12">
                                            {query.length > 0 && <p>Search Result {filter.length}</p>}
                                            <span style={{ float: 'right' }} className="mr-3">
                                                <span className="ttt">Filter by:</span>
                                                <span onClick={() => checkReviewed()} className="btn btn-sm btn-primary uui mx-1">Reviewed</span>
                                                <span onClick={() => checkUnReviewed()} className="btn btn-sm btn-primary uui mx-1">Unreviewed</span>
                                            </span>

                                        </div>
                                        {
                                            (query ? filter : users).map((user, i) => {
                                                return (
                                                    <div className="col-md-4 mkmkk" key={i}>
                                                        <div className="user">
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
                                                                <div onClick={() => toggleReview(user._id, user.reviewed)} className="btn btn-light text-primary ml-1">
                                                                    {user.reviewed ? 'Mark as Unreviewed' : 'Mark as reviewed'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }



                                    </div>
                                    {/* <Page1/> */}
                                </Fragment>
                                :
                                <ProjectNames />
                        }




                    </div>
                </div>
            </div>


        </div>

    )
}

export default Users

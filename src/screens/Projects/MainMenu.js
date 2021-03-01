import React, { useState, Fragment } from 'react'
import ProjectList from './ProjectList'
import ProjectNames from './ProjectNames'
function Projects() {
    const [page, setPage] = useState(1)
    function toggle() {
        if (page === 1) {
            return setPage(2)
        }
        setPage(1)
    }
    return (
        <div className="container">
            <div className="svg">
                <img src="https://c7.uihere.com/files/146/673/171/5c3b1fc3cfd8c.jpg" alt="checking" />
            </div>
            <div className="row">
                <div className="col-md-11 offset-md-0">
                    <div className="p_c">
                        <div className="row d-flex justify-content-around selector">
                            <span onClick={() => toggle()} className={page !== 1 ? "default" : "current"}>
                                All Projects
                            </span>
                            <span onClick={() => toggle()} className={page !== 2 ? "default" : "current"}>
                                Project Names
                            </span>
                        </div>
                        {
                            page === 1 ?
                                <Fragment>
                                    <ProjectList />
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

export default Projects

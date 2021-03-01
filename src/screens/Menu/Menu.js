import React from 'react'
import {
   ArrowRightOutlined
  } from '@ant-design/icons';
function Menu(props) {
    return (
        <div className="container mt-4">
            <div className="row d-flex justify-content-between">
                <div className="col-md-6">
                    <div className="card_cont" onClick={()=> props.history.push('/projects')}>
                        <div>
                            <h1>Project Management</h1>
                            <div className="btn btn-primary">
                            Proceed <span className="ml-1" ><ArrowRightOutlined/> </span>
                        </div>
                        </div>
                        <div className="card_img">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Microsoft_Project_%282019%E2%80%93present%29.svg/880px-Microsoft_Project_%282019%E2%80%93present%29.svg.png" alt="card_image"/>

                        </div>
                        
                    </div>
                </div>

                <div className="col-md-6">
                <div onClick={()=> window.location= 'https://auth.calendly.com/oauth/authorize?client_id=kquzN7LrU_tpbXtsRRCrKfmXw-EMwuQx2oOiNpu__mc&response_type=code&redirect_uri=https://projectmanaga2384.herokuapp.com'} className="card_cont">
                        <div className="c2">
                            <h1>Mentorship Session</h1>
                            <div className="btn btn-primary">
                            Proceed <span className="ml-1"><ArrowRightOutlined/> </span>
                        </div>
                        </div>
                        <div className="card_img">
                            <img src="https://tutornerd.com/Content/img/become/tutor.svg" alt="card_image"/>
                        </div>
                       
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Menu

import React, { useEffect, useState } from 'react'
import apis from '../../apis/apis'
import swal from '@sweetalert/with-react'
import {
    ArrowRightOutlined
} from '@ant-design/icons';
import { Modal, Button } from 'antd';
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import { Spin } from 'antd'
function Calendly(props) {
    const { organization, token } = props.match.params
    const initLink = `https://api.calendly.com/scheduled_events?organization=https://api.calendly.com/organizations/${organization}&sort=start_time:desc&count=6`
    const [events, setEvents] = useState({})
    const [pages, setPages] = useState([])
    const [changed, setChanged] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [invitees, setInvitees] = useState({})
    const [eventName, setEventName] = useState('')
    const showModal =async (uri, name) => {
        swal(<Spin />, {
            buttons: false
        })
        setEventName(name)
    let resp = await apis.getInvitees(uri, token)
    setInvitees(resp)
    console.log(resp)
    swal.close()
    setIsModalVisible(true);
    
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    useEffect(() => {
        apis.getEvents(token, organization)
            .then(fetchedEvents => {
                console.log(fetchedEvents)
                if (fetchedEvents.title === "Unauthenticated") {
                    swal(
                        <div>
                            <div>Access Token Expired, Regenerating new, please wait...</div>
                            <Spin />
                        </div>, {
                        buttons: false
                    })
                    return window.location = 'https://auth.calendly.com/oauth/authorize?client_id=kquzN7LrU_tpbXtsRRCrKfmXw-EMwuQx2oOiNpu__mc&response_type=code&redirect_uri=https://projectmanaga2384.herokuapp.com'
                }
                setChanged(true)
                setEvents(fetchedEvents)
                setPages([initLink, fetchedEvents.pagination.next_page])


            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changed])
 
    function nextPage(url) {
        swal(
            <>
                <Spin />
            </>, {
            buttons: false
        })

        apis.getEvents(token, organization, url ? url : events.pagination.next_page)
            .then(fetchedEvents => {
                if (fetchedEvents.title === "Unauthenticated") {
                    swal(
                        <div>
                            <div>Access Token Expired, Regenerating new, please wait...</div>
                            <Spin />
                        </div>, {
                        buttons: false
                    })
                    return window.location = 'https://auth.calendly.com/oauth/authorize?client_id=kquzN7LrU_tpbXtsRRCrKfmXw-EMwuQx2oOiNpu__mc&response_type=code&redirect_uri=https://projectmanaga2384.herokuapp.com'
                }

                setChanged(true)
                setEvents(fetchedEvents)
                console.log(fetchedEvents)
                if(!url){
                    setPages([...pages, fetchedEvents.pagination.next_page])
                }
            
                swal.close()
            })

    }



    return (
        <div>
            <div className="p-1 ml-3 mt-3 btn btn-light" onClick={()=>{
                props.history.push('/')
            }}>
               <ArrowLeftOutlined/>
            </div>

            <div className="container-fluid p-4 mt-4">

                <h4 style={{marginTop:-40}}>
                    Darey Meetings
                </h4>
                <div className="row d-flex justify-content-end my-4">

                    <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.6)' }} className="mr-2 ">Active </span> <span className="active_ ml-1 mr-4"></span>
                    <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.6)' }} className="ml-4 mr-2">Meeting Cancelled</span> <span className="nonactive_ mr-4"></span>
                </div>


                <div className="row nk">
                    <div className="col-3">
                        Name of Event
                    </div>
                    <div className="col-1">
                        Created At
                    </div>
                    <div className="col-1">
                        Start Time
                    </div>
                    <div className="col-1">
                        End Time
                    </div>
                    <div className="col-3">
                        Location Information
                    </div>
                    <div className="col-1">
                        Invitee Counters
                    </div>


                    <div className="col-1">
                        Status
                    </div>

                    <div className="col-1">
                        Invitees
                    </div>
                </div>

                {events.collection &&
                    events.collection.map((event) => {
                        return (
                            <div className="row  items">
                                <div className="col-3">
                                    {event.name}
                                </div>
                                <div className="col-1 text-center">
                                    {new Date(event.created_at).toLocaleString()}
                                </div>
                                <div className="col-1 text-center">
                                    {new Date(event.start_time).toLocaleString()}

                                </div>
                                <div className="col-1 text-center">
                                    {new Date(event.end_time).toLocaleString()}

                                </div>
                                <div style={{ fontSize: 11 }} className="col-3 nmm">
                                    <div>
                                        Type:  {event.location.type}
                                    </div>
                                    {
                                        event.location.join_url ?
                                            <>
                                                <div className="text-center my-1">
                                                    Join Link:   <a style={{ fontSize: 11 }} href={event.location.join_url}>
                                                        {event.location.join_url}
                                                    </a>
                                                </div>
                                                <div className="text-center my-1">
                                                {event.location.data.password? <>Password  {event.location.data.password}</> : null}

                                                </div>
                                            </>
                                            :
                                            <div className="text-center my-1">
                                                {event.location.location}
                                            </div>
                                    }


                                </div>
                                <div className="col-1">
                                    <div>
                                        active: {event.invitees_counter.active}
                                    </div>
                                    <div className="ml-1">
                                        limit: {event.invitees_counter.limit}
                                    </div>
                                    <div className="ml-1">
                                        total: {event.invitees_counter.total}
                                    </div>



                                </div>


                                <div className="col-1">
                                    {
                                        event.status === "active" ?
                                            <span className="active_"></span>
                                            :
                                            <span className="nonactive_"></span>
                                    }

                                </div>

                                <div className="col-1 mm">
                                    <div onClick={()=>showModal(event.uri, event.name)}
                                      style={{ fontSize: 9 }} className="btn btn-primary btn-sm">
                                        View Invitees
                                    </div>
                                </div>
                            </div>
                        )
                    })

                }
                <div className="row d-flex justify-content-end px-4 my-4">
                    {
                        pages.map((page_link, i) => {
                            return (
                                <span  onClick={() => nextPage(page_link)} style={{fontSize:15, border: '1px solid rgba(0,0,0,0.1)' }} className="btn btn-light mb-1 mr-1 ">{i + 1}</span>
                            )
                        })
                    }
                    <div onClick={() => {
                        nextPage()
                    }} className="btn btn-primary btn-round mr-4">
                        Next Page <span><ArrowRightOutlined /></span>
                    </div>


                </div>
            </div>

            <>


     {
         invitees.collection &&  <Modal className="ik" title={eventName} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
         <div className="row nk lol">
                       <div className="col-3">
                           Name 
                       </div>
                       <div className="col-2">
                           Email
                       </div>
                       <div className="col-2">
                           Time Zone
                       </div>
   
                       <div className="col-3">
                           Time Invited
                       </div>
                       <div className="col-2">
                           Status
                       </div>
                   
                   </div>
                   {
                       invitees.collection.map(i=>{
                           return(
                       <div className="row nk lol nnm">
                       <div className="col-3">
                           {i.name }
                       </div>
                       <div className="col-2">
                           {i.email}
                       </div>
                       <div className="col-2">
                           {i.timezone}
                       </div>
   
                       <div className="col-3">
                           {new Date(i.created_at).toLocaleString()}
                       </div>
                       <div className="col-2">
                           {i.status}
                       </div>
                   
                   </div>
                           )
   
                       })
                   }
     
         </Modal>
     }
     
    </>


        </div>
    )
}

export default Calendly

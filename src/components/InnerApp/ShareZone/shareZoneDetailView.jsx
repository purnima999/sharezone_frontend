import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Table } from 'reactstrap';
import nodata from '../../../images/nodata.svg';
import { deleteZoneRequest, editZoneDetailsRequest, getZonesbyEmailIdRequest } from '../../../store/ShareZone/slice';
import { setActionTypeAndActionData } from '../../../store/UtilityCallFunction/slice';
import { getActionTypes } from '../../../_mock/internalJsControl';

const ShareZoneDetailView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { zoneData } = useSelector((state) => (state.shareZoneSlice));

    useEffect(() => {
        dispatch(getZonesbyEmailIdRequest())
    }, []);

    const handleRoomSelection = (roomname) => {
        dispatch(setActionTypeAndActionData({ actionData: roomname }))
        navigate("/sharezone_room")
    }


    const editHandle = (selectedZone) => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.EDIT, actionData: selectedZone }))
    }

    const deleteHandle = (id) => {
        dispatch(deleteZoneRequest(id))
    }

    return (
        <React.Fragment>
            {zoneData?.length > 0 && <div className='wflexScroll d-flex flex-column mb-2'>
                <div className='flex-grow-1'>
                    <Table borderless responsive className='al_listtable pt-2 al-pad mb-0 al_approveusers'>
                        <thead className='sticky_header'>
                            <tr>
                                <th>
                                    <div onClick={() => { }}>
                                        Zone Name
                                        {false ? (
                                            <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                        ) : <i className="icon_alfred_tablesort" />}
                                    </div>
                                </th>
                                <th>
                                    <div onClick={() => { }}>
                                        Description
                                    </div>
                                </th>
                                <th>
                                    <div onClick={() => { }}>
                                        People
                                        {false ? (
                                            <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                        ) : <i className="icon_alfred_tablesort" />}
                                    </div>
                                </th>
                                <th>
                                    <div onClick={() => { }}>
                                        Created on
                                        {false ? (
                                            <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                        ) : <i className="icon_alfred_tablesort" />}
                                    </div>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {zoneData && zoneData?.map((x) => {
                                return (
                                    <>
                                        <tr>
                                            <td><div className='al_text_link d-inline-block' onClick={() => handleRoomSelection(x.roomname)}>{x.roomname}</div></td>
                                            <td>This room is for Demo</td>
                                            <td>only you</td>
                                            <td>{moment(new Date()).format("MM-DD-YYYY")}</td>
                                            <td>
                                                <div className='d-flex gap-2'>
                                                    <button type="button" className='al_button_sm al_savebtn'>Copy invite link</button>
                                                    <button type="button" className='al_button_sm al_testbtn' onClick={() => editHandle(x)}>Edit</button>
                                                    <button type="button" className="al_button_sm al_button_cancel" onClick={() => deleteHandle(x.id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>}

            {zoneData?.length === 0 && <div className="d-flex flex-column align-items-center pt-5">
                <img src={nodata} width={220} alt="No data" />
                <h6 className="mt-3 mb-0">No data found!</h6>
            </div>}

        </React.Fragment >
    )
}

export default ShareZoneDetailView;
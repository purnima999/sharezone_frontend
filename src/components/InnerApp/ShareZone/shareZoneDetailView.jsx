import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { getZonesbyEmailIdRequest } from '../../../store/ShareZone/slice';
import moment from 'moment';
import { setActionTypeAndActionData } from '../../../store/UtilityCallFunction/slice';
import { useNavigate } from 'react-router';

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

    return (
        <React.Fragment>
            <div className='wflexScroll d-flex flex-column mb-2'>
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
                                                    <button type="button" className='al_button_sm al_testbtn'>Edit</button>
                                                    <button type="button" className="al_button_sm al_button_cancel">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </React.Fragment >
    )
}

export default ShareZoneDetailView;
import React from 'react'
import { Table } from 'reactstrap';

const ShareZoneDetailView = () => {
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
                            <tr>
                                <td><div className='al_text_link d-inline-block' >Zone1</div></td>
                                <td>This is for class</td>
                                <td>p1</td>
                                <td>111</td>
                                <td>
                                    <div className='d-flex gap-2'>
                                        <button type="button" className='al_button_sm al_savebtn'>Copy invite link</button>
                                        <button type="button" className='al_button_sm al_testbtn'>Edit</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><div className='al_text_link d-inline-block' >Zone2</div></td>
                                <td>This is for class</td>
                                <td>p1</td>
                                <td>111</td>
                                <td>
                                    <div className='d-flex gap-2'>
                                        <button type="button" className='al_button_sm al_savebtn'>Copy invite link</button>
                                        <button type="button" className='al_button_sm al_testbtn'>Edit</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </React.Fragment >
    )
}

export default ShareZoneDetailView;
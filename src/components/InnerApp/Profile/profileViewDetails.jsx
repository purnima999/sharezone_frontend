import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Label, Row } from "reactstrap";
import { getActionTypes, getProfileTabs } from '../../../_mock/internalJsControl';
import { setActionTypeAndActionData } from '../../../store/UtilityCallFunction/slice';

export const ProfileViewDetails = () => {
    const dispatch = useDispatch();

    const { getProfileDetails } = useSelector((state) => state?.utilityCallFunctionSlice);

    const openModelHandle = (actionType, actionData) => {
        dispatch(setActionTypeAndActionData({ actionType, actionData }))
    }

    return (
        <React.Fragment>
            <h2 className="cs_semibold mb-1 text-capitalize">
                {getProfileDetails?.username}
            </h2>
            <h6 className="al_profile_role mb-2">
                {getProfileDetails?.email}
            </h6>
            <div className="al_pointsearned mb-4">
                Points Earned: 89
            </div>
            <hr />
            <Row>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.education || "N/A"}</div>
                        <Label>Highest Education</Label>
                    </div>
                </Col>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.dob || "N/A"}</div>
                        <Label>Date of Birth</Label>
                    </div>
                </Col>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.age || "N/A"}</div>
                        <Label>Age</Label>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.gender || "N/A"}</div>
                        <Label>Gender</Label>
                    </div>
                </Col>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.mobile || "N/A"}</div>
                        <Label>Mobile</Label>
                    </div>
                </Col>
            </Row>
            <hr />
            <div className="al_profilebtns">
                <button type="button" className="mb-3" onClick={() => openModelHandle(getActionTypes.SELECT, getProfileTabs.CHANGEPASSWORD)}>
                    <i className="icon_alfred_password"></i>Change Password
                </button>
            </div>
            <div className="mt-3">
                <button
                    type="submit"
                    className="al_savebtn"
                    onClick={() => openModelHandle(getActionTypes.EDIT)}
                >
                    Edit
                </button>
            </div>
        </React.Fragment>
    )
}

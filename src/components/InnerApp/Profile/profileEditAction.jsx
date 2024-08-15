import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from "moment/moment";
import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from 'yup';
import { allowedNumbersOnField, customContentValidation, getActionTypes, getEductaionOptions, getGenderoptions } from '../../../_mock/helperIndex';
import { addProfileImageRequest, profileDetailsAndProfileImageUpdateRequest } from '../../../store/Profile/slice';
import { setActionTypeAndActionData } from "../../../store/UtilityCallFunction/slice";

const genderoptions = getGenderoptions;
const educationOptions = getEductaionOptions;

export const ProfileEditAction = () => {
    const dispatch = useDispatch();

    const { uploadedProfileImage } = useSelector((state) => state?.profileSlice);
    const { getProfileDetails } = useSelector((state) => state?.utilityCallFunctionSlice);

    const handleCancel = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT }))
        dispatch(addProfileImageRequest(""))
    }

    return (
        <React.Fragment>
            <Formik
                enableReinitialize
                initialValues={{
                    username: getProfileDetails?.username !== "NA" ? getProfileDetails?.username : "",
                    email: getProfileDetails?.email !== "NA" ? getProfileDetails?.email : "",
                    dob: getProfileDetails?.dob !== "NA" ? getProfileDetails?.dob : "",
                    gender: getProfileDetails?.gender !== "NA" ? getProfileDetails?.gender : "",
                    mobile: getProfileDetails?.mobile !== "NA" ? getProfileDetails?.mobile : "",
                    education: getProfileDetails?.education !== "NA" ? getProfileDetails?.education : "",
                }}
                validationSchema={Yup.object().shape({
                    username: customContentValidation('Full Name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
                    mobile: Yup.string().required("Mobile number is required"),
                    dob: Yup.date().required("Dob is required").nullable(),
                    gender: Yup.string().required("This field is required"),
                    bloodtype: Yup.string().required(
                        "Blood Type is required"
                    ),
                    rtype: Yup.string().required("This field is required"),
                    education: Yup.string().required(
                        "Education is required"
                    ),
                })}
                onSubmit={(values) => {
                    // Handle form submission here
                    let data = {
                        ...values,
                        dob: moment(values.dob).format("YYYY-MM-DD"),
                        nationality: "United State"
                    };
                }}
            >
                {({
                    values,
                    setFieldValue,
                    setFieldTouched,
                    dirty
                }) => {
                    return (
                        <>
                            <Form>
                                <Row>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>Full
                                                Name
                                            </Label>
                                            <Field
                                                type="text"
                                                name="username"
                                                placeholder="e.g.John Doe"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="username"
                                                component={"div"}
                                                className="text-danger"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                Gender
                                            </Label>
                                            <Select
                                                options={genderoptions}
                                                name="gender"
                                                value={genderoptions?.find(
                                                    (option) =>
                                                        option.value === values?.gender
                                                )}
                                                onChange={(selectedOption) =>
                                                    setFieldValue("gender", selectedOption?.value)
                                                }
                                                onBlur={() => setFieldTouched("gender", true)}
                                                className="inputSelect"
                                            />
                                            <ErrorMessage
                                                name="gender"
                                                component={"div"}
                                                className="text-danger"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>Date
                                                of Birth
                                            </Label>
                                            <DatePicker
                                                className={'form-control ' + (values?.dob ? '' : 'al_calendarIcon')}
                                                name="dob"
                                                placeholderText="e.g.MM/DD/YYYY"
                                                popperPlacement="auto"
                                                popperModifiers={[{
                                                    flip: {
                                                        behavior: ["bottom"],
                                                    },
                                                    preventOverflow: {
                                                        enabled: false,
                                                    },
                                                }]}
                                                selected={new Date(values?.dob) || ""}
                                                onChange={(e) => {
                                                    setFieldValue("dob", e);
                                                }}
                                                dateFormat={"yyyy/MM/dd"}
                                                maxDate={new Date()}
                                                onBlur={() => setFieldTouched("dob", true)}
                                                autoComplete="off"
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                isClearable={true}
                                            />
                                            <ErrorMessage
                                                name="dob"
                                                component={"div"}
                                                className="text-danger"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                Mobile
                                            </Label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span
                                                        className="input-group-text"
                                                        id="basic-addon1"
                                                    >
                                                        +1
                                                    </span>
                                                </div>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    name="mobile"
                                                    placeholder="e.g.123-4567-8901"
                                                    onKeyPress={(e) => allowedNumbersOnField(10, e)}
                                                    aria-describedby="basic-addon1"
                                                />
                                            </div>
                                            <ErrorMessage
                                                name="mobile"
                                                component={"div"}
                                                className="text-danger"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                Highest Education
                                            </Label>
                                            <Select
                                                options={educationOptions}
                                                name="education"
                                                className="inputSelect"
                                                value={educationOptions.find(
                                                    (option) => option.value === values.education
                                                )}
                                                onChange={(selectedOption) => {
                                                    setFieldValue("education", selectedOption ? selectedOption.value : "");
                                                }}
                                            />
                                            <ErrorMessage
                                                name="education"
                                                component={"div"}
                                                className="text-danger"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <div className="mt-3">
                                    <button type="submit" disabled={uploadedProfileImage && uploadedProfileImage?.file !== "" ? false : !dirty} className="al_savebtn">
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="al_cancelbgbutton mx-3"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Form>
                        </>
                    );
                }}
            </Formik>
        </React.Fragment>
    )
}

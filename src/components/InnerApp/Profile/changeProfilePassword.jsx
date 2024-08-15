import React from "react";
import { Icon } from "@iconify/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, Label, Modal, ModalBody } from 'reactstrap';
import * as Yup from 'yup';
import { passwordReg } from "../../../_mock/RegularExp";
import { getActionTypes } from "../../../_mock/internalJsControl";
import { changeProfilePasswordRequest } from "../../../store/Profile/slice";
import { setActionTypeAndActionData } from "../../../store/UtilityCallFunction/slice";

export const ChangeProfilePassword = ({ props }) => {
    const dispatch = useDispatch();

    const { error } = useSelector((state) => (state?.profileSlice));

    const handleSubmit = (formData) => {
        let reqObj = {
            old_password: formData?.currentPassword,
            new_password: formData?.newPassword
        }
        dispatch(changeProfilePasswordRequest(reqObj))
    }

    const handleClose = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT }))
    }

    return (
        <React.Fragment>
            <Modal isOpen={true} className="al_confirm_modal" wrapClassName="al_outerparentwp">
                <ModalBody className="wflexLayout p-0">
                    <div className='wflexScroll'>
                        <Formik
                            initialValues={{
                                currentPassword: "",
                                newPassword: "",
                                confirmPassword: "",
                                oldPasswordEyeClose: false,
                                newPasswordEyeClose: false
                            }}
                            validationSchema={Yup.object().shape({
                                currentPassword: Yup.string().max(50, "Max 50 characters are allowed").required("Current Password is required"),
                                newPassword: Yup.string()
                                    .max(50, "Max 50 characters are allowed")
                                    .matches(passwordReg, "Please enter a valid password")
                                    .required("New Password is required"),
                                confirmPassword: Yup.string().when("newPassword", {
                                    is: val => (val && val.length > 0 ? true : false),
                                    then: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("newPassword")], 'Password must match')
                                })
                            }
                            )}
                            onSubmit={(values) => {
                                handleSubmit(values)
                            }}
                        >{({ values, setFieldValue }) => (
                            <Form>
                                <h5>Change Password</h5>
                                <FormGroup>
                                    <Label>
                                        <span className="requiredLabel">*</span>
                                        Current Password
                                    </Label>
                                    <div className="d-flex align-items-end position-relative">
                                        <Field name="currentPassword" type={values?.oldPasswordEyeClose ? "text" : "password"} className="form-control" placeholder="e.g.Pass@123" />
                                        <div
                                            onClick={() => setFieldValue('oldPasswordEyeClose', !values?.oldPasswordEyeClose)}
                                            className="password_icon"
                                        >
                                            <Icon icon={values?.oldPasswordEyeClose ? 'bi:eye' : 'bi:eye-slash'} width="1.2em" height="1.2em" />
                                        </div>
                                    </div>
                                    <ErrorMessage name="currentPassword" component={"div"} className="text-danger" />
                                    {error && <div className="text-danger my-2">{error}</div>}
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <span className="requiredLabel">*</span>
                                        New Password
                                    </Label>
                                    <div className="d-flex align-items-end position-relative">
                                        <Field name="newPassword" type={values?.newPasswordEyeClose ? "text" : "password"} className="form-control" placeholder="e.g.Pass@123" />
                                        <div
                                            onClick={() => setFieldValue('newPasswordEyeClose', !values?.newPasswordEyeClose)}
                                            className="password_icon"
                                        >
                                            <Icon icon={values?.newPasswordEyeClose ? 'bi:eye' : 'bi:eye-slash'} width="1.2em" height="1.2em" />
                                        </div>
                                    </div>
                                    <div className="al_note mt-2 fw-light">
                                        Password must contain 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character
                                    </div>
                                    <ErrorMessage name="newPassword" component={"div"} className="text-danger" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <span className="requiredLabel">*</span>
                                        Confirm Password
                                    </Label>
                                    <Field name="confirmPassword" type="password" className="form-control" placeholder="e.g.****" />
                                    <ErrorMessage name="confirmPassword" component={"div"} className="text-danger" placeholder="e.g.Pass@123" />
                                </FormGroup>
                                <div className="mt-4">
                                    <button type="submit" className="btn al_button_add me-3" >
                                        Update
                                    </button>
                                    <button type="submit" className="btn al_button_cancel" onClick={handleClose}>
                                        Cancel
                                    </button>
                                </div>
                            </Form>
                        )}
                        </Formik>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment >
    )
}
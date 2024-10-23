import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { allowedNumbersOnField, customContentValidation, getGenderoptions, pageTitle } from "../../_mock/helperIndex";
import { registrationRequest } from "../../store/Register/slice";

export default function RegisterInfo() {
  pageTitle("Register")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actionData } = useSelector((state) => state.utilityCallFunctionSlice)
  const genderoptions = getGenderoptions;

  return (
    <div className="al_login_container">
      <Formik
        enableReinitialize
        initialValues={{
          username: actionData?.username || "",
          email: actionData?.email || "",
          password: actionData?.password || ""
        }}
        validationSchema={Yup.object().shape({
          // Define validation rules for Register form fields
          username: customContentValidation('Full name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
          email: Yup.string()
            .trim()
            .max(50, "Maximum 50 characters are allowed")
            .email("Invalid email")
            .required("Email is required"),
          // mobile: Yup.string().required("Mobile number is required"),
          password: Yup.string().required("Password is required")
        })}
        onSubmit={(values) => {
          console.log("values", values);
          dispatch(registrationRequest({ values, navigate }))
        }}
      >
        {({ values, setFieldValue, setFieldTouched, }) => {
          return (
            <Form className="wflexLayout">
              <Row className="al_login_section">
                <div className="al_login_right h-100">
                  <div className="wflexLayout al_mx-auto">
                    <div className="wflex-items-center wflexLayout">
                      <>
                        <h6 className="mb-2">Personal Details</h6>
                        <div className="al_login-form al_registrationform wflexScroll">
                          <FormGroup>
                            <Label>
                              <span className="requiredLabel">*</span>Full Name
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
                          <FormGroup>
                            <Label>
                              <span className="requiredLabel">*</span>Email ID
                            </Label>
                            <Field
                              type="text"
                              name="email"
                              placeholder="e.g.abc@email.com"
                              className="form-control"
                              onChange={(e) => {
                                const trimmedValue = e.target.value.trim();
                                setFieldValue("email", trimmedValue);
                              }}
                            />
                            <ErrorMessage
                              name="email"
                              component={"div"}
                              className="text-danger"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>
                              <span className="requiredLabel">*</span>Password
                            </Label>
                            <Field
                              type="text"
                              name="password"
                              placeholder="e.g.Pass@123"
                              className="form-control"
                              onChange={(e) => {
                                const trimmedValue = e.target.value.trim();
                                setFieldValue("password", trimmedValue);
                              }}
                            />
                            <ErrorMessage
                              name="password"
                              component={"div"}
                              className="text-danger"
                            />
                          </FormGroup>
                          {/* <FormGroup>
                            <Label>
                              <span className="requiredLabel">*</span>Mobile
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
                          </FormGroup> */}
                        </div>
                        <div className="al_login_footer mt-3">
                          <button
                            type="submit"
                            className="al_login_button"
                          >
                            Continue
                          </button>
                          <button
                            type="button"
                            className="al_login_button_back mt-3"
                          >
                            <Link to="/signin">
                              Back to <strong>Sign in</strong>
                            </Link>
                          </button>
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

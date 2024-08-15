import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { pageTitle } from "../../_mock/internalJsControl";
import Loading from "../MainLayout/Loading";

export default function ForgotPassword() {
  pageTitle("ForgotPassword")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, actionData } = useSelector((state) => state.patientRegisterSlice);

  const handleFirstFormSubmit = (values) => {

  };
  return (
    <div className="al_login_container">
      <Formik
        enableReinitialize
        initialValues={{
          email: actionData?.email || "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required("Mobile Number / Email-ID field is required")
            .matches(
              /^(?:[0-9]{10}|\w+[.-]*\w+@\w+\.[A-Za-z]{2,3})$/,
              "Invalid email or phone number"
            ),
        })}
        onSubmit={(values) => handleFirstFormSubmit({ ...values })}
      >
        {({ values, errors, setFieldValue }) => {
          return (
            <Form className="wflexLayout">
              {isLoading && <Loading />}
              <Row className="al_login_section" style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
                <div className="al_login_right h-80">
                  <div className="wflexLayout al_mx-auto">
                    <div className="wflex-items-center wflexLayout" >
                      <h5>Forgot Password</h5>

                      <div className="al_login-form wflexScroll">
                        <FormGroup>
                          <Label> Email ID</Label>
                          <Field
                            type="text"
                            name="email"
                            placeholder="e.g. abc@email.com"
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
                      </div>
                      <div className="al_login_footer mt-3">
                        <button type="submit" className="al_login_button">
                          Verify
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

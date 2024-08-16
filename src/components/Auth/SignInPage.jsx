import { Icon } from "@iconify/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormGroup, Label, Row, UncontrolledTooltip } from "reactstrap";
import * as Yup from "yup";
import { pageTitle } from "../../_mock/helperIndex";
import handwave from '../../images/handwave.png';
import Loading from "../MainLayout/Loading";
import { signinRequest } from "../../store/Register/slice";

export default function Signin() {
    pageTitle('Signin');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const { isLoading, isAuthenticated } = useSelector((state) => state.utilityCallFunctionSlice);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="al_login_container">
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string()
                        .trim()
                        .required("Mobile Number / Email-ID field is required")
                        .matches(
                            /^(?:[0-9]{10}|\w+[.-]*\w+@\w+\.[A-Za-z]{2,3})$/,
                            "Invalid email or phone number"
                        ),
                    password: Yup.string()
                        .max(50, "Max 50 characters are allowed")
                        .required("Password is required"),
                })}
                onSubmit={(values) => {
                    dispatch(signinRequest({ values, navigate }))
                }}
            >
                {({ setFieldValue }) => {
                    return (
                        <Form className="wflexLayout">
                            {isLoading && <Loading />}
                            <Row className="al_login_section">
                                <div className="al_login_right">
                                    <Link to="/">
                                        <div className="al_homemenu" id="backtohome">
                                            <i className="icon_alfred_home"></i>
                                            <UncontrolledTooltip
                                                modifiers={[
                                                    { preventOverflow: { boundariesElement: "window" } },
                                                ]}
                                                placement="left"
                                                target="backtohome"
                                            >
                                                Back to Home
                                            </UncontrolledTooltip>
                                        </div>
                                    </Link>
                                    <div className="wflexLayout al_mx-auto align-items-center justify-content-center">
                                        <div className="wflexScroll w-100">
                                            <h5 className="mb-1">
                                                <span className="fw-medium">Welcome to </span>
                                                <br />
                                                <span style={{ fontSize: "26px" }}>
                                                    Share
                                                    <span className="text-info">
                                                        Zone.AI{" "}
                                                        <img
                                                            src={handwave}
                                                            alt=""
                                                            width={25}
                                                            className="mb-2"
                                                        />
                                                    </span>
                                                </span>
                                            </h5>
                                            <p
                                                className="cs_light text-grey text-italic mb-4"
                                                style={{ fontFamily: "STIX Two Text" }}
                                            >
                                                "Let's collaborate together"
                                            </p>

                                            <div className="al_signinbg">
                                                <div className="al_login-form">
                                                    <FormGroup>
                                                        <Label>Email ID</Label>
                                                        <Field
                                                            type="text"
                                                            name="username"
                                                            placeholder="e.g.abc@email.com"
                                                            className="form-control"
                                                            onChange={(e) => {
                                                                const trimmedValue = e.target.value.trim();
                                                                setFieldValue("username", trimmedValue);
                                                            }}
                                                        />
                                                        <ErrorMessage
                                                            name="username"
                                                            component={"div"}
                                                            className="text-danger"
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Password</Label>
                                                        <div className="d-flex align-items-end position-relative">
                                                            <Field
                                                                type={showPassword ? "text" : "password"}
                                                                name="password"
                                                                placeholder="e.g.Pass@123"
                                                                className="form-control"
                                                            />
                                                            <div onClick={togglePasswordVisibility} className="password_icon">
                                                                <Icon icon={"bi:eye" + showPassword ? "-slash" : ""} width="1.2em" height="1.2em" />
                                                            </div>
                                                        </div>
                                                        <ErrorMessage name="password" component={"div"} className="text-danger" />
                                                    </FormGroup>
                                                </div>
                                                <div className="al_login_footer">
                                                    <div>
                                                        <Link to="/forgot-password" className="al_forgot_pw">
                                                            Forgot password?
                                                        </Link>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="al_login_button mt-3"
                                                    >
                                                        Sign in
                                                    </button>
                                                    <div className="mt-3 text-medium">
                                                        Don’t have an account?{" "}
                                                        <Link
                                                            to="/register"
                                                            className="al_text_link cs_medium"
                                                        >
                                                            Signup
                                                        </Link>
                                                    </div>
                                                </div>
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

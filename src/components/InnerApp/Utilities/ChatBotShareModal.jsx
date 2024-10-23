import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { FormGroup, Label, Modal, ModalBody } from 'reactstrap';
import * as Yup from 'yup';
import { sendChatByEmailOrMobileRequest } from '../../../store/EducationaChatBot/slice';

export const ChatBotShareModal = ({ props }) => {
    const dispatch = useDispatch();

    let { shareActionHandle, actionData } = props;

    const moalCloseHandle = () => {
        shareActionHandle(false, null);
    };

    return (
        <>
            <Formik
                initialValues={{
                    selectedChanel: ""
                }}
                validationSchema={Yup.object().shape({
                    selectedChanel: Yup.string().required('Please select at least one option.')
                })}
                onSubmit={(values) => {
                    console.log('submit=>', values);
                    dispatch(sendChatByEmailOrMobileRequest({ values, actionData }))
                }}
            >
                {({ }) => (
                    <Modal className='modal-sm detailsModal' isOpen={true} wrapClassName="al_outerparentwp">
                        <div className='d-flex align-items-center justify-content-between p-4'>
                            <h6 className='mb-0'>Share Your Chat</h6>
                            <i className="icon_alfred_close pointer" title="Close" onClick={moalCloseHandle}></i>
                        </div>
                        <ModalBody className="wflexLayout p-0">
                            <Form className='wflexLayout'>
                                <div className='wflexScroll px-4 my-4'>
                                    <FormGroup check inline className="d-flex me-0 ps-0 flex-wrap">
                                        <Label className="d-flex align-center me-3">
                                            <Field
                                                type="radio"
                                                name="selectedChanel"
                                                value="email"
                                                className="me-2"
                                            />
                                            Email
                                        </Label>
                                        <Label className="d-flex align-center me-3">
                                            <Field
                                                type="radio"
                                                name="selectedChanel"
                                                value="mobile"
                                                className="me-2"
                                            />
                                            Phone Number
                                        </Label>
                                    </FormGroup>

                                    <ErrorMessage name="selectedChanel" component="div" className="text-danger" />

                                    <div className='mt-4'>
                                        <button type="submit" className="al_button_add me-3">
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="al_button_cancel"
                                            onClick={moalCloseHandle}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </ModalBody>
                    </Modal>
                )}
            </Formik>
        </>
    );
};

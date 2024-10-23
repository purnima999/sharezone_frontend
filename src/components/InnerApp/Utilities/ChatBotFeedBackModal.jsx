import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Card, CardBody, Col, FormGroup, Modal, ModalBody, Row } from 'reactstrap';
import { getActionTypes } from '../../../_mock/internalJsControl';

let promptdislikeQuestions = [
    { qid: 1, question: "Should not have used memory" },
    { qid: 2, question: "Do not like the style" },
    { qid: 3, question: "Not factually correct" },
    { qid: 4, question: "Did not fully follow instructions" },
    { qid: 5, question: "Refused when it should not have" },
    { qid: 6, question: "Being lazy" },
    { qid: 7, question: "Unsafe or problematic" }
]

export const ChatBotFeedBackModal = ({ props }) => {

    const [isSubmitDisable, setSubmitDisable] = useState(false);
    let { setActionTypesForPrompt, handlePromptTabs } = props

    const moalCloseHandle = () => {
        setActionTypesForPrompt(getActionTypes.UNSELECT, true)
    }

    const handleModalPromptTab = (values, isTabClicked = false) => {
        handlePromptTabs(values)
        setSubmitDisable(isTabClicked)
    }

    return (
        <>
            <Formik
                initialValues={{
                    comment: ""
                }}
                // validationSchema={Yup.object().shape({
                //     comment: customContentValidation('Comment is required', { patternType: 'alphaNumeric', message: 'alphaNumeric' },),
                // })}
                onSubmit={(values) => {
                    handleModalPromptTab(values?.comment)
                }}
            >{({ values, setFieldValue }) => (
                <Modal className='modal-sm detailsModal' isOpen={true} wrapClassName="al_outerparentwp">
                    <div className='d-flex align-items-center justify-content-between p-4'>
                        <h6 className='mb-0'>Submit Feedback to Hello Alfred</h6>
                        <i className="icon_alfred_close pointer" title="Close" onClick={moalCloseHandle}></i>
                    </div>
                    <ModalBody className="wflexLayout p-0">
                        <Form className='wflexLayout'>
                            <div className='wflexScroll px-4 my-4'>
                                <Row className="al_promptcard">
                                    {promptdislikeQuestions && promptdislikeQuestions?.map((promptQuestion, index) => (
                                        <Col xs="auto" className="mb-2 pe-0" key={promptQuestion?.qid}>
                                            <Card className='al_cardview pointer'
                                                style={{ position: "unset", minWidth: "unset", borderRadius: "8px" }}
                                                onClick={() => handleModalPromptTab(promptQuestion?.question, true)}
                                            >
                                                <CardBody className='px-3 py-1'>
                                                    <div className="text-xs-small lh-normal">{promptQuestion?.question}</div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                                <FormGroup className='mt-3'>
                                    <Field
                                        as="textarea"
                                        name="comment"
                                        value={values?.comment}
                                        placeholder='Enter Remarks'
                                        className='form-control'
                                        rows="4"
                                        onChange={(e) => setFieldValue("comment", e?.target?.value)}
                                    />
                                    <ErrorMessage
                                        name="comment"
                                        component={"div"}
                                        className="text-danger"
                                    />
                                </FormGroup>
                                <div className='mt-4'>
                                    <button
                                        type="submit"
                                        className="al_button_add me-3"
                                        disabled={isSubmitDisable}
                                    >Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="al_button_cancel"
                                        onClick={moalCloseHandle}
                                    >Cancel
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            )}
            </Formik>
        </>
    )
}
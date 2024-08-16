import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { FormGroup, Label, Modal, ModalBody } from 'reactstrap';
import * as Yup from 'yup';
import { getActionTypes } from '../../../_mock/internalJsControl';
import { createZoneRequest } from '../../../store/ShareZone/slice';
import { setActionTypeAndActionData } from '../../../store/UtilityCallFunction/slice';

const ShareZoneModal = () => {
    const dispatch = useDispatch();

    const handleModalClose = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT }))
    }

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    roomname: ""
                }}
                validationSchema={Yup.object().shape({
                    roomname: Yup.string().required("Room name is required")
                })}
                onSubmit={(values) => {
                    console.log("submit=>", values);
                }}
            >{({ values,errors }) => (
                <>
                    <Form>
                        {console.log("979879879879879879989", values, errors)}
                        <Modal className='modal-sm detailsModal' isOpen={true} wrapClassName="al_outerparentwp">
                            <div className='d-flex align-items-center justify-content-between p-4'>
                                <h6 className='mb-0'>Create Zone</h6>
                                <i className="icon_alfred_close pointer" title="Close" onClick={handleModalClose}></i>
                            </div>
                            <ModalBody className="wflexLayout p-0">
                                <div className='wflexScroll px-4 mb-4'>
                                    <FormGroup>
                                        <Label>Your Zone Name</Label>
                                        <Field
                                            type="text"
                                            name="roomname"
                                            placeholder="e.g.abc@email.com"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="roomname"
                                            component={"div"}
                                            className="text-danger"
                                        />
                                    </FormGroup>
                                    <div className='mt-2'>
                                        <button
                                            type="button"
                                            className="al_button_cancel me-3"
                                            onClick={handleModalClose}
                                        >Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="al_button_add"
                                            onClick={() => dispatch(createZoneRequest({ values }))}
                                        >Save
                                        </button>
                                    </div>
                                </div>
                            </ModalBody>
                        </Modal>
                    </Form>
                </>
            )}
            </Formik>
        </React.Fragment>
    )
}

export default ShareZoneModal
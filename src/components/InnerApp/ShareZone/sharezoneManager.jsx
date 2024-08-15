import React, { useState } from 'react'
import { Col, Modal, ModalBody, Row } from 'reactstrap';
import ShareZoneDetailView from './shareZoneDetailView';
import ShareZoneInternalManager from './shareZoneInternalManager';

const SharezoneManager = () => {
  const [view, setView] = useState(false);

  return (
    <React.Fragment>
      <div className="wflexLayout">
        <div className='al-pad d-flex align-items-center pb-1'>
          <Col className='d-flex align-items-center'>
            <button type="button" className="al_add_dashed_button mb-0" onClick={() => setView("add")}>
              <i className='icon_alfred_plus me-2'></i>
              Create Zone
            </button>
          </Col>
        </div>
        <ShareZoneDetailView />
        <ShareZoneInternalManager />
      </div>

      <Modal className='modal-sm detailsModal' isOpen={view} wrapClassName="al_outerparentwp">
        <div className='d-flex align-items-center justify-content-between p-4'>
          <h6 className='mb-0'>Create Zone</h6>
          <i className="icon_alfred_close pointer" title="Close" onClick={() => setView(false)}></i>
        </div>
        <ModalBody className="wflexLayout p-0">
          <div className='wflexScroll px-4 mb-4'>
            <Row>
              <inpiut type="text" />
            </Row>
            <div className='mt-2'>
              <button
                type="button"
                className="al_button_cancel me-3"
                onClick={() => setView(false)}
              >Cancel
              </button>
              <button
                type="submit"
                className="al_button_add"
              >Save
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default SharezoneManager
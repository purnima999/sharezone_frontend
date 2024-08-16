import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import { getActionTypes } from '../../../_mock/internalJsControl';
import { setActionTypeAndActionData } from '../../../store/UtilityCallFunction/slice';
import ShareZoneDetailView from './shareZoneDetailView';
import ShareZoneInternalManager from './shareZoneInternalManager';
import ShareZoneModal from './shareZoneModal';

const SharezoneManager = () => {
  const dispatch = useDispatch();

  const { actionType } = useSelector((state) => (state?.utilityCallFunctionSlice));

  const modalOpenHandle = (data) => {
    dispatch(setActionTypeAndActionData({ actionType: getActionTypes.SELECT }))
  }

  return (
    <React.Fragment>
      <div className="wflexLayout">
        <div className='al-pad d-flex align-items-center pb-1'>
          <Col className='d-flex align-items-center'>
            <button type="button" className="al_add_dashed_button mb-0" onClick={modalOpenHandle}>
              <i className='icon_alfred_plus me-2'></i>
              Create Zone
            </button>
          </Col>
        </div>
        <ShareZoneDetailView />
        <ShareZoneInternalManager />
      </div>

      {actionType === getActionTypes.SELECT && <ShareZoneModal />}
    </React.Fragment>
  )
}

export default SharezoneManager
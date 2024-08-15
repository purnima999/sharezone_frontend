import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import { getActionTypes } from "../../_mock/internalJsControl";
import { setConfirmationClose } from "../../store/UtilityCallFunction/slice";

export default function ConfirmationAction() {
  const dispatch = useDispatch();

  const { confirmationData } = useSelector((state) => (state?.utilityCallFunctionSlice));

  const handleConfirmationYesOrNo = (isYes) => {
    if (isYes) {
      let confimOptions = {
        ...confirmationData,
        actionType: getActionTypes.UNSELECT
      }
      confirmationData?.callApi(confirmationData?.actionData)
      dispatch(setConfirmationClose(confimOptions))
    } else {
      dispatch(setConfirmationClose({}))
    }
  }

  console.log("ConfirmationAction=>", confirmationData)

  return (
    <>
      {confirmationData && (
        <Modal
          isOpen={confirmationData?.actionType === getActionTypes.ISCONFIRM ? true : false}
          className="al_confirm_modal"
          wrapClassName="al_outerparentwp"
        >
          <ModalBody>
            <h5 className="text-center text-wrap al_modal_heading">
              Confirmation
            </h5>
            <h5 className="text-center text-wrap al_modal_subheading">
              Do you want to save this data
            </h5>
          </ModalBody>

          <div className="modelFooter text-center mb-3">
            <Button
              type="button"
              className="text-capitalize btn al_button_add"
              onClick={() => handleConfirmationYesOrNo(true)}
            >
              OK
            </Button>
            <Button
              type="button"
              className="text-capitalize btn al_button_cancel"
              onClick={() => handleConfirmationYesOrNo(false)}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
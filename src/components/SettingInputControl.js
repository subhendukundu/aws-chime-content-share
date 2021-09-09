import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ControlBarButton,
  CameraSelection,
  Cog,
} from "amazon-chime-sdk-component-library-react";

const SettingInputControl = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  return (
    <>
      {showModal && (
        <Modal size="md" rootId="modal-root" onClose={toggleModal}>
          <ModalHeader title="Welcome to the demo meeting" />

          <ModalBody>
            <p style={{ margin: "0 0 0.5rem" }}>
              Start this meeting with your name. If meeting name is not
              available we will generate a new, unique and private meeting ID
              for you.
            </p>
            <div>
              <CameraSelection />
            </div>
          </ModalBody>
        </Modal>
      )}
      <ControlBarButton
        icon={<Cog />}
        onClick={toggleModal}
        label="Toggle settings"
      />
    </>
  );
};

export default SettingInputControl;

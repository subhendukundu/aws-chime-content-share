import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalButtonGroup,
  ModalButton,
  Input,
  FormField,
} from "amazon-chime-sdk-component-library-react";

export const Join = ({ onSubmit }) => {
  const [currentName, setName] = useState("");

  return (
    <Modal size="md" rootId="modal-root">
      <ModalHeader title="Welcome to the demo meeting" />

      <ModalBody>
        <p style={{ margin: "0 0 0.5rem" }}>
          Start this meeting with your name. If meeting name is not available we
          will generate a new, unique and private meeting ID for you.
        </p>
        <div>
          <FormField
            field={Input}
            label="First Name"
            fieldProps={{
              name: "firstName",
              placeholder: "Enter your first name",
            }}
            value={currentName}
            onChange={(e) => {
              console.log(e?.target?.value);
              setName(e?.target?.value);
            }}
            layout="stack"
            errorText="This is required."
            error={false}
          />
        </div>
      </ModalBody>
      <ModalButtonGroup
        primaryButtons={[
          <ModalButton
            onClick={() => onSubmit(currentName)}
            variant="primary"
            label="submit"
          />,
        ]}
      />
    </Modal>
  );
};

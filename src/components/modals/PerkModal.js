import React, { Fragment, useState } from "react";
import { ModalBody, Modal } from "reactstrap";
import PerkBox from "../perks/PerkBox";

export default function PerkModal({ selectedPerks }) {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <Fragment>
      <PerkBox
        selectedPerks={selectedPerks}
        toggle={() => setIsToggled(true)}
      />

      <Modal
        isOpen={isToggled}
        size=""
        toggle={() => setIsToggled(!isToggled)}
        centered
      >
        <ModalBody>
          <PerkBox modal={true} selectedPerks={selectedPerks} />
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

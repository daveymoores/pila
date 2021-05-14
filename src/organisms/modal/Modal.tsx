import { Card, Layer } from "grommet";
import React from "react";

import Button from "../../atoms/button/Button";
import { colorPalette } from "../../theme/pila";

interface Modal {
  onClose?: () => void;
}

const Modal: React.FC<Modal> = ({ children, onClose }) => {
  const handleClose = onClose || (() => location.reload());

  return (
    <Layer
      onClickOutside={handleClose}
      onEsc={handleClose}
      background={"transparent"}
    >
      <Card
        background={"brand"}
        align="center"
        justify="center"
        gap="small"
        alignSelf="center"
        pad="large"
        width={{ min: "400px" }}
      >
        {children}
        <Button
          label="Close"
          margin={{ top: "medium" }}
          color={colorPalette.green}
          onClick={handleClose}
        />
      </Card>
    </Layer>
  );
};

export default Modal;

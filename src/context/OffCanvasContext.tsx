import React, { Dispatch, SetStateAction } from "react";

interface OffCanvasContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const OffCanvasContext = React.createContext<OffCanvasContextProps>({
  isOpen: false,
  setIsOpen: () => null,
});

export default OffCanvasContext;

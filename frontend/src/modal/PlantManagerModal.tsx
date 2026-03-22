import { useEffect } from "react";
import ReactDOM from "react-dom";

import RenderPlantManagerModalContent from "./RenderPlantManagerModalContent";
import CloseModal from "../components/CloseModal";
import { Card } from "@/components/ui/card";

interface PlantManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionName: string | null;
  defaultValues?: object;
}

const PlantManagerModal: React.FC<PlantManagerModalProps> = ({
  isOpen,
  onClose,
  actionName,
  defaultValues,
}) => {
  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     const target = event.target as HTMLElement;
  //     if (!target.closest(".plant-manager-modal-content") && isOpen) {
  //       onClose();
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleOutsideClick);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [isOpen, onClose]);

  // Prevent scrolling of body content when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.body.classList.add("lg:overflow-auto");
      document.body.classList.remove("overflow-auto");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup function to reset overflow style when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.remove("md:overflow-auto");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/80"></div>
      <div
        className="
      flex
      items-center
      plant-manager-modal-content 
      md:absolute 
      md:left-1/2 
      md:top-1/2 
      md:transform 
      md:-translate-x-1/2
      md:-translate-y-1/2

      "
      >
        <Card className="flex flex-col justify-center items-center w-screen h-screen md:h-auto md:w-[400px] p-10 mx-auto relative">
          <CloseModal {...{ onClose }} />
          <RenderPlantManagerModalContent
            content={actionName}
            onClose={onClose}
            defaultValues={defaultValues}
          />
        </Card>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default PlantManagerModal;

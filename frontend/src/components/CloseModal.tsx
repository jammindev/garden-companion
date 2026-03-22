import { CircleX } from "lucide-react";
import { Button } from "./ui/button";

interface CloseModalProps {
  onClose: () => void;
}

const CloseModal: React.FC<CloseModalProps> = ({ onClose }) => {
  return (
    <Button
      variant={"ghost"}
      onClick={onClose}
      size={"icon"}
      className="absolute right-4 top-4"
    >
      <CircleX />
    </Button>
  );
};

export default CloseModal;

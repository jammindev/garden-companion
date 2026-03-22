import WateringForm from "@/features/dashboard-modules/actions/WateringForm";
import DirectSowingForm from "../features/dashboard-modules/actions/DirectSowingForm";
import PlantingForm from "../features/dashboard-modules/actions/PlantingForm";
import RemoveForm from "@/features/dashboard-modules/actions/RemoveForm";
import HarvestForm from "@/features/dashboard-modules/actions/HarvestForm";
import WeedForm from "@/features/dashboard-modules/actions/WeedForm";
import TreatForm from "@/features/dashboard-modules/actions/TreatForm";
import FertilizeForm from "@/features/dashboard-modules/actions/FertilizeForm";
import ObservationForm from "@/features/dashboard-modules/actions/ObservationForm";

interface RenderPlantManagerModalContentProps {
  content: string | null;
  onClose: () => void;
  defaultValues?: object;
}

const RenderPlantManagerModalContent: React.FC<
  RenderPlantManagerModalContentProps
> = ({ content, onClose, defaultValues }) => {
  switch (content) {
    case "direct-sowing":
      return <DirectSowingForm onClose={onClose} />;
    // case "indirect-sowing":
    //   return <IndirectSowingForm />;
    case "planting":
      return <PlantingForm onClose={onClose} defaultValues={defaultValues} />;
    case "harvest":
      return <HarvestForm onClose={onClose} />;
    case "remove":
      return <RemoveForm onClose={onClose} />;
    case "weed":
      return <WeedForm onClose={onClose} />;
    case "treat":
      return <TreatForm onClose={onClose} />;
    case "fertilize":
      return <FertilizeForm onClose={onClose} />;
    case "observation":
      return <ObservationForm onClose={onClose} />;
    case "water":
      return <WateringForm onClose={onClose} />;
    default:
      return null;
  }
};

export default RenderPlantManagerModalContent;

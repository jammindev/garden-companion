import { action_names } from "@/constants";

import DirectSowingForm from "@/features/dashboard-modules/actions/DirectSowingForm";
import PlantingForm from "@/features/dashboard-modules/actions/PlantingForm";
import WateringForm from "@/features/dashboard-modules/actions/WateringForm";
import FertilizeForm from "@/features/dashboard-modules/actions/FertilizeForm";
import TreatForm from "@/features/dashboard-modules/actions/TreatForm";
import HarvestForm from "@/features/dashboard-modules/actions/HarvestForm";
import RemoveForm from "@/features/dashboard-modules/actions/RemoveForm";
import WeedForm from "@/features/dashboard-modules/actions/WeedForm";
import ObservationForm from "@/features/dashboard-modules/actions/ObservationForm";

import directSowingIcon from "@/assets/actions-icons/direct-sowing.png";
import harvestIcon from "@/assets/actions-icons/harvest.png";
import plantingIcon from "@/assets/actions-icons/planting.png";
import removeIcon from "@/assets/actions-icons/remove.png";
import cameraIcon from "@/assets/actions-icons/camera.png";
import wateringIcon from "@/assets/actions-icons/watering.png";
import fertilizeIcon from "@/assets/actions-icons/fertilize.png";
import weedIcon from "@/assets/actions-icons/weed.png";
import parasiteIcon from "@/assets/actions-icons/parasite.png";

const actionFormMap = {
  [action_names.SOWING]: {
    index: 0,
    icon: directSowingIcon,
    title: "Semer",
    form: DirectSowingForm,
  },
  [action_names.PLANTING]: {
    index: 1,
    icon: plantingIcon,
    title: "Planter",
    form: PlantingForm,
  },
  [action_names.WATERING]: {
    index: 2,
    icon: wateringIcon,
    title: "Arroser",
    form: WateringForm,
  },
  [action_names.FERTILIZING]: {
    index: 3,
    icon: fertilizeIcon,
    title: "Fertiliser",
    form: FertilizeForm,
  },
  [action_names.TREATING]: {
    index: 4,
    icon: parasiteIcon,
    title: "Traiter",
    form: TreatForm,
  },
  [action_names.HARVESTING]: {
    index: 5,
    icon: harvestIcon,
    title: "Récolter",
    form: HarvestForm,
  },
  [action_names.REMOVING]: {
    index: 6,
    icon: removeIcon,
    title: "Fin de culture",
    form: RemoveForm,
  },
  [action_names.WEEDING]: {
    index: 7,
    icon: weedIcon,
    title: "Désherber",
    form: WeedForm,
  },
  [action_names.OBSERVING]: {
    index: 8,
    icon: cameraIcon,
    title: "Observer",
    form: ObservationForm,
  },
};

export default actionFormMap;

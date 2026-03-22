// Component that render a area description: area icon, the name of the
// area and the list of vegetables that grow in this area

import { Button } from "@/components/ui/button";
import { AreaInterface } from "../../../../interfaces/interfaces";
import VegetableIconsList from "./VegetableIconsList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DiaryAndProductionModal from "../../../../components/DiaryAndProductionModal";

interface AreaListItemInterface {
  area: AreaInterface;
  openModal: (area: AreaInterface) => void;
  areaIcon: string | undefined;
}

const AreaListItem: React.FC<AreaListItemInterface> = ({ area, areaIcon }) => {
  return (
    <li className="flex gap-3 w-full ">
      <DiaryAndProductionModal area={area}>
        <Button
          className="flex py-0 h-8 w-full justify-start gap-5"
          variant="ghost"
        >
          <div className="cursor-pointer flex  gap-3 max-w-52">
            <img className="w-5 h-5" src={areaIcon} alt="" />
            <span className="text-lg font-thin overflow-hidden whitespace-nowrap text-ellipsis">
              {area.name}
            </span>
          </div>
          <VegetableIconsList area={area} />
        </Button>
      </DiaryAndProductionModal>
    </li>
  );
};

export default AreaListItem;

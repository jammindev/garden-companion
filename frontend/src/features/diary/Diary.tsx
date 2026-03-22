import directSowingIcon from "../../assets/actions-icons/direct-sowing.png";
import plantingIcon from "../../assets/actions-icons/planting.png";
import harvestIcon from "../../assets/actions-icons/harvest.png";
import waterIcon from "../../assets/actions-icons/watering.png";
import removeIcon from "../../assets/actions-icons/remove.png";
import treatIcon from "../../assets/actions-icons/parasite.png";
import cameraIcon from "../../assets/actions-icons/camera.png";
import weedIcon from "../../assets/actions-icons/weed.png";
import fertilizeIcon from "../../assets/actions-icons/fertilize.png";

import { AreaInterface } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axiosInstance from "@/api/axios";
import { Filter, Loader2 } from "lucide-react";
import backendRoutes from "@/api/apiRoutes";
import { DiaryItemGeneral } from "./DiaryItems";

const SOWING = "SOWING";
const PLANTING = "PLANTING";
const REMOVING = "REMOVING";
const WATERING = "WATERING";
const FERTILIZING = "FERTILIZING";
const TREATING = "TREATING";
const HARVESTING = "HARVESTING";
const WEEDING = "WEEDING";
const OBSERVING = "OBSERVING";

interface ActionFilterSelectProps {
  icon: string;
  text: string;
  type: string;
  actionTypes: string[];
  setActionTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ActionInterface {
  uuid: string;
  date: string;
  operation_type: string;
  vegetable: {
    name: string;
    variety: string;
    quantity: number;
    quantity_unit: string;
  };
  description?: string;
  photos?: { photo: string }[];
  quantity?: number;
  quantity_unit?: string;
  product_name?: string;
  area: {
    id: string;
  };
}

export const ActionFilterSelect: React.FC<ActionFilterSelectProps> = ({
  icon,
  text,
  type,
  actionTypes,
  setActionTypes,
}) => {
  const [isSelected, setIsSelected] = useState(true);

  useEffect(() => {
    setIsSelected(actionTypes.includes(type));
  }, [actionTypes]);

  const handleClick = () => {
    if (actionTypes.length === 9) {
      setActionTypes((prev) =>
        prev.filter((actionType) => actionType === type)
      );
      return;
    }

    if (actionTypes.includes(type)) {
      setActionTypes((prev) =>
        prev.filter((actionType) => actionType !== type)
      );
    } else {
      setActionTypes((prev) => [...prev, type]);
    }
    setIsSelected(!isSelected);
  };

  return (
    <div className="mx-auto">
      <div
        className="flex flex-col items-center justify-between gap-2 cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={icon}
          alt=""
          className="w-10"
          style={{ filter: isSelected ? "" : "grayscale(100%)" }}
        />
        <span
          className={`text-sm text-center font-medium leading-none ${
            isSelected ? "font-medium" : "font-thin"
          } `}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

interface DiarayProps {
  area: AreaInterface | undefined;
}
const Diary: React.FC<DiarayProps> = ({ area }) => {
  const actionType = [
    SOWING,
    PLANTING,
    WATERING,
    FERTILIZING,
    TREATING,
    HARVESTING,
    REMOVING,
    WEEDING,
    OBSERVING,
  ];
  const [actions, setActions] = useState<ActionInterface[]>([]);
  const [actionTypes, setActionTypes] = useState(actionType);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getActions = async () => {
      try {
        setIsLoading(true)
        let response;
        if (area) {
          response = await axiosInstance.get(
            backendRoutes.operations + `?area=${area.uuid}`
          );
        } else {
          response = await axiosInstance.get(backendRoutes.operations);
        }
        setActions(response.data);
      } catch (error) {
        console.error(error);
        throw new Error("Can't fetch areas from the server");
      } finally {
        setIsLoading(false)
      }
    };
    getActions();
  }, [area]);

  const ActionFilterList = [
    { icon: directSowingIcon, text: "Semis", type: "SOWING" },
    { icon: plantingIcon, text: "Plantation", type: "PLANTING" },
    { icon: waterIcon, text: "Arrosage", type: "WATERING" },
    { icon: fertilizeIcon, text: "Fertilisation", type: "FERTILIZING" },
    { icon: treatIcon, text: "Traitement", type: "TREATING" },
    { icon: harvestIcon, text: "Récolte", type: "HARVESTING" },
    { icon: removeIcon, text: "Fin de culture", type: "REMOVING" },
    { icon: weedIcon, text: "Désherbage", type: "WEEDING" },
    { icon: cameraIcon, text: "Observation", type: "OBSERVING" },
  ];

  if (isLoading === true) {
    return (
      <div className="w-full h-full flex justify-center mt-5">
        <Loader2 className="animate-spin mr-3" />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-5 items-center">
      {actions.length > 0 ? (
        <Popover>
          <PopoverTrigger asChild className="gap-2 ml-auto mt-4 ">
            <Button>
              <Filter strokeWidth={1.5} />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent
            asChild
            className="w-80 flex flex-col items-center gap-2 dark:bg-slate-900"
          >
            <div>
              <span
                className="p-1 hover:underline cursor-pointer"
                onClick={() => setActionTypes(actionType)}
              >
                Réinitialiser
              </span>
              <div className="grid grid-cols-3 gap-8">
                {ActionFilterList.map((action) => (
                  <ActionFilterSelect
                    key={action.type}
                    icon={action.icon}
                    text={action.text}
                    type={action.type}
                    actionTypes={actionTypes}
                    setActionTypes={setActionTypes}
                  />
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <div>Aucune donnée à afficher</div>
      )}

      {actions
        .filter((action) => actionTypes.includes(action.operation_type))
        .map((action) => (
          <DiaryItemGeneral action={action} key={action.uuid} setActions={setActions} />
        ))}
    </div>
  );
};

export default Diary;

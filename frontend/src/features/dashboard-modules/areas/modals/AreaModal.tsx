// lib
import ReactDOM from "react-dom";

// hooks
import { useEffect, useState } from "react";

// assets
import { greenhouse64, outdoor64, indoor64 } from "../../../../assets/assets-path";

// components
import Diary from "../../../diary/Diary";
import TableProduction from "../../../../components/table-production/TableProduction";
import { AreaInterface } from "@/interfaces/interfaces";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";

import AreaFormModify from "../components/AreaFormModify";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  area: AreaInterface | undefined;
}

// function to get the right area icon based of the environnement
const getAreaIcon = (env: string) => {
  let areaIcon: string | undefined;
  if (env === "I") areaIcon = indoor64;
  if (env === "G") areaIcon = greenhouse64;
  if (env === "O") areaIcon = outdoor64;
  return areaIcon;
};

const AreaModal: React.FC<AreaModalProps> = ({ isOpen, onClose, area }) => {
  const [currentArea, setCurrentArea] = useState();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    setCurrentArea(area);
  }, [area]);

  const [diaryOpen, setDiaryOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(true);

  const tableDisplay = () => {
    if (!tableOpen) {
      setDiaryOpen(false);
      setTableOpen(true);
    }
  };

  const diaryDisplay = () => {
    if (!diaryOpen) {
      setDiaryOpen(true);
      setTableOpen(false);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <Card
        className="
        area-modal-content 
        bg-green-50 dark:bg-slate-900 
        fixed 
        left-1/2
        top-1/2 
        transform 
        -translate-x-1/2 
        -translate-y-1/2  
        md:rounded-sm 
        flex 
        flex-col
        h-full w-full overflow-y-auto overflow-x-hidden
         md:w-5/6 
         md:h-5/6
        space-y-3
        dark:border-2
        "
      >
        <div className="space-y-5 bg-white dark:bg-slate-900 w-full">
          <div
            className="absolute cursor-pointer top-5 right-5"
            onClick={onClose}
          >
            <span className="p-2 text-4xl md:text-2xl">&times;</span>
          </div>
          <div className="flex items-center justify-center">
            <img
              className="w-10 h-10 lg:w-14 lg:h-14 absolute left-5 top-5"
              src={getAreaIcon(currentArea?.environment)}
              alt=""
            />
              <span className="text-xl lg:text-4xl">{currentArea?.name}</span>
            <div className="flex items-center gap-2">
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant={"ghost"} size={"icon"}>
                    <Settings size={15} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent asChild>
                  <div className="flex flex-col justify-center items-center gap-5 w-96 mt-2 mr-30">
                    <AreaFormModify
                      area={currentArea}
                      setArea={setCurrentArea}
                      onClose={onClose}
                      onModify={setIsPopoverOpen}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <ul className="flex justify-center text-lg">
            <li
              onClick={tableDisplay}
              className={`cursor-pointer ${
                tableOpen ? "border-b-2 border-black dark:border-stone-50" : ""
              }  px-2 h-full w-full text-center`}
            >
              Production
            </li>
            <li
              onClick={diaryDisplay}
              className={`cursor-pointer ${
                diaryOpen ? "border-b-2 border-black dark:border-stone-50" : ""
              }  px-2 h-full w-full text-center`}
            >
              Journal
            </li>
          </ul>
        </div>
        <div className="w-full h-full overflow-auto mr-10 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-100 dark:scrollbar-track-slate-900">
          {diaryOpen ? <Diary area={area} /> : <TableProduction area={area} />}
        </div>
      </Card>
    </div>,
    document.getElementById("portal")!
  );
};

export default AreaModal;

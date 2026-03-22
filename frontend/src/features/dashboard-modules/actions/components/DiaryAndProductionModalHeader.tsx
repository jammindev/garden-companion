// hooks
import { useEffect, useState } from "react";

// assets
import {
  greenhouse,
  outdoor,
  indoor,
} from "../../../../assets/assets-path";

// import AreaFormModify from "@/components/AreaFormModify";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import AreaFormModify from "../../areas/components/AreaFormModify";
import { AreaInterface } from "@/interfaces/interfaces";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DiaryAndProductionModalHeaderProps {
  area: AreaInterface | undefined;
}

// function to get the right area icon based of the environnement
const getAreaIcon = (env: string) => {
  let areaIcon: string | undefined;
  if (env === "I") areaIcon = indoor;
  if (env === "G") areaIcon = greenhouse;
  if (env === "O") areaIcon = outdoor;
  return areaIcon;
};

const DiaryAndProductionModalHeader: React.FC<
  DiaryAndProductionModalHeaderProps
> = ({ area }) => {
  const [currentArea, setCurrentArea] = useState();

  useEffect(() => {
    setCurrentArea(area);
  }, [area]);

  if (area) {
    return (
      <div className="space-y-5 bg-white dark:bg-slate-900 w-full">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="absolute left-4 top-4"
            >
              <Settings size={23} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="dark:bg-slate-900" aria-describedby={undefined}>
            <AlertDialogHeader>
              <AlertDialogTitle>Modifier la zone de culture</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="flex flex-col justify-center items-center gap-5 w-full">
              <AreaFormModify
                area={currentArea}
                setArea={setCurrentArea}
              />
            </div>
          </AlertDialogContent>
        </AlertDialog>
        <div className="flex items-center gap-2 lg:gap-3 justify-center">
          <img
            className="size-6 lg:size-8"
            src={getAreaIcon(currentArea?.environment)}
            alt=""
          />
          <span className="text-2xl lg:text-4xl font-light">{currentArea?.name}</span>
          <div className="flex items-center gap-2"></div>
        </div>
      </div>
    );
  }
};

export default DiaryAndProductionModalHeader;

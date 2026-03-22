// hooks
import { useContext  } from "react";

// assets
import { greenhouse, outdoor, indoor } from "../../../../assets/assets-path";

// interfaces
import { AreaInterface } from "../../../../interfaces/interfaces";

// components
import AreaListItem from "./AreaListItem";
import AreasContext from "@/contexts/AreasContext";

// ui
import { CirclePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AreaListProps {
  sortedBy: string;
  openModal: (area: AreaInterface) => void;
}

const AreaList: React.FC<AreaListProps> = ({ sortedBy, openModal }) => {
  const areasContext = useContext(AreasContext);
  if (!areasContext) {
    throw new Error("AreasContext must be used within an AreasProvider");
  }
  const { areas, isLoading } = areasContext;
  const environments = ["O", "G", "I"];

  // function to get the right area icon based of the environnement
  const getAreaIcon = (env: string | undefined) => {
    let areaIcon: string | undefined;
    if (env === "I") areaIcon = indoor;
    if (env === "G") areaIcon = greenhouse;
    if (env === "O") areaIcon = outdoor;
    return areaIcon;
  };

  // if (areas.length === 0) {
  //   return (
  //     <div className="text-lg w-full mx-auto text-center flex items-center mt-5 leading-8">
  //       <span>
  //         {" "}
  //         Pour commencer, créez une zone de culture en cliquant sur{" "}
  //         <CirclePlus className="inline" size={"25"} strokeWidth={1.5} />
  //       </span>
  //     </div>
  //   );
  // }

  return (
    <div className="overflow-y-auto overflow-x-hidden h-[280px] px-2 font-thin text-xl scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-100 dark:scrollbar-track-slate-900">
      {isLoading ? (
        <div className="w-full h-full flex justify-center mt-5">
          <Loader2 className="animate-spin mr-3" />
        </div>
      ) : areas.length === 0 ? (
        <div className="text-lg font-thin w-full mx-auto text-center flex items-center mt-5 leading-8">
          <span>
            {" "}
            Pour commencer, créez une zone de culture en cliquant sur{" "}
            <CirclePlus className="inline" size={"25"} strokeWidth={1.5} />
          </span>
        </div>
      ) : sortedBy === "environnement" ? (
        <ul className=" space-y-4">
          {environments.map((env, index) => {
            const areasOfType: AreaInterface[] = areas.filter(
              (area: AreaInterface) => area.environment === env
            );
            const sortedAreasOfType = areasOfType.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            return (
              <div key={index}>
                {sortedAreasOfType.map((area) => {
                  return (
                    <AreaListItem
                      key={area.uuid}
                      area={area}
                      areaIcon={getAreaIcon(area.environment)}
                    />
                  );
                })}
              </div>
            );
          })}
        </ul>
      ) : (
        <ul>
          {areas
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((area: AreaInterface, index: number) => {
              if (area)
                return (
                    <AreaListItem
                      key={index}
                      area={area}
                      areaIcon={getAreaIcon(area.environment)}
                    />
                );
            })}
        </ul>
      )}
    </div>
  );
};

export default AreaList;

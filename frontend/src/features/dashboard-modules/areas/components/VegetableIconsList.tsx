// This component display a list of vegetable

import { useEffect, useState } from "react";

// interfaces
import {
  AreaInterface,
  VegetableInterface,
} from "../../../../interfaces/interfaces";

//assets
import vegetableIconsMaps from "../../../../maps/vegetableMaps";

interface VegetableIconsListInterface {
  area: AreaInterface;
}

const VegetableIconsList: React.FC<VegetableIconsListInterface> = ({
  area,
}) => {
  const [listVegetables, setListVegetables] = useState<VegetableInterface[]>(
    []
  );

  //function to make a list of unique vegetable growing in one area
  const getListUniqueVegetables = (area: AreaInterface) => {
    return (
      area.vegetables?.reduce(
        (acc: VegetableInterface[], vegetable: VegetableInterface) => {
          if (acc.some((v) => v.name === vegetable.name)) {
            return acc;
          }
          if (!vegetable.remove_date) {
            acc.push(vegetable);
          }
          return acc;
        },
        []
      ) || []
    );
  };

  useEffect(() => {
    setListVegetables(getListUniqueVegetables(area));
  }, [area]);

  return (
    <div className="flex items-center gap-1">
      {listVegetables?.map((vegetable) => {
        if (!vegetable.remove_date) {
          const vegetableAsset = vegetableIconsMaps.find(
            (asset) => asset.name.fr === vegetable.name.toLowerCase()
          );
          if (vegetableAsset) {
            return (
              <div
                key={vegetable.uuid}
                className="relative group"
              >
                <img className="w-6 h-6" src={vegetableAsset.assets} alt="" />
                <div
                  className="
                    absolute right-0 z-50 
                    text-center text-xs text-white
                    bg-gray-700 
                    rounded 
                    py-1 px-2 
                    opacity-0 
                    group-hover:opacity-100 
                    pointer-events-none
                    "
                >
                  {vegetable.name}
                </div>
              </div>
            );
          }
        }
      })}
    </div>
  );
};
export default VegetableIconsList;

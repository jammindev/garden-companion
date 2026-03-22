// assets
import distanceIcon from "@/assets/vegetable-info-icons/distance.png";
// import frostResistanceIcon from "@/assets/vegetable-info-icons/frost-resistance.png";
import germinationIcon from "@/assets/vegetable-info-icons/germination.png";
import indoorSowingIcon from "@/assets/vegetable-info-icons/indoor-sowing.png";
import wateringIcon from "@/assets/vegetable-info-icons/watering.png";
import stopSowingIcon from "@/assets/vegetable-info-icons/stop-sowing.png";
import outdoorSowing from "@/assets/vegetable-info-icons/outdoor-sowing.png";

import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";
import getVegetableAsset from "@/utils/getVegetableAsset";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { is } from "date-fns/locale";

const Recommandations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listVegetables, setListVegetables] = useState<{ uuid: string; name: string; category: string; description: string; spacing_on_row: number; germination: number; water_needs: number; start_indoor: string; start_outdoor: string; end: string; }[]>([]);

  useEffect(() => {
    const fetchVegetables = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("guide/");
        const vegetables = response.data;
        vegetables.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
        setListVegetables(vegetables);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVegetables();
  }, []);

  const getWateringDisplay = (wateringLevel: number) => {
    switch (wateringLevel) {
      case 1:
        return "léger";
      case 2:
        return "régulier";
      case 3:
        return "fréquent";
      default:
        break;
    }
  };

  // const getFrostResistanceDisplay = (frostResistance: number) => {
  //   switch (frostResistance) {
  //     case 0:
  //       return "< -2°";
  //     case 1:
  //       return "± -2°";
  //     case 2:
  //       return "> 0°";
  //     default:
  //       break;
  //   }
  // };

  const getDateDisplay = (dateString: string) => {
    if (dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
      });
    }
    return "N/A";
  };

  isLoading && <div>Chargement...</div>;

  return (
    <div className="grid grid-cols-4 px-2 h-[280px] mt-[-5px] overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-100 dark:scrollbar-track-slate-900">
      {listVegetables?.map((veg) => (
        <div key={veg.uuid} className="flex flex-col items-center">
          <Dialog modal>
            <DialogTrigger asChild>
              <Button variant="ghost" className="flex-col size-20 p-1">
                <img
                  className="w-10"
                  src={getVegetableAsset(veg.name)}
                  alt=""
                />
                <span className="text-xs text-center whitespace-break-spaces">
                  {veg.name}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="h-dvh md:h-[90vh] w-full md:w-auto rounded-none md:rounded-lg overflow-y-auto overflow-x-hidden flex flex-col items-center gap-10  dark:bg-slate-900">
              <DialogHeader>
                <DialogTitle className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-12"
                      src={getVegetableAsset(veg.name)}
                      alt=""
                    />
                    <span className="text-2xl">{veg.name}</span>
                  </div>
                  <div className="text-left">Catégorie : {veg.category}</div>
                </DialogTitle>
                <DialogDescription className="text-md text-left">
                  {veg.description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-around w-full">
                <Card className="p-2 w-24 md:w-32  text-center text-sm flex flex-col justify-between items-center md:w-34">
                  <span>Espacement entre les plants</span>
                  <img src={distanceIcon} alt="" className="size-10" />
                  <div className="flex flex-col leading-none">
                    <span className="text-md md:text-lg font-bold">
                      {veg.spacing_on_row} cm
                    </span>
                    <span className="italic">minimum</span>
                  </div>
                </Card>
                <Card className="p-2 w-24 md:w-32  text-center text-sm flex flex-col justify-between items-center md:w-34">
                  <span>Durée de germination</span>
                  <img src={germinationIcon} alt="" className="size-10" />
                  <div className="flex flex-col leading-none">
                    <span className="text-md md:text-lg font-bold">
                      <span className="font-normal">≈ </span>
                      {veg.germination}
                    </span>
                    <span className="italic">jours</span>
                  </div>
                </Card>
                <Card className="p-2 w-24 md:w-32  text-center text-sm flex flex-col justify-between items-center md:w-34">
                  <span className="md:w-12">Besoin en eau</span>
                  <img src={wateringIcon} alt="" className="size-10" />
                  <div className="flex flex-col">
                    <span className="italic leading-6">arrosage</span>
                    <span className="text-md md:text-lg font-bold  leading-none">
                      {getWateringDisplay(veg.water_needs)}
                    </span>
                  </div>
                </Card>
              </div>
              <div className="flex justify-around w-full">
                <Card className="p-2 w-24 md:w-32 text-center gap-2 text-sm flex flex-col justify-between items-center md:w-34">
                  <span>Semis intérieur</span>
                  <img src={indoorSowingIcon} alt="" className="size-10" />
                  <div className="flex flex-col">
                    <span className="italic leading-6">à partir du</span>
                    <span className="text-md md:text-lg font-bold  leading-none">
                      {getDateDisplay(veg.start_indoor)}
                    </span>
                  </div>
                </Card>
                <Card className="p-2 w-24 md:w-32  text-center text-sm flex flex-col justify-between items-center md:w-34">
                  <span>Semis extérieur</span>
                  <img src={outdoorSowing} alt="" className="size-10" />
                  <div className="flex flex-col">
                    <span className="italic leading-6">à parir du</span>
                    <span className="text-md md:text-lg font-bold  leading-none">
                      {getDateDisplay(veg.start_outdoor)}
                    </span>
                  </div>
                </Card>
                <Card className="p-2 w-24 md:w-32  text-center text-sm flex flex-col justify-between items-center md:w-34">
                  <span className="w-12">Dernier semis</span>
                  <img src={stopSowingIcon} alt="" className="size-10" />
                  <div className="flex flex-col">
                    <span className="italic leading-6">jusqu'au</span>
                    <span className="text-md md:text-lg font-bold  leading-none">
                      {getDateDisplay(veg.end)}
                    </span>
                  </div>
                </Card>
              </div>
              {/* <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter> */}
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
};
export default Recommandations;

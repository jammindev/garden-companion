import { useState } from "react";
import { createAreaApi } from "../api/api-services/areas";
import useAuth from "./useAuth";
import { AreaInterface, VegetableInterface } from "@/interfaces/interfaces";

interface dataInterface {
  name: string;
  surface: number;
  sowing_area: boolean;
  vegetables: VegetableInterface[] | [];
}

type useAddAreaReturnType = [
  (data: dataInterface) => Promise<void>,
  boolean,
  null | string
];

const useAddArea = (): useAddAreaReturnType => {
  const [isLoading, SetIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useAuth();

  const addData = async (data: AreaInterface) => {
    SetIsLoading(true);
    setError(null);
    try {
      await createAreaApi(data);
    } catch (error) {
      setError("Une erreur est survenue");
      console.error(error);
    } finally {
      SetIsLoading(false);
    }
  };

  return [addData, isLoading, error];
};
export default useAddArea;

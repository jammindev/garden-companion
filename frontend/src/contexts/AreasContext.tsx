import { createAreaApi, getAllAreas, updateAreaApi } from "@/api/api-services/areas";
import { AreaInterface } from "@/interfaces/interfaces";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

interface AreaContextType {
  areas: AreaInterface[];
  isLoading: boolean;
  error: string | null;
  createArea: (newArea: Omit<AreaInterface, "id">) => Promise<void>;
  updateArea: (id: string, updatedArea: Omit<AreaInterface, "id">) => void;
  deleteArea: (id: string) => void;
  setAreas: Dispatch<SetStateAction<AreaInterface[]>>;
}
const AreasContext = createContext<AreaContextType | undefined>(undefined);

export const AreasProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [areas, setAreas] = useState<AreaInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setIsLoading(true);
        const fetchedAreas = await getAllAreas();
        setAreas(fetchedAreas);
      } catch (error) {
        console.error("Error when fetching areas", error);
        setError("Issue when fetching areas");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAreas();
  }, []);

  const createArea = async (
    newArea: Omit<AreaInterface, "id">
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const createdArea = await createAreaApi(newArea);
      setAreas((prevAreas) => [...prevAreas, createdArea]);
    } catch (error) {
      console.error("Error creating area:", error);
      setError("Issue when creating the area");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArea = (id: string) => {
    setAreas((prevAreas) => prevAreas.filter((area) => area.uuid !== id));
  };

  const updateArea = async (id: string, data: AreaInterface, vegetables) => {
    try {
      setIsLoading(true);
      const updated_area = await updateAreaApi(id, data, vegetables)
      setAreas((prevAreas) =>
        prevAreas.map((area) => (area.uuid === id ? updated_area : area))
      );
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <AreasContext.Provider
      value={{ areas, setAreas, isLoading, error, createArea, updateArea, deleteArea }}
    >
      {children}
    </AreasContext.Provider>
  );
};

export default AreasContext;

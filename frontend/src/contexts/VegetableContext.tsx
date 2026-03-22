import { createVegetableApi, getAllVegetables } from "@/api/api-services/vegetables";
import { VegetableInterface } from "@/interfaces/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";


interface VegetablesContextType {
    vegetables: VegetableInterface[];
    isLoading: boolean;
    error?: string;
    createVegetable: (new_vegetable: VegetableInterface) => Promise<VegetableInterface | undefined>;
    updateVegetable: (id: string, updatedArea: VegetableInterface) => void
    deleteVegetable: (id: string) => void;
}
const VegetablesContext = createContext<VegetablesContextType |  undefined>(undefined)

export const VegetablesProvider: React.FC<{ children: ReactNode}> = ({
    children,
})  => {
    const [vegetables, setVegetables] = useState<VegetableInterface[]>([])
    const [isLoading, setIsLoading] =  useState(false)
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVegetables = async () => {
            try {
                setIsLoading(true)
                const fetchedVegetables = await getAllVegetables()
                setVegetables(fetchedVegetables)
            } catch (error) {
                console.error("Error fetching vegetables", error)
                setError("Issue when fetching vegetables")
            } finally {
                setIsLoading(false)
            }
        }
        fetchVegetables()
    }, [])

    const createVegetable = async (
        newVegetable: VegetableInterface
      ): Promise<VegetableInterface | undefined> => {
        try {
          setIsLoading(true);
          const createdVegetable = await createVegetableApi(newVegetable);
          setVegetables((prevVegetables) => [...prevVegetables, createdVegetable]);
          return createdVegetable
        } catch (error) {
          console.error("Error creating vegetable:", error);
          setError("Issue when creating the vegetable");
        } finally {
          setIsLoading(false);
        }
      };
    
      const deleteVegetable = (id: string) => {
        setVegetables((prevVegetables) => prevVegetables.filter((vegetable) => vegetable.vegetable_manager_id !== id));
      };
    
      const updateVegetable = (id: string, updatedVegetable: VegetableInterface) => {
        setVegetables((prevVegetables) =>
          prevVegetables.map((vegetable) => (vegetable.vegetable_manager_id === id ? updatedVegetable : vegetable))
        );
      };
    
      return (
        <VegetablesContext.Provider
          value={{ vegetables, isLoading, error, createVegetable, updateVegetable, deleteVegetable }}
        >
          {children}
        </VegetablesContext.Provider>
      );
}



export default VegetablesContext
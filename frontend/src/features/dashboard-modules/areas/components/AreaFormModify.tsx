// assets
import { greenhouse, outdoor, indoor } from "../../../../assets/assets-path";

// hooks
import { useContext, useState } from "react";

// utils
import capitalize from "../../../../utils/capitalizeStr";

// ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

//contexts
import AreasContext from "@/contexts/AreasContext";
import { deleteAreaApi } from "@/api/api-services/areas";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

interface FormDataInterface {
  name: string;
  environnement: string;
  surface: number;
}

const AreaFormModify = ({ area, onClose, setArea, onModify }) => {
  const areasContext = useContext(AreasContext);
  if (!areasContext) {
    throw new Error("AreasContext must be used within an AreasProvider");
  }
  const { deleteArea, updateArea, setAreas } = areasContext;
  const [formData, setFormData] = useState<FormDataInterface>({
    name: area.name,
    environment: area.environment,
    size: area.size,
  });

  const { toast } = useToast();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedArea = {
      name: capitalize(formData.name),
      size: formData.size,
      environment: formData.environment,
    };
    await updateArea(area.uuid, updatedArea, area.vegetables);

    setArea((prev) => ({
      ...prev,
      ...updatedArea,
    }));

    setAreas((prev) =>
      prev.map((area_context) => {
        return area_context.uuid === area.uuid
          ? { ...area_context, ...updatedArea } // Merge updated values
          : area_context;
      })
    );
    toast({
      title: "Zone de culture modifiée avec succès 👍",
      description: `${updatedArea.name}`,
    });
  };

  const handleDelete = async (areaId: string) => {
    // onClose();
    try {
      await deleteAreaApi(areaId);
      toast({
        title: "Zone de culture suprimée 👍",
        description: `${area.name}`,
      });
      deleteArea(areaId);
    } catch (error) {
      toast({
        title: "La zone de culture n'a pas pu être supprimée ❌",
        description: "Veuillez réessayer ultérieurement",
      });
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col items-center gap-6 w-full" onSubmit={submitForm}>
      <div className="flex flex-col items-center gap-5">
        <div className="flex justify-around gap-5">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="name">Nom</label>
            <Input
              autoComplete="off"
              required
              className=""
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="surface">Surface</label>
            <div className="flex items-end gap-1">
              <Input
                className="w-20"
                id="size"
                type="number"
                name="size"
                value={formData.size}
                onChange={handleNameChange}
              />
              <span className="leading-none">
                m<sup>2</sup>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div>Environnement</div>
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <img className="w-7" src={outdoor} alt="" />
              <label className="font-thin" htmlFor="type1">
                Extérieur
              </label>
              <input
                type="radio"
                name="environment"
                id="type1"
                value="O"
                onChange={handleNameChange}
                checked={formData.environment === "O"}
                required
              />
            </div>
            <div className="flex flex-col items-center">
              <img className="w-7" src={greenhouse} alt="" />
              <label className="font-thin" htmlFor="type2">
                Serre
              </label>
              <input
                type="radio"
                name="environment"
                id="type2"
                required
                value="G"
                checked={formData.environment === "G"}
                onChange={handleNameChange}
              />
            </div>
            <div className="flex flex-col items-center">
              <img className="w-7" src={indoor} alt="" />
              <label className="font-thin" htmlFor="type3">
                Intérieur
              </label>
              <input
                type="radio"
                name="environment"
                id="type3"
                required
                onChange={handleNameChange}
                value="I"
                checked={formData.environment === "I"}
              />
            </div>
          </div>
        </div>
      </div>
      <AlertDialogFooter className="gap-5 flex-row">
          <AlertDialogCancel className="mt-0">Annuler</AlertDialogCancel>
          <Button type="submit">Valider</Button>
            <Button
              variant={"destructive"}
              onClick={() => handleDelete(area?.uuid ?? "")}
            >
              Supprimer
            </Button>
      </AlertDialogFooter>
    </form>
  );
};

export default AreaFormModify;

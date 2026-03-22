import { v4 as uuidv4 } from "uuid";

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
import { Loader2 } from "lucide-react";

interface AreaFormAddProps {
  handleClickAdd: () => void;
}

interface FormDataInterface {
  name: string;
  environment: string;
  size: number;
}

const AreaFormAdd: React.FC<AreaFormAddProps> = ({ handleClickAdd }) => {
  const areasContext = useContext(AreasContext);
  const [isLoading, setIsLoading] = useState(false)

  if (!areasContext) {
    throw new Error("AreasContext must be used within an AreasProvider");
  }
  const { createArea } = areasContext;
  const [formData, setFormData] = useState<FormDataInterface>({
    name: "",
    environment: "",
    size: 0,
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
    setIsLoading(true)
    const newArea = {
      name: capitalize(formData.name),
      size: formData.size,
      environment: formData.environment,
    };
    try {
      await createArea(newArea);
      setFormData({
        name: "",
        environment: "",
        size: 0,
      });
      toast({
        title: "Nouvelle zone de culture 👍",
        description: `${newArea.name}`,
      });
      handleClickAdd();
    } catch (error) {
      console.error(error)
      toast({
        title: "Une erreur s'est produite 😵",
        description: "Veuillez réessayer",
      });
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <form
      className="flex flex-col h-[280px] items-center justify-around"
      onSubmit={submitForm}
    >
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
            <label htmlFor="size">Surface</label>
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
              />
            </div>
          </div>
        </div>
      </div>
      <Button
            className="mx-auto"
            type="submit"
            disabled={isLoading}
          >
            {isLoading &&  <Loader2 className="animate-spin mr-3" />}
            Valider
        </Button>
    </form>
  );
};

export default AreaFormAdd;

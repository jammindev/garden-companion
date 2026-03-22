import { SubmitHandler, useForm } from "react-hook-form";
import { ToDoInterface } from "../interfaces";
import { createToDoApi } from "../utils/todosApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ToDoListFormAddProps {
  setToDo: React.Dispatch<React.SetStateAction<ToDoInterface[]>>;
  handleClickAdd: () => void;
}

interface FormDataInterface {
  title: string;
  priority: string;
}

const ToDoListFormAdd: React.FC<ToDoListFormAddProps> = ({
  setToDo,
  handleClickAdd,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataInterface>();
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<FormDataInterface> = async (data) => {
    const formData = {
      priority: data.priority,
      title: data.title,
    };
    try {
      setIsLoading(true)
      const newTodo = await createToDoApi(formData);
      setToDo((prev) => [...prev, newTodo]);
      handleClickAdd();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <form
      className="flex flex-col h-[280px] items-center justify-around"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-around gap-5">
        <div className="flex justify-around gap-5">
          <div className="flex flex-col ">
            <label htmlFor="title">Quelle tâche voulez-vous ajouter ?</label>
            <Input
              {...register("title", {
                required: "Veuillez remplir ce champs.",
                maxLength: {
                  value: 50,
                  message: "Le champs doit contenir 50 caractères maximum",
                },
                minLength: {
                  value: 3,
                  message: "Le champs doit contenir au moins 5 caractères",
                },
              })}
              placeholder="ex: Planter les oignons"
              className="border border-stone-600 px-2 w-38"
              id="title"
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div>Priorité</div>
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <label className="font-thin" htmlFor="basic">
                Normale
              </label>
              <input
                {...register("priority", { required: true })}
                type="radio"
                id="basic"
                value="M"
                defaultChecked
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="font-thin" htmlFor="high">
                Élevée
              </label>
              <input
                {...register("priority", { required: true })}
                type="radio"
                id="basic"
                value="H"
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

export default ToDoListFormAdd;

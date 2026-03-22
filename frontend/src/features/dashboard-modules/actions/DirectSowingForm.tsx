import { useContext, useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { resizeFile } from "@/utils/resizeFile";

import backendRoutes from "@/api/apiRoutes";
// assets
// import directSowingIcon from "../../../assets/actions-icons/direct-sowing.png";

// components
// import FormHeader from "./components/FormHeader";
import InputAllVegetables from "./components/InputAllVegetables";
import InputUserAreas from "./components/InputAreas";

// contexts
// import VegetablesContext from "@/contexts/VegetableContext";
import AreasContext from "@/contexts/AreasContext";

import { useToast } from "@/components/ui/use-toast";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// import CreatableSelect from "react-select/creatable"; 

// ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputVariety from "./components/InputVariety";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { AreaInterface } from "@/interfaces/interfaces";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance, { axiosInstanceFile } from "@/api/axios";
import ActionButton from "@/components/ActionButton";

interface DirectSowingFormInterface {
  onClose: () => void;
}

const DirectSowingForm: React.FC<DirectSowingFormInterface> = ({onClose}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false)

  const areasContext = useContext(AreasContext);
  if (!areasContext) {
    throw new Error("AreasContext must be used within an AreasProvider");
  }
  const { areas, setAreas } = areasContext;

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    variety: z.string().min(2).max(50),
    quantity: z.coerce
      .number({
        required_error: "La quantité est requise",
        invalid_type_error: "La quantité doit être un nombre",
      })
      .positive(),
    quantity_unit: z.string().min(2).max(50),
    area: z.string(),
    date: z.date({}),
    note: z.string().max(500).optional(),
    file: z.instanceof(FileList).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    // Issue with date when no date is selected
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      variety: "",
      quantity: 0,
      quantity_unit: "",
      area: "",
      date: new Date(),
      note: "",
    },
  });

  const fileRef = form.register("file");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      vegetable: {
        name: values.name,
        variety: values.variety,
        quantity: values.quantity,
        quantity_unit: values.quantity_unit,
        area: values.area,
        sowing_date: values.date.toISOString().split("T")[0],
        description: values.note,
      },
      date: values.date.toISOString().split("T")[0],
      area: values.area,
      description: values.note
    }
    
    try {
      setIsLoading(true)
      const formData = new FormData();
      const jsonData = JSON.stringify(data)
      formData.append("data", jsonData)

      if (values.file && values.file.length > 0) {
        const resizedImage = await resizeFile(values.file[0]);
        formData.append("photo", resizedImage);      
      }
      const response = await axiosInstanceFile.post(backendRoutes.operations + "sowing/", formData);
      const operation = response.data

      const newVegetable = operation.vegetable
      let selected_area: AreaInterface | undefined;
      if (newVegetable) {
        const newAreas = areas.map((area) => {
          if (area.uuid === newVegetable?.area) {
            selected_area = area;
            return {
              ...area,
              vegetables: [...(area.vegetables || []), newVegetable],
            };
          }
          return area;
        });
        setAreas(newAreas);
        toast({
          title: "Nouveau semis 👍",
          description:
            `${newVegetable?.name} - ` +
            `${newVegetable?.variety} ` +
            `(${newVegetable?.quantity} ${newVegetable?.quantity_unit}) ` +
            `dans votre espace: ${selected_area?.name ?? ""}`,
        });
      } 
  }  catch (error) {
    console.error("Error created the operation:", error);
    // Handle this error better
    toast({
      title: "Le semis n'a pas pu être enregistré 😵",
      description:
        "Vérifier le format de l'image",
    });
  } finally {
      setIsLoading(false)
      onClose();
  }
    }
  return (
    <div className="flex flex-col gap-10 w-4/5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={() => (
              <InputAllVegetables
                setInput={(value) => form.setValue("name", value)}
              />
            )}
          />
          <FormField
            control={form.control}
            name="variety"
            render={() => (
              <InputVariety
                setInput={(value) => form.setValue("variety", value)}
              />
            )}
          />
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center w-4/12">
                  <FormLabel>Quantité</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="h-8" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity_unit"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center w-3/6">
                  <FormLabel>Unité</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ligne, rangée, plant, ..."
                      type="text"
                      {...field}
                      className="h-8"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="area"
            render={() => (
              <InputUserAreas
                setInput={(value) => form.setValue("area", value)}
              />
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal border-slate-700",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value &&
                          format(field.value, "PPP", { locale: fr })}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-white border"
                    align="center"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    className="w-full p-2 border rounded" // Add styling as needed
                    placeholder="Ajoutez une note..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={() => {
              return (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...fileRef}
                      className="cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <ActionButton isLoading={isLoading}/>
        </form>
      </Form>
    </div>
  );
};

export default DirectSowingForm;

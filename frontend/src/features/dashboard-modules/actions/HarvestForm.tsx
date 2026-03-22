import { useContext, useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { resizeFile } from "@/utils/resizeFile";

// assets
// import harvestIcon from "../../../assets/actions-icons/harvest.png";

// components
// import FormHeader from "./components/FormHeader";
import InputUserAreas from "./components/InputAreas";

// contexts
// import VegetablesContext from "@/contexts/VegetableContext";
import AreasContext from "@/contexts/AreasContext";

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
// import { AreaInterface } from "@/interfaces/interfaces";
import { Textarea } from "@/components/ui/textarea";
// import axiosInstance, { axiosInstanceFile } from "@/api/axios";

import FieldVegetablesInArea from "./components/FieldVegetablesInArea";
import backendRoutes from "@/api/apiRoutes";
import ActionButton from "@/components/ActionButton";

interface HarvestFormInterface {
  onClose: () => void;
}

const HarvestForm: React.FC<HarvestFormInterface> = ({ onClose }) => {
  const [selectedArea, setSelectedArea] = useState("");
  const [currentQuantityUnit, setCurrentQuantityUnit] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false)

  const areasContext = useContext(AreasContext);
  if (!areasContext) {
    throw new Error("AreasContext must be used within an AreasProvider");
  }
  const { areas, setAreas } = areasContext;

  const formSchema = z.object({
    vegetable: z.string().min(2).max(50),
    area: z.string(),
    quantity: z.coerce.number().positive(),
    quantity_unit: z.string(),
    date: z.date(),
    note: z.string().max(500).optional(),
    file: z.instanceof(FileList).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vegetable: "",
      area: "",
      quantity: 0,
      quantity_unit: currentQuantityUnit,
      date: new Date(),
      note: "",
    },
  });

  const fileRef = form.register("file");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { file, ...rest } = values;

    const data = {
      ...rest,
      date: rest.date.toISOString().split("T")[0],
      quantity: rest.quantity,
      quantity_unit: rest.quantity_unit,
      description: rest.note
    };

    try {
      setIsLoading(true)
      const formData = new FormData();
      const jsonData = JSON.stringify(data)
      formData.append("data", jsonData)

      if (values.file && values.file.length > 0) {
        const resizedImage = await resizeFile(values.file[0]);
        formData.append("photo", resizedImage);  
      }
      await axiosInstanceFile.post(backendRoutes.operations + "harvesting/", formData);
      const updatedArea = areas.find((area) => area.uuid === data.area);
      const updatedVegetable = updatedArea?.vegetables.find((veg) => veg.uuid === data.vegetable)
      updatedVegetable.quantity_harvested = parseFloat(updatedVegetable.quantity_harvested)  + parseFloat(data.quantity)
      if (!updatedVegetable.harvest_unit) {
        updatedVegetable.harvest_unit = data.quantity_unit
      }

      const updatedVegetables = updatedArea?.vegetables.map((veg) => {
        if (veg.uuid !== data.vegetable) {
          return veg;
        } else {
          return updatedVegetable
        }
      });
      setAreas((prev) =>
        prev.map((area) => {
          if (area.uuid !== updatedArea?.uuid) {
            return area;
          } else {
            return {
              ...area,
              vegetables: updatedVegetables,
            };
          }
        })
      );
      toast({
        title: "Récolte enregistrée 👍",
        description: `${updatedVegetable.name} (${updatedVegetable.variety}) : + ${data.quantity} ${updatedVegetable.harvest_unit}`,
      });
    } catch (error){
      console.error(error)
    } finally {
      setIsLoading(false)
      onClose();
    }
  };

  return (
    <div className="flex flex-col gap-10 w-4/5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="area"
            render={() => (
              <InputUserAreas
                setInput={(value) => {
                  form.setValue("area", value);
                  setSelectedArea(value);
                }}
              />
            )}
          />
          <FieldVegetablesInArea
            form={form}
            selectedArea={selectedArea}
            setCurrentQuantityUnit={setCurrentQuantityUnit}
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
                      placeholder="gramme, unité, ..."
                      type="text"
                      {...field}
                      value={
                        currentQuantityUnit !== ""
                          ? currentQuantityUnit
                          : field.value
                      }
                      className="h-8"
                      disabled={currentQuantityUnit != ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                    className="w-full p-2 border rounded"
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

export default HarvestForm;

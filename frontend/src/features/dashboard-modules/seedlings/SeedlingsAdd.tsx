import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// hooks
import { useForm } from "react-hook-form";

// components
import InputAllVegetables from "../actions/components/InputAllVegetables";
import InputVariety from "../actions/components/InputVariety";

// ui
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  // FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// api
import { createSeedling } from "@/api/api-services/seedlingsApi";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface SeedlingsAddProps {
  handleClickAdd: () => void;
}

const SeedlingsAdd: React.FC<SeedlingsAddProps> = ({
  handleClickAdd,
}) => {

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    variety: z.string().min(2).max(50),
    quantity: z.coerce
      .number({
        required_error: "La quantité est requise",
        invalid_type_error: "La quantité doit être un nombre",
      })
      .positive(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      variety: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      const newSeedling = await createSeedling(values)
      toast({
        title: "Nouveau semis 👍",
        description:  `${newSeedling.name} ${newSeedling.variety}`
      })
      handleClickAdd()
    } catch (error)  {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-[280px] justify-around items-center w-3/4 mx-auto"
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
          render={() => <InputVariety setInput={(value) => form.setValue("variety", value)} />}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>Quantité</FormLabel>
              <FormControl>
                <Input type="number" {...field} className="h-8" />
              </FormControl>
            </FormItem>
          )}
        />
          <Button
            className="mx-auto"
            type="submit"
            disabled={!form.formState.isValid || isLoading}
          >
            {isLoading &&  <Loader2 className="animate-spin mr-3" />}
            Valider
          </Button>
      </form>
    </Form>
  );
};

export default SeedlingsAdd;

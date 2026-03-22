//  ui
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InputVarietyInterface {
  setInput: (value: string) => void;
  field?:  React.InputHTMLAttributes<HTMLInputElement>;
}

const InputVariety: React.FC<InputVarietyInterface> = ({ setInput, field }) => {
  const setVariety = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <FormItem className="flex flex-col items-center">
      <FormLabel>Variété ou nom distinctif</FormLabel>
      <FormControl>
        <Input onChange={setVariety} {...field} />
      </FormControl>
    </FormItem>
  );
};

export default InputVariety;

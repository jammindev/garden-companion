import { useEffect } from "react";

// assets
import vegetableIconsMaps from "../../../../maps/vegetableMaps";
import useCompletion from "../../../../hooks/useCompletion";
import unknownVegetableIcon from "../../../../assets/vegetables-icons/unknown-vegetable.png";

// ui
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface InputVegetablesInAreaInterface {
  setInput: (value: string) => void;
  defaultValue?: string;
}

const InputVegetablesInArea: React.FC<InputVegetablesInAreaInterface> = ({
  setInput,
  defaultValue,
}) => {
  const [
    isNameFocus,
    setIsNameFocus,
    nameInput,
    vegetableChoices,
    handleNameClickOnChoice,
    handleNameInputChange,
  ] = useCompletion(
    vegetableIconsMaps,
    ["name", "fr"],
    "data-name",
    defaultValue
  );

  useEffect(() => {
    setInput(nameInput);
  }, [nameInput, setInput]);

  return (
    <FormItem className="flex flex-col items-center">
      <FormLabel>Selectionner votre plante</FormLabel>
      <div className="relative w-full">
        <FormControl>
          <Input
            value={nameInput}
            onChange={handleNameInputChange}
            onFocus={() => {
              setIsNameFocus(true);
            }}
            onBlur={() => {
              setIsNameFocus(false);
            }}
            className={`pl-9
            ${isNameFocus ? "" : "cursor-pointer"}
            `}
          />
        </FormControl>
        <FormMessage />
        {nameInput.length > 0 && (
          <img
            className="absolute top-2 left-2 w-6"
            src={
              (
                vegetableIconsMaps.filter((vegetable) => {
                  return vegetable.name.fr === nameInput.toLowerCase();
                })[0] || {}
              ).assets || unknownVegetableIcon
            }
            alt=""
          />
        )}

        <div
          className={`
          choices-list 
          flex flex-col 
          gap-1 
          border
          rounded-xl
          px-2
          h-44 w-64
          z-50
          absolute 
          bg-gray-100
          dark:bg-slate-800 
          top-12 
          ${!isNameFocus && "hidden"}
          `}
          onFocus={() => {
            setIsNameFocus(true);
          }}
          onBlur={() => {
            setIsNameFocus(false);
          }}
        >
          <ul className="m-1 overflow-y-scroll">
            {vegetableChoices.map((vegetable, index) => {
              return (
                <li
                  key={index}
                  data-name={vegetable.name.fr}
                  className="flex items-center gap-2 cursor-pointer"
                  onMouseDown={handleNameClickOnChoice}
                >
                  <img className="w-6" src={vegetable.assets} alt="" />
                  <span className="capitalize text-lg">
                    {vegetable.name.fr}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </FormItem>
  );
};

export default InputVegetablesInArea;

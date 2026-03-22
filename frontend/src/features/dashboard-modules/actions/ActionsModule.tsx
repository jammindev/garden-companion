import { useContext, useState } from "react";
import actionFormMap from "@/maps/actionFormMap";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormHeader from "./components/FormHeader";
import AreasContext from "@/contexts/AreasContext";
import { useToast } from "@/components/ui/use-toast";
import DiaryAndProductionModal from "../../../components/DiaryAndProductionModal";
import { Newspaper } from "lucide-react";

interface ActionsModuleProps {}

const ActionsModule: React.FC<ActionsModuleProps> = () => {
  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});
  const { toast } = useToast();
  const areasContext = useContext(AreasContext);
  if (!areasContext) {
    throw new Error("AreasContext must be used within an AreasProvider");
  }
  const { areas } = areasContext;

  const handleOpenChange = (index: number, isOpen: boolean) => {
    if (areas.length === 0) {
      toast({
        title: "Vous n'avez pas encore d'espace de culture",
        description:
          'Pour enregistrer une nouvelle action, créez une zone de culture à partir du module "Zones de culture"',
      });
      return;
    }
    setOpenStates((prevStates) => ({
      ...prevStates,
      [index]: isOpen, // Update only the specific dialog's open state
    }));
  };

  const closeDialog = (index: number) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [index]: false, // Close the dialog for the specified index
    }));
  };

  const sortedActions = Object.values(actionFormMap).sort(
    (a, b) => a.index - b.index
  );
  return (
    <div className="grid grid-cols-3 px-2 h-[280px] mt-[-5px] overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-100 dark:scrollbar-track-slate-900">
      <DiaryAndProductionModal area={null}>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={`absolute top-3 right-3`}
        >
          <Newspaper strokeWidth={1.5}/>
        </Button>
      </DiaryAndProductionModal>
      {sortedActions?.map((action) => (
        <div key={action.index} className="flex flex-col items-center">
          <Dialog
            modal
            open={openStates[action.index] || false}
            onOpenChange={(isOpen) => handleOpenChange(action.index, isOpen)}
          >
            <DialogTrigger asChild>
              <Button variant="ghost" className="flex-col size-20 p-1">
                <img className="w-10" src={action.icon} alt="" />
                <span className="text-xs text-center whitespace-break-spaces">
                  {action.title}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent
              aria-describedby={undefined}
              className="h-dvh md:h-[90vh] w-full md:w-auto rounded-none md:rounded-lg overflow-y-auto overflow-x-hidden flex flex-col items-center gap-10  dark:bg-slate-900"
              onOpenAutoFocus={(event) => event.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>
                  <FormHeader icon={action.icon} name={action.title} />
                </DialogTitle>
              </DialogHeader>
              <div className="w-96 flex justify-center">
              {action.form && <action.form onClose={() => closeDialog(action.index)} />}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
};
export default ActionsModule;

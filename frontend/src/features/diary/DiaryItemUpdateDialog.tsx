import React, { useState } from "react";
import { deleteOperation } from "@/api/api-services/operationsApi";
import { useToast } from "@/components/ui/use-toast";
import actionFormMap from "@/maps/actionFormMap";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormHeader from "../dashboard-modules/actions/components/FormHeader";

// interface Action {
//   label: string;
//   onClick: () => void;
// }

interface DiaryItemUpdateDialogProps {
  action;
  setActions;
  openAlertDialog: boolean;
  setOpenAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiaryItemUpdateDialog: React.FC<DiaryItemUpdateDialogProps> = ({
  action,
  setActions,
  openAlertDialog,
  setOpenAlertDialog,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const closeDialog = () => {
    setOpenAlertDialog(false);
  };

  const actionForm = actionFormMap[action.operation_type];
  const updateAction = async () => {
    try {
      setIsLoading(true);
      await deleteOperation(action.uuid);
      setActions((prev) => prev.filter((item) => action.uuid !== item.uuid));
      toast({
        title: "Action modifiée 👍",
        description: "L'action a été modifié avec succès",
      });
    } catch (error) {
      console.error("can't update the action", error);
      toast({
        title: "Un problème est survenu 😵",
        description: "Réessayer ulterieurmant",
      });
    } finally {
      setOpenAlertDialog(false);
      setIsLoading(false);
    }
  };

  return (
    <Dialog modal open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
      <DialogContent
        aria-describedby={undefined}
        className="h-dvh md:h-[90vh] w-full md:w-auto rounded-none md:rounded-lg overflow-y-auto overflow-x-hidden flex flex-col items-center gap-10  dark:bg-slate-900"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <FormHeader icon={actionForm.icon} name={actionForm.title} />
          </DialogTitle>
        </DialogHeader>
        <div className="w-96 flex justify-center">
          {actionForm.form && <actionForm.form onClose={closeDialog} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiaryItemUpdateDialog;

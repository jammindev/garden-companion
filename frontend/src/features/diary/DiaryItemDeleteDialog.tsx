import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EllipsisVertical, Loader2, Trash2, X } from "lucide-react";
import { deleteOperation } from "@/api/api-services/operationsApi";
import { useToast } from "@/components/ui/use-toast";
import { Action } from "@radix-ui/react-toast";

// interface Action {
//   label: string;
//   onClick: () => void;
// }

interface DiaryItemDeleteDialogProps {
  action: Action;
  setActions: React.Dispatch<React.SetStateAction<Action[]>>;
  openAlertDialog: boolean;
  setOpenAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiaryItemDeleteDialog: React.FC<DiaryItemDeleteDialogProps> = ({
  action,
  setActions,
  openAlertDialog,
  setOpenAlertDialog,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const deleteAction = async () => {
    try {
      setIsLoading(true);
      await deleteOperation(action.uuid);
      setActions((prev) => prev.filter((item) => action.uuid !== item.uuid));
      toast({
        title: "Action supprimée 👍",
        description: "L'action a été supprimé avec succès",
      });
    } catch (error) {
      console.error("can't delete the action", error);
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
    <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ‼️  Attention
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cela supprimera définitivement cette entrée de votre
            journal, ainsi que la photo associée. Si une plante est liée à cette
            entrée, elle ne sera pas affectée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="destructive" onClick={deleteAction}>
            {isLoading && <Loader2 className="animate-spin mr-3" />}
            Supprimer
          </Button>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DiaryItemDeleteDialog;

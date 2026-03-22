import { EllipsisVertical, IterationCw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DiaryItemDeleteDialog from "./DiaryItemDeleteDialog";
import { useState } from "react";
import DiaryItemUpdateDialog from "./DiaryItemUpdateDialog";

interface DiaryDropdownMenuProps {
  action: any;
  setActions: React.Dispatch<React.SetStateAction<any>>;
}

export const DiaryDropddownMenu: React.FC<DiaryDropdownMenuProps> = ({
  action,
  setActions,
}) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={"icon"}
            className={``}
          >
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {/* <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer gap-1"  onClick={() => setUpdateDialog(true)}>
              <IterationCw />
              <span>Modifier</span>
            </DropdownMenuItem>
          </DropdownMenuGroup> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer gap-1"
              onClick={() => setDeleteDialog(true)}
            >
              <X />
              <span>Supprimer</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DiaryItemDeleteDialog
        action={action}
        setActions={setActions}
        openAlertDialog={deleteDialog}
        setOpenAlertDialog={setDeleteDialog}
      />
        <DiaryItemUpdateDialog
        action={action}
        setActions={setActions}
        openAlertDialog={updateDialog}
        setOpenAlertDialog={setUpdateDialog}
      />
    </>
  );
};

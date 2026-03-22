import TableProduction from "@/components/table-production/TableProduction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DiaryAndProductionModalHeader from "@/features/dashboard-modules/actions/components/DiaryAndProductionModalHeader";
import Diary from "@/features/diary/Diary";
import { useState } from "react";

import { ReactNode } from "react";

interface DiaryAndProductionModalProps {
  area: any; // Replace 'any' with the appropriate type if known
  children: ReactNode;
}

const DiaryAndProductionModal = ({
  area,
  children,
}: DiaryAndProductionModalProps) => {
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(true);

  const tableDisplay = () => {
    if (!tableOpen) {
      setDiaryOpen(false);
      setTableOpen(true);
    }
  };

  const diaryDisplay = () => {
    if (!diaryOpen) {
      setDiaryOpen(true);
      setTableOpen(false);
    }
  };
  return (
    <>
      <Dialog modal>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
        aria-describedby={undefined}
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="
            p-0 pt-2
            gap-5
            h-dvh md:h-[90vh] w-full md:w-[90vw] md:max-w-none
            rounded-none md:rounded-lg
            overflow-y-auto overflow-x-hidden
            flex flex-col items-center
            dark:bg-slate-900
          "
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="flex flex-col gap-3">
              <DiaryAndProductionModalHeader area={area} />
            </DialogTitle>
            <div className="text-md font-thin text-left">
              <ul className="flex justify-center text-lg gap-20 mt-2">
                <li
                  onClick={tableDisplay}
                  className={`cursor-pointer ${
                    tableOpen
                      ? "border-b-2 border-black dark:border-stone-50"
                      : ""
                  }  px-2 h-full w-full text-center`}
                >
                  Production
                </li>
                <li
                  onClick={diaryDisplay}
                  className={`cursor-pointer ${
                    diaryOpen
                      ? "border-b-2 border-black dark:border-stone-50"
                      : ""
                  }  px-2 h-full w-full text-center`}
                >
                  Journal
                </li>
              </ul>
            </div>
          </DialogHeader>
          <div
            className="
                p-4
                w-full h-full
                overflow-auto
                scrollbar-thin
                scrollbar-thumb-rounded-full scrollbar-thumb-slate-400 dark:scrollbar-thumb-gray-100
                scrollbar-track-rounded-full scrollbar-track-gray-100  dark:scrollbar-track-slate-900
                bg-green-50 dark:bg-slate-900 "
          >
            {diaryOpen ? (
              <Diary area={area} />
            ) : (
              <TableProduction area={area} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DiaryAndProductionModal;

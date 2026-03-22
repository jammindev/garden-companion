// components
import AreaList from "./AreaList";
import AreaFormAdd from "./AreaFormAdd";

// hooks
import useModal from "../../../../hooks/useModal";
import useSort from "../../../../hooks/useSort";
import useAdd from "../../../../hooks/useAdd";

// modal
import AreaModal from "../modals/AreaModal";

// interfaces
import { AreaInterface } from "../../../../interfaces/interfaces";
import { ArrowDownNarrowWide, CirclePlus, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AreasModuleProps {
  areas: AreaInterface[];
  isLoadingAreas: boolean;
  errorGetAreas: string | null;
}

const AreasModule: React.FC<AreasModuleProps> = ({
  areas,
  isLoadingAreas,
  errorGetAreas,
}) => {
  const [isSortOpen, toggleSort, sortedBy, handleClickSort] = useSort("name");
  const [addOpen, handleClickAdd] = useAdd();
  const [isModalOpen, openModal, closeModal, area] = useModal();

  return (
    <div>
      {errorGetAreas && (
        <div className="absolute top-36 left-20 font-extralight text-center">
          <p>Impossible de joindre le server.</p>
          <p>Veuillez rafraîchir la page.</p>
        </div>
      )}
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={handleClickAdd}
        className={`absolute top-3 
        right-3`}
      >
        {addOpen ? (
          <Undo2 size={"30"} strokeWidth={1.5} />
        ) : (
          <CirclePlus size={"30"} strokeWidth={1.5} />
        )}
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        className={`absolute top-3 left-3 ${addOpen ? "hidden" : "visible"}`}
        onClick={toggleSort}
      >
        <ArrowDownNarrowWide size={"30"} strokeWidth={1.5} />
      </Button>
      <div className={`ml-3 ${isSortOpen && !addOpen ? "visible" : "hidden"}`}>
        Trier par :
        <ul className="ml-5">
          <li
            className="cursor-pointer hover:underline"
            onClick={() => {
              handleClickSort("name");
            }}
          >
            - Nom
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => {
              handleClickSort("environnement");
            }}
          >
            - Environnement
          </li>
        </ul>
      </div>
      {addOpen ? (
        <AreaFormAdd {...{ handleClickAdd }} />
      ) : (
        <AreaList {...{ sortedBy, openModal, areas, isLoadingAreas }} />
      )}

      <AreaModal isOpen={isModalOpen} onClose={closeModal} area={area} />
    </div>
  );
};
export default AreasModule;

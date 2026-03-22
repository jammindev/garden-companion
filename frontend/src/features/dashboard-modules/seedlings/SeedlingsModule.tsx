import useSort from "../../../hooks/useSort";
import useAdd from "../../../hooks/useAdd";

// components
import SeedlingsAdd from "./SeedlingsAdd";
import SeedlingsList from "./SeedlingsList";

// assets
import { ArrowDownNarrowWide, CirclePlus, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SeedlingsModule = () => {
  const [isSortOpen, toggleSort, sortedBy, handleClickSort] = useSort(
    localStorage.getItem("sort-seedlings") || "created_at desc"
  );
  const [addOpen, handleClickAdd] = useAdd();

  const sortChoices = [
    ["date d'ajout (ancien en tête)", "created_at asc"],
    ["date d'ajout (récent en tête)", "created_at desc"],
    ["nom (a - z)", "name asc"],
    ["nom (z - a)", "name desc"],
  ];

  return (
    <div>
      <Button variant={"ghost"} size={"icon"}
        onClick={handleClickAdd}
        className={`absolute top-3 right-3`}
      >
      {addOpen ? <Undo2 size={"30"} strokeWidth={1.5} /> : <CirclePlus size={"30"} strokeWidth={1.5} />}

        {/* <img
          className={addOpen ? "w-8 h-8" : "w-10 h-10"}
          src={addOpen ? ckIconba : addIcon}
          alt=""
        /> */}
      </Button>
      <Button size={"icon"} variant={"ghost"}
        className={`absolute top-3 left-3 ${
          addOpen ? "hidden" : "visible"
        }`}
        onClick={toggleSort}
      >
        <ArrowDownNarrowWide size={"30"} strokeWidth={1.5}/>
      </Button>
      <div className={`ml-3 ${isSortOpen ? "visible" : "hidden"}`}>
        Trier par :
        <ul className="ml-5">
          {sortChoices.map((choice, index) => {
            return (
              <li
                key={index}
                className="cursor-pointer hover:underline"
                onClick={() => {
                  handleClickSort(choice[1]);
                }}
              >
                - {choice[0]}
              </li>
            );
          })}
        </ul>
      </div>

      {addOpen ? (
        <SeedlingsAdd {...{ handleClickAdd }} />
      ) : (
        <SeedlingsList {...{ sortedBy, handleClickSort }} />
      )}
    </div>
  );
};
export default SeedlingsModule;

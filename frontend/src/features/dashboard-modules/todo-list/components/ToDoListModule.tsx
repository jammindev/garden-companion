// components
import ToDoListFormAdd from "./ToDoListFormAdd";
import ToDoListList from "./ToDoListList";
import ToDoListFormEdit from "./ToDoListFormEdit";

// hooks
import useAdd from "../../../../hooks/useAdd";
import useEdit from "../../../../hooks/useEdit";
import useGetTodos from "../hooks/useGetTodos";
import useSort from "../../../../hooks/useSort";
import { ArrowDownNarrowWide, CirclePlus, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ToDoListModule = () => {
  const [isSortOpen, toggleSort, sortedBy, handleClickSort] =
    useSort("priority ascending");
  const [addOpen, handleClickAdd] = useAdd();
  const [editOpen, handleClickEdit, defaultValue] = useEdit();
  const [toDo, setToDo] = useGetTodos();

  const toggleAddEdit = () => {
    if (!editOpen) {
      handleClickAdd();
    } else {
      handleClickEdit();
    }
  };

  // const sortChoices = [
  //   ["priorité (élevée en tête)", "priority ascending"],
  //   ["priorité (normale en tête)", "priority descending"],
  //   ["complétée (non en tête)", "status ascending"],
  //   ["complétée (oui en tête)", "status descending"],
  //   ["date de creation (récent en tête)", "date descending"],
  //   ["date de creation (ancien en tête)", "date ascending"],
  //   ["nom (a - z)", "name ascending"],
  //   ["nom (z - a)", "name descending"],
  // ];
  const sortChoices = [
    ["priorité", "priority ascending"],
    ["complétée", "status ascending"],
    ["date de creation", "date descending"],
    ["nom", "name ascending"],
  ];

  return (
    <div>
      <div>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={toggleAddEdit}
          className={`absolute top-3 right-3`}
        >
          {addOpen || editOpen ? (
            <Undo2 size={"30"} />
          ) : (
            <CirclePlus size={"30"} strokeWidth={1.5} />
          )}
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={`absolute top-3 left-3 ${
            addOpen || editOpen ? "hidden" : "visible"
          }`}
          onClick={toggleSort}
        >
          <ArrowDownNarrowWide size={"30"} strokeWidth={1.5} />
        </Button>
      </div>
      <div
        className={`ml-3 ${
          isSortOpen && !addOpen && !editOpen ? "visible" : "hidden"
        }`}
      >
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
      {addOpen && <ToDoListFormAdd {...{ setToDo, handleClickAdd }} />}
      {editOpen && (
        <ToDoListFormEdit
          {...{ setToDo, handleClickEdit, defaultValue, toDo }}
        />
      )}
      {!addOpen && !editOpen && (
        <ToDoListList {...{ sortedBy, toDo, setToDo, handleClickEdit }} />
      )}
    </div>
  );
};
export default ToDoListModule;

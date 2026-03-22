// interfaces
import { ToDoInterface } from "../interfaces";


// utils
import {
  sortByNameAscending,
  sortByNameDescending,
  sortByStatusAscending,
  sortByStatusDescending,
  sortByDateAscending,
  sortByDateDescending,
  sortByPriorityAscending,
  sortByPriorityDescending,
} from "../utils/sortFunctions";

// api
import { deleteToDoApi, toggleCompleted } from "../utils/todosApi";
import { CircleAlert, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ToDoListListProps {
  sortedBy: string;
  toDo: ToDoInterface[];
  setToDo: React.Dispatch<React.SetStateAction<ToDoInterface[]>>;
  handleClickEdit: (id: string) => void;
}

const ToDoListList: React.FC<ToDoListListProps> = ({
  sortedBy,
  toDo,
  setToDo,
  handleClickEdit,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const toggleStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const todo_id = e.target.dataset.todoId;
    if (todo_id) {
      setIsLoading(true)
      try {
        const updatedTodo = await toggleCompleted(todo_id);
        setToDo((prev) =>
          prev.map((todo) =>
            updatedTodo.uuid === todo.uuid ? updatedTodo : todo
          )
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    }
  };

  const deleteTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const todo_id = e.currentTarget.dataset.todoId;
    try {
      if (todo_id) {
        await deleteToDoApi(todo_id);
        setToDo((prev) => prev.filter((todo) => todo.uuid !== todo_id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  let toDoSorted: ToDoInterface[] = [];

  switch (sortedBy) {
    case "name ascending":
      toDoSorted = sortByNameAscending(toDo);
      break;
    case "name descending":
      toDoSorted = sortByNameDescending(toDo);
      break;
    case "priority ascending":
      toDoSorted = sortByPriorityAscending(toDo);
      break;
    case "priority descending":
      toDoSorted = sortByPriorityDescending(toDo);
      break;
    case "status ascending":
      toDoSorted = sortByStatusAscending(toDo);
      break;
    case "status descending":
      toDoSorted = sortByStatusDescending(toDo);
      break;
    case "date ascending":
      toDoSorted = sortByDateAscending(toDo);
      break;
    case "date descending":
      toDoSorted = sortByDateDescending(toDo);
      break;
    default:
      break;
  }

  return (
    <ul
      className="
        flex 
        flex-col 
        gap-2 
        text-xl 
        font-thin 
        overflow-auto
        scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-100 dark:scrollbar-track-slate-900
        h-[280px] 
        px-2
        "
    >
      {toDoSorted.map((todo) => {
        return (
          <li
            key={todo.uuid}
            className="flex gap-2 w-full justify-between items-center"
          >
            <div className="cursor-pointer flex gap-3 items-center">
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <Loader2 className="animate-spin size-4" />
                ) : (
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={toggleStatus}
                    data-todo-id={todo.uuid}
                  />
                )}
              </div>
              {todo.priority === "H" && (
                <CircleAlert color="red" />
                // <img className="w-5 h-5" src={priorityIcon} alt="" />
              )}
              <p
                onClick={() => handleClickEdit(todo.uuid)}
                className="text-lg leading-none cursor-pointer"
              >
                {todo.title}
              </p>
            </div>
            <Button
              variant={"ghost"}
              size={null}
              onClick={deleteTodo}
              data-todo-id={todo.uuid}
            >
              <Trash2 size={"20"} />
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default ToDoListList;

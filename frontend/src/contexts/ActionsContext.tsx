import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { ActionInterface } from "@/interfaces/interfaces";
import { createActionApi, getAllActionsApi } from "@/api/api-services/actionsApi";

interface ActionsContextType {
  actions: ActionInterface[];
  isLoading: boolean;
  error: string | null;
  createAction: (newAction: ActionInterface) => Promise<void>;
  updateAction: (id: string, updatedAction: ActionInterface) => Promise<void>;
  deleteAction: (id: string) => void;
  setActions: Dispatch<SetStateAction<ActionInterface[]>>;
}

const ActionsContext = createContext<ActionsContextType | undefined>(undefined);

export const ActionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [actions, setActions] = useState<ActionInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActions = async () => {
      try {
        setIsLoading(true);
        const fetchedActions = await getAllActionsApi();
        setActions(fetchedActions);
      } catch (error) {
        console.error("Error when fetching actions", error);
        setError("Issue when fetching actions");
      } finally {
        setIsLoading(false);
      }
    };
    fetchActions;
  }, []);

//   const createAction = async (newAction: ActionInterface) => {
//     try {
//         setIsLoading(true);
//         const fetchedActions = await createActionApi(newAction);
//         setActions(fetchedActions);
//       } catch (error) {
//         console.error("Error when fetching actions", error);
//         setError("Issue when fetching actions");
//       } finally {
//         setIsLoading(false);
//       }
//     return;
//   };

  const updateAction = async (id: string, updatedAction: ActionInterface) => {
    return;
  };

  const deleteAction = async (id: string) => {
    return;
  };

  return (
    <ActionsContext.Provider
      value={{
        actions,
        setActions,
        isLoading,
        error,
        createAction,
        updateAction,
        deleteAction,
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
};

export default ActionsContext;

import vegetableIconsMaps from "@/maps/vegetableMaps";
import { ActionInterface } from "./Diary";
import directSowingIcon from "../../assets/actions-icons/direct-sowing.png";
import plantingIcon from "../../assets/actions-icons/planting.png";
import harvestIcon from "../../assets/actions-icons/harvest.png";
import waterIcon from "../../assets/actions-icons/watering.png";
import removeIcon from "../../assets/actions-icons/remove.png";
import treatIcon from "../../assets/actions-icons/parasite.png";
import cameraIcon from "../../assets/actions-icons/camera.png";
import weedIcon from "../../assets/actions-icons/weed.png";
import fertilizeIcon from "../../assets/actions-icons/fertilize.png";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import capitalize from "@/utils/capitalizeStr";
import { DiaryDropddownMenu } from "./DiaryDropdownMenu";

const PhotoItem: React.FC<{ file_path: string }> = ({ file_path }) => {
  return (
    <>
      {file_path && (
        <img
          className="w-full max-h-96 object-cover rounded-b-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

export const DiaryItemDirectSowing: React.FC<{ action: ActionInterface }> = ({
  action,
  vegetableAsset,
}) => {
  return (
    <>
      <div className="flex items-center gap-1">
        {vegetableAsset && (
          <img className="size-6" src={vegetableAsset} alt="" />
        )}{" "}
        {action.vegetable.name} ({action.vegetable.variety}) :{" "}
        {action.vegetable.quantity} {action.vegetable.quantity_unit}
      </div>
    </>
  );
};

export const DiaryItemPlanting: React.FC<{ action: ActionInterface }> = ({
  action,
  vegetableAsset,
}) => {
  return (
    <>
      <div className="flex items-center gap-1">
        {vegetableAsset && (
          <img className="size-6" src={vegetableAsset} alt="" />
        )}
        {action.vegetable.name} ({action.vegetable.variety}) :{" "}
        {action.vegetable.quantity} {action.vegetable.quantity_unit}
      </div>
    </>
  );
};

export const DiaryItemHarvesting: React.FC<{ action: ActionInterface }> = ({
  action,
  vegetableAsset,
}) => {
  return (
    <>
      <div className="">
        {action.quantity} {action.quantity_unit || "kg"}{" "}
        {vegetableAsset && (
          <img className="size-6" src={vegetableAsset} alt="" />
        )}{" "}
        {action.vegetable &&
          `de : ${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
    </>
  );
};

export const DiaryItemWatering: React.FC<{ action: ActionInterface }> = ({
  action,
  vegetableAsset,
}) => {
  return (
    <div className="text-center">
      {action.vegetable && (
        <div className="flex items-center gap-1">
          <img className="size-6" src={vegetableAsset} alt="" />
          <span>
            {action.vegetable.name} ({action.vegetable?.variety})
          </span>
        </div>
      )}
      {action.quantity && action.quantity > 0 ? action.quantity : ""}{" "}
      {action.quantity_unit || ""}{" "}
      {((action.quantity && action.quantity > 0) || action.quantity_unit) &&
        action.vegetable &&
        ": "}
    </div>
  );
};

export const DiaryItemWeeding: React.FC<{ action: ActionInterface }> = ({
  action,
  vegetableAsset,
}) => {
  return (
    <>
      <div className="">
        {vegetableAsset && (
          <img className="size-6" src={vegetableAsset} alt="" />
        )}{" "}
        {action.vegetable &&
          `${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
    </>
  );
};

export const DiaryItemFertilizing: React.FC<{ action: ActionInterface }> = ({
  action,
  vegetableAsset,
}) => {
  return (
    <div className="text-center">
      {action.vegetable && (
        <div className="flex items-center gap-1">
          <img className="size-6" src={vegetableAsset} alt="" />
          <span>
            {action.vegetable.name} ({action.vegetable?.variety})
          </span>
        </div>
      )}
      {action.product_name} : {action.quantity || ""}{" "}
      {action.quantity_unit || ""}{" "}
    </div>
  );
};

export const DiaryItemRemoving: React.FC<{ action: ActionInterface }> = ({
  action,
  vegetableAsset,
}) => {
  return (
    <>
      <div className="">
        {vegetableAsset && (
          <img className="size-6" src={vegetableAsset} alt="" />
        )}{" "}
        {action.vegetable.name} ({action.vegetable.variety})
      </div>
    </>
  );
};

export const DiaryItemObservation: React.FC<{ action: ActionInterface }> = ({
  action,
  vegetableAsset,
}) => {
  return (
    <>
      {action.vegetable && (
        <div className="flex items-center gap-1">
          <img className="size-6" src={vegetableAsset} alt="" />
          <span>
            {action.vegetable.name} ({action.vegetable?.variety})
          </span>
        </div>
      )}
    </>
  );
};

export const DiaryItemTreating: React.FC<{ action: ActionInterface }> = ({
  action,
  vegetableAsset,
}) => {
  return (
    <div className="text-center">
      {action.vegetable && (
        <div className="flex items-center gap-1">
          <img className="size-6" src={vegetableAsset} alt="" />
          <span>
            {action.vegetable.name} ({action.vegetable?.variety})
          </span>
        </div>
      )}
      {action.product_name} : {action.quantity || ""}{" "}
      {action.quantity_unit || ""}{" "}
    </div>
  );
};

interface DiaryItemGeneralProps {
  action: ActionInterface;
  setActions: () => void;
}

export const DiaryItemGeneral: React.FC<DiaryItemGeneralProps> = ({
  action,
  setActions,
}) => {
  const vegetableAsset = vegetableIconsMaps.find(
    (asset) => asset?.name?.fr === action.vegetable?.name.toLowerCase()
  );
  let file_path;
  if (action.photos) {
    file_path = action.photos[0]?.photo;
  }

  const actionComponentMap: { [key: string]: [JSX.Element, string, string] } = {
    SOWING: [
      <DiaryItemDirectSowing
        action={action}
        vegetableAsset={vegetableAsset?.assets}
      />,
      "Semis",
      directSowingIcon,
    ],
    PLANTING: [
      <DiaryItemPlanting
        action={action}
        vegetableAsset={vegetableAsset?.assets}
      />,
      "Plantation",
      plantingIcon,
    ],
    WATERING: [
      <DiaryItemWatering
        action={action}
        vegetableAsset={vegetableAsset?.assets}
      />,
      "Arrosage",
      waterIcon,
    ],
    FERTILIZING: [
      <DiaryItemFertilizing
        action={action}
        vegetableAsset={vegetableAsset?.assets}
      />,
      "Fertilisation",
      fertilizeIcon,
    ],
    TREATING: [
      <DiaryItemTreating
        action={action}
        vegetableAsset={vegetableAsset?.assets}
      />,
      "Traitement",
      treatIcon,
    ],
    HARVESTING: [
      <DiaryItemHarvesting
        action={action}
        vegetableAsset={vegetableAsset?.assets}
      />,
      "Récolte",
      harvestIcon,
    ],
    WEEDING: [
      <DiaryItemWeeding
        action={action}
        vegetableAsset={vegetableAsset?.assets}
      />,
      "Désherbage",
      weedIcon,
    ],
    OBSERVING: [
      <DiaryItemObservation
        action={action}
        vegetableAsset={vegetableAsset?.assets}
      />,
      "Observation",
      cameraIcon,
    ],
    REMOVING: [
      <DiaryItemRemoving
        action={action}
        vegetableAsset={vegetableAsset?.assets}
      />,
      "Fin de culture",
      removeIcon,
    ],
  };

  return (
    <Card className="w-full lg:w-[800px]">
      <CardHeader className="p-3">
        <div className="flex items-center justify-between relative">
          <div className="flex flex-col justify-center gap-1 h-14 w-20 items-center">
            <img
              className="size-8 md:size-10"
              src={actionComponentMap[action.operation_type][2]}
              alt=""
            />
            <span className="text-xs text-center">
              {actionComponentMap[action.operation_type][1]}
            </span>
          </div>

          <div className="flex flex-col lg:gap-6 justify-between items-center">
            <span className="text-sm font-semibold">
              {new Date(action.date).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
              })}
            </span>
            {/* {vegetableAsset && (
              <div className="flex flex-col justify-center gap-2 items-center">
                <img
                  className="size-9"
                  src={vegetableAsset?.assets}
                  alt=""
                />
                <span className="text-center">
                  {capitalize(vegetableAsset?.name.fr)}
                  {action.vegetable?.variety && ` ${action.vegetable?.variety}`}
                </span>
              </div>
            )} */}
          </div>
          <DiaryDropddownMenu action={action} setActions={setActions} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center p-0">
        <div className="px-3 mb-3 flex flex-col gap-3 items-center">
          {actionComponentMap[action.operation_type][0]}
          {action.description && (
            <p className="text-justify italic">{action.description}</p>
          )}
        </div>
        {file_path && <PhotoItem file_path={file_path} />}
      </CardContent>
    </Card>
  );
};

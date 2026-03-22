import { Button } from "@/components/ui/button";
import vegetableIconsMaps from "@/maps/vegetableMaps";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import unknownVegetable from "@/assets/vegetables-icons/unknown-vegetable.png"

export type Vegetable = {
  vegetable_manager_id: string;
  name: string;
  variety: string;
  quantity: number;
  quantity_unit: string;
  sowing_date: Date | null;
  planting_date: Date | null;
  ready_to_harvest: boolean;
  quantity_harvested: number | null;
  harvest_unit: string | null;
  remove_date: Date | null;
};

const getVegetableAsset = (vegetableName: string) => {
  let vegetableIcon = vegetableIconsMaps.find(
    (asset) => asset.name.fr === vegetableName.toLowerCase()
  )?.assets || unknownVegetable
  return vegetableIcon;
};

export const columns: ColumnDef<Vegetable>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <img
            className="w-5 h-5"
            src={getVegetableAsset(row.getValue("name"))}
            alt=""
          />
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "variety",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Variété
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=" whitespace-nowrap">{row.getValue("variety")}</div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="">Quantité</div>,
    cell: ({ row }) => {
      return <div className="">{row.getValue("quantity")}</div>;
    },
  },
  {
    accessorKey: "quantity_unit",
    header: () => <div className="">Unité</div>,
    cell: ({ row }) => {
      return <div className="">{row.getValue("quantity_unit")}</div>;
    },
  },
  {
    accessorKey: "sowing_date",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Semis
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const sowingDate = row.getValue("sowing_date");
      const formatted =
        sowingDate !== null
          ? new Date(sowingDate).toLocaleDateString("fr-FR")
          : "-";
      return <div className="whitespace-nowrap">{formatted}</div>;
    },
  },
  {
    accessorKey: "planting_date",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plantation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const plantingDate = row.getValue("planting_date");
      const formatted =
        plantingDate !== null
          ? new Date(plantingDate).toLocaleDateString("fr-FR")
          : "-";
      return <div className="whitespace-nowrap">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity_harvested",
    header: () => <div className="">Récolté</div>,
    cell: ({ row }) => {
      return <div className="">{row.getValue("quantity_harvested")}</div>;
    },
  },
  {
    accessorKey: "harvest_unit",
    header: () => <div className="">Unité</div>,
    cell: ({ row }) => {
      return <div className="">{row.getValue("harvest_unit")}</div>;
    },
  },
  {
    accessorKey: "remove_date",
    header: ({ column }) => {
      return (
        <Button
          className="whitespace-nowrap"
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fin de culture
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const removeDate = row.getValue("remove_date");
      const formatted =
        removeDate !== null
          ? new Date(removeDate).toLocaleDateString("fr-FR")
          : "-";
      return <div className="whitespace-nowrap">{formatted}</div>;
    },
  },
];

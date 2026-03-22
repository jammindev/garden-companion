import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { deleteVegetableApi } from "@/api/api-services/vegetables";

import {
  Table,
  TableBody,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
// import { Vegetable } from "./columns";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Columns3, Loader2, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setReload
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [currentVegetable, setCurrentVegetable] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const mappingColumnName = {
    name: "nom",
    variety: "variété",
    quantity: "quantité",
    quantity_unit: "unité",
    sowing_date: "semis",
    planting_date: "plantation",
    quantity_harvested: "récolté",
    harvest_unit: "unité",
    remove_date: "fin de culture",
  };

  const handleClickEdit = (vegetable) => {
    setCurrentVegetable(vegetable);
    setOpenDropdown(!openDropdown);
  };

  const deleteVegetable = async () => { 
    try {
      setIsLoading(true);
      await deleteVegetableApi(currentVegetable.uuid);
      setReload(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setOpenAlertDialog(false);
    }
 };

  return (
    <>
      <div className="flex items-center py-4">
        <div>
          <Input
            placeholder="Filtrer par nom"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild className="gap-2">
            <Button className="ml-auto">
              <Columns3 strokeWidth={1.5} />
              Colonnes
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const columnName =
                  mappingColumnName[
                    column.id as keyof typeof mappingColumnName
                  ];
                if (column.id !== "name") {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {columnName}
                    </DropdownMenuCheckboxItem>
                  );
                }
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center bg-white dark:bg-slate-900"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                // const rowData = row.original as Vegetable;
                // const isHarvestable = rowData.ready_to_harvest;
                return (
                  <DropdownMenu modal={false} key={row.original.uuid}>
                    <DropdownMenuTrigger asChild>
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className={
                          "h-8 p-0 bg-white dark:bg-slate-800 cursor-pointer"
                        }
                        onClick={() => handleClickEdit(row.original)}
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <TableCell key={cell.id} className="text-center">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" sideOffset={0}>
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
                          onClick={() => setOpenAlertDialog(true)}
                        >
                          <X />
                          <span>Supprimer</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>‼️ Attention</AlertDialogTitle>
      <AlertDialogDescription>
        Cela supprimera définitivement cette plante de la base de données
        ainsi que toutes les entrées du journal associées.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <Button variant="destructive" onClick={deleteVegetable}>
        {isLoading && <Loader2 className="animate-spin mr-3" />}
        Supprimer
      </Button>
      <AlertDialogCancel>Annuler</AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </>
  );
}


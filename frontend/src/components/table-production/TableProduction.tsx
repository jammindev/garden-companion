// import FakeVegetableData from "@/dumb-data/vegetablesData";
import { getAllVegetables } from "@/api/api-services/vegetables";
import { columns } from "@/features/data-table/columns";
import { DataTable } from "@/features/data-table/data-table";
import type { AreaInterface } from "@/interfaces/interfaces";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const TableProduction = ({ area }: { area: AreaInterface }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [reload, setReload] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      if (area) {
        setData(area.vegetables);
      } else {
        try {
          setIsLoading(true);
          const vegetables = await getAllVegetables();
          setData(vegetables);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
          setReload(false);
        }
      }
    };

    fetchData();
  }, [area, reload]);

  if (isLoading === true) {
    return (
      <div className="w-full h-full flex justify-center mt-5">
        <Loader2 className="animate-spin mr-3" />
      </div>
    )
  }
  
  return (
    data?.length > 0 ? 
    (<div>
      <DataTable columns={columns} data={data} setReload={setReload} />
    </div>) : (
      <div className="text-center">Aucune donnée à afficher</div>
    )
  );
};

export default TableProduction;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useMemo } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface RatioData {
  mc: string;
  aplCount: number;
  aplApd: number;
  processTime: number;
}

const RatioTable = ({ data }: { data: RatioData[] }) => {
  const [sortBy, setSortBy] = useState<keyof RatioData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const sortedData = useMemo(() => {
    if (!sortBy) return data;

    const compare = (a: RatioData, b: RatioData) => {
      let comparison = 0;

      if (sortBy === "mc") {
        comparison = a.mc.localeCompare(b.mc);
      } else if (
        typeof a[sortBy] === "number" &&
        typeof b[sortBy] === "number"
      ) {
        comparison = (a[sortBy] as number) - (b[sortBy] as number);
      } else if (
        typeof a[sortBy] === "string" &&
        typeof b[sortBy] === "string"
      ) {
        comparison = (a[sortBy] as string).localeCompare(b[sortBy] as string);
      }

      return sortOrder === "desc" ? comparison * -1 : comparison;
    };

    return [...data].sort(compare); // Create a new sorted array to avoid mutating original data
  }, [data, sortBy, sortOrder]);

  const handleSort = (column: keyof RatioData) => {
    if (sortBy === column) {
      setSortOrder(() => {
        if (sortOrder === "asc") return "desc";
        if (sortOrder === "desc") return null;
        return "asc"; // Default to ascending if no sort order
      });
    } else {
      setSortBy(column);
      setSortOrder("asc"); // Default to ascending for new column
    }
  };

  const getSortIcon = (column: keyof RatioData) => {
    if (sortBy === column) {
      if (sortOrder === "asc") {
        return <ArrowUp className="ml-2 h-4 w-4 inline-block" />;
      } else if (sortOrder === "desc") {
        return <ArrowDown className="ml-2 h-4 w-4 inline-block" />;
      }
    }
    return null;
  };

  return (
    <div className="h-[500px] overflow-y-auto">
      {sortedData.length > 0 ? (
        <Table className="bg-white shadow-lg rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[100px] cursor-pointer"
                onClick={() => handleSort("mc")}
              >
                MC {getSortIcon("mc")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("aplCount")}
              >
                APL Count {getSortIcon("aplCount")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("aplApd")}
              >
                APL-APD {getSortIcon("aplApd")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("processTime")}
              >
                Process Time (Days) {getSortIcon("processTime")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {sortedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <span className="font-bold">{row.mc}</span>
                </TableCell>
                <TableCell>
                  {" "}
                  <span className="font-bold">{row.aplCount}</span>
                </TableCell>
                <TableCell>
                  {" "}
                  <span className="font-bold">{row.aplApd} % </span>
                </TableCell>
                <TableCell>
                  {" "}
                  <span className="font-bold">{row.processTime} </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center text-gray-500 justify-center items-center">
          No data available.
        </div>
      )}
    </div>
  );
};

export default RatioTable;

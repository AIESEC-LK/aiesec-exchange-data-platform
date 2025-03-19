import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RatioTable = ({
  data,
}: {
  data: {
    mc: string;
    aplCount: number;
    aplApd: number;
    processTime: number;
  }[];
}) => {
  return (
    <div className="h-[500px] overflow-y-auto">
      <Table className="bg-white shadow-lg rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">MC</TableHead>
            <TableHead>APL Count</TableHead>
            <TableHead>APL-APD</TableHead>
            <TableHead>Process Time (Days)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {data.map((row, index) => (
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
    </div>
  );
};

export default RatioTable;

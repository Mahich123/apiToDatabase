import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

export default function ReportTable() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await fetch("https://honostoredb.onrender.com//api/data");

      if (!res.ok) {
        throw new Error("Error fetching data");
      }
      return res.json();
    },
  });

  if (isLoading) {
    return <p>Loaing ...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>Data not found</p>;
  }

  const totalQuantity = data.reduce((acc, curr) => acc + curr.quantity, 0);

  const totalPrice = data.reduce(
    (acc, curr) => acc + parseFloat(curr.productPrice),
    0
  );

  const totalValue = data.reduce(
    (acc, curr) => acc + parseFloat(curr.total),
    0
  );

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.productName}</TableCell>
              <TableCell>{order.userName}</TableCell>
              <TableCell className="text-right">{order.quantity}</TableCell>
              <TableCell className="text-right">
                ${order.productPrice}
              </TableCell>
              <TableCell className="text-right">${order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="font-medium">
              Gross Total
            </TableCell>
            <TableCell className="text-right font-medium">
              {totalQuantity}
            </TableCell>
            <TableCell className="text-right font-medium">
              {totalPrice}
            </TableCell>
            <TableCell className="text-right font-medium">{totalValue}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

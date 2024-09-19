import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import FetchData from "./FetchData";
import ReportTable from "./ReportTable";

const sentTobackend = async (
  data: {
    userData: { fullName: string; phone: string; createdAt: string };
    products: {
      productName: string;
      productCode: string;
      productPrice: string;
    };
    orders: { orderNumber: number; productCode: string; quantity: number };
  }[]
) => {
  
  try {
    const res = await fetch("https://honostoredb.onrender.com/api/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Server Error");
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error sending data", error);
  }
};

type ItemProps = {
  name: string;
  user_phone: string;
  created_at: string;
  product_name: string;
  product_code: string;
  product_price: string;
  order_no: number;
  purchase_quantity: number;
};

type DataProps = ItemProps[];

export function ReportBtn() {
  const { status, mutate, isSuccess } = useMutation<DataProps>({
    mutationFn: FetchData,
    onSuccess: (data) => {
      const extractedData = data.map((items) => {
        const userData = {
          fullName: items.name,
          phone: items.user_phone,
          createdAt: items.created_at,
        };

        const products = {
          productName: items.product_name,
          productCode: items.product_code,
          productPrice: items.product_price,
          createdAt: items.created_at,
        };

        const orders = {
          orderNumber: items.order_no,
          productCode: items.product_code,
          productPrice: items.product_price,
          quantity: items.purchase_quantity,
          userNumber: items.user_phone,
          createdAt: items.created_at,
        };

        return {
          userData,
          products,
          orders,
        };
      });

      sentTobackend(extractedData);
    },
  });

  const handleClick = () => {
    return mutate();
  };
  return (
    <div className="flex flex-col gap-y-10 h-screen items-center justify-center mt-8">
      <Button onClick={handleClick}>
        {status == "pending" ? "Loading..." : "Generate Report"}
      </Button>

      {isSuccess ? (
        <ReportTable />
      ) : (
        "No reports at the moment,  click above to generate"
      )}
    </div>
  );
}

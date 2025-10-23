import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import OrderDetail from "./OrderDetail";

function AdminOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // ✅ Static sample data
  const orderList = [
    {
      _id: "ORD12345",
      orderDate: "2025-10-20",
      status: "Delivered",
      totalAmount: 249.99,
    },
    {
      _id: "ORD67890",
      orderDate: "2025-10-15",
      status: "Processing",
      totalAmount: 89.5,
    },
  ];

  // Dummy details for dialog
  const orderDetails = {
    id: "ORD12345",
    items: [
      { name: "Wireless Headphones", qty: 1, price: 149.99 },
      { name: "Phone Case", qty: 2, price: 50 },
    ],
    totalAmount: 249.99,
    address: "123 Green Street, NY",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderList.map((orderItem) => (
              <TableRow key={orderItem._id}>
                <TableCell>{orderItem._id}</TableCell>
                <TableCell>{orderItem.orderDate}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      orderItem.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }
                  >
                    {orderItem.status}
                  </Badge>
                </TableCell>
                <TableCell>${orderItem.totalAmount}</TableCell>
                <TableCell>
                  <Dialog
                    open={openDetailsDialog}
                    onOpenChange={setOpenDetailsDialog}
                  >
                    <Button onClick={() => setOpenDetailsDialog(true)}>
                      View Details
                    </Button>
                    <OrderDetail orderDetails={orderDetails} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrders;

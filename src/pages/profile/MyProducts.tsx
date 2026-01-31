import { useReduxSelector } from "../../hooks/useRedux";
import { Empty, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface OrderType {
  _id: string;
  total_price: number;
  status: string;
  created_at: string;
  products: Array<{
    product_id: string;
    title: string;
    price: number;
    count: number;
    main_image: string;
  }>;
}

const MyProducts = () => {
  const { orders } = useReduxSelector((state) => state.user);

  // Demo buyurtmalar (agar real buyurtmalar bo'lmasa)
  const demoOrders: OrderType[] = orders.length === 0 ? [
    {
      _id: "order_001",
      total_price: 299.99,
      status: "delivered",
      created_at: "2024-01-15T10:30:00Z",
      products: [
        {
          product_id: "prod_001",
          title: "Barberton Daisy",
          price: 119.00,
          count: 2,
          main_image: "/src/assets/img/card1.png"
        },
        {
          product_id: "prod_002", 
          title: "Blushing Bromeliad",
          price: 139.00,
          count: 1,
          main_image: "/src/assets/img/card2.png"
        }
      ]
    },
    {
      _id: "order_002",
      total_price: 179.50,
      status: "processing",
      created_at: "2024-01-20T14:15:00Z",
      products: [
        {
          product_id: "prod_003",
          title: "Aluminum Plant",
          price: 179.50,
          count: 1,
          main_image: "/src/assets/img/card3.png"
        }
      ]
    }
  ] : [];

  const columns: ColumnsType<OrderType> = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <span className="font-bold text-[#46A358]">
          #{id.slice(-6).toUpperCase()}
        </span>
      ),
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products: OrderType['products']) => (
        <div className="flex flex-col gap-2">
          {products.map((product, index) => (
            <div key={index} className="flex items-center gap-3">
              <img
                src={product.main_image}
                alt={product.title}
                className="w-10 h-10 object-contain bg-gray-100 rounded"
              />
              <div>
                <p className="font-medium text-sm">{product.title}</p>
                <p className="text-xs text-gray-500">
                  ${product.price} × {product.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total_price",
      key: "total_price",
      render: (price: number) => (
        <span className="font-bold text-[#46A358]">${price.toFixed(2)}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const getStatusColor = (status: string) => {
          switch (status.toLowerCase()) {
            case "delivered":
              return "green";
            case "processing":
              return "blue";
            case "pending":
              return "orange";
            case "cancelled":
              return "red";
            default:
              return "default";
          }
        };
        
        return (
          <Tag color={getStatusColor(status)}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => (
        <span className="text-sm">
          {new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  const ordersToShow = orders.length > 0 ? orders : demoOrders;

  return (
    <div>
      <h3 className="text-xl font-bold text-[#3D3D3D] mb-6">My Orders</h3>
      
      {ordersToShow.length > 0 ? (
        <Table
          dataSource={ordersToShow}
          columns={columns}
          rowKey="_id"
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showQuickJumper: false,
          }}
          className="custom-table"
        />
      ) : (
        <Empty 
          description="Hali buyurtmalar mavjud emas" 
          className="py-20"
        />
      )}
    </div>
  );
};

export default MyProducts;
import { useReduxSelector, useReduxDispatch } from "../../hooks/useRedux";
import { removeFromWishlist } from "../../redux/user-slice";
import { addToCart } from "../../redux/shop-slice";
import { useQueryHandler } from "../../hooks/useQuery/index";
import { Skeleton, Empty, message } from "antd";
import { HeartFilled, ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ProductType } from "../../@types";

const Wishlist = () => {
  const dispatch = useReduxDispatch();
  const { wishlist } = useReduxSelector((state) => state.user);

  // Barcha mahsulotlarni olamiz
  const { data: allFlowers, isLoading } = useQueryHandler<ProductType[]>({
    pathname: "all-flowers",
    url: "flower/all",
  });

  // Wishlist-dagi mahsulotlarni filtrlash
  const wishlistItems = allFlowers?.filter((flower) =>
    wishlist.includes(flower._id)
  ) || [];

  const handleRemoveFromWishlist = (id: string, title: string) => {
    dispatch(removeFromWishlist(id));
    message.success(`${title} sevimlilardan o'chirildi`);
  };

  const handleAddToCart = (product: ProductType) => {
    const productForCart = {
      id: product._id,
      title: product.title,
      price: product.price,
      main_image: product.main_image,
      count: 1,
    };

    dispatch(addToCart(productForCart));
    message.success(`${product.title} savatchaga qo'shildi!`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} active />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-[#3D3D3D] mb-6">
        My Wishlist ({wishlistItems.length})
      </h3>
      
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-50 flex items-center justify-center">
                <img
                  src={product.main_image}
                  alt={product.title}
                  className="w-3/4 h-3/4 object-contain"
                />
                
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id, product.title)}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                  >
                    <DeleteOutlined className="text-red-500 text-sm" />
                  </button>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-green-50 transition-colors"
                  >
                    <ShoppingCartOutlined className="text-[#46A358] text-sm" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h4 className="font-medium text-[#3D3D3D] mb-2 line-clamp-2">
                  {product.title}
                </h4>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[#46A358] font-bold text-lg">
                      ${product.price}
                    </span>
                    {product.discount && product.discount_price && (
                      <span className="text-gray-400 line-through text-sm">
                        ${product.discount_price}
                      </span>
                    )}
                  </div>
                  
                  <HeartFilled className="text-red-500 text-lg" />
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-3 bg-[#46A358] text-white py-2 rounded-lg font-medium hover:bg-[#3b8a4a] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCartOutlined />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty 
          description="Sevimlilar ro'yxati bo'sh" 
          className="py-20"
        >
          <p className="text-gray-500 mt-2">
            Mahsulotlarga ♥ bosib, sevimlilar ro'yxatiga qo'shing
          </p>
        </Empty>
      )}
    </div>
  );
};

export default Wishlist;

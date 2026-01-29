import { Select } from "antd";
import { products_titles } from "../../../../utils";

const ProductsTitle = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 cursor-pointer">
        {products_titles.map((value) => (
          <h3 key={value.id}>{value.title}</h3>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span>Short by:</span>

        <Select
          defaultValue={"default-sorting"}
          style={{ width: 150 }}
          options={[
            { value: "default-sorting", label: "Default Sorting" },
            { value: "the-cheapest", label: "The Cheapest" },
            { value: "most-expensive", label: "Most Expensive" },
          ]}
        />
      </div>
    </div>
  );
};

export default ProductsTitle;

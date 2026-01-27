import { Slider } from "antd";
import { useState } from "react";
import { useSearchParamsHandler } from "../../../../hooks/paramsApi/index";

const Price = () => {
  const [slider, setSlider] = useState<number[]>([0, 1000]);
  const { setParam } = useSearchParamsHandler();

  const changeSlider = (value: number[]) => {
    setSlider(value);
  };

  const handleFilter = () => {
    setParam({ range_min: String(slider[0]), range_max: String(slider[1]) });
  };

  return (
    <div>
      <h3 className="text-[#3d3d3d] font-bold">Price Range</h3>
      <Slider
        onChange={changeSlider}
        range
        value={slider}
        max={1000}
        min={0}
        styles={{
          track: { backgroundColor: "#46a358" },
          rail: { backgroundColor: "#d9d9d9" },
          handle: {
            borderColor: "#46a358",
            backgroundColor: "#46a358",
          },
        }}
      />
      <button
        onClick={handleFilter}
        className="w-[90px] h-[35px] rounded-[6px] bg-[#46a358] opacity-100
             transition-all duration-200 ease-in-out
             hover:bg-[#3a8f4f] hover:scale-[1.03]
             active:scale-[0.97]"
      >
        <span className="font-bold text-[16px] leading-[20px] text-white tracking-[0]">
          Filter
        </span>
      </button>
      <div>
        Price:{" "}
        <span className="text-[#46a358] text-[15px] font-bold mt-4">
          {slider[0]}$ - {slider[1]}$
        </span>
      </div>
    </div>
  );
};

export default Price;

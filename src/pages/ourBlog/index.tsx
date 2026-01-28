import React from "react";
import Our1 from "../../assets/img/our1.png";
import Our2 from "../../assets/img/our2.png";
import Our3 from "../../assets/img/our3.png";
import Our4 from "../../assets/img/our4.png";

const OurBlog = () => {
  const blogs = [
    {
      id: 1,
      img: Our1,
      date: "September 12",
      readTime: "6 minutes",
      title: "Cactus & Succulent Care Tips",
      desc: "Cacti are succulents are easy care plants for any home or patio.",
    },
    {
      id: 2,
      img: Our2,
      date: "September 13",
      readTime: "2 minutes",
      title: "Top 10 Succulents for Your Home",
      desc: "Best in hanging baskets. Prefers medium to high light.",
    },
    {
      id: 3,
      img: Our3,
      date: "September 15",
      readTime: "3 minutes",
      title: "Cacti & Succulent Care Tips",
      desc: "Cacti and succulents thrive in containers and because most are.",
    },
    {
      id: 4,
      img: Our4,
      date: "September 12",
      readTime: "6 minutes",
      title: "Best Houseplants Room by Room",
      desc: "The benefits of houseplants are endless. In addition to...",
    },
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#3D3D3D] mb-2">
          Our Blog Posts
        </h2>
        <p className="text-[#727272] text-sm">
          We are an online plant shop offering a wide range of cheap and trendy
          plants.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="group cursor-pointer">
            <div className="overflow-hidden rounded-t-lg bg-[#FBFBFB]">
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="pt-4 bg-white">
              <p className="text-[#46A358] text-xs font-medium mb-1">
                {blog.date} | Read in {blog.readTime}
              </p>
              <h3 className="text-lg font-bold text-[#3D3D3D] leading-tight mb-2">
                {blog.title}
              </h3>
              <p className="text-[#727272] text-sm mb-3 line-clamp-2">
                {blog.desc}
              </p>
              <button className="flex items-center text-sm font-medium text-[#3D3D3D] group-hover:text-[#46A358] transition-colors">
                Read More
                <span className="ml-1 text-lg">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurBlog;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, MessageCircle, Heart, ArrowUpRight } from "lucide-react";
import { Input, Skeleton, Empty, Tag } from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const { Search } = Input;

interface BlogType {
  _id: string;
  title: string;
  description: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  content: string;
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const stripHtml = (html: string): string => html.replace(/<[^>]*>?/gm, "");
  const truncateText = (text: string, length: number = 120): string =>
    text.length > length ? text.substring(0, length) + "..." : text;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const response = await axios.get("hapi/user/blog", {
          headers: {
            Authorization: "Bearer 64bebc1e2c6d3f056a8c85b7",
          },
          params: { search: "" },
        });

        const data = response.data?.data ?? [];
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error("Blog fetch error:", error);
        setBlogs([]);
        setFilteredBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const onSearch = (value: string) => {
    const results = blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(value.toLowerCase()) ||
        blog.description?.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredBlogs(results);
  };

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="w-[90%] max-w-[1200px] mx-auto pt-16 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          GreenShop <span className="text-[#46A358]">Blog</span>
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          O'simliklar va tabiat haqidagi eng sara maqolalar to'plami
        </p>

        <div className="max-w-[600px] mx-auto mb-12">
          <Search
            placeholder="Maqola qidirish..."
            allowClear
            onSearch={onSearch}
            size="large"
            className="rounded-xl overflow-hidden shadow-sm"
          />
        </div>
      </div>

      {/* Blog Grid - 3 tadan joylashish */}
      <div className="w-[90%] max-w-[1200px] mx-auto pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Skeleton holati
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-100"
              >
                <Skeleton
                  active
                  title={{ width: "90%" }}
                  paragraph={{ rows: 3 }}
                />
              </div>
            ))
          ) : filteredBlogs.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <Empty description="Maqolalar topilmadi" />
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <article
                key={blog._id}
                className="group relative bg-white p-7 rounded-2xl border border-gray-100 hover:border-[#46A358]/20 hover:shadow-[0_20px_50px_rgba(70,163,88,0.1)] transition-all duration-500 flex flex-col h-[320px]"
              >
                {/* Tepasidagi kichik yashil chiziq */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#46A358] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl" />

                <div className="mb-4">
                  <Tag
                    color="green"
                    className="border-none bg-[#46A358]/10 text-[#46A358] font-semibold m-0"
                  >
                    Maqola
                  </Tag>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#46A358] transition-colors leading-tight">
                  {blog.title}
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow overflow-hidden">
                  {truncateText(
                    stripHtml(blog.content || blog.description),
                    140,
                  )}
                </p>

                <div className="mt-auto pt-5 border-t border-gray-50 flex justify-between items-center">
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1 text-xs">
                      <Eye size={14} /> {blog.viewCount || 0}
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                      <MessageCircle size={14} /> {blog.commentCount || 0}
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                      <Heart size={14} /> {blog.likeCount || 0}
                    </span>
                  </div>

                  <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#46A358] group-hover:bg-[#46A358] group-hover:text-white transition-all">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeOutlined, MessageOutlined, HeartOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Input, Skeleton, Empty, Card } from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const { Search } = Input;

interface BlogType {
  _id: string;
  title: string;
  content: string;
  image?: string;
  views: number;
  reaction_length: number;
  created_at: string;
  created_by: string;
}

const Blogs: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const stripHtml = (html: string): string => html.replace(/<[^>]*>?/gm, "");

  // API va Demo Bloglar logikasi (o'zgarishsiz qoldi)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://beckend-n14-soqt.vercel.app/api/user/blog", {
          params: { access_token: "64eecf3b54abde61153d1fd3", search: "" },
        });
        const data = response.data.data || [];
        setBlogs(data.length > 0 ? data : demoBlogs); // demoBlogs yuqoridagi koddan olinadi
        setFilteredBlogs(data.length > 0 ? data : demoBlogs);
      } catch (error) {
        setBlogs(demoBlogs);
        setFilteredBlogs(demoBlogs);
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
        blog.content?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBlogs(results);
  };

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <Header />

      <div className="w-[90%] max-w-[1200px] mx-auto pt-16 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
          Our <span className="text-[#46A358]">Insights</span>
        </h1>
        <div className="max-w-[600px] mx-auto mb-12">
          <Search
            placeholder="Maqola qidirish..."
            onSearch={onSearch}
            enterButton
            size="large"
            className="custom-search"
          />
        </div>
      </div>

      <div className="w-[90%] max-w-[1200px] mx-auto pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <Card key={idx} style={{ width: '100%' }} loading={true} />
            ))
          ) : filteredBlogs.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <Empty description="Maqolalar topilmadi" />
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <Card
                key={blog._id}
                hoverable
                className="rounded-lg overflow-hidden border-gray-100"
                onClick={() => navigate(`/blog/${blog._id}`)}
                actions={[
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <EyeOutlined /> <span>{blog.views || 0}</span>
                  </div>,
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <MessageOutlined /> <span>0</span>
                  </div>,
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <HeartOutlined /> <span>{blog.reaction_length || 0}</span>
                  </div>,
                ]}
              >
                <div className="min-h-[160px]">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase leading-tight line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 italic text-[14px] leading-relaxed line-clamp-4 font-light">
                    "{truncateText(stripHtml(blog.content), 150)}"
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                   <ArrowRightOutlined className="text-[#46A358]" />
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
      <Footer />

      {/* Custom Styles */}
      <style>{`
        .ant-card-actions {
          background: #fff !important;
          border-top: 1px solid #f0f0f0 !important;
        }
        .ant-card-actions > li {
          margin: 12px 0 !important;
        }
        .custom-search .ant-input-search-button {
          background-color: #46A358 !important;
          border-color: #46A358 !important;
        }
      `}</style>
    </div>
  );
};

// Yordamchi funksiya
const truncateText = (text: string, length: number): string =>
  text.length > length ? text.substring(0, length) + "..." : text;

export default Blogs;
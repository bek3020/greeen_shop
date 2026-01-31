import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, MessageCircle, Heart, ArrowUpRight, Calendar, User } from "lucide-react";
import { Input, Skeleton, Empty, Tag } from "antd";
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
  const truncateText = (text: string, length: number = 120): string =>
    text.length > length ? text.substring(0, length) + "..." : text;

  // Demo bloglar (agar API ishlamasa)
  const demoBlogs: BlogType[] = [
    {
      _id: "1",
      title: "How To Choose Wedding Flowers",
      content: "Flowers are an essential element or accessory for every wedding. These are needed for the bridal bouquet, table flowers, entrances, interior...",
      image: "/src/assets/img/blog_img.png",
      views: 156,
      reaction_length: 23,
      created_at: "2024-01-15T10:30:00Z",
      created_by: "Admin"
    },
    {
      _id: "2", 
      title: "Flower Subscriptions: A New Way to Gift This Holiday",
      content: "Let's face it with the holidays coming up everyone is ready to celebrate in a big way, maybe even get out of the dingy sweats...",
      image: "/src/assets/img/card1.png",
      views: 89,
      reaction_length: 15,
      created_at: "2024-01-10T14:20:00Z",
      created_by: "Sarah Johnson"
    },
    {
      _id: "3",
      title: "Indoor Plant Care Tips for Beginners",
      content: "Taking care of indoor plants can seem daunting at first, but with the right knowledge and techniques, anyone can become a successful plant parent...",
      image: "/src/assets/img/card2.png", 
      views: 234,
      reaction_length: 45,
      created_at: "2024-01-08T09:15:00Z",
      created_by: "Mike Green"
    },
    {
      _id: "4",
      title: "Best Plants for Small Apartments",
      content: "Living in a small apartment doesn't mean you can't enjoy the benefits of having plants. Here are some great options for compact spaces...",
      image: "/src/assets/img/card3.png",
      views: 178,
      reaction_length: 32,
      created_at: "2024-01-05T16:45:00Z", 
      created_by: "Emma Wilson"
    },
    {
      _id: "5",
      title: "Seasonal Flower Arrangements",
      content: "Each season brings its own unique beauty and flowers. Learn how to create stunning arrangements that capture the essence of each season...",
      image: "/src/assets/img/card4.png",
      views: 145,
      reaction_length: 28,
      created_at: "2024-01-03T11:30:00Z",
      created_by: "David Chen"
    },
    {
      _id: "6",
      title: "The Benefits of Having Plants at Home",
      content: "Beyond their aesthetic appeal, plants offer numerous health and psychological benefits. Discover why every home should have green companions...",
      image: "/src/assets/img/card5.png",
      views: 267,
      reaction_length: 56,
      created_at: "2024-01-01T08:00:00Z",
      created_by: "Lisa Park"
    }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://beckend-n14-soqt.vercel.app/api/user/blog",
          {
            params: {
              access_token: "64eecf3b54abde61153d1fd3",
              search: "",
            },
          },
        );
        const data = response.data.data || [];
        if (data.length > 0) {
          setBlogs(data);
          setFilteredBlogs(data);
        } else {
          setBlogs(demoBlogs);
          setFilteredBlogs(demoBlogs);
        }
      } catch (error) {
        console.error("Xatolik:", error);
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
        blog.content?.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredBlogs(results);
  };

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
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

      {/* Blog Grid */}
      <div className="w-[90%] max-w-[1200px] mx-auto pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
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
                onClick={() => handleBlogClick(blog._id)}
                className="group relative bg-white rounded-2xl border border-gray-100 hover:border-[#46A358]/20 hover:shadow-[0_20px_50px_rgba(70,163,88,0.1)] transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Blog Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image || "https://via.placeholder.com/400x250?text=GreenShop+Blog"}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Tag
                      color="green"
                      className="border-none bg-white/90 text-[#46A358] font-semibold"
                    >
                      Maqola
                    </Tag>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-gray-400 text-xs mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(blog.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {blog.created_by}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#46A358] transition-colors leading-tight">
                    {blog.title}
                  </h2>

                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {truncateText(stripHtml(blog.content), 140)}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-4 text-gray-400">
                      <span className="flex items-center gap-1 text-xs">
                        <Eye size={14} /> {blog.views || 0}
                      </span>
                      <span className="flex items-center gap-1 text-xs">
                        <MessageCircle size={14} /> 0
                      </span>
                      <span className="flex items-center gap-1 text-xs">
                        <Heart size={14} /> {blog.reaction_length || 0}
                      </span>
                    </div>

                    <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#46A358] group-hover:bg-[#46A358] group-hover:text-white transition-all">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
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

export default Blogs;
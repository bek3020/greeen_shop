import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Eye, 
  MessageCircle, 
  Heart, 
  ArrowLeft, 
  Calendar,
  User,
  Send
} from "lucide-react";
import { 
  Skeleton, 
  Input, 
  Button, 
  Avatar, 
  message,
  Divider 
} from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useAxios } from "../../hooks/useAxios/useAxios";
import { useReduxSelector, useReduxDispatch } from "../../hooks/useRedux";
import { setAuthorizationModalVisibility } from "../../redux/modol-store";

const { TextArea } = Input;

interface CommentType {
  _id: string;
  user_name: string;
  comment: string;
  created_at: string;
  user_avatar?: string;
}

interface BlogType {
  _id: string;
  title: string;
  content: string;
  image?: string;
  views: number;
  reaction_length: number;
  created_at: string;
  created_by: string;
  comments?: CommentType[];
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const request = useAxios();
  const dispatch = useReduxDispatch();
  const { user } = useReduxSelector((state) => state.user);

  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  // Demo kommentlar (haqiqiy API bo'lmasa)
  const demoComments: CommentType[] = [
    {
      _id: "1",
      user_name: "Aziza Karimova",
      comment: "Juda foydali maqola! O'simliklarni parvarish qilish haqida ko'p narsalarni o'rgandim.",
      created_at: "2024-01-20T10:30:00Z",
      user_avatar: "https://i.pravatar.cc/40?img=1"
    },
    {
      _id: "2", 
      user_name: "Bobur Toshmatov",
      comment: "Rahmat! Bu maslahatlar juda amaliy. Uyimda ham shunday o'simliklar bor.",
      created_at: "2024-01-19T15:45:00Z",
      user_avatar: "https://i.pravatar.cc/40?img=2"
    },
    {
      _id: "3",
      user_name: "Malika Abdullayeva", 
      comment: "Qiziqarli! Keyingi maqolalarni ham kutaman 🌱",
      created_at: "2024-01-18T09:15:00Z",
      user_avatar: "https://i.pravatar.cc/40?img=3"
    }
  ];

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await request({
          url: `user/blog/${id}`,
        });
        setBlog(data);
        setComments(data.comments || demoComments);
      } catch (error) {
        console.error("Blog yuklashda xatolik:", error);
        // Demo blog ma'lumotlari
        setBlog({
          _id: id,
          title: "How To Choose Wedding Flowers",
          content: `
            <p>Flowers are an essential element or accessory for every wedding. These are needed for the bridal bouquet, table flowers, entrances, interior...</p>
            
            <h3>Why Choose the Right Flowers?</h3>
            <p>Choosing the right flowers for your wedding is crucial because they set the tone and atmosphere for your special day. The right floral arrangements can transform any venue into a magical space that reflects your personality and style.</p>
            
            <h3>Popular Wedding Flower Types</h3>
            <ul>
              <li><strong>Roses:</strong> Classic and timeless, perfect for romantic weddings</li>
              <li><strong>Peonies:</strong> Soft and romantic, ideal for spring weddings</li>
              <li><strong>Hydrangeas:</strong> Full and lush, great for rustic themes</li>
              <li><strong>Baby's Breath:</strong> Delicate and airy, perfect for minimalist styles</li>
            </ul>
            
            <h3>Color Coordination</h3>
            <p>When selecting wedding flowers, consider your color palette carefully. The flowers should complement your wedding dress, bridesmaids' dresses, and overall venue decor. Popular color combinations include:</p>
            
            <p>Remember, your wedding flowers are not just decorations – they're an expression of your love story and the beginning of your new chapter together.</p>
          `,
          image: "/src/assets/img/blog_img.png",
          views: 156,
          reaction_length: 23,
          created_at: "2024-01-15T10:30:00Z",
          created_by: "Admin"
        });
        setComments(demoComments);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      message.warning("Komment yozing!");
      return;
    }

    if (!user) {
      message.warning("Komment yozish uchun tizimga kiring!");
      return;
    }

    setCommentLoading(true);
    
    // Demo komment qo'shish
    const demoComment: CommentType = {
      _id: Date.now().toString(),
      user_name: user.name || "Foydalanuvchi",
      comment: newComment,
      created_at: new Date().toISOString(),
      user_avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 10) + 1}`
    };

    setTimeout(() => {
      setComments(prev => [demoComment, ...prev]);
      setNewComment("");
      setCommentLoading(false);
      message.success("Komment qo'shildi!");
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-[900px] mx-auto px-4 py-20">
          <Skeleton active paragraph={{ rows: 15 }} />
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header />
        <div className="max-w-[900px] mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl text-gray-500">Maqola topilmadi</h1>
          <Button 
            onClick={() => navigate("/blog")} 
            className="mt-4"
            icon={<ArrowLeft size={16} />}
          >
            Orqaga qaytish
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <div className="max-w-[900px] mx-auto px-4 py-10">
        {/* Back Button */}
        <Button 
          onClick={() => navigate("/blog")} 
          className="mb-6 flex items-center gap-2"
          icon={<ArrowLeft size={16} />}
        >
          Orqaga
        </Button>

        {/* Blog Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-500 text-sm mb-6">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {formatDate(blog.created_at)}
            </span>
            <span className="flex items-center gap-2">
              <User size={16} />
              {blog.created_by}
            </span>
          </div>

          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <span className="flex items-center gap-2">
              <Eye size={16} />
              {blog.views} ko'rishlar
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle size={16} />
              {comments.length} komment
            </span>
            <span className="flex items-center gap-2">
              <Heart size={16} />
              {blog.reaction_length} yoqdi
            </span>
          </div>
        </div>

        {/* Blog Image */}
        {blog.image && (
          <div className="mb-8">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>
        )}

        {/* Blog Content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <Divider />

        {/* Comments Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Kommentlar ({comments.length})
          </h3>

          {/* Add Comment Form */}
          {user ? (
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="flex items-start gap-4">
                <Avatar 
                  size={40} 
                  src={`https://i.pravatar.cc/40?img=${user.name?.charCodeAt(0) || 1}`}
                />
                <div className="flex-1">
                  <TextArea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Komment yozing..."
                    rows={3}
                    className="mb-3"
                  />
                  <Button
                    type="primary"
                    onClick={handleAddComment}
                    loading={commentLoading}
                    icon={<Send size={16} />}
                    className="bg-[#46A358] hover:bg-[#3b8a4a]"
                  >
                    Yuborish
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-xl mb-8 text-center">
              <p className="text-gray-600 mb-4">Komment yozish uchun tizimga kiring</p>
              <Button 
                type="primary" 
                className="bg-[#46A358] hover:bg-[#3b8a4a]"
                onClick={() => dispatch(setAuthorizationModalVisibility())}
              >
                Kirish
              </Button>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment._id} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100">
                <Avatar 
                  size={40} 
                  src={comment.user_avatar}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {comment.user_name}
                    </h4>
                    <span className="text-gray-400 text-sm">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {comment.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Hali kommentlar yo'q. Birinchi bo'lib komment yozing!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogDetail;

import React from 'react';
import { Card } from 'antd';
import { EyeOutlined, MessageOutlined, HeartOutlined } from '@ant-design/icons';

const Blog1: React.FC = () => {
  // Blog ma'lumotlari (Rasmga moslab)
  const blogData = {
    title: "FLOWER SUBSCRIPTIONS: A NEW WAY TO GIFT THIS",
    content: '"You take away all the other luxuries in life, and if you can make someone smile and laugh, you have given the most special gift: happiness." Brad Garrett',
    views: 473,
    comments: 0,
    likes: 0
  };

  return (
    <div style={{ padding: '40px', background: '#f9f9f9', minHeight: '100vh' }}>
      <Card
        variant="borderless"
        style={{ 
          width: 450, 
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)' 
        }}
        // Pastki qismdagi statistika (Actions)
        actions={[
          <div key="views" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <EyeOutlined style={{ color: '#bfbfbf' }} />
            <span style={{ color: '#8c8c8c' }}>{blogData.views}</span>
          </div>,
          <div key="comments" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <MessageOutlined style={{ color: '#bfbfbf' }} />
            <span style={{ color: '#8c8c8c' }}>{blogData.comments}</span>
          </div>,
          <div key="likes" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <HeartOutlined style={{ color: '#bfbfbf' }} />
            <span style={{ color: '#8c8c8c' }}>{blogData.likes}</span>
          </div>,
        ]}
      >
        {/* Sarlavha qismi */}
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 700, 
          color: '#262626', 
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '-0.5px'
        }}>
          {blogData.title}
        </h3>

        {/* Kontent qismi */}
        <p style={{ 
          fontSize: '15px', 
          color: '#8c8c8c', 
          fontStyle: 'italic', 
          lineHeight: '1.6',
          fontWeight: 300,
          marginBottom: '20px'
        }}>
          {blogData.content}
        </p>
      </Card>
    </div>
  );
};

export default Blog1;
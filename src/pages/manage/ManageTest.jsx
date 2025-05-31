import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import axios from '../services/api';

const PostTabs = () => {
  const [posts, setPosts] = useState([
    {
      id: 'post001',
      title: 'Làm thế nào để tiết kiệm điện trong phòng trọ?',
      content:
        'Việc tiết kiệm điện không chỉ giúp bạn giảm chi phí mà còn góp phần bảo vệ môi trường. Hãy tắt các thiết bị khi không sử dụng và sử dụng đèn LED tiết kiệm điện.',
    },
    {
      id: 'post002',
      title: '5 mẹo giữ phòng trọ luôn sạch sẽ',
      content:
        'Bạn nên vệ sinh phòng theo lịch cố định, sử dụng các sản phẩm tẩy rửa thân thiện và luôn dọn dẹp sau khi nấu ăn hoặc sinh hoạt.',
    },
    {
      id: 'post003',
      title: 'Những điều cần biết khi ký hợp đồng thuê trọ',
      content:
        'Hãy đảm bảo đọc kỹ các điều khoản về tiền cọc, thời hạn thuê, quyền và nghĩa vụ của các bên để tránh tranh chấp sau này.',
    },
  ]);

  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const selectedPost = posts[newValue];
    if (selectedPost) {
      navigate(`/posts/${selectedPost.id}`);
    }
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
        {posts.map((post) => (
          <Tab key={post.id} label={post.title} />
        ))}
      </Tabs>
    </Box>
  );
};

export default PostTabs;

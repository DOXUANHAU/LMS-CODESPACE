import React, { useContext } from 'react';
import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';

import { auth } from '../../../../firebase/config';
import { AuthContext } from '../../../../context/AuthProvider';
import { AppContext } from '../../../../context/AppProvider';
import { signOut } from 'firebase/auth';

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

export default function UserInfo() {
  const { user } = useContext(AuthContext) || {}; // Tránh lỗi nếu AuthContext chưa có giá trị
  const { clearState } = useContext(AppContext);

  // Kiểm tra nếu user không tồn tại
  if (!user) {
    return null;
  }

  const { displayName, photoURL } = user;

  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className='username'>{displayName}</Typography.Text>
      </div>
      <Button
        ghost
        onClick={() => {
          clearState();
          signOut(auth);
        }}
      >
        Đăng xuất
      </Button>
    </WrapperStyled>
  );
}

import React from 'react';
import { Collapse, Typography, Button } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../../../../context/AppProvider';

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white !important;
`;

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  // Danh sách items cho Collapse
  const items = [
    {
      key: '1',
      label: <Typography.Text style={{ color: 'white' }}>Danh sách các phòng</Typography.Text>,
      children: (
        <>
          {rooms?.length > 0 ? (
            rooms.map((room) => (
              <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>
                {room.name}
              </LinkStyled>
            ))
          ) : (
            <Typography.Text style={{ color: 'white' }}>Không có phòng nào</Typography.Text>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Collapse ghost defaultActiveKey={['1']} items={items} />
      {/* Đưa Button ra ngoài Collapse */}
      <Button
        type="text"
        icon={<PlusSquareOutlined />}
        className="add-room"
        onClick={handleAddRoom}
        style={{ color: 'white', marginTop: '10px' }}
      >
        Thêm phòng
      </Button>
    </>
  );
}

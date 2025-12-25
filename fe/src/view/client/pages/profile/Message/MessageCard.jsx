import React from "react";
import styled from "styled-components";

const MessageCard = ({ avatar, name, date, message }) => {
  return (
    <CardContainer>
      <CardHeader>
        <UserInfo>
          <UserAvatar src={avatar} alt={`${name}'s avatar`} />
          <UserName>{name}</UserName>
        </UserInfo>
        <MessageDate>{date}</MessageDate>
      </CardHeader>
      <MessageText>{message}</MessageText>
    </CardContainer>
  );
};

const CardContainer = styled.article`
  border-radius: 16px;
  border: 1px solid var(--grey-border, #e2e8f0);
  background-color: #fff;
  display: flex;
  width: 100%;
  padding: 16px;
  flex-direction: column;
  overflow: hidden;
  align-items: stretch;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const CardHeader = styled.header`
  display: flex;
  width: 100%;
  align-items: stretch;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: end;
  gap: 8px;
  font-size: 18px;
  color: #0f172a;
  font-weight: 600;
  line-height: 1.6;
  justify-content: start;
`;

const UserAvatar = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #0f172a;
  font-weight: 600;
  line-height: 1.6;
`;

const MessageDate = styled.time`
  color: #334155;
  text-align: right;
  font-size: 14px;
  font-weight: 400;
  margin-top: auto;
  margin-bottom: auto;
`;

const MessageText = styled.p`
  color: #0f172a;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  align-self: start;
  margin-top: 16px;
  margin-bottom: 0;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default MessageCard;

import React from "react";
import styled from "styled-components";

function InputDesign() {
  return (
    <Container>
      <MessageCard>
        <MessageHeader>
          <UserInfo>
            <UserAvatar
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4db56e8b86a6b6b4f9a8cc848750f178c36beb73315c5621419f9a2bf934f38?placeholderIfAbsent=true&apiKey=d05273649a4a432c85b3bc413f2fa2c8"
              alt="Ronald Richards avatar"
            />
            <UserName>Ronald Richards</UserName>
          </UserInfo>
          <MessageDate>18th March, 2024</MessageDate>
        </MessageHeader>
        <MessageContent>
          Thank you for asking your doubt, I'll send you a pdf file which cover
          the problems you are facing. If you have any...
        </MessageContent>
      </MessageCard>

      <MessageCard>
        <MessageHeader>
          <UserInfo>
            <UserAvatar
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdf7d56a78dabfed0fa3e0729023bb051049ed0c0547068c75944fee608888de?placeholderIfAbsent=true&apiKey=d05273649a4a432c85b3bc413f2fa2c8"
              alt="Devon Lane avatar"
            />
            <UserName>Devon Lane</UserName>
          </UserInfo>
          <MessageDate>18th March, 2024</MessageDate>
        </MessageHeader>
        <MessageText>I'll Get back to you as soon as possbile.</MessageText>
      </MessageCard>
    </Container>
  );
}

const Container = styled.section`
  border-radius: 16px;
  max-width: 950px;
  font-family:
    Inter,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
`;

const MessageCard = styled.article`
  border-radius: 16px;
  border: 1px solid var(--grey-border, #e2e8f0);
  background-color: #fff;
  display: flex;
  width: 100%;
  padding: 16px;
  flex-direction: column;
  overflow: hidden;
  align-items: stretch;

  &:not(:first-child) {
    margin-top: 16px;
  }

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const MessageHeader = styled.header`
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

const MessageContent = styled.p`
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

const MessageText = styled.p`
  color: #0f172a;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  align-self: start;
  margin-top: 16px;
  margin-bottom: 0;
`;

export default InputDesign;

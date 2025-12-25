import React from "react";
import styled from "styled-components";
import MessageCard from "./MessageCard";

const MessageList = () => {
  const messages = [
    {
      id: 1,
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a4db56e8b86a6b6b4f9a8cc848750f178c36beb73315c5621419f9a2bf934f38?placeholderIfAbsent=true&apiKey=d05273649a4a432c85b3bc413f2fa2c8",
      name: "Ronald Richards",
      date: "18th March, 2024",
      message:
        "Thank you for asking your doubt, I'll send you a pdf file which cover the problems you are facing. If you have any...",
      isBold: true,
    },
    {
      id: 2,
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bdf7d56a78dabfed0fa3e0729023bb051049ed0c0547068c75944fee608888de?placeholderIfAbsent=true&apiKey=d05273649a4a432c85b3bc413f2fa2c8",
      name: "Devon Lane",
      date: "18th March, 2024",
      message: "I'll Get back to you as soon as possbile.",
      isBold: false,
    },
  ];

  return (
    <Container>
      {messages.map((message, index) => (
        <CustomMessageCard
          key={message.id}
          avatar={message.avatar}
          name={message.name}
          date={message.date}
          message={message.message}
          isBold={message.isBold}
          isLast={index === messages.length - 1}
        />
      ))}
    </Container>
  );
};

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

const CustomMessageCard = styled(({ isBold, isLast, ...props }) => (
  <MessageCard {...props} />
))`
  margin-bottom: ${(props) => (props.isLast ? "0" : "16px")};

  p {
    font-weight: ${(props) => (props.isBold ? "500" : "400")};
  }
`;

export default MessageList;

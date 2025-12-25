import React from "react";
import styled from "styled-components";

const Pagination = ({ current, onChange }) => {
  return (
    <PaginationContainer>
      <PaginationButton>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9854c13658cb98e92664463938b797214f77d2f0be8f2328745e2c8559094cd?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c"
          alt="Previous"
        />
      </PaginationButton>

      {[1, 2, 3].map((page) => (
        <PageNumber
          key={page}
          isActive={current === page}
          onClick={() => onChange(page)}
        >
          {page}
        </PageNumber>
      ))}

      <PaginationButton>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/555c0b8c497d92dbc38576128b9b7451a4385de7f1bf1ba9c77c439d507bbd96?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c"
          alt="Next"
        />
      </PaginationButton>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 0px rgba(59, 130, 246, 0.12);
  background-color: #fff;
  margin-top: 24px;
`;

const PaginationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 43px;
  height: 42px;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  cursor: pointer;
  padding: 12px;

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  img {
    width: 15px;
    height: 15px;
  }
`;

const PageNumber = styled.button`
  width: 43px;
  height: 42px;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  font-family:
    Inter,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => (props.isActive ? "#0f172a" : "#334155")};
  cursor: pointer;
`;

export default Pagination;

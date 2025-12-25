import React from "react";
import { Row, Col, Image, Flex } from "antd";

const BannerImages = () => (
  <Flex vertical gap="large">
    <Row gutter={[16, 16]}>
      <Col xs={6} sm={4}>
        <div className="decor-box" />
      </Col>
      <Col xs={9} sm={8}>
        <Image
          preview={false}
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/94e462f12f46a3fcc2d2a94eb53a59247ab95f6e8df22d880a7df9b07e7903fe"
          alt="Decorative element"
          className="small-image"
        />
      </Col>
      <Col xs={9} sm={12}>
        <Image
          preview={false}
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1521c75445652ffc67e6ad507f33a59bf56fded3a5db1882324e339017b9b01a"
          alt="Featured content"
          className="large-image"
        />
      </Col>
    </Row>

    <Flex justify="flex-end">
      <Image
        preview={false}
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/42b6ae68a9f41f8ca0a64dadec3a9f4cdf703c362f70ef3564d8e076b506df00"
        alt="Additional feature"
        className="extra-image"
      />
    </Flex>
  </Flex>
);

export default BannerImages;

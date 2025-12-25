"use client";
import React from "react";
import { Row, Col, Typography, Button } from "antd";
import styles from "./styles.css";

const { Title, Paragraph } = Typography;

function HomepageBanner1() {
  return (
    <div className={styles.homepageBanner}>
      <Row gutter={[20, 0]} className={styles.mainRow}>
        <Col xs={24} lg={12} className={styles.leftColumn}>
          <div className={styles.leftContent}>
            <div className={styles.textContainer}>
              <Title level={1} className={styles.mainTitle}>
                Đánh thức tiềm năng cùng GiantWisdom
              </Title>
              <Paragraph className={styles.description}>
                Chào mừng bạn đến với GiantWisdom, nơi học tập không có giới
                hạn. Chúng tôi tin rằng giáo dục là chìa khóa cho sự phát triển
                cá nhân và chuyên nghiệp, và chúng tôi ở đây để hướng dẫn bạn
                trên hành trình đi đến thành công. Cho dù bạn là sinh viên,
                người đi làm hay người học suốt đời, Hệ thống Quản lý Học tập
                tiên tiến của chúng tôi được thiết kế để nâng cao trải nghiệm
                học tập của bạn.
              </Paragraph>
            </div>
            <Button type="primary" className={styles.ctaButton}>
              Bắt đầu hành trình giảng dạy của bạn.
            </Button>
          </div>
        </Col>
        <Col xs={24} lg={12} className={styles.rightColumn}>
          <div className={styles.imageContainer}>
            <div className={styles.topImagesWrapper}>
              <Row>
                <Col span={4} className={styles.decorativeElementCol}>
                  <div className={styles.decorativeElement}></div>
                </Col>
                <Col span={7} className={styles.smallImageCol}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/94e462f12f46a3fcc2d2a94eb53a59247ab95f6e8df22d880a7df9b07e7903fe?placeholderIfAbsent=true&apiKey=d05273649a4a432c85b3bc413f2fa2c8"
                    alt=""
                    className={styles.smallImage}
                  />
                </Col>
                <Col span={13} className={styles.largeImageCol}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1521c75445652ffc67e6ad507f33a59bf56fded3a5db1882324e339017b9b01a?placeholderIfAbsent=true&apiKey=d05273649a4a432c85b3bc413f2fa2c8"
                    alt=""
                    className={styles.largeImage}
                  />
                </Col>
              </Row>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/42b6ae68a9f41f8ca0a64dadec3a9f4cdf703c362f70ef3564d8e076b506df00?placeholderIfAbsent=true&apiKey=d05273649a4a432c85b3bc413f2fa2c8"
              alt=""
              className={styles.bottomImage}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HomepageBanner1;

import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import { useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Typography,
  Space,
  Descriptions,
  Divider,
  Skeleton,
  Button,
} from "antd";

const { Title, Paragraph, Text } = Typography;

export const ProductDetail = () => {
  const { productDetail, getProductsById, isLoading } = useProductStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductsById(id);
  }, [id]);

  const p = productDetail;
  const rawDate =
    p?.createdAt ||  null;

  const formatDate = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("ru-RU");
  };

  return (
    <Card style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Button type="link" onClick={() => navigate(-1)} style={{ padding: 0 }}>
        ← Назад
      </Button>

      <Divider style={{ margin: "12px 0" }} />

      {isLoading || !p ? (
        <Skeleton
        active
        avatar
        title
        paragraph={{ rows: 5 }}
      />
      
      ) : (
        <Row gutter={[24, 24]}>
  
          <Col xs={24} md={10}>
            <Image
              src={p?.image ? p?.image : "https://yandex-images.clstorage.net/5y60cRz86/925717gOEEq/mNyPqvfnnSuMChPQJ5ne4UJWJHhHXI2IOQUSOuLnbrDE-inXZOPWpwZxmZbgqlZEOC671kSQEjH-1iJIMn-XOtgYHLsmYAs_XsyG0idYnmYVBuA_Ud2azqmSEH-iZLllBTTyimxqGHgeLoRIPm1DwiirdNjVAwpnOQkzUfYgACTZlw1ltn0U5kEZ0B2hG5xqGpese9cSnMm9E5dzPWVgON12NAfhqFo612QOAzboQ9Copzlbh06PrDrDch816cLtHJQCJ7L4VqiE1NPQphad4xtf7bZdFF4LtN-ZO_dmrznZevcD6i8ddt7mwEc1YYBQIe0w2gSACOn2AjXVeibLp5kXxG3_NNhnzRzUlGdT1ifRXS5xHNycwHRUU_Z-Kiv633C2jiUqGn9WIIEA_uvO2CFqOd0LQw4jfIE2kD1lhGoSmMRqfz3WJ0HQVdFm3V2j09-kN1dYUcFz3FY58W2jOZE2vMhua1G-2i0MTPVpQtQnqnWRCcUGpPnCPNo-IQBtEl0NLbo5XurIW1mQ71Ce5BVUr_2ZEJzAcNAauvHkb_Nae_aILKMS_xhlBIN2YUJfLWV5F82OyOv0RDyaeyUL7lxYy2Q9MJeixp1cnSkV0qSVF-m0XxzRDD3RWHg5oS040r-xxCEvlrBXrwZHOGEI2-Yn8lPEQcMisUOyELtlj21alUVi_75Tos2YX1Ptktvrmh_neJzf0Qu9Ft6x8SWoMptyfM4gZJ511mFFyDOpDtCgZT_eBAHGpDQGtl957kumERzPJ3C6lqdIURlSrtWVptlbIHvYHhgKshTRMvQrbXWUdz_IqiGWstmohgF-p0sc5aS9VYSOQqPzT7MUsC6EKZFRAeg9uhooi9cRlOFa12UaXW5_XVpeBDZQEn4wrOi_3Pj-BGCmF_aZrYkHMWjAEmBjcBMIBEsjvo49HP2oyOTa1wpneb8Uac5Q0x3gFFarmBgrMFLT2Ed12xd5cg"}
              alt={p?.title}
              width="100%"
              style={{ borderRadius: 12, objectFit: "cover" }}
            />
          </Col>

     
          <Col xs={24} md={14}>
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              <Title level={3} style={{ margin: 0 }}>
                {p?.title}
              </Title>

              {p?.price != null && (
                <Title level={2} style={{ margin: 0 }}>
                  {p.price} <Text type="secondary">сом</Text>
                </Title>
              )}

           
              <Descriptions size="small" column={1} bordered>
                <Descriptions.Item label="Дата">
                  {formatDate(rawDate)}
                </Descriptions.Item>
                <Descriptions.Item label="Название">
                  {p?.title || "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Категория">
                  {p?.categories?.title || "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Цена">
                  {p?.price ?? "—"}
                </Descriptions.Item>
              </Descriptions>

            
              <div>
                <Title level={5} style={{ margin: "0 0 6px 0" }}>
                  Описание
                </Title>
                <Paragraph style={{ marginBottom: 0 }}>
                  {p?.description || "—"}
                </Paragraph>
              </div>

            
              <Space wrap>
                <Button type="primary">Add to cart</Button>
                <Button>Купить сейчас</Button>
              </Space>
            </Space>
          </Col>
        </Row>
      )}
    </Card>
  );
};

import { useEffect, useMemo } from "react";
import { useProductStore } from "../store/productStore";
import { Product } from "../components/Product";
import { Select, Space } from "antd";

export const Products = () => {
  const {
    getProducts,
    isLoading,
    categoryId,
    setCategoryId,
    clearCategoryId,
    products
    
  } = useProductStore();

  useEffect(() => {
    getProducts();
  }, []);


  const filteredProducts = useMemo(() => {
    if(!categoryId) return products
    return products.filter((item) => item?.categories?.id === categoryId)
  },[products,categoryId]);

  return (
    <>
      <Select
        allowClear
        value={categoryId}
        placeholder="Выбери категорию"
        style={{ width: 200 }}
        options={[
          { value: "434935d3-2d1b-4596-9875-f54cc335e62e", label: "Женский" },
          { value: "c9decb72-afe0-4fbf-ad6d-e5e5e8b5fcf8", label: "Мужской" },
          { value:null, label: "Все" },
        ]}
        onChange={(value) => {
            if(!value) clearCategoryId()
            else{setCategoryId(value)}
        }}
      /> 

      <Space
        wrap
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          justifyContent: "center",
          width: "100%",
          display: "flex",
        }}
        size={16}
      >
        {filteredProducts.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </Space>
    </>
  );
};

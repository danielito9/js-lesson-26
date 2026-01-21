import { useNavigate } from "react-router-dom"
import { useCartStore } from "../store/cartStore"
import { Button, Card} from "antd"




export const Product = ({product}) => {
    const {addCart, isLoading} = useCartStore()
    const navigate = useNavigate()
    return<>
        <Card
            hoverable
            style={{ width: 240}}
            onClick={() => navigate(`/products/${product.id}`)}
            styles={{
              body: {
                display: "flex",
                flexDirection: "column",
                height: "100%",
              },
            }}
            title={product.title.slice(0, 20)}
>

    <div style={{height:200, margin:10}}>
            <img
                src={product.image ? product.image : "https://yandex-images.clstorage.net/5y60cRz86/925717gOEEq/mNyPqvfnnSuMChPQJ5ne4UJWJHhHXI2IOQUSOuLnbrDE-inXZOPWpwZxmZbgqlZEOC671kSQEjH-1iJIMn-XOtgYHLsmYAs_XsyG0idYnmYVBuA_Ud2azqmSEH-iZLllBTTyimxqGHgeLoRIPm1DwiirdNjVAwpnOQkzUfYgACTZlw1ltn0U5kEZ0B2hG5xqGpese9cSnMm9E5dzPWVgON12NAfhqFo612QOAzboQ9Copzlbh06PrDrDch816cLtHJQCJ7L4VqiE1NPQphad4xtf7bZdFF4LtN-ZO_dmrznZevcD6i8ddt7mwEc1YYBQIe0w2gSACOn2AjXVeibLp5kXxG3_NNhnzRzUlGdT1ifRXS5xHNycwHRUU_Z-Kiv633C2jiUqGn9WIIEA_uvO2CFqOd0LQw4jfIE2kD1lhGoSmMRqfz3WJ0HQVdFm3V2j09-kN1dYUcFz3FY58W2jOZE2vMhua1G-2i0MTPVpQtQnqnWRCcUGpPnCPNo-IQBtEl0NLbo5XurIW1mQ71Ce5BVUr_2ZEJzAcNAauvHkb_Nae_aILKMS_xhlBIN2YUJfLWV5F82OyOv0RDyaeyUL7lxYy2Q9MJeixp1cnSkV0qSVF-m0XxzRDD3RWHg5oS040r-xxCEvlrBXrwZHOGEI2-Yn8lPEQcMisUOyELtlj21alUVi_75Tos2YX1Ptktvrmh_neJzf0Qu9Ft6x8SWoMptyfM4gZJ511mFFyDOpDtCgZT_eBAHGpDQGtl957kumERzPJ3C6lqdIURlSrtWVptlbIHvYHhgKshTRMvQrbXWUdz_IqiGWstmohgF-p0sc5aS9VYSOQqPzT7MUsC6EKZFRAeg9uhooi9cRlOFa12UaXW5_XVpeBDZQEn4wrOi_3Pj-BGCmF_aZrYkHMWjAEmBjcBMIBEsjvo49HP2oyOTa1wpneb8Uac5Q0x3gFFarmBgrMFLT2Ed12xd5cg"}
                alt={product.title}
                style={{
                height: "100%",
                objectFit: "cover",
                borderRadius:5
            }}
            />
    </div>

    <p className="desc">
  <b>Description:</b> {product.description}
</p>

<p className="category">
  <b>Category:</b> {product.categories?.title}
</p>


  
  <div style={{ marginTop: "auto" }}>
    <Button
      type="primary"
      loading={isLoading}
      disabled={isLoading}
      onClick={(e) => {
        e.stopPropagation();
        addCart(product.id);
      }}
    >
      Add to cart
    </Button>
  </div>
</Card>
    </>
}
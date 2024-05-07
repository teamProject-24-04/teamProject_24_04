import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom'; // Link 추가
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showImages, setShowImages] = useState(true); // Set showImages to true by default
  const imagesRef = useRef(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/product-details?id=${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!id) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <div className="product-card">
        <img
          src={product.imageURL}
          alt={product.name}
          className="product-detailimg"
          style={{ maxWidth: '100%' }}
        />
      </div>
      <div className="detail-font" style={{ marginTop: '20px' }}>
        <h2>{product.name}</h2>
        <p>가격: {product.price}원</p>
      </div>

      {showImages && product.detailImageURL && (
        <div ref={imagesRef} style={{ marginTop: '50px' }}>
          {Array.isArray(product.detailImageURL) ? (
            product.detailImageURL.map((detailImageUrl, index) => (
              <img key={index} src={detailImageUrl} alt={`Detail Image ${index + 1}`} />
            ))
          ) : (
            <img src={product.detailImageURL} alt="Detail Image" />
          )}
        </div>
      )}

      {/* 구매하기 버튼에 Link 컴포넌트 사용 */}
      <Stack spacing={2} direction="column" alignItems="center">
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 999,
            backgroundColor: 'white', // Set background color to white
          }}>
          <Stack spacing={2} direction="row">
            {/* Link 컴포넌트로 구매 페이지로 이동 */}
            <Link to={`/PaymentPage/${id}`} style={{ textDecoration: 'none' }}>
              <Button variant="outlined" style={{ width: '180px', height: '40px' }}>
                구매하기
              </Button>
            </Link>
            <Button variant="outlined" style={{ width: '180px', height: '40px' }}>
              장바구니
            </Button>
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

export default ProductDetails;

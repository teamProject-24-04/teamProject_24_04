import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showImages, setShowImages] = useState(false);
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

  const handleShowImages = () => {
    setShowImages(true);
    // Scroll to the bottom where images are located
    imagesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

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
      <h2>{product.name}</h2>   
      <p>가격: {product.price}원</p>
      <p>설명: {product.description}</p>
      {showImages && product.detailImages && (
  <div ref={imagesRef}>
    {product.detailImages.map((detailImage, index) => (
      <img key={index} src={detailImage} alt={`Detail Image ${index + 1}`} />
    ))}
  </div>
)}

      {!showImages && (
        <button onClick={handleShowImages}>더보기</button>
      )}
      {/* 결제하기 버튼 추가 */}
      <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}>
        <button>결제하기</button>
      </div>
    </div>
  );
};

export default ProductDetails;

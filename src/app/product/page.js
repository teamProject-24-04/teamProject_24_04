// // src/app/page.js
// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Link from 'next/link'; // Next.js의 Link 컴포넌트 임포트
// export default function Page() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const response = await axios.get('/api/products');
//         setProducts(response.data); // 수정된 부분: setArticles -> setProducts
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     }

//     fetchProducts();
//   }, []);

//   return (
//     <>
//       <div>
//         <h1>Products</h1>
//         <ul>
//           {products.map((product) => (
//             <li key={product.id}>
//               <Link href={`/product-details/${product.id}`}>
//                 {/* 클릭했을 때 해당 상품의 ID를 서버로 전달하고, 서버에서는 이 ID를 기반으로 상세 정보를 가져와 응답할 것임 */}
//                 <img
//                   src={product.imageURL}
//                   alt={product.name}
//                   className="product-image"
//                   style={{ maxWidth: '100px', maxHeight: '100px' }}
//                 />
//                 <div className="product-info">
//                   <h3>{product.name}</h3>
//                   <p>가격: {product.price}원</p>
//                   <p>가격: {product.id}원</p>
//                 </div>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }

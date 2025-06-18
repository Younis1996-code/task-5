// const userResgister =
//   "https://web-production-3ca4c.up.railway.app/api/register";
// const userLogIn = "https://web-production-3ca4c.up.railway.app/api/login";
// const userLogOut = "https://web-production-3ca4c.up.railway.app/api/logout";
// const showAndAddItems = "https://web-production-3ca4c.up.railway.app/api/items";
// const showUpdateDelItem =
//   "https://web-production-3ca4c.up.railway.app/api/items/2";

// import axios from "axios";
// import { useEffect } from "react";

// const ApiFile = () => {
//   const token: string | null = localStorage.getItem("token");
//   useEffect(() => {
//     axios
//       .get("https://web-production-3ca4c.up.railway.app/api/items", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => console.log(res.data));
//   }, [token]);
//   return <div></div>;
// };

// export default ApiFile;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useSearchParams } from "react-router-dom";
// import emptyBox from "../assets/emptyBox.png";

// /**
//  * Product type for easier data handling.
//  */
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image_url: string;
// }

// /**
//  * A React component that displays a paginated, searchable grid of products.
//  */
// const Products: React.FC = () => {
//   // Read 'page' and 'search' from URL query parameters on initial load
//   const [searchParams, setSearchParams] = useSearchParams();
//   const initialPage = parseInt(searchParams.get("page") || "1", 10);
//   const initialSearch = searchParams.get("search") || "";

//   const token: string | null = localStorage.getItem("token");

//   // Component state: current page, search input value, actual search query, product data, etc.
//   const [currentPage, setCurrentPage] = useState<number>(initialPage);
//   const [inputValue, setInputValue] = useState<string>(initialSearch);
//   const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // Ref to the search input for focusing on mount
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Focus the search input when the component mounts
//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   // Sync page and searchQuery to URL query parameters whenever they change
//   useEffect(() => {
//     const params: any = {};
//     if (searchQuery) {
//       params.search = searchQuery;
//     }
//     params.page = currentPage.toString();
//     // Update URL without reloading the page
//     setSearchParams(params);
//   }, [currentPage, searchQuery, setSearchParams]);

//   // Fetch product data whenever currentPage or searchQuery changes
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         // Build the API URL with pagination and optional search filter.
//         // Strapi V4 API example: GET /api/items?pagination[page]=1&pagination[pageSize]=8:contentReference[oaicite:0]{index=0}.
//         let url = `https://web-production-3ca4c.up.railway.app/api/items?pagination[page]=${currentPage}&pagination[pageSize]=8`;
//         // If there's a search query, add a case-insensitive filter on 'name':
//         // e.g., GET /api/items?filters[name][$containsi]=iphone:contentReference[oaicite:1]{index=1}:contentReference[oaicite:2]{index=2}.
//         if (searchQuery) {
//           // const encoded = encodeURIComponent(searchQuery); ${encoded}
//           url += `&filters[name][$containsi]=nothing`;
//         }
//         const response = await axios.get(url, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = response.data;
//         // Extract items and pagination info from response
//         const items: any[] = data.data;
//         const pageCount = data.meta.pagination.pageCount;
//         setTotalPages(pageCount);
//         // Map Strapi response to Product objects
//         const fetchedProducts: Product[] = items.map((item) => ({
//           id: item.id,
//           name: item.attributes.name,
//           price: item.attributes.price,
//           image_url: item.attributes.image_url,
//         }));
//         setProducts(fetchedProducts);
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch products.");
//         setProducts([]);
//         setTotalPages(1);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [currentPage, searchQuery, token]);

//   // Handle form submission: set the search query and reset to page 1
//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (inputValue !== null && inputValue !== undefined) {
//       setSearchQuery(inputValue);
//       setCurrentPage(1);
//     }
//   };

//   return (
//     // Main container: full viewport height, flex column layout
//     <div className="container d-flex flex-column min-vh-100">
//       {/* Search form */}
//       <div className="my-3">
//         <form className="d-flex" onSubmit={handleSearchSubmit}>
//           <input
//             type="text"
//             className="form-control me-2"
//             placeholder="Search by name..."
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             ref={inputRef}
//           />
//           <button className="btn btn-primary" type="submit">
//             Search
//           </button>
//         </form>
//       </div>

//       {/* Product grid: 2 rows × 4 columns */}
//       <div className="row flex-grow-1 overflow-auto">
//         {loading ? (
//           // Show loading state
//           <div>Loading...</div>
//         ) : error ? (
//           // Show error if fetch failed
//           <div className="text-danger">{error}</div>
//         ) : products.length === 0 ? (
//           // No results found message
//           <div>No results found.</div>
//         ) : (
//           // Render product cards
//           products.map((product) => (
//             <div className="col-6 col-md-3 mb-4" key={product.id}>
//               <div className="card h-100">
//                 <img
//                   src={product.image_url ? product.image_url : emptyBox}
//                   className="card-img-top"
//                   alt={product.name}
//                 />
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title">{product.name}</h5>
//                   <p className="card-text">${product.price.toFixed(2)}</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Pagination controls */}
//       <div className="mt-3">
//         <div className="d-flex justify-content-center align-items-center">
//           {/* Previous button */}
//           <button
//             className="btn btn-sm btn-outline-primary me-2"
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>

//           {/* Page number buttons */}
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//             (pageNum) => (
//               <button
//                 key={pageNum}
//                 className={`btn btn-sm me-1 ${
//                   pageNum === currentPage
//                     ? "btn-primary"
//                     : "btn-outline-primary"
//                 }`}
//                 onClick={() => setCurrentPage(pageNum)}
//               >
//                 {pageNum}
//               </button>
//             )
//           )}

//           {/* Next button */}
//           <button
//             className="btn btn-sm btn-outline-primary ms-2"
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;

// import { useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [errors, setErrors] = useState({});

//   const fileInputRef = useRef(null);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);
//       const objectUrl = URL.createObjectURL(file);
//       setPreview(objectUrl); // show preview of the selected image
//     }
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     // Front-end validation: all fields required
//     let errs = {};
//     if (!name) errs.name = "Product name is required";
//     if (!price) errs.price = "Product price is required";
//     if (!imageFile) errs.image = "Product image is required";
//     if (Object.keys(errs).length > 0) {
//       setErrors(errs);
//       return;
//     }
//     // Prepare form data
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("price", price);
//     formData.append("image", imageFile);
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "https://web-production-3ca4c.up.railway.app/api/items",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       // On success, navigate back to products list
//       navigate("/products");
//     } catch (error) {
//       // Show API validation errors (if any)
//       if (error.response && error.response.data && error.response.data.errors) {
//         setErrors(error.response.data.errors);
//       }
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>ADD NEW ITEM</h2>
//         <button
//           className="btn btn-secondary"
//           onClick={() => navigate("/products")}
//         >
//           Back
//         </button>
//       </div>
//       <form onSubmit={handleSave}>
//         <div className="row">
//           <div className="col-md-6">
//             <div className="mb-3">
//               <label className="form-label">Product Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={name}
//                 placeholder="Enter product name"
//                 onChange={(e) => setName(e.target.value)}
//               />
//               {errors.name && <div className="text-danger">{errors.name}</div>}
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Product Price</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 value={price}
//                 placeholder="Enter product price"
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//               {errors.price && (
//                 <div className="text-danger">{errors.price}</div>
//               )}
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="mb-3">
//               <label className="form-label">Product Image</label>
//               <div
//                 className="border rounded p-4 d-flex justify-content-center align-items-center"
//                 style={{ cursor: "pointer", height: "200px" }}
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 {preview ? (
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="img-fluid"
//                     style={{ maxHeight: "100%" }}
//                   />
//                 ) : (
//                   <div className="text-secondary text-center">
//                     <div style={{ fontSize: "3rem" }}>☁️</div>
//                     <span>Click to upload</span>
//                   </div>
//                 )}
//               </div>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 style={{ display: "none" }}
//                 onChange={handleFileChange}
//               />
//               {errors.image && (
//                 <div className="text-danger mt-2">{errors.image}</div>
//               )}
//             </div>
//           </div>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const EditProduct = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // get the item ID from route parameters
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [errors, setErrors] = useState({});

//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     // Fetch existing item data on mount
//     const fetchProduct = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `https://web-production-3ca4c.up.railway.app/api/items/${id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         const item = response.data;
//         setName(item.name);
//         setPrice(item.price);
//         if (item.image) {
//           setPreview(item.image); // show existing image
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);
//       const objectUrl = URL.createObjectURL(file);
//       setPreview(objectUrl);
//     }
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     // Front-end validation
//     let errs = {};
//     if (!name) errs.name = "Product name is required";
//     if (!price) errs.price = "Product price is required";
//     if (Object.keys(errs).length > 0) {
//       setErrors(errs);
//       return;
//     }
//     // Prepare form data with method override for PUT
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("price", price);
//     if (imageFile) {
//       formData.append("image", imageFile);
//     }
//     formData.append("_method", "PUT");

//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         `https://web-production-3ca4c.up.railway.app/api/items/${id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       navigate("/products");
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.errors) {
//         setErrors(error.response.data.errors);
//       }
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>EDIT ITEM</h2>
//         <button
//           className="btn btn-secondary"
//           onClick={() => navigate("/products")}
//         >
//           Back
//         </button>
//       </div>
//       <form onSubmit={handleSave}>
//         <div className="row">
//           <div className="col-md-6">
//             <div className="mb-3">
//               <label className="form-label">Product Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               {errors.name && <div className="text-danger">{errors.name}</div>}
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Product Price</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//               {errors.price && (
//                 <div className="text-danger">{errors.price}</div>
//               )}
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="mb-3">
//               <label className="form-label">Product Image</label>
//               <div
//                 className="border rounded p-4 d-flex justify-content-center align-items-center"
//                 style={{ cursor: "pointer", height: "200px" }}
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 {preview ? (
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="img-fluid"
//                     style={{ maxHeight: "100%" }}
//                   />
//                 ) : (
//                   <div className="text-secondary text-center">
//                     <div style={{ fontSize: "3rem" }}>☁️</div>
//                     <span>Click to upload</span>
//                   </div>
//                 )}
//               </div>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 style={{ display: "none" }}
//                 onChange={handleFileChange}
//               />
//               {errors.image && (
//                 <div className="text-danger mt-2">{errors.image}</div>
//               )}
//             </div>
//           </div>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;

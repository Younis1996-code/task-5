import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import emptyBox from "../assets/emptyBox.png";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import CruHeading from "../components/CruHeading";

interface Product {
  id: string;
  name: string;
  image_url: string;
  price: number;
  created_at: string;
  updated_at: string;
}

const ViewProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios
      .get<Product>(
        `https://web-production-3ca4c.up.railway.app/api/items/${id}`,
        { headers }
      )
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB");
  };

  if (!product)
    return (
      <div className="padx-64 w-100 vh-100">
        <BackButton />
        <Loading />
      </div>
    );

  return (
    <div className="padx-64 back-dash w-100">
      <BackButton />
      <CruHeading> {product.name}</CruHeading>

      <div className="wh-2141 margin-top-40 mx-auto radius-16">
        <img
          src={product.image_url ? product.image_url : emptyBox}
          alt={product.name}
          className="img-fluid object-fit-contain w-100 h-100 radius-16"
        />
      </div>
      <div className="d-flex justify-content-between flex-wrap margin-top-40 mt-5">
        <div className="d-flex justify-content-start align-items-center gap-4 width-45">
          <strong className="font-60 fw-semibold font-line h-color">
            Price:
          </strong>{" "}
          <p className="font-40 fw-medium font-line text-colo mt-auto ">
            ${product.price}
          </p>
        </div>
        <div className="d-flex justify-content-end align-items-center gap-2 width-60">
          <strong className="font-60 fw-semibold font-line h-color">
            Added At:
          </strong>{" "}
          <p className="font-40 fw-medium font-line text-colo mt-auto">
            {formatDate(product.created_at)}
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-4 mx-auto mt-5 margin-top-40">
          <strong className="font-60 fw-semibold font-line h-color">
            Updated At:
          </strong>{" "}
          <p className="font-40 fw-medium font-line text-colo mt-auto">
            {formatDate(product.updated_at)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;

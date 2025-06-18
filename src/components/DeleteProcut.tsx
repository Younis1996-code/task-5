import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const DeleteProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios
      .delete(`https://web-production-3ca4c.up.railway.app/api/items/${id}`, {
        headers,
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        navigate("/");
      });
  }, [id, navigate]);

  return (
    <div className="w-100 vh-100">
      <Loading />
    </div>
  );
};

export default DeleteProduct;

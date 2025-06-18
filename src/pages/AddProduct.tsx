import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import uploadIcon from "../assets/Upload icon.svg";
import CruHeading from "../components/CruHeading";

interface ValidationErrors {
  name?: string;
  price?: string;
  image?: string;
}

const AddProduct: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: ValidationErrors = {};

    if (!name.trim()) newErrors.name = "Product name is required";
    if (!price) newErrors.price = "Price is required";
    if (!image) newErrors.image = "Product image is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://web-production-3ca4c.up.railway.app/api/items",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.errors) {
          const apiErrors = err.response.data.errors;
          const formattedErrors: ValidationErrors = {};
          if (apiErrors.name) formattedErrors.name = apiErrors.name[0];
          if (apiErrors.price) formattedErrors.price = apiErrors.price[0];
          if (apiErrors.image) formattedErrors.image = apiErrors.image[0];
          setErrors(formattedErrors);
        }
      }
    }
  };

  return (
    <div className="padx-64 back-dash w-100">
      <BackButton />
      <CruHeading>ADD NEW ITEM</CruHeading>

      <form
        className="d-flex flex-column align-items-center w-100"
        onSubmit={handleSubmit}
      >
        <div className="row w-100">
          <div className="col-md-6">
            <div className="d-flex flex-column w-100 m-b-64">
              <label
                htmlFor="nameInput"
                className="font-32 fw-medium font-line p-color mb-3"
              >
                Name
              </label>
              <input
                id="nameInput"
                type="text"
                className="border border-form-border-color w-100 p-2 input-radius input-placeholder fs-4 fw-medium font-line h-color"
                placeholder="Enter the product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <div className="text-danger mt-1">{errors.name}</div>
              )}
            </div>

            <div className="d-flex flex-column w-100">
              <label
                htmlFor="priceInput"
                className="font-32 fw-medium font-line p-color mb-3"
              >
                Price
              </label>
              <input
                id="priceInput"
                type="number"
                className="border border-form-border-color w-100 p-2 input-radius input-placeholder fs-4 fw-normal font-line h-color"
                placeholder="Enter the product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && (
                <div className="text-danger mt-1">{errors.price}</div>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="font-32 fw-medium font-line p-color mb-3">
                Image
              </label>
              <div
                className="upload-icon ms-3 d-flex justify-content-center align-items-center input-radius widthh-200 w-100"
                style={{
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="widt-200 h-100" />
                ) : (
                  <div className="text-center w-50 h-50">
                    <img
                      className="w-100 h-100"
                      src={uploadIcon}
                      alt="uploadIcon"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="d-none"
                />
              </div>
              {errors.image && (
                <div className="text-danger mt-1">{errors.image}</div>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="m-t-120 font-32 btn-color text-white fw-medium font-line save-btnp border-0 input-radius"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

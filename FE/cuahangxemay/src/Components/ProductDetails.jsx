import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [versionColors, setVersionColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);

    useEffect(() => {
        async function fetchProductDetail() {
            try {
                const res = await axios.get(`/api/products/${id}`);
                setProduct(res.data.product);
                setVersionColors(res.data.versionColors);
                setSelectedColor(res.data.versionColors[0]?.colors[0]);
            } catch (err) {
                console.error(err);
            }
        }
        fetchProductDetail();
    }, [id]);

    if (!product || !selectedColor) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>Bảng giá màu sắc</h1>
            <div className="row">
                <div className="col-lg-6">
                    <img
                        src={`/assets/user/Image/${selectedColor.photo}`}
                        alt="Product"
                        className="img-fluid w-100"
                    />
                    <div>
                        <h2>{product.name}</h2>
                        <h2>{selectedColor.versionName}</h2>
                        <h2>{selectedColor.color}</h2>
                        <div>Giá: {selectedColor.price.toLocaleString()} VNĐ</div>
                        <div>{selectedColor.quantity} sản phẩm có sẵn</div>
                    </div>
                </div>

                <div className="col-lg-6">
                    {versionColors.map((version, vi) => (
                        <div key={vi} className="mb-4">
                            <b>{version.versionName}</b>
                            <div className="d-flex">
                                {version.colors.map((color, ci) => (
                                    <div
                                        key={ci}
                                        className="d-flex flex-column align-items-center mx-2 cursor-pointer"
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        <div
                                            style={{
                                                width: 40,
                                                height: 20,
                                                background: color.value,
                                                border: "1px solid #ccc",
                                            }}
                                        ></div>
                                        <span>{color.color}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-5">
                <button className="btn btn-primary">
                    Thêm sản phẩm vào giỏ hàng
                </button>
            </div>
        </div>
    );
}

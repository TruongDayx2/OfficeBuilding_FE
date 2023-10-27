

import React, { useState } from 'react';

function Test() {
    const [customer, setCustomer] = useState('');
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
    };

    return (
       //form tạo hóa đơn hiện ra giữa màn hình
        <div className="containerr" style={{marginLeft:"200px",marginTop:"200px"}}>
            <div className="row">
                <div className="col-md-6">
                    <h1 className="text-center">Tạo hóa đơn</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="customer">Tên khách hàng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="customer"
                                value={"Nguyễn Văn A"}
                                onChange={(e) => setCustomer(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="product">Phòng</label>
                            <select
                                className="form-control"
                                id="product"
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                            >
                                <option value="product1">Phòng 101</option>
                                <option value="product2">Phòng 102</option>
                                <option value="product3">Phòng 103</option>
                                <option value="product1">Phòng 104</option>
                                <option value="product2">Phòng 105</option>
                                <option value="product3">Phòng 106</option>
                                <option value="product1">Phòng 107</option>
                                <option value="product2">Phòng 108</option>
                                <option value="product3">Phòng 109</option>

                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Công ty</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                value={"VINAMILK"}
                                placeholder='VINAMILK'
                                disabled
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                value={"100.000.000 đ"}
                                placeholder='100.000.000 đ'
                                disabled
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                     
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Dịch vụ</th>
                                    <th scope="col">Giá tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Điện</td>
                                    <td>100.000 đ</td>
                                </tr>
                                <tr>
                                    <td>Nước</td>
                                    <td>100.000 đ</td>
                                </tr>
                                <tr>
                                    <td>Internet</td>
                                    <td>100.000 đ</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="form-group">
                            <label htmlFor="total">Tổng tiền</label>
                            <input
                                type="number"
                                className="form-control"
                                id="total"
                                value={"300.000 đ"}
                                disabled
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                     
                        <div className="form-group" style={{display:"flex", justifyContent:"space-between"}}>
                            <div>Tổng tiền</div>
                            <div>300.000 đ</div>
                        </div>
                        <div className="form-group" style={{display:"flex", justifyContent:"space-between"}}>
                            <div>Thời gian</div>
                            <div> 24/10/2023</div>
                        </div>
                        <div className="form-group" style={{display:"flex", justifyContent:"space-between"}}>
                            <div>Mã Hóa đơn</div>
                            <div> HD001</div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>



    );
}

export default Test;

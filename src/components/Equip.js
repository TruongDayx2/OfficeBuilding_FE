// import React, { useEffect, useState } from "react";
// import '../css/order.css';
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";

// const Equip = () => {
//   const euipsFromReducer = useSelector(state => state.floors.data)
  

//   return (
//     <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
//       <div className="admin-post__wrapper">
//         <div>Danh sách các tầng</div>
//         <div className="admin-post__body">
//                         <table id="admin-post__table">
//                             <tbody>
//                                 <tr>
//                                     <th>STT</th>
//                                     <th style={{ width: '200px' }}>Tên</th>
//                                     <th style={{ width: '200px' }}>Tầng</th>
//                                     <th style={{ width: '200px' }}>Trạng thái</th>
//                                     <th style={{ width: '105px' }}>Thao tác</th>
//                                     <th style={{ width: '105px' }}>Xóa</th>

//                                 </tr>
//                                 {
//                                     euipsFromReducer?.map((item, index) => (
//                                         <tr key={index}>
//                                             <td>{index + 1}</td>
//                                             <td>{item?.floorName}</td>
//                                             <td>
//                                                 <Link to={{
//                                                     pathname: "/rented-areas",
//                                                     search: `?floorId=` + item?.id,
//                                                 }}>
//                                                     <button className="post-edit-item-btn">
//                                                         <i className='bx bxs-pencil'></i>
//                                                         Xem
//                                                     </button>
//                                                 </Link>
//                                             </td>
//                                             <td>
//                                                 <button className="post-edit-item-btn" >
//                                                     <i className='bx bxs-pencil'></i>
//                                                     Sửa
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 }
//                             </tbody>
//                         </table>
//                     </div>
//       </div>
//     </div>
//   )
// }

// export default Equip;
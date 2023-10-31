import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllFloors ,addFloor} from "../redux/actions/floor";
import { NotifiContext } from "./notify/notify";
const Floor1 = () => {
    const location = useLocation()
    const dispatch = useDispatch();
    const floorsFromReducer = useSelector(state => state.floors.data)
    const {setErrorCode} = React.useContext(NotifiContext)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("role") === "ROLE_ADMIN") {
            setIsAdmin(true)
        }
        dispatch(getAllFloors())
        return () => {

        }
       
    }, [location.pathname])

    const [checkAddFloor, setCheckAddFloor] = useState(false)
    const [checkUpdateFloor, setCheckUpdateFloor] = useState(false)
 

    const handelSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
       const checkFloorName = floorsFromReducer?.find(item => item?.floorName === floorName)
        if (checkFloorName) {
            setErrorCode("ERROR_FLOOR_001")
        } else {

            dispatch(addFloor({ floorName }))
            setCheckAddFloor(!checkAddFloor)
        }




    }

    const [floorName, setFloorName] = useState('')


    return (
        <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
            <div style={{ display: checkAddFloor === true ? 'block' : 'none' }} className="modal">
                <div className="modal_body" style={{ background: "red", borderRadius: "10px", height: "300px", width: "500px", marginLeft: "400px", marginTop: "200px", zIndex: 2000 }}>
                    <h2 style={{ textAlign: 'center' }}>Thêm tầng</h2>
                    <form onSubmit={handelSubmit}>
                        <div className="form-group">
                            <label htmlFor="floorName">Tên tầng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="floorName"
                                required
                                placeholder="Nhập tên tầng"
                                onChange={(e) => {
                                    setFloorName(e.target.value)
                                }}
                            />

                        </div>
                        <button style={{ marginLeft: "200px" }} className="post-edit-item-btn">Thêm</button>
                        <button style={{ marginLeft: "20px" }} className="post-edit-item-btn" onClick={() => {
                            setCheckAddFloor(!checkAddFloor)
                        }
                        }>Hủy</button>
                    </form>
                </div>
            </div>
            <div className="admin-post__wrapper">
                <div>
                    <div style={{ marginTop: '100px', fontSize: '30px', marginBottom: '20px' }}>Danh sách các tầng</div>
                    <div style={{ marginBottom: '20px' , display: isAdmin === true ? 'block' : 'none' }}>
                        <button className="post-edit-item-btn" onClick={() => {
                            setCheckAddFloor(!checkAddFloor)
                        }}>
                            Thêm tầng
                        </button>
                    </div>
                </div>
                <div className="admin-post__body">
                    <table id="admin-post__table">
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th style={{ width: '200px' }}>Tầng</th>
                                <th style={{ width: '200px' }}>Phòng</th>
                                <th style={{ width: '200px' }}>Trang thiết bị</th>
                            </tr>
                            {
                                floorsFromReducer?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.floorName}</td>
                                        <td>
                                            <Link to={
                                                `/rooms/${item?.id}`
                                            }>
                                                <button className="post-edit-item-btn">
                                                    Xem
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={
                                                `/equips/${item?.id}`
                                            }>
                                                <button className="post-edit-item-btn">
                                                    Xem
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Floor1;
import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllFloors, addFloor ,updateFloor} from "../redux/actions/floor";
import { NotifiContext } from "./notify/notify";
const Floor1 = () => {
    const location = useLocation()
    const dispatch = useDispatch();
    const floorsFromReducer = useSelector(state => state.floors.data)
    const { setErrorCode } = React.useContext(NotifiContext)
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


    const handelCloseAddFloor = () => {
        setCheckAddFloor(false)
        setCheckUpdateFloor(false)
        setFloorNametmp('')
        document.querySelector(".__add").textContent = "Thêm Tầng"
        document.querySelector('.post-edit-item-btn').textContent = "Thêm"

    }

    const handelSubmit = (event) => {
        event.preventDefault();

        // xóa khoảng trắng và viết hoa tất cả các ký tự trong floorName
        const floorName = floorNametmp.replace(/\s+/g, ' ').trim().toUpperCase();
        const checkFloorName = floorsFromReducer?.find(item => item?.floorName.trim().toUpperCase() === floorName)
        if (checkFloorName) {
            setErrorCode("ERROR_FLOOR_001")
            document.getElementById("floorName").focus();
            return
        }

        else {
            if (checkAddFloor === true) {
                console.log("done add flood", floorName);
                dispatch(addFloor({floorName}))
                setErrorCode("LOG_FLOOR_001")
                setCheckAddFloor(false)
                setFloorNametmp('')
            }
            if (checkUpdateFloor === true) {

                console.log("done add flood", floorName);
                dispatch(updateFloor(floorId,{floorName }))
                setErrorCode("LOG_FLOOR_002")
                setCheckUpdateFloor(false)
                setFloorNametmp('')
            }
        }

    }

    const [floorNametmp, setFloorNametmp] = useState('')
    const [floorId, setFloorId] = useState('')

    return (
        <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
            <div style={{ display: checkAddFloor === true || checkUpdateFloor === true ? 'block' : 'none' }} className="modal">
                <div className="modal_body" style={{ background: "white", border: "5px solid black", borderRadius: "10px", height: "300px", width: "500px", marginLeft: "400px", marginTop: "200px", zIndex: 2000 }}>
                    <div className="__add form-post__title ">THÊM TẦNG</div>
                    <form onSubmit={handelSubmit}>
                        <div className="form-group" style={{ marginLeft: "20px", marginRight: "20px" }}>
                            <label htmlFor="floorName">Tên tầng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="floorName"
                                required
                                value={floorNametmp}
                                placeholder="Nhập tên tầng"
                                onChange={(e) => {
                                    setFloorNametmp(e.target.value)
                                }}
                            />
                        </div>
                        <button style={{ marginLeft: "200px" }} className="post-edit-item-btn" >Thêm</button>
                        <button style={{ marginLeft: "20px" }} className="post-edit-item-btn" onClick={handelCloseAddFloor}>Hủy</button>
                    </form>
                </div>
            </div>
            <div className="admin-post__wrapper">
                <div>
                    <div style={{ marginTop: '100px', fontSize: '30px', marginBottom: '20px' }}>Danh sách các tầng</div>
                    <div style={{ marginBottom: '20px', display: isAdmin === true ? 'block' : 'none' }}>
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
                                <th style={{ width: '200px' }}>chỉnh sửa</th>
                            </tr>
                            {
                                floorsFromReducer?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.floorName.trim().toUpperCase()}</td>
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

                                        <td>

                                            <button className="post-edit-item-btn" onClick=
                                                {() => {
                                                    document.querySelector(".__add").textContent = `Sửa ${item?.floorName.trim().toUpperCase()}`
                                                    document.querySelector('.post-edit-item-btn').textContent = "Sửa"
                                                    setCheckUpdateFloor(!checkUpdateFloor)
                                                    setFloorId(item?.id)
                                                    setFloorNametmp(item?.floorName.trim().toUpperCase())
                                                }}

                                            >
                                                sửa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Floor1;
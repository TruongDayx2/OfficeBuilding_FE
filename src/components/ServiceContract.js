import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllCompanys } from "../redux/actions/company";
import { getAllServiceContract, updateServiceContract } from "../redux/actions/serviceContract";
import { getAllServices } from "../redux/actions/service";

const ServiceContract1 = () => {
  const rentalsFromReducer = useSelector(state => state.serviceContract.data1)
  const companysFromReducer = useSelector(state => state.company.data1)
  const servicesFromReducer = useSelector(state => state.service.data1)

  const location = useLocation()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllServiceContract())
    dispatch(getAllCompanys())
    dispatch(getAllServices())
    return () => {
      console.log(location.pathname);
    }
  }, [location.pathname])

  const [sortedData, setSortedData] = useState(rentalsFromReducer);

  useEffect(() => {
    setSortedData(rentalsFromReducer)
  }, [rentalsFromReducer])

  console.log(sortedData)
  const searchRoom = (e) => {
    if (e.trim().length === 0) {
      setSortedData(rentalsFromReducer)
      return;
    }
    const searchTerm = e.trim().toLowerCase();

    const tmpRooms = companysFromReducer.filter(emp => emp.cusName.toLowerCase().includes(searchTerm));

    const updatedResultArray = rentalsFromReducer.filter(item => tmpRooms.some(company => company.id === item.companyId));
    setSortedData(updatedResultArray);
  }


  const [isShow, setIsShow] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [item, setItem] = useState({})
  const [idItem, setIdItem] = useState({})
  const [isDelete, setIsDelete] = useState(false)
  const [isDetail, setIsDetail] = useState(false)

  useEffect(() => {
    if (isUpdate || isDelete || isDetail) {
      setFormData(item)
      setIdItem(item.id)
    }
  }, [isUpdate, isDelete, isDetail])

  const popUpActive = (mode, item) => {
    setIsShow(true);
    document.querySelector('.form-post').classList.add('active');
    if (mode === "edit") {
      setIsUpdate(true)
      setItem(item)
      document.querySelector('.dialog__title').textContent = "Sửa trang thiết bị";
    } else if (mode === 'delete') {
      setIsDelete(true)
      setItem(item)
      document.querySelector('.dialog__title').textContent = "Bạn có chắc chắn xóa?";
    } else if (mode === 'detail') {
      setIsDetail(true)
      setItem(item)
      document.querySelector('.dialog__title').textContent = "Hợp đồng thuê dịch vụ";
    }
    else {
      document.querySelector('.dialog__title').textContent = "Thêm trang thiết bị";
    }
  }
  const initialFormData = {
    scDateBegin: '',
    scDateEnd: '',
    serviceId: 1,
    companyId: 1,
  };
  const cancelClick = () => {
    setFormData(initialFormData);
    setIsShow(false);
    setIsUpdate(false);
    setIsDelete(false)
    setIsDetail(false)
    setItem({})
    document.querySelector('.form-post').classList.remove('active');
  }

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thực hiện các xử lý dữ liệu ở đây, ví dụ: gửi dữ liệu lên server
    console.log(formData);
    setFormData(initialFormData);
    if (isDelete) {
      // dispatch(cancelRental(idItem))
      console.log(item)
      const newData = {
        companyId: item.companyId,
        scDateBegin: item.scDateBegin,
        scDateEnd: item.scDateEnd,
        scStatus: 0,
        serviceId: item.serviceId
      };
      dispatch(updateServiceContract(newData,item.id))

    }
    // Reset form sau khi gửi thành công (tuỳ ý)
    // window.location.reload();
    cancelClick();
  };


  const CompanyName = ({ companyId }) => {
    const company = companysFromReducer.find(company => company.id === companyId);
    if (company) {
      return (
        <div>{company.cusName}</div>
      );
    }
    else {
      return <div>Đang tải...</div>; // Bạn có thể hiển thị thông báo tải hoặc xử lý trường hợp này theo cách khác
    }
  }

  const ServiceName = ({ serId }) => {
    const sser = servicesFromReducer.find(ser => ser.id === serId);
    if (sser) {
      return (
        <div>{sser.serviceName}</div>
      );
    }
    else {
      return <div>Đang tải...</div>; // Bạn có thể hiển thị thông báo tải hoặc xử lý trường hợp này theo cách khác
    }
  }

  const RentMonth = ({ serId }) => {
    const sser = servicesFromReducer.find(sser => sser.id === serId);
    if (sser) {
      return (
        <div>{sser.servicePrice * 1000000} VND</div>
      );
    }
    else {
      return <div>Đang tải...</div>; // Bạn có thể hiển thị thông báo tải hoặc xử lý trường hợp này theo cách khác
    }
  }
  return (
    <div style={{ minHeight: "100vh" }} className="admin-post__container">
      <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
        <div className="modal_overlay" style={{ height: '1000vh' }}></div>
        <div className="form-post" style={{ height: isDelete ? '200px' : '' }}>
          <div className="form-post__title dialog__title">
            Thêm trang thiết bị
          </div>
          <div style={{ display: isDelete ? 'block' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
              <button type="button" onClick={(e) => handleSubmit(e)} style={{ borderRadius: '10px', backgroundColor: 'teal', color: 'white' }}>Xác nhận</button>
              <button type="button" onClick={cancelClick} style={{ marginLeft: '10px', borderRadius: '10px', backgroundColor: 'orange' }}>
                Hủy
              </button>
            </div>
          </div>
          <div style={{ display: isDetail ? 'block' : 'none' }}>
            <div style={{ marginTop: '20px', width: '100%' }}>
              <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <span style={{ flex: '1' }}>
                  Tên công ty:
                </span>
                <span style={{ flex: '1', fontWeight: '500' }}>
                  <CompanyName companyId={formData.companyId} />
                </span>
              </label>
            </div>
            <div style={{ marginTop: '20px', width: '100%' }}>
              <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <span style={{ flex: '1' }}>
                  Tên dịch vụ:
                </span>
                <span style={{ flex: '1', fontWeight: '500' }}>
                  <ServiceName serId={formData.serviceId} />
                </span>
              </label>
            </div>
            <div style={{ marginTop: '20px', width: '100%' }}>
              <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <span style={{ flex: '1' }}>
                  Mã hợp đồng:
                </span>
                <span style={{ flex: '1', fontWeight: '500', display: 'flex' }}>
                  {formData.id}<CompanyName companyId={formData.companyId} />{formData.companyId}{formData.serviceId}
                </span>
              </label>
            </div>
            <div style={{ marginTop: '20px', width: '100%' }}>
              <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <span style={{ flex: '1' }}>
                  Tiền thuê (tháng):
                </span>
                <span style={{ flex: '1', fontWeight: '500' }}>
                  <RentMonth serId={formData.serviceId} />
                </span>
              </label>
            </div>
            <div style={{ marginTop: '20px', width: '100%' }}>
              <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <span style={{ flex: '1' }}>
                  Ngày bắt đầu thuê:
                </span>
                <span style={{ flex: '1', fontWeight: '500' }}>
                  {formData.scDateBegin}
                </span>
              </label>
            </div>
            <div style={{ marginTop: '20px', width: '100%' }}>
              <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <span style={{ flex: '1' }}>
                  Ngày hết hạn thuê:
                </span>
                <span style={{ flex: '1', fontWeight: '500' }}>
                  {formData.scDateEnd}
                </span>
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '80px' }}>
              <button type="button" onClick={cancelClick} style={{ marginLeft: '10px', borderRadius: '10px', backgroundColor: 'orange' }}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-post__wrapper">
        <div style={{ marginTop: '50px', fontSize: '30px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: '3' }}>Danh sách hợp đồng</div>
          <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <form className="search-bar" style={{ height: '30px', fontSize: '15px', borderRadius: '10px' }}>
              <input style={{ borderRadius: '5px', width: '250px' }}
                placeholder='Tìm kiếm công ty' type="search" name="search" pattern=".*\S.*"
                required onChange={(e) => searchRoom(e.target.value)} />
            </form>

          </div>
        </div>
        <div className="admin-post__body">
          <table id="admin-post__table">
            <tbody>
              <tr>
                <th>STT</th>
                <th style={{ width: '105px' }}>Mã hợp đồng</th>
                <th style={{ width: '200px' }}>Công ty</th>
                <th style={{ width: '105px' }}>Dịch vụ</th>
                <th style={{ width: '105px' }}>Tình trạng</th>
                <th style={{ width: '200px' }}>Thao tác</th>

              </tr>
              {
                sortedData?.map((item1, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td >
                      <span style={{ display: 'flex' }}>{item1?.id}<CompanyName companyId={item1?.companyId} />{item1.companyId}{item1?.serviceId}</span>
                    </td>
                    <td>
                      <CompanyName companyId={item1?.companyId} />
                    </td>
                    <td>
                      <ServiceName serId={item1?.serviceId} />
                    </td>
                    <td style={item1?.scStatus === 0 ? { color: 'orange' } : { color: 'teal' }}>
                      {item1?.scStatus === 0 ? 'Hết hạn' : 'Còn hạn'}
                    </td>
                    <td >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <button className="post-edit-item-btn" style={{ width: '100px', marginLeft: '10px' }} onClick={() => popUpActive('detail', item1)}>
                          Chi tiết
                        </button>
                        <div style={item1.scStatus === 0 ? { display: 'none' } : { display: 'block' }}>
                          <button className="post-delete-btn " style={{ width: '70px', marginLeft: '10px' }} onClick={() => popUpActive('delete', item1)}>
                            Hủy
                          </button>
                        </div>
                      </span>
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

export default ServiceContract1;
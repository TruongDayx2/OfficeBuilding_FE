import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllFloors } from "../redux/actions/floor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { createCompany, deleteCompany, getAllCompanys, updateCompany } from "../redux/actions/company";
import { getAllRentals, getAllRentalsByMonth } from "../redux/actions/rental";
import { getAllRooms } from "../redux/actions/rooms";
import { getAllServices } from "../redux/actions/service";
import { getAllServiceContractsByMonth } from "../redux/actions/serviceContract";
const DetailRevenueService = () => {
  const companysFromReducer = useSelector(state => state.company.data1)
  const servicesFromReducer = useSelector(state => state.service.data1)
  const ServiceContractMonth = useSelector(state => state.serviceContract.dataMonth)
  const location = useLocation()
  const dispatch = useDispatch();


  useEffect(() => {
    const id = location.pathname.split('/')[2];
    setComId(id)
    const mo = location.pathname.split('/')[3];
    setReMonth(mo)
    const ye = location.pathname.split('/')[4];
    setReYear(ye)
    dispatch(getAllCompanys())
    dispatch(getAllServices())
    dispatch(getAllServiceContractsByMonth(mo, ye))

    return () => {
      console.log(location.pathname);
    }
  }, [location.pathname])

  useEffect(() => {
    setSortedData(ServiceContractMonth)
  }, [ServiceContractMonth])

  const [sortedData, setSortedData] = useState(ServiceContractMonth);
  const [comId, setComId] = useState(0);



  const [reMonth, setReMonth] = useState(1);
  const [reYear, setReYear] = useState(2023);




  function priceVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

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
  const RoomName = ({ roomId }) => {
    const room = servicesFromReducer.find(room => room.id === roomId);
    if (room) {
      return (
        <div>{room.roomName}</div>
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
        <div>{priceVND(sser.servicePrice)}</div>
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
  return (
    <div style={{ minHeight: "100vh" }} className="admin-post__container">

      <div className="admin-post__wrapper">
        <div style={{ marginTop: '50px', fontSize: '30px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: '1.5', display: 'flex' }}>Chi tiết doanh thu phục vụ tháng {reMonth} năm {reYear} từ công ty &nbsp; <b><CompanyName companyId={+comId} /></b></div>
        </div>
        <div className="admin-post__body">
          {sortedData?.map((item1, index) => {
            if (item1.companyId === +comId) {
              return (
                <div key={index} style={{ width: '800px', padding: '20px', border: '1px solid teal', marginBottom: '10px', borderRadius: '10px' }}>
                  <div style={{ marginTop: '20px', width: '100%' }}>
                    <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <span style={{ flex: '1' }}>
                        Tên công ty:
                      </span>
                      <span style={{ flex: '1', fontWeight: '500' }}>
                        <CompanyName companyId={item1.companyId} />
                      </span>
                    </label>
                  </div>
                  <div style={{ marginTop: '20px', width: '100%' }}>
                    <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <span style={{ flex: '1' }}>
                        Tên dịch vụ:
                      </span>
                      <span style={{ flex: '1', fontWeight: '500' }}>
                        <ServiceName serId={item1.serviceId} />
                      </span>
                    </label>
                  </div>
                  <div style={{ marginTop: '20px', width: '100%' }}>
                    <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <span style={{ flex: '1' }}>
                        Mã hợp đồng:
                      </span>
                      <span style={{ flex: '1', fontWeight: '500', display: 'flex' }}>
                        {item1?.id}<CompanyName companyId={item1?.companyId} />{item1?.companyId}{item1?.serviceId}
                      </span>
                    </label>
                  </div>
                  <div style={{ marginTop: '20px', width: '100%' }}>
                    <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <span style={{ flex: '1' }}>
                        Tiền thuê (tháng):
                      </span>
                      <span style={{ flex: '1', fontWeight: '500' }}>
                        {/* <RentMonth serId={item1?.serviceId} /> */}
                        {priceVND(item1?.scPrice)}
                      </span>
                    </label>
                  </div>
                  <div style={{ marginTop: '20px', width: '100%' }}>
                    <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <span style={{ flex: '1' }}>
                        Ngày bắt đầu thuê:
                      </span>
                      <span style={{ flex: '1', fontWeight: '500' }}>
                        {item1?.scDateBegin}
                      </span>
                    </label>
                  </div>
                  <div style={{ marginTop: '20px', width: '100%' }}>
                    <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <span style={{ flex: '1' }}>
                        Ngày hết hạn thuê:
                      </span>
                      <span style={{ flex: '1', fontWeight: '500' }}>
                        {item1?.scDateEnd}
                      </span>
                    </label>
                    <div style={{ marginTop: '20px', width: '100%' }}>
                      <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <span style={{ flex: '1' }}>
                          Trạng thái:
                        </span>
                        <span style={{ flex: '1', fontWeight: '500' }}>
                          {item1?.scStatus === 0 ? 'Hết hạn' : 'Còn hạn'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              );
            }
          })}



        </div>
      </div>
    </div>
  )
}

export default DetailRevenueService;
import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { Link,useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllFloors } from "../redux/actions/floor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { createCompany, deleteCompany, getAllCompanys, updateCompany } from "../redux/actions/company";
import { getAllRentals, getAllRentalsByMonth } from "../redux/actions/rental";
import { getAllRooms } from "../redux/actions/rooms";
import { getAllServiceContract, getAllServiceContractsByMonth } from "../redux/actions/serviceContract";
import { getAllServices } from "../redux/actions/service";
const RevenueService = () => {
  const companysFromReducer = useSelector(state => state.company.data1)
  const servicesFromReducer = useSelector(state => state.service.data1)
  const ServiceContractMonth = useSelector(state => state.serviceContract.dataMonth)
  const serviceContractsFromReducer = useSelector(state => state.serviceContract.data1)

  const location = useLocation()
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllCompanys())
    dispatch(getAllServiceContract())
    dispatch(getAllServices())
    dispatch(getAllRooms())
    dispatch(getAllServiceContractsByMonth(1, 2023))

    return () => {
      console.log(location.pathname);
    }
  }, [location.pathname])

  useEffect(() => {
    setSortedData(ServiceContractMonth)
  }, [ServiceContractMonth])

  const [selectedStatus, setSelectedStatus] = useState(0);
  const [sortedData, setSortedData] = useState(ServiceContractMonth);
  const [isMonth, setIsMonth] = useState(false);

  const onFilterChange = (e) => {
    setSelectedStatus(e.target.value);
  }
  console.log(servicesFromReducer)
  function getPrice(serviceId) {
    if(servicesFromReducer.length>0)
      return (servicesFromReducer.filter(item => item.id === serviceId))[0].servicePrice

  }

  function setData(arr) {
    console.log(arr)

    const modifiedCompanies = [];
    for (let i = 0; i < companysFromReducer.length; i++) {
      let check = 0
      for (let j = 0; j < arr.length; j++) {
        let new1 = {}
        if (companysFromReducer[i].id === arr[j].companyId) {
          new1.comId=companysFromReducer[i].id
          new1.comName = companysFromReducer[i].cusName
          new1.comTaxCode = companysFromReducer[i].cusTaxCode
          new1.hidePrice = arr[j].scPrice

          if (check < 1) {
            modifiedCompanies.push(new1);
          } else {
            modifiedCompanies[modifiedCompanies.length - 1].hidePrice += new1.hidePrice
          }
          check = 1
        }
      }

    }
    setNewData(modifiedCompanies)
    // return modifiedCompanies
  }

  const [newData, setNewData] = useState(sortedData)
  useEffect(() => {
    setData(sortedData)
    // setNewData(new2)
  }, [sortedData])
  console.log(newData)

  useEffect(() => {
    // const dataCopy = [...sortedData];
    // dataCopy.sort(sortByStatus);
    // setSortedData(dataCopy);

    if (selectedStatus === '0') {
      // lọc theo tháng
      setIsMonth(false)
      setFormDataDate(initialFormDataDate)
      dispatch(getAllServiceContractsByMonth(1, 2023))

    } else if (selectedStatus === '1') {
      //tùy chỉnh
      setIsMonth(true)
    }

  }, [selectedStatus]);

  const [isSearch,setSearch] = useState(false)
  const [searchData,setSearchData] = useState(newData)

  const searchRoom = (e) => {
    if (e.trim().length === 0) {
      setSortedData(ServiceContractMonth)
      setSearch(false)
      return;
    }
    const searchTerm = e.trim().toLowerCase();
    const tmpRooms = newData.filter(emp => emp.comName.toLowerCase().includes(searchTerm));
    setSearch(true)
    setSearchData(tmpRooms);
  }

//   const [isShow, setIsShow] = useState(false)
//   const [isUpdate, setIsUpdate] = useState(false)
//   const [item, setItem] = useState({})
//   const [idItem, setIdItem] = useState({})
//   const [isDelete, setIsDelete] = useState(false)

//   useEffect(() => {
//     if (isUpdate || isDelete) {
//       console.log(item)
//       setFormData(item)
//       setIdItem(item.id)
//     }


//   }, [isUpdate, isDelete])

//   const popUpActive = (mode, item) => {
//     setIsShow(true);
//     document.querySelector('.form-post').classList.add('active');
//     if (mode === "edit") {
//       setIsUpdate(true)
//       setItem(item)
//       document.querySelector('.dialog__title').textContent = "Cập nhật công ty";
//     } else if (mode === 'delete') {
//       setIsDelete(true)
//       setItem(item)
//       document.querySelector('.dialog__title').textContent = "Bạn có chắc chắn xóa?";
//     }
//     else {
//       document.querySelector('.dialog__title').textContent = "Thêm công ty";
//     }
//   }
  const initialFormData = {
    cusName: '',
    cusEmail: '',
    cusPhone: '',
    cusTaxCode: '',
  };

  const cancelClick = () => {
    setFormData(initialFormData);
    // setIsShow(false);
    // setIsUpdate(false);
    // setIsDelete(false)
    // setItem({})
    document.querySelector('.form-post').classList.remove('active');
  }
  const initialFormDataDate = {
    reYear: new Date('2023-01-01'),
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formDataDate, setFormDataDate] = useState(initialFormDataDate);
  const [reMonth, setReMonth] = useState(1);
  const [reYear, setReYear] = useState(2023);


  useEffect(() => {
    console.log(formDataDate)
    const dateObj = new Date(formDataDate.reYear)
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1);
    setReMonth(month)
    setReYear(year)
    setIsMonth(false)
    dispatch(getAllServiceContractsByMonth(month, year))

  }, [formDataDate])



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Thực hiện các xử lý dữ liệu ở đây, ví dụ: gửi dữ liệu lên server
//     setFormData(initialFormData);
//     if (!isUpdate && !isDelete) {
//       dispatch(createCompany(formData))
//     } else if (isUpdate) {
//       dispatch(updateCompany(formData, idItem))
//     } else {
//       dispatch(deleteCompany(idItem))
//     }
//     // Reset form sau khi gửi thành công (tuỳ ý)
//     window.location.reload();
//     cancelClick();
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newValue = name === 'equipmentStatus' || name === 'floorId' ? parseInt(value) : value;
//     setFormData({ ...formData, [name]: newValue });
//   };


  function priceVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  return (
    <div style={{ minHeight: "100vh" }} className="admin-post__container">
     

      <div className="admin-post__wrapper">
        <div style={{ marginTop: '50px', fontSize: '30px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: '1.5' }}>Doanh thu dịch vụ tháng {reMonth} năm {reYear}</div>
          <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <form className="search-bar" style={{ height: '30px', fontSize: '15px', borderRadius: '10px' }}>
              <input style={{ borderRadius: '5px', width: '250px' }}
                placeholder='Tìm kiếm công ty' type="search" name="search" pattern=".*\S.*"
                required onChange={(e) => searchRoom(e.target.value)} />
            </form>
            <select style={{ width: '120px', height: '30px', fontSize: '15px' }} onChange={(e) => onFilterChange(e)}>
              <option defaultChecked value={0}>Theo tháng</option>
              <option value={1}>Tùy chỉnh</option>
            </select>
          </div>
        </div>
        <div style={{ display: !isMonth ? 'block' : 'none', marginBottom: '20px' }}>
          <span style={{ marginRight: '10px' }}>Tháng</span>
          <DatePicker
            selected={new Date(formDataDate.reYear)}
            onChange={(date) => setFormDataDate({ ...formDataDate, reYear: date })}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            style={{ borderRadius: '10px', padding: '5px' }}
          />

        </div>
        <div style={{ display: isMonth ? 'block' : 'none' }}>
          <button>chỉnh</button>
        </div>
        <div className="admin-post__body">
          <table id="admin-post__table">
            <tbody>
              <tr>
                <th>STT</th>
                <th style={{ width: '200px' }}>Tên công ty</th>
                <th style={{ width: '180px' }}>Mã số thuế</th>
                <th style={{ width: '180px' }}>Tiền</th>
                <th style={{ width: '250px' }}>Thao tác</th>

              </tr>
              {
                !isSearch && newData?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.comName}</td>
                    <td>{item?.comTaxCode}</td>
                    <td>{priceVND(item?.hidePrice)} </td>
                    <td>
                      <Link to={
                        `detailRevenueService/${item?.comId}/${reMonth}/${reYear}`
                      }>
                        <button className="post-edit-item-btn" style={{ width: '150px' }}>
                          Chi tiết
                        </button>
                      </Link>
                      {/* <button className="post-delete-btn " style={{ width: '70px', marginLeft: '10px' }} onClick={() => popUpActive('delete', item)}>
                        Xóa
                      </button> */}
                    </td>
                  </tr>
                ))
              }
              {
                isSearch && searchData?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.comName}</td>
                    <td>{item?.comTaxCode}</td>
                    <td>{priceVND(item?.hidePrice)} </td>
                    <td>
                      <Link to={
                        `detailRevenueService/${item?.comId}/${reMonth}/${reYear}`
                      }>
                        <button className="post-edit-item-btn" style={{ width: '150px' }}>
                          Chi tiết
                        </button>
                      </Link>
                      {/* <button className="post-delete-btn " style={{ width: '70px', marginLeft: '10px' }} onClick={() => popUpActive('delete', item)}>
                        Xóa
                      </button> */}
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

export default RevenueService;
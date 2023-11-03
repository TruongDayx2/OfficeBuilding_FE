import { createContext, useContext, useState, useEffect } from 'react';

export const NotifiContext = createContext();

export const NotifiProvider = ({ children }) => {
  const [errorCode, setErrorCode] = useState(0);
  const errorList = [

    //-----------------login-----------------
    // chưa nhập
    {
      "id": "ERROR_USERNAME_001",
      "type": "error",
      "message": "Vui lòng nhập username"
    },
    {
      "id": "ERROR_PASSWORD_001",
      "type": "error",
      "message": "Vui lòng nhập mật khẩu"
    },
    // sai định dạng
    {
      "id": "ERROR_USERNAME_002",
      "type": "error",
      "message": "Username không được chứa ký tự đặc biệt"
    },
    {
      "id": "ERROR_PASSWORD_002",
      "type": "error",
      "message": "Mật khẩu phải có ít nhất 8 ký tự"
    },
    {
      "id": "ERROR_PASSWORD_003",
      "type": "error",
      "message": "Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự thường, 1 số và 1 ký tự đặc biệt"
    },
    // sai thông tin
    {
      "id": "ERROR_USERNAME_003",
      "type": "error",
      "message": "Username không tồn tại"
    },
    {
      "id": "ERROR_PASSWORD_004",
      "type": "error",
      "message": "Mật khẩu không đúng"
    },
    // lỗi hệ thống
    {
      "id": "ERROR_SYSTEM_001",
      "type": "error",
      "message": "Lỗi hệ thống"
    },
    // looix ddawng kys
    {
      "id": "ERROR_USERNAME_004",
      "type": "error",
      "message": "Username đã tồn tại"
    },
    //lỗi không có công ty khy thuê phòng
    {
      "id": "ERROR_COMPANY_001",
      "type": "error",
      "message": "Không có công ty ký hợp đồng thuê phòng"
    },
    //-----------------end login-----------------

    // -----------------room-----------------
    // lỗi trùng tên phòng
    {
      "id": "ERROR_ROOM_001",
      "type": "error",
      "message": "Tên phòng đã tồn tại"
    },
    // lỗi nhập thiếu thông tin phòng
    {
      "id": "ERROR_ROOM_002",
      "type": "error",
      "message": "Vui lòng nhập đầy đủ thông tin phòng"
    },
    // lỗi kết nối mạng
    {
      "id": "ERROR_NETWORK_001",
      "type": "error",
      "message": "Lỗi kết nối mạng"
    },
    // thông báo thuê thành công ( type = log)
    {
      "id": "LOG_ROOM_001",
      "type": "log",
      "message": "Thuê phòng thành công"
    },
    // thioong báo xóa dịch vụ thành công ( type = log)
    {
      "id": "LOG_RENTAL_001",
      "type": "log",
      "message": "Hoàn tất hợp đong thuê phòng thành công"
    },
    // thông báo cập nhật phòng thành công
    {
      "id": "LOG_ROOM_002",
      "type": "log",
      "message": "Cập nhật phòng thành công"
    },
    // thông báo thêm mới phòng thành công
    {
      "id": "LOG_ROOM_003",
      "type": "log",
      "message": "Thêm mới phòng thành công"
    },
    // waring cập nhật phòng thấy bại
    {
      "id": "WAR_ROOM_001",
      "type": "warring",
      "message": "Cập nhật phòng thất bại"
    },
    //-----------------end room-----------------

    //-----------------floor-----------------

    // lỗi trùng tên tầng
    {
      "id": "ERROR_FLOOR_001",
      "type": "error",
      "message": "Tên tầng đã tồn tại"
    },

    // thông báo thêm tầng thành công
    {
      "id": "LOG_FLOOR_001",
      "type": "log",
      "message": "Thêm tầng thành công"
    },
    // thông báo cập nhật tầng thành công
    {
      "id": "LOG_FLOOR_002",
      "type": "log",
      "message": "Cập nhật tầng thành công"
    },
    
    //-----------------end floor-----------------

    //-----------------equipment-----------------
    // lỗi tên trang thiết bị trong tầng này đã có
    {
      "id": "ERROR_EQUIPMENT_001",
      "type": "error",
      "message": "Tên trang thiết bị đã tồn tại ở tầng này"
    },
    // lỗi không được có khoảng trắng ở đầu hoặc cuối
    {
      "id": "ERROR_EQUIPMENT_002",
      "type": "error",
      "message": "Tên trang thiết bị không được có khoảng trắng ở đầu hoặc cuối"
    },
    // thông báo thêm mới dịch vụ thành công ( type = log)
    {
      "id": "LOG_EQUIPMENT_001",
      "type": "log",
      "message": "Thêm mới dịch vụ thành công"
    },
    // thông báo cập nhật dich vụ thành công ( type = log)
    {
      "id": "LOG_EQUIPMENT_002",
      "type": "log",
      "message": "Cập nhật dịch vụ thành công"
    },
    // thioong báo xóa dịch vụ thành công ( type = log)
    {
      "id": "LOG_EQUIPMENT_003",
      "type": "log",
      "message": "Xóa dịch vụ thành công"
    },
    // thông báo 
    //-----------------end equipment-----------------

    //-----------------service-----------------
    //lỗi dịch vụ đã tồn tại
    {
      "id": "ERROR_SERVICE_001",
      "type": "error",
      "message": "Tên dịch vụ đã tồn tại"
    },
    // log thông báo thêm mới dịch vụ thành công
    {
      "id": "LOG_SERVICE_001",
      "type": "log",
      "message": "Thêm mới dịch vụ thành công"
    },
    // log thông báo cập nhật dịch vụ thành công
    {
      "id": "LOG_SERVICE_002",
      "type": "log",
      "message": "Cập nhật dịch vụ thành công"
    },
    // log thông báo xóa dịch vụ thành công
    {
      "id": "LOG_SERVICE_003",
      "type": "log",
      "message": "Xóa dịch vụ thành công"
    },
    //-----------------end service-----------------

    //-----------------company-----------------
    // lỗi nhâp thiếu thông tin công ty
    {
      "id": "ERROR_COMPANY_002",
      "type": "error",
      "message": "Vui lòng nhập đầy đủ thông tin công ty"
    },
    // lỗi công ty đã tồn tại
    {
      "id": "ERROR_COMPANY_003",
      "type": "error",
      "message": "Tên công ty đã tồn tại"
    },
    // thông báo thêm mới công ty thành công
    {
      "id": "LOG_COMPANY_001",
      "type": "log",
      "message": "Thêm mới công ty thành công"
    },
    // thông báo cập nhật công ty thành công
    {
      "id": "LOG_COMPANY_002",
      "type": "log",
      "message": "Cập nhật công ty thành công"
    },
    // thông báo xóa công ty thành công
    {
      "id": "LOG_COMPANY_003",
      "type": "log",
      "message": "Xóa công ty thành công"
    },
    //---------------------end company-----------------

    //---------------------syntax-----------------
    // lỗi email đã tồn tại trên hệ thông
    {
      "id": "ERROR_EMAIL_001",
      "type": "error",
      "message": "Email đã tồn tại"
    },
    // Số điện thoại công ty đã tồn tại
    {
      "id": "ERROR_PHONE_001",
      "type": "error",
      "message": "Số điện thoại đã tồn tại"
    },
    // lỗi mã số thuế đã tồn tại
    {
      "id": "ERROR_TAX_001",
      "type": "error",
      "message": "Mã số thuế đã tồn tại"
    },
    // lỗi nhập input số tiền là số âm
    {
      "id": "ERROR_MONEY_001",
      "type": "error",
      "message": "Số tiền không được nhỏ hơn hoặc bằng 0"
    },
    // lỗi ngày hết hạn thuê trước ngày bắt đầu
    {
      "id": "ERROR_DATE_001",
      "type": "error",
      "message": "Ngày hết hạn thuê phải sau ngày bắt đầu thuê"
    },
    //lỗi ngày thuê nhỏ hơn 6 tháng 
    {
      "id": "ERROR_DATE_002",
      "type": "error",
      "message": "Ngày thuê phải lớn hơn 6 tháng"
    },

    // thời gia thuê dịch vụ phải trong thời gian của hợp đồng thuê phòng
    {
      "id": "ERROR_DATE_003",
      "type": "error",
      "message": "Thời gian thuê dịch vụ phải trong thời gian của hợp đồng thuê phòng"
    },
    //---------------------end syntax-----------------
    {
      "id": 11,
      "type": "warring",
      "message": "warring 1"
    },


    {
      "id": 30,
      "type": "log",
      "message": "log 10"
    },



  ]
  useEffect(() => {
    if (errorCode !== 0) {

      const error = errorList.find((error) => error.id == errorCode);
      const msglogAll = document.querySelector('.msg-log-all');
      msglogAll.style.backgroundColor = error.type === "log" ? "green" : (error.type === "error" ? "red" : "yellow");




      // console.log(error.type);

      msglogAll.textContent = error.message;
      msglogAll.classList.add('active');
      setTimeout(() => {
        msglogAll.classList.remove('active');
      }, 1200);
      setErrorCode(0);
    }
  }, [errorCode]);

  return (
    <NotifiContext.Provider value={{ errorCode, setErrorCode }}>
      {children}
    </NotifiContext.Provider>
  );
};
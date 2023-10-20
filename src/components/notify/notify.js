import { createContext, useContext, useState, useEffect } from 'react';

export const NotifiContext = createContext();

export const NotifiProvider = ({ children }) => {
  const [errorCode, setErrorCode] = useState(0);
  const errorList = [
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
// lỗi trùng tên phòng
    {
      "id": "ERROR_ROOM_001",
      "type": "error",
      "message": "Tên phòng đã tồn tại"
    },


    {
      "id": 10,
      "type": "error",
      "message": "Error 10"
    },


    {
      "id": 11,
      "type": "warring",
      "message": "warring 1"
    },

    {
      "id": 12,
      "type": "warring",
      "message": "warring 2"
    },

    {
      "id": 13,
      "type": "warring",
      "message": "warring 3"
    },
    {
      "id": 14,
      "type": "warring",
      "message": "warring 4"
    },
    {
      "id": 15,
      "type": "warring",
      "message": "warring 5"
    },
    {
      "id": 16,
      "type": "warring",
      "message": "warring 6"
    },
    {
      "id": 17,
      "type": "warring",
      "message": "warring 7"
    },
    {
      "id": 18,
      "type": "warring",
      "message": "warring 8"
    },
    {
      "id": 19,
      "type": "warring",
      "message": "warring 9"
    },
    {
      "id": 20,
      "type": "warring",
      "message": "warring 10"
    },
    {
      "id": 21,
      "type": "log",
      "message": "log 1"
    },

    {
      "id": 22,
      "type": "log",
      "message": "log 2"
    },

    {
      "id": 23,
      "type": "log",
      "message": "log 3"
    },
    {
      "id": 24,
      "type": "log",
      "message": "log 4"
    },
    {
      "id": 25,
      "type": "log",
      "message": "log 5"
    },
    {
      "id": 26,
      "type": "log",
      "message": "log 6"
    },
    {
      "id": 27,
      "type": "log",
      "message": "log 7"
    },
    {
      "id": 28,
      "type": "log",
      "message": "log 8"
    },
    {
      "id": 29,
      "type": "log",
      "message": "log 9"
    },
    {
      "id": 30,
      "type": "log",
      "message": "log 10"
    },

    // thông báo thuê thành công ( type = log)
    {
      "id": "LOG_CONTRACT_001",
      "type": "log",
      "message": "Thuê phòng thành công"
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



import { createContext, useContext, useState, useEffect } from 'react';

export const NotifiContext = createContext();

export const NotifiProvider = ({ children }) => {
  const [errorCode, setErrorCode] = useState(0);
  const errorList = [
    {
      "id": 1,
      "type": "error",
      "message": "Vui lòng nhập username"
    },
    {
      "id": 2,
      "type": "error",
      "message": "Vui lòng nhập mật khẩu"
    },

    {
      "id": 3,
      "type": "error",
      "message": "Mật khẩu tối thiểu 6 kí tự có chứ chữ hoa, chữ thường và kí tự số"
    },
    {
      "id": 4,
      "type": "error",
      "message": "Tài khoản hoặc mật khẩu không chính xác"
    },
    {
      "id": 5,
      "type": "error",
      "message": "Error 5"
    },
    {
      "id": 6,
      "type": "error",
      "message": "Error 6"
    },
    {
      "id": 7,
      "type": "error",
      "message": "Error 7"
    },
    {
      "id": 8,
      "type": "error",
      "message": "Error 8"
    },
    {
      "id": 9,
      "type": "error",
      "message": "Error 9"
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



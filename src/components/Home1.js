import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/home1.css';
import img1 from '../assets/img/1.png'

import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';

const Home1 = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const userId = useSelector(state=> state.login)

  useEffect(() => {
    return () => {
      console.log(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])







  return (
    


    <div className="container">
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='view'>
          <div className='home1_left'>
            <div className='left_info'>
              <div className='name'>HỆ THỐNG QUẢN LÝ TÒA NHÀ VĂN PHÒNG</div>
              <div className='desc'>Giúp tối ưu hóa quá trình trong việc quản lý</div>
            </div>
            {/* <div className='left_search'>
              <div>Chọn thành phố bạn muốn đến</div>
              <form action="javascript:" class="search-bar" style={{}}>
                <input value={address} onChange={(e) => { searchBarChange(e) }} type="search" name="search" pattern=".*\S.*" required />
                  <button onClick={handleButtonClick} class="search-btn" type="submit">
                    <span>Search</span>
                  </button>
              </form>
            </div> */}
          </div>
          <div className='home1_right'>
          
          </div>
        </div>

      </div>

      {/* service-management */}

    </div>

)
    
  
}

export default Home1;

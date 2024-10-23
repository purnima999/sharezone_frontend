import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, PopoverBody, UncontrolledPopover } from 'reactstrap';
import { AxiosInstance } from '../../_mock/utilities';
import femaleuserImg from "../../images/femaleuserImg.jpg";
import noNotifications from '../../images/noNotifications.svg';
import maleuserImg from '../../images/userprofile.jpg';
import { setIsAuthUserRequest } from '../../store/Register/slice';

export default function Topbar(props) {
  const [menu, setMenu] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getProfileDetails, setGetProfileDetails] = useState([]);
  const [isOpenModel, setOpenModel] = useState(false);

  const handleLogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(setIsAuthUserRequest(false))
    navigate('/signin')
  }

  const menuData = [
    {
      moduleId: "2",
      name: "Home",
      link: "home",
      icon: "icon_alfred_home",
      subModules: [
        { id: "1", name: "Home", link: "home", icon: "icon_alfred_home" },
      ],
    },
  ]
  const lPathName = useLocation().pathname;
  const sideMenu = menuData.find(s => '/' + s.link === lPathName?.replace('/*', '') || s.subModules.findIndex(y => '/' + y.link === lPathName?.replace('/*', '')) !== -1);
  const sideSubMenu = sideMenu?.subModules?.find(y => ('/' + y.link === lPathName?.replace('/*', '')))
  const handleCloseAndOpen = () => {
    setOpenModel(!isOpenModel)
  }

  return (
    <>
      <header className='al_top_navigation al-pad'>
        <div className='al_top_left w-100'>
          <div>
            <i className='icon_alfred_wmainmenu' onClick={() => props.setIsShowmenu(!props.isShowmenu)}></i>
          </div>
          <div className='d-flex'>
            <div className='position-relative mx-4'>
              <button type="button" id="notificationpopover"><i className='icon_alfred_notification pointer' onClick={() => handleCloseAndOpen()}></i></button>
              <div className="badge badge-pill badge-danger al_noti-icon-badge">0</div>
              <UncontrolledPopover
                placement="top"
                target="notificationpopover"
                trigger="legacy"
                className='alnotification_panel'
                isOpen={isOpenModel}
                modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
              >
                <PopoverBody className='d-flex flex-column'>
                  <div className='flex-grow-1 h-100 p-2 d-flex flex-column h-100'>
                    <div className='d-flex align-items-center justify-content-between'>
                      <h6 className='mb-0'>Notifications</h6>
                      <i className="icon_alfred_close pointer" title="Close" onClick={() => handleCloseAndOpen()}></i>
                    </div>
                    <div className='text-center mt-3 d-flex flex-column align-items-center justify-content-center flex-grow-1'>
                      <img src={noNotifications} alt="" width={60} />
                      <div className='mt-3'>Clear notifications, just like a steady pulse—nothing new!</div>
                    </div>
                  </div>
                </PopoverBody>
              </UncontrolledPopover>
            </div>

            <div className="d-flex ms-4">
              <div className="pointer">
                <Dropdown isOpen={menu} toggle={() => setMenu(menu => !menu)}>
                  <DropdownToggle className="nav-link" tag="a">
                    <div className="al_progresscontainer">
                      {/* <img src={profilePicture} alt="user" className='al_useravatar al_avatar' /> */}
                      <div className='al_progressbar'>
                        <CircularProgressbar
                          value={getProfileDetails?.profile_percentage >= 0 ? getProfileDetails?.profile_percentage : 0}
                          styles={buildStyles({
                            strokeLinecap: 'round',
                            trailColor: '#dddddd',
                            backgroundColor: '#3bc0c3',
                          })}
                        />
                      </div>
                    </div>

                    {/* <img src={user} alt="user" className='al_useravatar al_avatar' /> */}
                    <div className='d-flex flex-column ms-2 text-capitalize'>
                      <span className='al_uName'>{getProfileDetails?.username ||""}</span>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu className="al_menu-card">
                    {/* <DropdownItem tag="div" onClick={() => handleProfile()} >Profile</DropdownItem> */}
                    <DropdownItem tag="div" onClick={() => handleLogOut()}>Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </header >
      {sideMenu && <div className='al_submenu_content'>
        <div className='al_menu_name'>{sideMenu.name}<><span><i className='icon_alfred_right_arrow'></i></span><span className='al_header_bc'>{sideSubMenu.name}</span></></div>
      </div>
      }
    </>
  )
}
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, PopoverBody, UncontrolledPopover } from 'reactstrap';
import { AxiosInstance } from '../../_mock/utilities';
import femaleuserImg from "../../images/femaleuserImg.jpg";
import noNotifications from '../../images/noNotifications.svg';
import maleuserImg from '../../images/userprofile.jpg';
import { useDispatch } from 'react-redux';

export default function Topbar(props) {
  const [menu, setMenu] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getProfileDetails, setGetProfileDetails] = useState([]);
  const [isOpenModel, setOpenModel] = useState(false);

  const profileDetails = async () => {
    await AxiosInstance("application/json")
      .get("/userdetails")
      .then((res) => {
        const responseData = res.data?.data;
        setGetProfileDetails(responseData);
      })
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    profileDetails(); //Suspense loading with actual component
    // setOpenModel(false);
  }, []);

  const handleProfile = () => {
    navigate('profile')
  }
  const handleLogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    // dispatch(logoutSlice())
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
    {
      moduleId: "3",
      name: "Behavioural",
      link: "chat",
      icon: "icon_alfred_bot",
      subModules: [
        {
          id: "1",
          name: "Behavioural Chat",
          link: "chat",
          icon: "icon_alfred_bot",
        },
      ],
    },
    {
      moduleId: "4",
      name: "Bot Manager",
      link: "historychat",
      icon: "icon_alfred_botquestionnaire",
      subModules: [
        {
          id: "2",
          name: "History Bot",
          link: "historychat",
          icon: "icon_alfred_botquestionnaire",
        },
        {
          id: "3",
          name: "Upload Document",
          link: "uploaddocument",
          icon: "icon_alfred_uploaddocument",
        }
      ],
    },
    {
      moduleId: "5",
      name: "Reports",
      link: "transcriptsummary",
      icon: "icon_alfred_reports",
      subModules: [
        {
          id: "1",
          name: "History Transcript Summary",
          link: "transcriptsummary",
          icon: "icon_alfred_reports",
        },
      ],
    },
    {
      moduleId: '6',
      name: 'User Management',
      link: 'roles',
      icon: 'icon_alfred_roles',
      subModules: [
        { id: "1", name: "Role Management", link: 'roles', icon: 'icon_alfred_roles' },
        { id: "2", name: "Users", link: 'users', icon: 'icon_alfred_menu_client_user' },
        { id: "3", name: "List of Patients", link: 'patientslist', icon: 'icon_alfred_patientslist' },
        { id: "4", name: "Your Doctors", link: 'doctorslist', icon: 'icon_alfred_doctors' },
        { id: "5", name: "Approve Users", link: 'approveusers', icon: 'icon_alfred_approveusers' }
      ]
    },
  ]
  const lPathName = useLocation().pathname;
  const sideMenu = menuData.find(s => '/' + s.link === lPathName?.replace('/*', '') || s.subModules.findIndex(y => '/' + y.link === lPathName?.replace('/*', '')) !== -1);
  const sideSubMenu = sideMenu?.subModules?.find(y => ('/' + y.link === lPathName?.replace('/*', '')))
  const handleCloseAndOpen = () => {
    setOpenModel(!isOpenModel)
  }

  const profilePicture = ((getProfileDetails?.profile_url === "NA") ? (getProfileDetails?.gender?.toLowerCase() === "female" ? femaleuserImg : maleuserImg) : getProfileDetails?.profile_url);

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

                    {/* <div className='al_nudegeitem'>
                      <div>Dr. George has accepted your request to be as your primary doctor</div>
                      <div>Dr. George has been removed as a primary doctor for you. Please choose your primary doctor from <Link to="/doctorslist" className='text-decoration-underline'>Your Doctors</Link> page</div>
                      <div>
                        <Row className='align-items-center'>
                          <Col>John smith wants you to be his primary doctor.</Col>
                          <div className='w-auto'>
                            <button type="button" className='al_button_sm al_savebtn me-2'>Accept</button>
                            <button type="button" className='al_button_sm al_cancelbgbutton'>Reject</button>
                          </div>
                        </Row>
                      </div>
                    </div> */}
                  </div>
                </PopoverBody>
              </UncontrolledPopover>
            </div>

            <div className="d-flex ms-4">
              <div className="pointer">
                <Dropdown isOpen={menu} toggle={() => setMenu(menu => !menu)}>
                  <DropdownToggle className="nav-link" tag="a">
                    <div className="al_progresscontainer">
                      <img src={profilePicture} alt="user" className='al_useravatar al_avatar' />
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
                      <div className='al_profilepercent'>{`${getProfileDetails?.profile_percentage >= 0 ? getProfileDetails?.profile_percentage : 0}%`}</div>
                    </div>

                    {/* <img src={user} alt="user" className='al_useravatar al_avatar' /> */}
                    <div className='d-flex flex-column ms-2 text-capitalize'>
                      <span className='al_uName'>{getProfileDetails?.username}</span>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu className="al_menu-card">
                    <DropdownItem tag="div" onClick={() => handleProfile()} >Profile</DropdownItem>
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
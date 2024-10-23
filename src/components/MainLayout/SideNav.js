import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SideNav(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuData = [
    {
      moduleId: '1',
      name: 'Dashboard',
      link: 'dashboard',
      icon: 'icon_alfred_dashboard',
      subModules: [
        { id: "1", name: "Dashboard", link: 'dashboard', icon: 'icon_alfred_dashboard' }
      ]
    },
    {
      moduleId: "2",
      name: "Share Zone",
      link: "sharezone",
      icon: "icon_alfred_home",
      subModules: [
        { id: "1", name: "Share Zone", link: "sharezone", icon: "icon_alfred_home" },
      ],
    },
  ];

  useEffect(() => { }, [props.isShowmenu]);

  const handleMenuClick = async (link) => {
    navigate(link)
  };


  return (
    <>
      <nav
        className={
          "al_menu_navigator " + (props.isShowmenu ? "al_slide_out " : "")
        }
      >
        <>
          <i
            className="icon_alfred_close al_menuClose"
            onClick={() => props.setIsShowmenu(!props.isShowmenu)}
          ></i>

          <div className="al_logo_container">
            <div style={{ color: "#ffff", fontSize: "25px", fontWeight: 600 }}>S<span style={{ color: "#04C1D6" }}>Z</span></div>
          </div>
          <div className="al_menus">
            <div className="navbar">
              {menuData.map((menu, index) => {
                return (
                  <React.Fragment key={index}>
                    {menu.subModules.length > 0 && (
                      <>
                        {menu.subModules.map((subModules, index) => (
                          <div className="al_submenu w-100" key={index}>
                            <div
                              className={
                                "menu-item " +
                                (location.pathname === "/" + subModules.link
                                  ? "active"
                                  : "")
                              }
                            >
                              <div
                                id={subModules.link + subModules.id}
                                onClick={() => handleMenuClick(subModules.link)}
                              >
                                <i className={subModules.icon}></i>
                                <span>{subModules.name}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </>
      </nav>
    </>
  );
}

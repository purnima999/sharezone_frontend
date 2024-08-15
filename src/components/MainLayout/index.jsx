import React, { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ConfirmationAction from './ConfirmationAction';
import Loading from './Loading';
import SideNav from './SideNav';
import Topbar from './Topbar';
import chatBot from '../../images/chatboticon.svg';
import { Button, Popover, PopoverBody } from 'reactstrap';

export default function MainLayout() {
    const [botisOpen, setBotIsOpen] = useState(true);
    const [isShowmenu, setIsShowmenu] = useState(true);
    const [popOverClose, setPopOverClose] = useState(true);

    useEffect(() => {
        setBotIsOpen(false);
    }, []);
    return <React.Fragment>
        <div className='al_site_container'>
            <Suspense fallback={<Loading />}>
                <ConfirmationAction />
                <div className='wflexLayout flex-row position-relative'>
                    <SideNav isShowmenu={isShowmenu} setIsShowmenu={setIsShowmenu} />
                    <div className='al_right_container'>
                        <Topbar isShowmenu={isShowmenu} setIsShowmenu={setIsShowmenu} />
                        <main className='al_main_container'>
                            <Outlet />
                        </main>
                    </div>
                    {botisOpen && <chatBot botisOpen={botisOpen} setBotIsOpen={setBotIsOpen} />}
                </div>
            </Suspense>
        </div>
        <Button id="homechatpopover" type="button" className='p-0 al_chat'>
            {!botisOpen &&
                <img src={chatBot} alt="bot" id="homechatpopover" onClick={() => setBotIsOpen(!botisOpen)} />
            }
        </Button>
        {!botisOpen && popOverClose &&
            <Popover
                placement="left"
                target="homechatpopover"
                trigger="legacy"
                className='al_popverchat'
                isOpen={!botisOpen}
                modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
            >
                <PopoverBody>
                    Hello, I am shazreZoneAi! How can I assist you today?
                    <i className='icon_alfred_closecircle' onClick={() => setPopOverClose(false)}></i>
                </PopoverBody>
            </Popover>
        }
        <Loading />
    </React.Fragment >
}

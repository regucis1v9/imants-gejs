import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleAd, faGear, faCalendar, faList, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import ChangePromoted from "../components/ChangePromoted";
import CreateEvent from "../components/CreateEvent";
import ManageAccount from "../components/ManageAccount";
import ManageEvents from "../components/ManageEvents"
import ManageUsers from "../components/ManageUsers";
import PurchaseHistory from "../components/PurchaseHistory";
import Cookies from 'js-cookie';

const Profile = () => {
    let username = Cookies.get('role');
    console.log(username);
    const [activeButton, setActiveButton] = useState('CHANGE PROMOTED EVENT'); // Set the default active button
    const [activeComponent, setActiveComponent] = useState(<ChangePromoted />); // Set the default active component

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);

        // Determine the appropriate component based on the button press
        switch (buttonName) {
            case 'CHANGE PROMOTED EVENT':
                setActiveComponent(<ChangePromoted />);
                break;
            case 'MANAGE ACCOUNT':
                setActiveComponent(<ManageAccount />);
                break;
            case 'CREATE EVENT':
                setActiveComponent(<CreateEvent />);
                break;
            case 'MANAGE EVENTS':
                setActiveComponent(<ManageEvents />);
                break;
            case 'MANAGE USERS':
                setActiveComponent(<ManageUsers />);
                break;
            case 'PURCHASE HISTORY':
                setActiveComponent(<PurchaseHistory />);
                break;
            default:
                setActiveComponent(null); // Set a default component or handle accordingly
        }
    };

    return (
        <div className="account-main">
            <div className="sidebar-box"></div>
            <div className="sidebar">
                <div className="sidebar-logo-container">ADMIN DASHBOARD</div>

                <div className="button-wrapper">
                    <FontAwesomeIcon icon={faRectangleAd} className="button-icon" />
                    <div className={`active-background ${activeButton === 'CHANGE PROMOTED EVENT' ? 'width100' : ''}`}></div>
                    <button
                        type='button'
                        className={`sidebar-section ${activeButton === 'CHANGE PROMOTED EVENT' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('CHANGE PROMOTED EVENT')}
                    >
                        PROMOTED EVENT
                    </button>
                </div>
                <div className="button-wrapper">
                    <FontAwesomeIcon icon={faGear} className="button-icon" />
                    <div className={`active-background ${activeButton === 'MANAGE ACCOUNT' ? 'width100' : ''}`}></div>
                    <button
                        type='button'
                        className={`sidebar-section ${activeButton === 'MANAGE ACCOUNT' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('MANAGE ACCOUNT')}
                    >
                        MANAGE ACCOUNT
                    </button>
                </div>
                <div className="button-wrapper">
                    <FontAwesomeIcon icon={faCalendar} className="button-icon" />
                    <div className={`active-background ${activeButton === 'CREATE EVENT' ? 'width100' : ''}`}></div>
                    <button
                        type='button'
                        className={`sidebar-section ${activeButton === 'CREATE EVENT' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('CREATE EVENT')}
                    >
                        CREATE EVENT
                    </button>
                </div>
                <div className="button-wrapper">
                    <FontAwesomeIcon icon={faList} className="button-icon" />
                    <div className={`active-background ${activeButton === 'MANAGE EVENTS' ? 'width100' : ''}`}></div>
                    <button
                        type='button'
                        className={`sidebar-section ${activeButton === 'MANAGE EVENTS' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('MANAGE EVENTS')}
                    >
                        MANAGE EVENTS
                    </button>
                </div>
                <div className="button-wrapper">
                    <FontAwesomeIcon icon={faUser} className="button-icon" />
                    <div className={`active-background ${activeButton === 'MANAGE USERS' ? 'width100' : ''}`}></div>
                    <button
                        type='button'
                        className={`sidebar-section ${activeButton === 'MANAGE USERS' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('MANAGE USERS')}
                    >
                        MANAGE USERS
                    </button>
                </div>
                <div className="button-wrapper">
                    <FontAwesomeIcon icon={faCartShopping} className="button-icon" />
                    <div className={`active-background ${activeButton === 'PURCHASE HISTORY' ? 'width100' : ''}`}></div>
                    <button
                        type='button'
                        className={`sidebar-section ${activeButton === 'PURCHASE HISTORY' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('PURCHASE HISTORY')}
                    >
                        PURCHASE HISTORY
                    </button>
                </div>
            </div>

            <div className="component-container">
                {activeComponent}
            </div>
        </div>
    );
}

export default Profile;

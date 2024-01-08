import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcon from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as Io5Icons from 'react-icons/io5';
import './MyAccount.css';

const myAccountIcons = new Map<string, React.ReactElement>();
myAccountIcons.set('my profile', <FaIcons.FaRegUserCircle />);
myAccountIcons.set('super coin zone', <BsIcon.BsCoin />);
myAccountIcons.set('orders', <RiIcons.RiFileUploadFill />);
myAccountIcons.set('wishlist', <FaIcons.FaHeart />);
myAccountIcons.set('coupons', <RiIcons.RiCouponFill />);
myAccountIcons.set('git cards', <MdIcons.MdAccountBalanceWallet />);
myAccountIcons.set('notification', <Io5Icons.IoNotifications />);

const myAccountTitle: string[] = [];

for (let key of myAccountIcons.keys()) {
    myAccountTitle.push(key);
}
type MyAccountProps = {
    accountCompOpen?: boolean;
    handleToOpenMyAccount: () => void;
    handleToCloseMyAccount: () => void;
};

const MyAccount = (props: MyAccountProps): JSX.Element => {
    return (
        <section
            className={`myaccount_wrapper `}
            onMouseOver={() => props.handleToOpenMyAccount()}
            onMouseOut={() => props.handleToCloseMyAccount()}
        >
            <ul className="myaccount_list relative pt-2">
                <div className="triangle_icon"></div>
                {myAccountTitle.map((account) => {
                    return (
                        <li className="myaccount" key={account}>
                            {myAccountIcons.get(account)}
                            <span className="text-[0.9rem] font-[400] capitalize">
                                {account}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default MyAccount;

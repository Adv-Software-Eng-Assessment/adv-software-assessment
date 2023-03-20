import React, { useState } from 'react';
import Withdraw from "./Withdraw"
import Deposit from "./Deposit"
import Transfer from "./Transfer"

const Tabs = () => {

    const [currentTab, setCurrentTab] = useState('1');
    const tabs = [
        {
            id: 1,
            tabTitle: 'Account Details',
            title: 'Account Details',
            
            content: 
                <div className='AccountName'>
                    <p>Name: Miss Name Surname</p>
                    <span>Account Number: 70-00-77 11002233</span>
                    <hr />
                    <div className='Transaction'>
                        <h2>Your Transaction Details</h2>
                        <hr />
                        <div className='date'>
                            
                            <p>Date</p>
                            <p>Details</p>
                            <p>Withdrawals</p>
                            <p>Deposits</p>
                            <p>Transfer</p>
                            <p>Balance</p>
                        </div>
                        <hr />
                        <div className='Tdetails'>
                            <p>03-03-2023</p>
                            <p>Opening Balance</p>
                            <p>x</p>
                            <p>x</p>
                            <p>x</p>
                            <p>1,500.00</p>
                            
                        </div>
                      
                        
                        
                    </div>
                    
                </div>
                
        },
        {
            id: 2,
            tabTitle: 'Withdraw',
            title: 'Cash Withdraw',
            content: 
            <div className='Withdraw'>
                
                <Withdraw/>
            </div>
        },
        {
            id: 3,
            tabTitle: 'Deopsit',
            title: 'Deposit',
            content: <div className='Deposit'>
                
            <Deposit/>
        </div>
        },
        {
            id: 4,
            tabTitle: 'Transfer Money',
            title: 'Transfer Money',
            content: <div className='Transfer'>
                
            <Transfer/>
        </div>
        }
    ];

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

    return (
        <div className='container'>
            <div className='tabs'>
                {tabs.map((tab, i) =>
                    <button key={i} id={tab.id} disabled={currentTab === `${tab.id}`} onClick={(handleTabClick)}>{tab.tabTitle}</button>
                )}
            </div>
            <div className='content'>
                {tabs.map((tab, i) =>
                    <div key={i}>
                        {currentTab === `${tab.id}` && <div><p className='title'>{tab.title}</p><p>{tab.content}</p></div>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tabs;

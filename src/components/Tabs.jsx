import React, { useState } from 'react';
import axios from 'axios';
import { formatAmount } from '../utilities/utils';

const Tabs = () => {
  const [customer, setCustomer] = useState();
  const [account, setAccount] = useState();

  const customerId = localStorage.getItem('id');

  async function getUser() {
    try {
      const response = await axios.get('/customers/' + customerId);
      const acctResponse = await axios.get('account/cust/' + customerId);

      if (response.data) {
        setCustomer(response.data);
      }

      if (response.data) {
        setAccount(acctResponse.data);
      }

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getUser();
  }, []);

  const [currentTab, setCurrentTab] = useState('1');
  const tabs = [
    {
      id: 1,
      tabTitle: 'Account Details',
      title: 'Account Details',
      content: (
        <div className="AccountName">
          <b>
            Name: {customer ? customer.firstName : ''}{' '}
            {customer ? customer.lastName : ''}
          </b>
          <br />
          <b>Account Number: {account && account.accountNo}</b>

          <br />
          <br />

          <p>Your account balance: </p>
          <p style={{
            fontSize: '40px'
          }}>{account && formatAmount(account.totalBalance)}</p>

          <hr />
          <div className="Transaction">
            <h2>Your Transaction Details</h2>
            <hr />
            <div className="date">
              <p>Date</p>
              <p>Details</p>
              <p>Withdrawals</p>
              <p>Deposits</p>
              <p>Transfer</p>
              <p>Balance</p>
            </div>
            <hr />
            <div className="Tdetails">
              <p>03-03-2023</p>
              <p>Opening Balance</p>
              <p>x</p>
              <p>x</p>
              <p>x</p>
              <p>1,500.00</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      tabTitle: 'Withdraw',
      title: 'Title 2',
      content: 'Contenido de tab 2.'
    },
    {
      id: 3,
      tabTitle: 'Deopsit',
      title: 'Title 3',
      content: 'Contenido de tab 3.'
    },
    {
      id: 4,
      tabTitle: 'Transfer Money',
      title: 'Title 4',
      content: 'Contenido de tab 4.'
    }
  ];

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  return (
    <div className="container">
      <div className="tabs">
        {tabs.map((tab, i) => (
          <button
            key={i}
            id={tab.id}
            disabled={currentTab === `${tab.id}`}
            onClick={handleTabClick}>
            {tab.tabTitle}
          </button>
        ))}
      </div>
      <div className="content">
        {tabs.map((tab, i) => (
          <div key={i}>
            {currentTab === `${tab.id}` && (
              <div>
                <p className="title">{tab.title}</p>
                <p>{tab.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

import React, { useState } from 'react';
import Withdraw from './Withdraw';
import Deposit from './Deposit';
import Transfer from './Transfer';
import axios from 'axios';
import { formatAmount } from '../utilities/utils';
import { toast } from 'react-toastify';
import LoadingOverlay from './common/LoadingOverlay';

const Tabs = () => {
  const [customer, setCustomer] = useState();
  const [account, setAccount] = useState();
  const [transactions, setTransactions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const customerId = localStorage.getItem('id');

  async function getUser() {
    try {
      const response = await axios.get('/customers/' + customerId);

      if (response.data) {
        setCustomer(response.data);
      }
    } catch (error) {
      toast('An unexpected error occured: ' + error.message);
    }
  }

  const getAccount = async () => {
    setIsLoading(true);
    try {
      const acctResponse = await axios.get('/account/cust/' + customerId);
      setIsLoading(false);

      if (acctResponse.data) {
        setAccount(acctResponse.data);
      }
    } catch (error) {
      toast('An unexpected error occured: ' + error.message);
      setIsLoading(false);
    }
  };

  const getTransactions = async () => {
    try {
      const transactionsResponse = await axios.get(
        'account/transactions/' + customerId
      );

      if (transactionsResponse.data) {
        setTransactions(transactionsResponse.data);
      }
    } catch (error) {
      toast('An unexpected error occured: ' + error.message);
    }
  };

  React.useEffect(() => {
    getUser();
    getAccount();
    getTransactions();
  }, []);

  const [currentTab, setCurrentTab] = useState('1');
  const tabs = [
    {
      id: 1,
      tabTitle: 'Account Details',
      title: 'Account Details',
      content: (
        <div className="AccountName">
          <div className="d-flex justify-content-between">
            <div className="w-50">
              <b>
                Name: {customer ? customer.firstName : ''}{' '}
                {customer ? customer.lastName : ''}
              </b>
              <br />
              <b>Account Number: {account && account.accountNo}</b>
              <br />
            </div>
            <div className="w-50">
              <b>Sort Code: {account && account.sortCode}</b>
              <br />
              <b
                style={{
                  textTransform: 'capitalize'
                }}>
                Account Type: {account && account.accountType}
              </b>
            </div>
          </div>

          <br />
          <br />

          <p>Your account balance: </p>
          <p
            style={{
              fontSize: '40px'
            }}>
            {account && formatAmount(account.totalBalance)}
          </p>

          <hr />
          <div className="Transaction">
            <h2>Your Transaction Details</h2>
            <hr />
            <table id="customers">
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance </th>
              </tr>
              {transactions.map((transaction) => (
                <tr>
                  <p>
                    {new Date(transaction.created).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <td>{transaction.transactionType}</td>
                  <td>{formatAmount(transaction.amount)}</td>
                  <td>{formatAmount(transaction.totalBalance)}</td>
                </tr>
              ))}
            </table>
            {/* <div className="date">
              <p>Date</p>
              <p>Type</p>
              <p>Withdrawals</p>
              <p>Deposits</p>
              <p>Transfer</p>
              <p>Balance</p>
            </div> */}
            <hr />
          </div>
        </div>
      )
    },
    {
      id: 2,
      tabTitle: 'Withdraw',
      title: 'Cash Withdraw',
      content: (
        <div className="Withdraw">
          <Withdraw
            accoutBalance={account ? account.totalBalance : 0}
            onSuccess={() => {
              getAccount();
              getTransactions();
            }}
          />
        </div>
      )
    },
    {
      id: 3,
      tabTitle: 'Deposit',
      title: 'Deposit',
      content: (
        <div className="Deposit">
          <Deposit
            accoutBalance={account ? account.totalBalance : 0}
            onSuccess={() => {
              getAccount();
              getTransactions();
            }}
          />
        </div>
      )
    },
    {
      id: 4,
      tabTitle: 'Transfer Money',
      title: 'Transfer Money',
      content: (
        <div className="Transfer">
          <Transfer
            accoutBalance={account ? account.totalBalance : 0}
            onSuccess={() => {
              getAccount();
              getTransactions();
            }}
          />
        </div>
      )
    }
  ];

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  return (
    <div className="container">
      {isLoading && <LoadingOverlay />}

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

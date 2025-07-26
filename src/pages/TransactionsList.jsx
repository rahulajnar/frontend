import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionsList() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/transactions')
            .then(res => setTransactions(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Transactions</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Source Account</th>
                        <th>Destination Account</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tx => (
                        <tr key={tx.transaction_id}>
                            <td>{tx.transaction_id}</td>
                            <td>{tx.amount}</td>
                            <td>{tx.status}</td>
                            <td>{tx.source_account_id}</td>
                            <td>{tx.destination_account_id}</td>
                            <td>{tx.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionsList;

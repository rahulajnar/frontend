import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LoansList() {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/loans')
            .then(res => setLoans(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Loans</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Loan ID</th>
                        <th>Customer ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Issued On</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map(loan => (
                        <tr key={loan.loan_id}>
                            <td>{loan.loan_id}</td>
                            <td>{loan.customer_id}</td>
                            <td>{loan.amount}</td>
                            <td>{loan.status}</td>
                            <td>{loan.issued_on}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LoansList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BranchesList() {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/branches')
            .then(res => setBranches(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Branches</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Branch ID</th>
                        <th>Branch Name</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {branches.map(branch => (
                        <tr key={branch.branch_id}>
                            <td>{branch.branch_id}</td>
                            <td>{branch.branch_name}</td>
                            <td>{branch.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BranchesList;

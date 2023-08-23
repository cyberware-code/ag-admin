import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TableDropdown({ onTableChange }) {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get('http://localhost:3000/tables'); // Replace with your actual API endpoint
                setTables(response.data.tables);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };

        fetchTables();
    }, []);

    const handleTableChange = (event) => {
        const table = event.target.value;
        setSelectedTable(table);
        onTableChange(table); // Notify the parent component of the selected table
    };

    return (
        <div>
            <select value={selectedTable} onChange={handleTableChange}>
                <option value="">Choose..</option>
                {tables.map((table) => (
                    <option key={table} value={table}>
                        {table}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TableDropdown;

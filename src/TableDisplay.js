import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Button } from 'antd';

// Define the RecordView component
function RecordView({ record, onBack }) {
    return (
        <div>
            <h2>Record Details</h2>
            {/* Render record fields here */}
            <pre>{JSON.stringify(record, null, 2)}</pre>
            <Button type="primary" onClick={onBack}>
                Back
            </Button>
        </div>
    );
}

function TableDisplay({ selectedTable }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 15,
        total: 0,
    });
    const [searchValue, setSearchValue] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null); // State for selected record

    // Define the fetchData function at this scope
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/${selectedTable}`, {
                params: {
                    page: pagination.current,
                    pageSize: pagination.pageSize,
                    field: 'name', // Replace with the field you want to search
                    value: searchValue,
                },
            });

            const { records, total } = response.data;

            setData(records || []);
            setPagination((prevPagination) => ({
                ...prevPagination,
                total,
            }));
        } catch (error) {
            console.error(`Error fetching data for table ${selectedTable}:`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        // Define the handleSearch function here
        setPagination((prevPagination) => ({ ...prevPagination, current: 1 })); // Reset to the first page
        fetchData(); // Fetch data with the updated search value
    };

    const handleTableChange = (pagination) => {
        // Define the handleTableChange function here
        setPagination(pagination);
    };

    useEffect(() => {
        // Call the fetchData function here to fetch data initially
        if (selectedTable) {
            fetchData();
        } else {
            setData([]);
        }
    }, [selectedTable, pagination.current, pagination.pageSize, searchValue]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            // Add a custom render function to handle row click
            render: (text, record) => (
                <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(record)}
                >
          {text}
        </span>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // Add a custom render function to handle row click
            render: (text, record) => (
                <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(record)}
                >
          {text}
        </span>
            ),
        },
        // Add more columns as needed
    ];

    const handleRowClick = (record) => {
        // Set the selected record when a row is clicked
        setSelectedRecord(record);
    };

    const handleBack = () => {
        // Clear the selected record to return to the table view
        setSelectedRecord(null);
    };

    return (
        <div>
            {selectedRecord ? (
                <RecordView record={selectedRecord} onBack={handleBack} />
            ) : (
                <>
                    <h2>Data from {selectedTable}</h2>
                    <Input
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        style={{ marginRight: '10px' }}
                    />
                    <Table
                        dataSource={data}
                        columns={columns}
                        loading={loading}
                        pagination={pagination}
                        onChange={handleTableChange}
                    />
                </>
            )}
        </div>
    );
}

export default TableDisplay;

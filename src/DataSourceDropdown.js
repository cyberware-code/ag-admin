import React, { useState } from 'react';
import { Select } from 'antd';
import TableDisplay from './TableDisplay';

const { Option } = Select;

function DataSourceSelector() {
    const [selectedDataSource, setSelectedDataSource] = useState('');

    const handleDataSourceChange = (value) => {
        setSelectedDataSource(value);
    };

    return (
        <div>
            <Select
                placeholder="Select Data Source"
                style={{ width: 200 }}
            >
                <Option value="datasource1">Cybewrare</Option>
                <Option value="datasource2" disabled>Deskpro</Option>
                <Option value="datasource2" disabled>SagePay</Option>
                <Option value="datasource2" disabled>HubSpot</Option>
                <Option value="datasource2" disabled>Gmail</Option>
                {/* Add more data sources as needed */}
            </Select>
        </div>
    );
}

export default DataSourceSelector;

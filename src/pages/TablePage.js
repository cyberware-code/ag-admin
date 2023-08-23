import React, { useState } from 'react';
import DisplayDropdown from '../TableDropdown';
import DisplayTable from '../TableDisplay';

function PageComponent() {
    const [selectedTable, setSelectedTable] = useState('');

    return (
        <div>
            <h1>Table Selector</h1>
            <DisplayDropdown onTableChange={setSelectedTable} />
            {selectedTable && <DisplayTable selectedTable={selectedTable} />}
        </div>
    );
}

export default PageComponent;

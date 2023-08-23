import React, { useState } from 'react';
import TableDropdown from './TableDropdown';
import TableDisplay from './TableDisplay';
import DataSourceDropdown from './DataSourceDropdown';

function App() {
    const [selectedTable, setSelectedTable] = useState('');

    const handleTableChange = (table) => {
        setSelectedTable(table);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-1/4 bg-gray-200 p-4">
                <h1 className="text-xl font-bold mb-4">API Source</h1>
                <DataSourceDropdown/>
                <h1 className="text-xl font-bold mb-4 mt-4">Endpoint</h1>
                <TableDropdown onTableChange={handleTableChange} />
            </aside>

            {/* Content Pane */}
            <main className="w-3/4 p-4">
                {selectedTable && <TableDisplay selectedTable={selectedTable} />}
            </main>
        </div>
    );
}

export default App;

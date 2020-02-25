import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import PivotTable from './PivotTable';

function App() {
  return (
    <div className="App">
      <PivotTable apiPath="http://172.29.128.2/api/taxes-aggregated" />
    </div>
  );
}

export default App;

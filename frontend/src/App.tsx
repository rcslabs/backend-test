import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import PivotTable from './PivotTable';

function App() {
  return (
    <div className="App">
      <PivotTable apiPath="http://localhost:3000/api/taxes-aggregated" />
    </div>
  );
}

export default App;

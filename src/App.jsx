import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};
export default App;
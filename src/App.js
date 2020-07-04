import React from 'react';

import './App.css';
import Forecast from "./Forecast";

function App() {
  return (
    <div className="weather-wrapper">
        <main>
          <Forecast />
        </main>

        <footer>
            Page created by Justyna
        </footer>
    </div>
  );
}

export default App;

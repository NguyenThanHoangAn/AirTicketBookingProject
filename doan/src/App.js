import React from 'react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Homepage from '../src/components/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const App = () => {
  return (
    <div>
      <Header />

      <Homepage />
      {/* Other content of your app */}
      <Footer />
    </div>
  );
};

export default App;

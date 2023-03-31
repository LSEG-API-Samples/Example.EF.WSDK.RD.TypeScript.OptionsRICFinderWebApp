import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import reportWebVitals from "./reportWebVitals";

import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/panel/themes/halo/light';
import '@refinitiv-ui/halo-theme/light/imports/native-elements';
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/button/themes/halo/light';
import '@refinitiv-ui/elements/card';
import '@refinitiv-ui/elements/card/themes/halo/light';
import '@refinitiv-ui/elements/layout';
import '@refinitiv-ui/elements/layout/themes/halo/light';
import '@refinitiv-ui/elements/number-field';
import '@refinitiv-ui/elements/number-field/themes/halo/light';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/text-field/themes/halo/light';
import '@refinitiv-ui/elements/select';
import '@refinitiv-ui/elements/select/themes/halo/light';
import '@refinitiv-ui/elements/dialog';
import '@refinitiv-ui/elements/dialog/themes/halo/light';
import '@refinitiv-ui/elements/chart';
import '@refinitiv-ui/elements/chart/themes/halo/light';
import '@refinitiv-ui/elements/tab';
import '@refinitiv-ui/elements/tab/themes/halo/light';
import '@refinitiv-ui/elements/tab-bar';
import '@refinitiv-ui/elements/tab-bar/themes/halo/light';

import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";

import Home from './components/layouts/pages/home'
import ShowRIC from './components/layouts/pages/constructedRICs'
import ShowPricesChart from './components/layouts/pages/pricesChart'

import ConstructRIC from './components/layouts/pages/constructRIC'
import Navbar from './components/layouts/navbar';
import Footer from './components/layouts/footer';
import './App.css';

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/findingRICs/constructRIC' element={<ConstructRIC />} />
      <Route path='/findingRICs/showRIC' element={<ShowRIC />} />
      <Route path='/findingRICs/pricesChart/:id' element={<ShowPricesChart />} />

    </Routes>
    <Footer />

  </BrowserRouter>
);
reportWebVitals();

import React, {useState, useEffect, Fragment} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './global.css'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import { NearProvider } from './components/NearContext';
import { AppProvider } from './components/AppContext';

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  return (
    <div>
      <AppProvider>
        <NearProvider>
          <Router>
            <Fragment>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
              <Footer />
            </Fragment>
          </Router>
        </NearProvider>
      </AppProvider>
    </div>
  )
}
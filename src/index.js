import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './styles/scss.scss';
import Header from './components/Header';
import ButtonDarkMode from './components/ButtonDarkMode';
import Parallax from './components/Parallax';
import Bienvenida from './components/Bienvenida';
import Instructions from './components/Instructions';
import GameExample from './components/GameExample';
import QuickGame from './components/QuickGame';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ButtonDarkMode/>
    <Header/>
    <Parallax/>
    <Bienvenida/>
    <Parallax/>
    <Instructions/>
    <GameExample/>
    <Parallax/>
    <QuickGame/>
    <Parallax/>
    <Footer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

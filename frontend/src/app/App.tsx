import React from 'react';
import { MainLayout, Alert } from '../components';
import Routes from './Routes';
// import moment from 'moment';
// import "moment/locale/ru";
// moment.locale("ru");
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru'); // use locale globally

import { Provider, rootStore } from '../models/Root';
import './index.css';
import { BrowserRouter, Redirect } from 'react-router-dom';

const App: React.FC = (props) => {
  console.log('------ APP props', props);
  // const auth = props.auth ? props.auth : { userName: 'User' };
  return (
    <BrowserRouter>
      <Provider value={rootStore}>
        <Alert />
        <MainLayout>
          <Routes />
        </MainLayout>
      </Provider>
    </BrowserRouter>
  );
};

export default App;

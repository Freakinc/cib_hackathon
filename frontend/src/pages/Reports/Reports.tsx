import React, { useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import { useMst } from '../../models/Root';
import ReportsMenu from './ReportsMenu';
import { Redirect, Switch, Route } from 'react-router-dom';
import ZonesReport from './ZonesReport';
import TimeReport from './TimeReport';
import TimeZonesReport from './TimeZonesReport';
import { Loader } from '../../components';
import { Users } from '..';

const Reports = () => {
  const { users, zones } = useMst();
  useEffect(() => {
    users.load();
    zones.load();
  }, []);

  if (users.state === 'pending' || zones.state === 'pending') {
    return <Loader />;
  }

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <div
        css={css`
          flex-grow: 1;
        `}
      >
        <ReportsMenu />

        <Switch>
          <Route path="/reports/:id/zones" component={ZonesReport} />
          <Route path="/reports/:id/time" component={TimeReport} />
          <Route path="/reports/:id/zone-time" component={TimeZonesReport} />
        </Switch>
      </div>
      <div
        css={css`
          width: 25vw;
          margin-left: 1rem;
        `}
      >
        <Users />
      </div>
    </div>
  );
};

export default observer(Reports);

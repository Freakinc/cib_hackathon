import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import { useMst } from '../../models/Root';
import ReportsMenu from './ReportsMenu';
import { Redirect, Switch, Route } from 'react-router-dom';
import ZonesReport from './ZonesReport';
import TimeReport from './TimeReport';
import TimeZonesReport from './TimeZonesReport';
import { Loader, PolygonElement } from '../../components';
import { Users } from '..';
import { Map } from '..';
import AlertsReport from './AlertsReport';

const Reports = () => {
  const { users, zones } = useMst();
  const [mapData, setMapData] = useState({ floor: null, makers: null });
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
          <Route path="/reports/:id/zone-time" render={() => <TimeZonesReport />} />
          <Route path="/reports/:id/alerts" render={() => <AlertsReport />} />
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

      {/* {mapData.floor && mapData.makers && <Map floor={mapData.floor} markers={mapData.makers} />} */}
    </div>
  );
};

export default observer(Reports);

import React from 'react';
import { observer } from 'mobx-react-lite';
import { Slide, AlertTitle, Alert as MUIAlert } from '@mui/material';
import { useMst } from '../models/Root';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const styles = css`
  width: 25%;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
`;

const Alert = () => {
  console.log('show alert!!!');
  const {
    ui: { alert },
  } = useMst();
  // const classes = useStyles();
  const onClose = () => {
    console.log('close');
  };

  return (
    <Slide in={alert.show} direction="left" mountOnEnter unmountOnExit style={{ minWidth: '20vw' }}>
      <div css={styles}>
        <MUIAlert
          // fixed
          // isStatiAlert
          severity={alert?.type}
          // placement="top-right"
          onClose={alert.hideAlert}
          // onClose={onClose}
        >
          <AlertTitle>{alert.title}</AlertTitle>
          {alert?.message?.toString()}
        </MUIAlert>
      </div>
    </Slide>
  );
};

export default observer(Alert);

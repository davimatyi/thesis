import { Close, FileOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import './PopupDialog.css'

const PopupDialog: React.FC<{ title: string, closeFunction: {fun: Function | null} }> = ({ children, title, closeFunction }) => {

  const [isShowing, setShowing] = useState<boolean>(false);

  closeFunction.fun = () => setShowing(false);

  return (
    <>
      <LoadingButton
        variant="contained"
        startIcon={<FileOpen/>}
        loading={isShowing}
        style={{ margin: "10px 0", fontSize: "20px" }}
        onClick={() => setShowing(true)}
      >
        Import file
      </LoadingButton>
      <div className='popup_cover' style={{ display: isShowing ? "block" : "none" }} onClick={() => setShowing(false)} />
      <div className='popup_dialog' style={{top: isShowing ? "calc(50vh - 100px)" : "-500px"}}>
        <div className='popup_dialog_head'>
          <div className='popup_dialog_title'>{title}</div>
          <div style={{ float: "right" }}>
            <IconButton component="span" aria-label="close" onClick={() => setShowing(false)}>
              <Close fontSize="large" />
            </IconButton>
          </div>
        </div>
        <div className='popup_dialog_content'>
          {children}
        </div>
      </div>
    </>
  );
}

export default PopupDialog;
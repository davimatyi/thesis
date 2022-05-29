import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import ScrollBox from '../layout/scrollbox/ScrollBox';


const FileList: React.FC<{ list: string[], func: Function }> = ({ list, func }) => {
  return (
    // <Box
    //   sx={{ width: '100%', height: '100%', maxHeight: "200px", bgcolor: '#fff', border: '1px solid #999' }}
    // >
    <ScrollBox style={{height: "200px", backgroundColor: "#eee", width: "400px"}}>
      {list.length > 0 ? 
      <List>
        {
          list.map((v, i) => {
            return (
              <ListItem key={i} component="div" disablePadding >
                <ListItemButton>
                  <ListItemText style={{wordWrap: "break-word", maxWidth: "400px"}} primary={v} onClick={(_) => func(v)}/>
                </ListItemButton>
              </ListItem>
            )
          })
        }
      </List>
      :
      <div style={{margin: "80px auto", width: "fit-content"}}>No previous files</div>
    }
    {/* // </Box> */}
    </ScrollBox>

  );
}

export default FileList;
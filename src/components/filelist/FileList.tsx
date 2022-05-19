import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';


const FileList: React.FC<{ list: string[], func: Function }> = ({ list, func }) => {
  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: '#eee' }}
    >
      {list.length > 0 ? 
      <List>
        {
          list.map((v, i) => {
            return (
              <ListItem key={i} component="div" disablePadding >
                <ListItemButton>
                  <ListItemText primary={v} onClick={(_) => func(v)}/>
                </ListItemButton>
              </ListItem>
            )
          })
        }
      </List>
      :
      <div>No previous files</div>
    }
    </Box>

  );
}

export default FileList;
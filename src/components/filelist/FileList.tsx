import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';


const FileList: React.FC<{ list: { name: string, path: string }[] }> = ({ list }) => {
  return (
    <List dense={false}>
      {list.map((v, i) => {
        return (
          <ListItem>
            <ListItemText primary={v.name} secondary={v.path} />
          </ListItem>)
      })
      }
    </List>
  );
}

export default FileList;
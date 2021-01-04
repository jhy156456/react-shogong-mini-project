import React from 'react';
import { TextField, Typography, Box, Chip } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";



const ChipListItem =({chip, handleClassificationClick,index,className}) =>{
    console.log("리렌더링")
    return (
        <Box className={className} key={index}>
        <Chip
          label= {chip.label}
          clickable
          variant={chip.state ? "default":"outlined"}
          color={chip.state ? "primary":"default"}
          onClick={()=>handleClassificationClick(index)}
          onDelete={()=>handleClassificationClick(index)}
          deleteIcon={chip.state ? <DoneIcon/> : <></>}
        />
      </Box>
    )
}

export default React.memo(ChipListItem);
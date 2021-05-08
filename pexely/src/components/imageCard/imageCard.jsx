import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close'
import { Button, Snackbar } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 300,
    marginBottom: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function ImageCard({ removeFromFav, imageId, imageSource, author, addToFav }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  useEffect(() =>{
  },[])

 const addToFavorites = () => {
     openSnackBar('Image added to favorites');
      let image = {
          imageId: imageId,
          imageSource: imageSource,
          author: author
      }
      addToFav(image);
  }

  const removeFromFavorites = () => {
    openSnackBar('Image removed from favorites');
     let image = {
         imageId: imageId,
         imageSource: imageSource,
         author: author
     }
     removeFromFav(image);
 }


  const openSnackBar = (message) => {
    setOpen(true);
    setMessage(message);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image= {imageSource}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         Photo by: {author}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        {addToFav ? 
        ( <IconButton onClick={() => addToFavorites()} aria-label="add to favorites">
        <FavoriteIcon color="primary" />
      </IconButton>)
        :
        ( <IconButton onClick={() => removeFromFavorites()} aria-label="Remove from favorites">
            <DeleteIcon color="primary" />
            </IconButton>)
    }
       

      </CardActions>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />

    </Card>
  );
}

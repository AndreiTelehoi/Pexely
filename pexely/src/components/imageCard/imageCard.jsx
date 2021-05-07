import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';



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

export default function ImageCard({ imageId, imageSource, author, addToFav }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() =>{
    console.log(imageSource);
  },[])

 const addToFavorites = () => {
      let image = {
          imageId: imageId,
          imageSource: imageSource
      }
      addToFav(image);
  }

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

        <IconButton onClick={() => addToFavorites()} aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>

      </CardActions>
     
    </Card>
  );
}

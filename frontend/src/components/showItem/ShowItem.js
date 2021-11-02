import React, {useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './showItem.css';

const ShowItem = ({item}) => {
  const [isFavorite, setisFavorite] = useState(false);

  const toggleFavorite = () => {
    setisFavorite(!isFavorite);
  };

  return (
    <Card className='showItem'>
      <CardActionArea>
        <CardMedia
          component='img'
          alt={item.name}
          height='240'
          image={item.image.medium}
          title={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {item.name}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className='show-content'
            dangerouslySetInnerHTML={{__html: item.summary}}
          ></Typography>
          <Typography>{item.genres.join(', ')}</Typography>
          <Typography>Rating: {item.rating.average}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isFavorite ? (
          <FavoriteIcon onClick={toggleFavorite} />
        ) : (
          <FavoriteBorderIcon onClick={toggleFavorite} />
        )}

        <Button size='small' color='primary'>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ShowItem;

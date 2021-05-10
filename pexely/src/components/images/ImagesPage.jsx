import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ImageCard from '../imageCard/imageCard';
import "./ImagesPageStyle.css";
import { db } from '../../firebase';
import firebase from "firebase/app"

export const ImagesPage = ({ currentUser }) => {
    const [images, setImages] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [categorySearch, setCategorySearch] = useState('');
    const [sizeSearch, setSizeSearch] = useState(0);

   useEffect(() => {
    
   },[]);

   const searchCategory = () => {
      setLoading(true);
      axios.get('https://api.pexels.com/v1/search', {
        params: {
          query: categorySearch,
          per_page: sizeSearch
        } 
      }).then(res => {
          setImages(res.data.photos);
          setLoading(false);
      }).finally(() => {
          setLoading(false);
      })
   }
   
  const handleInputChange = (e) => {
    setCategorySearch(e.target.value);
  }

  const handleSizeChange = (e) => {
    setSizeSearch(e.target.value);
  }

  const addToFavorites = (image) => {
    db.collection("users").doc(currentUser.id).update({
        photos: firebase.firestore.FieldValue.arrayUnion(image)
    })
    .then((docRef) => {
        console.log("Document written ");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  }


   let photosToRender;
   if (images) {
     if (images.length === 0) {
       photosToRender = (<p>No data was found</p>);
     } else {
      photosToRender = images.map((image, key) => (
        <ImageCard imageId={image.id} addToFav={addToFavorites} imageSource={image.src.medium} key={key} author={image.photographer}></ImageCard>
       ));
     }
     
   }

  return (

    <div className="container">

      <h1>What are you in the mood for?</h1>
      <div className="inputContainer">
        <TextField onChange={handleInputChange} id="standard-basic" label="Search for a category" />
        <TextField className="sizeInput" onChange={handleSizeChange} label="Max images" />
        <Button onClick={() => searchCategory()} className="searchButton" variant="contained" color="primary">
            Search
        </Button>
      </div>
      <div className="imagesContainer">
          { isLoading ? <p>Fetching data...</p> : photosToRender }
      </div>
    </div>
    
  );
}

import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ImageCard from '../imageCard/imageCard';
import "./FavoriteImages.css";
import { db } from '../../firebase';
import firebase from "firebase/app"

export const FavoriteImages = ({currentUser}) => {
    const [images, setImages] = useState([]);
    const [isLoading, setLoading] = useState(false);

   useEffect(() => {
    db.collection("users").doc(currentUser.id).get().then((doc) => {
   
        let imagesReceived = [];
        if (doc.exists) {
          setImages(doc.data().photos);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }

    });

   },[]);

   const removeFromFav = (image) => {
    db.collection("users").doc(currentUser.id).update({
      photos: firebase.firestore.FieldValue.arrayRemove(image)
    })
    .then((docRef) => {
      let imagesCopy = images.filter(elem => elem.imageId !== image.imageId)
        setImages(imagesCopy);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
   }


   let photosToRender;
   if (images) {
       console.log(images);
     if (images.length === 0) {
       photosToRender = (<p>No data was found</p>);
     } else {
      photosToRender = images.map((image, key) => (
        <ImageCard imageId={image.imageId} removeFromFav={removeFromFav} imageSource={image.imageSource} key={key} author={image.author}></ImageCard>
       ));
     }
     
   }

  return (

    <div className="container">
      <h1>Your favourite images</h1>
      <div className="imagesContainer">
          { isLoading ? <p>Fetching data...</p> : photosToRender }
      </div>
    </div>
    
  );
}

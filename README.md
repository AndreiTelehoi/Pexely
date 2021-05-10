# Introducere

Pexely este un SPA dezvoltat folosind React.js și are ca scop principal stocarea imaginilor favorite ale utilizatorului.

# Descrierea problemei

Aplicația se adresează în principal persoanelor pasionate de fotografie sau celor care doresc să aibă un mic album de imagini pe care mai apoi să le poată utiliza în diverse alte proiecte. Funcționalitatea principală este cea de căutare a imaginilor după cuvinte cheie și salvarea acestora într-o listă de favorite. De asemenea, fiecare utilizator are un cont personal pe care îl poate accesa de pe dispozitive diferite, iar pentru a îl scuti de pașii standard de înregistrare și memorarea unei parole ce ar putea deveni obositor, înregistrarea și autentificarea se realizează facil, direct prin intermediul unui cont de gmail.

După adăugarea unei imagini în lista de favorite, acestea pot fi, desigur, și șterse din listă, iar utilizatorul poate efectua oricând o altă căutare, fie după un obiect concret de care este interesat, un peisaj din natură sau o emoție.

# Descriere API

### Pexels API

Acesta este un API oferit the pexels.com ce pune la dispoziția utilizatorilor imagini din întreaga bibliotecă de pe platformă, pe baza de cuvânt cheie introdus de utilizator. API-ul este apelat prin intermediul axios și are rolul de a oferi utilizatrului imaginile dorite în cadrul aplicației. 

### Google Authentication API

Pentru componenta de autentificare a utilizatorului pentru a folosi aplicația și a avea o listă de imagini favorite, am utilizat API-ul de autentificare prin Google, prin intermediul Firebase Authentication.

# Fluxul de date

Pentru autentificarea utilizatorului, Firebase vine la pachet cu metode ajutătoare ce permit autentificarea cu servicii precum Google. Apelul către serviciul cloud Firebase Authentication este următorul:
```
  const authenticate = () => {
       auth.signInWithPopup(googleProvider).then(res => {

           let loggedUser = {
               displayName: res.additionalUserInfo.profile.given_name,
               id: res.additionalUserInfo.profile.id
           }

        if (res.additionalUserInfo.isNewUser) {
          
            db.collection("users").doc(loggedUser.id).set({
                photos: []
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
           
           setUser(loggedUser);
        }).catch(err => {
          alert('There was an error');
       });
   }
```
Astfel, se va stoca id-ul utilizatorului și va fi disponibil întregii aplicații.

După autentificare, utilizatorul va fi întâmpinat de fereastra de căutare a imaginilor. Acesta poate alege o categorie prin intermediul unui cuvânt cheie și numărul maxim de imagini pe care API-ul să le întoarcă (default: 1). Query parameters necesari pentru request-ul către API-ul Pexels sunt `query` și `per_page`. Metoda `GET` arată în felul următor: 
```
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
```
Textul va fi preluat din input și cedat către parametrii necesari. Obiectele primite de la API vor fi mapate pe componenta `ImageCard`. 

Pentru salvarea imaginilor preferate, utilizatorii vor apăsa pe butonul 'add to favorites', iar metoda de salvare a acestora în Firestore este sub forma următoare: 
```
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
```
Accesând tab-ul de 'Saved images', aplicația va încarca automat pozele salvate de utilizator din baza de date prin apelul urmator: 
```
 db.collection("users").doc(currentUser.id).get().then((doc) => {
        if (doc.exists) {
          setImages(doc.data().photos);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
```
Din nou se va folosi componenta `ImageCard` pentru randarea imaginilor. Acestea pot fi șterse din baza de date, apăsând butonul sub forma coșului de gunoi.

# Capturi de ecran

### Autentificarea prin API
![image](https://user-images.githubusercontent.com/62506135/117710182-7fcc1480-b1da-11eb-9d40-b47511c0bf81.png)

### Căutarea imaginilor prin API-ul pexels
![image](https://user-images.githubusercontent.com/62506135/117710514-de918e00-b1da-11eb-9d8f-203682762c8e.png)

### Imaginile favorite ale utilizatorului
![image](https://user-images.githubusercontent.com/62506135/117710657-08e34b80-b1db-11eb-80e7-b67731634cd6.png)

# Referințe

* https://www.pexels.com/api/documentation/
* https://firebase.google.com/docs/auth
* https://www.npmjs.com/
* https://www.npmjs.com/package/axios
* https://restfulapi.net/

# Publicare

Aplicația este publicată pe platforma Heroku și poate fi accesată la adresa https://pexely.herokuapp.com/

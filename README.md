# <a name="title"></a> Snap Observatory

### Introduction
North Star is the name of [our](#members) group in the Snapchat Engineering Academy, which developed the website "Snao Observatory". This website uses the [NASA Fireball API](https://ssd-api.jpl.nasa.gov/doc/fireball.html) to display relevant data fireballs ("a large bright meteor") which will be explained in more detail later. Users can create accounts to save their favorite data sets in order to look back at later. This group project is meant to be displayed to a panel of Snap employees and graded on how well it would perform as a [Snap Mini](https://minis.snapchat.com/) upon further integration in a two week long hackathon.


### Vision
1 - The first step to integrate the website as a "Snap Mini" would be to allow users to Login to the website using their Snapchat accounts. This would let them use their Snapchat username while using the website and open up the possibility of using Snap-Kit to add Bitmoji's.

2 - The second step to integrate the website as a "Snap Mini" would be to encourage users to share their favorites. Once a user saves their entry, they can share data with their friends through Snapchat, making communication far easier.

3 - The third step to integrate the website as a "Snap Mini" would be to enable users to post images and journal entries on specific fireball events. Users can post Snaps of themselves at the actual fireball sites, expanding the sense of community between users.

### Usage


#### Setup

1 - Clone the master repository (```git clone https://github.com/Sebastian-git/north-star.git```)
2 - Install Node.js [here](https://nodejs.org/en/download/) 
3 - Open up your cloned repository's directory and type ``` npm install ``` to download all dependencies from the package.json.

(Fun fact, type ```npm list``` to see all installed dependencies!)

Now, you should be set to start using our Snap Observatory!

##### Previews

(1) The feature with the most potential for the future is "favorites" which displays favorite fireball entries with a map containing longitude and latitude to give users a more visual experience. 
(2 & 3) The search functionality pulls from all recorded NASA Fireball events and displays them in a neat format.

<img width="200" height="400" alt="portfolio_view" src="https://github.com/Sebastian-git/north-star/blob/master/readmeImages/map%20preview%20phone.jpg"> |
<img width="200" height="400" alt="portfolio_view" src="https://github.com/Sebastian-git/north-star/blob/master/readmeImages/search.png"> |
<img width="200" height="400" alt="portfolio_view" src="https://github.com/Sebastian-git/north-star/blob/master/readmeImages/results.png">


##### Technical Information 

The single most important piece of code in this program is the implementation of the NASA API inside ```/routes/searchRoutes.js``` on lines 8-30.
```
router.post("/", (req, res) => {
  const maxDate = req.body.max;
  const minDate = req.body.min;
  const config = {
    method: "get",
    url: `https://ssd-api.jpl.nasa.gov/fireball.api?date-min=${minDate}&date-max=${maxDate}`,
    navs: { }
  }
  axios(config)
  // If request works
  .then(response => {
    // Add date, energy, velocity, longitude and latitude into array as a string
    let currentData = []; 
    for (let i = 0; i < response.data.count; i++) {
      currentData.push([response.data.data[i][0], response.data.data[i][1], response.data.data[i][8], response.data.data[i][5], response.data.data[i][3], " "]);
    }
    fieldData = ["DATE", "ENG", "ALT", "LON", "LAT", "FAV"];
    // Push current data array to front end each loop
    res.render("index", {currentData, fieldData});
  })
  .catch(error => {
  });
});
```
This code takes the minimum and maximum constraints given by the front end, then connect the API inside the config object. The program then creates a two dimensional array. There is one array that contains multiple other arrays with entries of data that is then sent to the front end.

Another important group of code lies inside ```config/firebase.js```, which contains multiple functions that take advantage of Firebase's [firestore](https://firebase.google.com/docs/firestore) and [authentication](https://firebase.google.com/docs/auth) API's.
``` 
doCreateUserWithEmailAndPassword = (email, password) => {
  return this.auth.createUserWithEmailAndPassword(email, password)
}
```
These two critical lines of code create a new account using an email and a password through the authentication API.
```
doSaveFireball = (fireball, email) => {
  if (email) {
    return this.db
    .collection('fireballs').doc(email)
    .set(
      {fireball: app.firestore.FieldValue.arrayUnion(fireball)},
      {merge: true}
      );
   }
}
```
This function takes a fireball and email as parameters, checks if the email exists and then saves the entries to view in the favorites page.

### <a name="members"></a> Meet the Team

**Sebastian Cevallos** <br>
**Role:** Project Manager <br>
**Contact:** [Github](https://github.com/Sebastian-git), [LinkedIn](https://www.linkedin.com/in/sebastian-cevallos-2917bb16a/)

**Petula Pascall** <br>
**Role:** Front-End Developer <br>
**Contact:** [Github](https://github.com/SeePetulaCode), [LinkedIn](https://www.linkedin.com/in/petulapascall/)

**Brandan Herron** <br>
**Role:** Back-End Developer <br>
**Contact:** [Github](https://github.com/brandan1989), [LinkedIn](https://www.linkedin.com/in/brandan-herron/)



### Launch
HTML 5, CSS 3, Javascript 3 <br>
Node.js 12.18.3, Nodemon 2.0.4, Node 14.8.0, Express 4.17.1, Express-Session 1.17.1, Axios 0.19.2, Body-Parser 1.19.0 <br>
Firebase 7.18.0, VS Code 1.48 <br>

### Status: 

In progress

#### [back to the top](#title)

# FluidApp
Realtime fluid stimulation, support mutiple physic models and memorized user selection in database.

## How to use
1. Create an user account
2. Login and click the create button to create first model
3. Click start button to start realtime fluid stimulation
4. Back to homepage, tweak the model as you like
5. Create your own custom model
6. Click start button to see changes
7. All models are saved in database

## How to build

1. Clone the repository
2. Open file `config/default.json`, set mongo uri and secret key
```json
{
    "mongouri": "your_mongodb_uri",
    "secret": "your_secret_key"
}
```
3. Install dependencies and run server
```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run server
npm start
```
4. Application starts at `http://localhost:5000`

## Framework used
* **Express** - backend server
* **React** - server side rendering
* **Mongo db** - database
* **Bootstrap** - css library

## Module used
* **mongoose** - connect to mongodb server
* **bycryptjs** - hash user's password
* **jsonwebtoken**  - create token for login user
* **cookie-parser**  - set cookie for user
* **axios** - ajax call from client side

## My contribution

* Build rest api with express router
* Build frontend with bootstrap css and react
* Handle user register, login and logout with cookie and jsonwebtoken
* Handle custom model saving and deletion with ajax call connected to the rest api
* The fluid stimulation code comes from a previous pyhsic project, contribute with my teammate.

## Experience
The original gaol of the previous phisics project is to build a configuiable fluid stimulator, let student who learn physics have better insight of waterwave. In order to reach this goal, we need a user friendly interface for easy configuration. I learned how to build a good api and how to communicate with server by ajax call through this propject. It's not an easy process, but I learned a lot through reading through documentation. Hope this project will benifit students who are intrested in physics.

## References

* Each framework and module's documentation
* Reference mern framework https://github.com/bradtraversy/mern_shopping_list


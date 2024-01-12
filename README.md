# TODO APPLICATION<br>


# Summary of the Project<br>
This is a Simple Todo Application buit in React and Nodejs. In front end we have used tech Stack like<br>


# TechStack<br>
1. Express - A minimal and fast node web server framework for building single page applications.
2. ReactJS - A JavaScript library for building user interfaces.
3. MongoDB - A document database that stores data in JSON-like documents with optional schemas.
4. Mongoose - A MongoDB object modeling tool designed to work in an asynchronous environment..  
5. ESLint - A tool for identifying problematic patterns in JavaScript code.<br>
6. bcrypt - A Node js library to hash passwords by performing cryptographic operations
7. JsonWebToken- A Node js library to authenticate the user by genrating token when accessing the app 


## Getting Started <br>
These instructions will get you a copy of the project up and running on your local machine for development
and testing purposes.<br

## Prerequisites <br>
You must have installed Node.js, NPM(Node Package Manager), Git & Text Editor (
    VS Code/Sublime Text) in order to use this application.<br>
    ## Installation <br>
    1. Clone or Download the Repository from Github: https://github.com/Rohitsinghwho/TodoApp.git<br>
    2. Open Terminal / CMD and navigate to the cloned folder.<br>
    3. Run `npm install` command to install all dependencies required by the project.<br>
    This will also automatically install node_modules folder containing packages listed
    in package.json file.<br>
    4. After successful installation start both Server & Client using below commands :<br>
    * For starting Server :<br>
      1.Add Your own env file in the root of backend folder
      Add following lines into .env file
      PORT=Your Port Number<br>
      MONGODB_URI="Your mongo db connection string"<br>
      Add a constant file if not working then add name of your database<br>
      2.Run `npm run dev`<br>
      * For Starting Client :<br>
      1.Navigate to client directory<br>
      2.Run `npm start`<br>
      Now You can see the app at http://localhost:PORT/<br>
      ## Usage <br>
      To Use The App Just Follow Below Steps :<br>
      * Click On "ADD TODO" Button And Enter Task Name & Description Then Hit Enter Or Click
      On "Enter" Button.<br>
      * If You Want To Mark Task As Completed Just Click On Check Box Near That Task
      It Will Be Marked As Completed.<br>
      * If You Want To Delete Any Task Just Click On Trash Icon Near That Task It
      Will Be Deleted From List.<br>


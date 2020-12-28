# Github User Directory
### Steps to run the project  
1. Clone the repository.  
2. cd to the project folder.  
3. npm install to install the necessary dependencies provided NodeJS is preinstalled.  
4. npm start to start the local dev server at localhost:3000.  

### Project Description  
Project UI is built using React and Bootstrap.  
Project purpose is to fetch data about users in github like name,url,repositories etc by utilising Github APIs and display them with clean and responsive design. The user can then search through the data and store and delete users alongwith their details from the local storage.

### Project components and their routes  
This project has two main components. The home component and the List component.
#### / - Root route  
The home component is rendered at this route. Here we fetch data of all users from https://api.github.com/users and display them with search functionalities incorporated. On clicking of the Repository button, user can see the top 5 repositories based on number of stargazers count. The user can also store the user information by clicking on the Add button on each user card. The user info gets stored in the List component.
#### /list - List route  
The list component is rendered at this route. Here we display the user information alongwith their top 5 repos. The user can also delete the user information from the list component on clicking the Remove button.

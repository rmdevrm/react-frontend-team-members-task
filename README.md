This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

-----------------------------------

We're using rails application APIs, So first we need to start the rails application and currently, we're using the default rails app url as https://location:5000, but we can modify the URL using following steps -
- Go to the .env file (which is present in project directory)
- Modify the `REACT_APP_RAILS_APP_URL`
- Restart the application by using `npm start`

## Available Scripts

------------------------------------

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## About

--------------------------------------

As per the requirements shared the following things have been implemented:

### Consumed Rails APIs 
We're using following APIs of rails application -
                                         
For fetching the team members details                               
- http://location:5000/api/team_members - (can pass the parameters for pagination i.e page and per_page)

For filtering
- http://location:5000/api/team_members?working=true (for filtering)
- http://location:5000/api/team_members?skill=['js', 'react'] (for filtering)
- http://location:5000/api/team_members?holiday=true
- http://location:5000/api/team_members?project=2

Apart from this, we've also added the `auto-complete` search option on project and skills search fields. So when the user search for any text, then we call the rails API to fetch the project or skill related data as per the input keyword. Consumed following APIs for this functionality on front-end side -

- http://location:5000/api/team_members?skill=skill_name
- http://location:5000/api/team_members?project=project_name

### Notification
This is a simple Snackbar component which shows on each API call and alerts the user about the success or failure of the call.

### Loader
This is a simple CircularProgress component which shows till the app has recieved a response from the API whether success or failure


## Improvements 
--------------------------------------

The above components were implemented based on the requirements shared and keeping in mind the time constaints. However there may be certain improvements done to make it even robust and user friendly, which are:

- We can add the column wise sorting on each column. (server side filtering)
- We can add the row selection dropdown for page. (currently, we're displaying 10 rows on each page)

Unit Tests:

- Unit tests may be added for the components to make sure everything works as expected and also allows for incremental developement without breaking existing things.



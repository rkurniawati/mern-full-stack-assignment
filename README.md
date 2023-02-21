# Example MERN Full-Stack Assignment

This is an example of MERN full-stack assignment in [the Web Programming class](https://rkurniawati.github.io/webprogramming.html) that I teach. 

## Assignment Overview
In this assignment, students will create a full-stack MERN (Mongo, Express, React, Node) application. This application has a React front-end and a back-end that is composed of NodeJS, Express, and MongoDB. 

The workspace for this assignment contains both the front-end and back-end source code: the front-end source code is located under `src` directory and the back-end source is located under `backend` directory. This is done to simplify assignment distribution and deployment -- normally the two components are maintained in separate repositories and likely are hosted in different places. 

Similarly, the MongoDB in this assignment is setup to run in the same container as the front-end and the back-end servers to simplify the assignment setup. While this is okay for this assignment, normally you will have the database running on a different machine. 

## Getting Started

To get started with this assignment, do the following tasks:
 - Accept the assignment in GitHub classrom
 - When you first create the codespace, please run "npm install" in a new terminal window to install the libraries required by the front-end and back-end:
    ```
    npm install
    cd backend
    npm install
    ```
 - Before you start working on the assignment, you will need to start both the back-end and front-end components. 
    - Starting the backend:
      Type the following in a new terminal window (open a new one is there is none available):
        ```
        cd backend
        npm start
        ```
    - Starting the front-end, by typing the following in a new terminal window (open a new one is there is none available):
        ```
        cd /workspaces/full-stack-2022
        npm start
        ```

- To verify that the 3 components are working, you can run the following commands.
    - To verify that mongo is running: 
        ```
        mongosh --quiet --eval "show databases"
        ```
    - To check that the backend is running:
        ```
        curl http://localhost:8000/hello
        ```
    - To check that React is working, open the forwarded port 3000 in a browser as usual. 

## Question 1: Get the Content of the Dogs table [25 points] 

Create component that contains an h2 title similar to what is shown in the screenshot and the content of the _dogs_ collection retrieved from the MongoDB through the backend REST API. The project is configured to proxy all fetch request to http://localhost:8000 (you can see this in package.json). The URL to the backend REST API that will retrieve the content of the `dogs` collection is: http://localhost:8000/dogs, so the fetch request should look like `fetch("/dogs")`. You can try invoking this on the command line using `curl` or you can also try opening the URL in the browser to invoke it. 

```
curl http://localhost:8000/dogs
```

When your CodeSpace is first created, your MongoDB is empty. You should to add entries to the dog table, you can do so using the `mongosh` command. See [this page](cais316-mongodb-populate-dogs) for details. The data that you add will be persisted in the CodeSpace until it is re-created. 

The expected output for the dog table created look like below.

  ![](https://wsu-courses.s3.amazonaws.com/fall2022/cais316/assignment9/question1-dogs-table.png)

This page should change every time you update the database. For example if you run this command in the `mongosh` and press "Reload" to refresh the page, you should see the new dog in the table. 

```
db.dogs.insertOne({name: "Wally", age: 6, breed: "Beagle"})
```

## Question 2: Delete a Dog from the Dogs table [35 points] 

In this question, implement a React component that will first load the _dogs_ collection from MongoDB (similar to the previous question), however the component should allow users to delete the data from the table. Each row should have an additional column containing a delete button ([X]); when the user clicks any of the button, the corresponding row will be deleted. All of the updates should be reflected in the MongoDB collection. 

The URL to the backend REST API that will delete a dog from the `dogs` collection is: http://localhost:8000/deletedog. Unlike the API to retrieve the content of `dogs` collection earlier, this API requires parameters getting passed through the HTTP POST method so the fetch request is a little bit more complicated. In addition to the URL, you need to set the method, body, and headers parameters. More information on this can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch). 


To test the `deletedog` API on the command line, you can use the `curl` command. An example is shown below (note that you should replace the `_id` is an appropriate value from your database, use the `db.dogs.fetch({})` in the Mongo Shell to find the `_id` of a dog that you can delete).

```
curl --header "Content-Type: application/json" --request POST --data '{"_id": "REPLACE-THIS"}' http://localhost:8000/deletedog
```

Alternatively, you can also test this from within the console in Chrome Developer Tools. Below is the JavaScript code that will delete a dog with ID = "00112233445566778899aabb":

```
dog = { _id: "00112233445566778899aabb" }

await fetch(
    "/deletedog", 
    { 
	  method: "POST", 
	  headers: { 'Content-Type': 'application/json'}, 
	  body: JSON.stringify(dog)
	}
)
```

An example of what the component should look like is below.

  ![](https://wsu-courses.s3.amazonaws.com/fall2022/cais316/assignment9/question2-delete-dog.png)

When a user clicks on the delete button in the last row, the table will look like the following:

  ![](https://wsu-courses.s3.amazonaws.com/fall2022/cais316/assignment9/question2-delete-after.png)

When you verify this in `mongosh`, you should see that the row is also deleted from the `dogs` table in MongoDB. To view the content of the `dogs` collection in `mongosh` you can use the following command:

```
db.dogs.find({})
```

## Question 3: Add a Dog into the Dogs table [40 points] 

In this question, implement a React component that first loads the _dogs_ collection, similar to what you did in question 1. At the end of the table, there should be a form where the user can enter a new dog information. The form consists of input elements and a button that will allow the user to enter the dog name, breed, and age. When the user presses the add button, a new row in the table (the naughty and nice count should both start at zero). 

The URL to the backend REST API that will add a new dog into the `dogs` collection is: http://localhost:8000/adddog. Similar to the deletion API, this API requires parameters getting passed through the [HTTP POST](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) method. 

To test the API on the command line, you can use the `curl` command. An example is shown below (note that you should replace the `_id` is an appropriate value from your database, use the `db.dogs.fetch({})` in the Mongo Shell to find the `_id` of a dog that you can delete).

```
curl --header "Content-Type: application/json" --request POST --data '{"name": "Bertie Jr.", "age" : 2, "breed": "Beagle"}' http://localhost:8000/adddog
```

Alternatively, you can also test this from within the console in Chrome Developer Tools. Below is the JavaScript code that will add a "dog" named _Ruth_ with _unk_ age from the _human_ breed. This "dog" is occasionally naughty but mostly nice (_naughty_ = 10 and _nice_=100).

```
dog = {  name: "Ruth", age: "unk", breed: "human", naughty: 10, nice: 100 }

await fetch(
    "/adddog", 
    { 
	  method: "POST", 
	  headers: { 'Content-Type': 'application/json'}, 
	  body: JSON.stringify(dog)
	}
)
```

For example, the given sample data, the component will look similar to below at the beginning: 

  ![](https://wsu-courses.s3.amazonaws.com/fall2022/cais316/assignment9/question3-insert-beforepng.png)

The after the user enters data for a new dog and presses the "Add" button, the component should look like below.

  ![](https://wsu-courses.s3.amazonaws.com/fall2022/cais316/assignment9/question3-insert-after.png)

When you verify this in `mongosh` using `db.dogs.find({})`, you should see that the row is also added in the `dogs` table in MongoDB.


## Extra Credit Question: Santa's Dog List

In this question, first you will need to implement a backend API that will allow you to increment the _naughty_ and _nice_ counters in the _dogs_ MongoDB collection. Afterwards, implement a React component that first loads the _dogs_ collection from MongoDB. Then it will display a table containing the data from the dog table, with the _Naughty_ and _Nice_ count shown as buttons that a user can click. 

For the given sample data, the component will look similar to below at the beginning (you can use the HTML className attribute _naughty_ and _nice_ to use the CSS style that I provided in `App.css`): 

  ![](https://wsu-courses.s3.amazonaws.com/fall2022/cais316/assignment9/extra-naughty-nice.png)
    
The after the user clicks the first _Naughty_ button 3 times and the 2nd & 3rd _Nice_ buttons once, the component should look similar to below:

  ![](https://wsu-courses.s3.amazonaws.com/fall2022/cais316/assignment9/extra-naughty-nice-after.png)


When you verify this in `mongosh`, you should see that the counters are also updated for the corresponding dog records in the `dogs` table in MongoDB.

If you complete the implementation of the backend APIs and the front-end component required for this question, you will get 20 points. 

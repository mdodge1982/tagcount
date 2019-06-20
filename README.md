# HTML Treemapper

A treemap is a graphical representation of tree-structured data. The rectangular chart is subdivided into rectangles for each node of the tree, with child nodes nested within it.

My goal with the HTML Treemapper app was to use D3.js to generate svg treemaps given inputted HTML content. The user can choose whether to a treemap that represents the relative size of each DOM element, or one that gives equal weight to each "leaf" node.

HTML often contains elements that have just one child. For example, an <img> nested within an <a> nested within an <li>. I chose to treat such elements as a single leaf node.

Check it out: https://htmltreemapper.herokuapp.com

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

# React Flickr Challenge

## A Brief Intro About React

React is a view framework written by Facebook for building user-interfaces. We use it at Edusight for almost everything. In fact, it's more than just a library, it's a way of thinking about performant and scalable front end interfaces, and it's super powerful. Frameworks will come and go, but we think the ideas introduced by React will be quite sticky.

We realize that most developers won't know React right away, but at Edusight we value learning. There are some resources at the end of the challenge description to help you get started with React.

## The Challenge

The challenge is to build a simple Flickr search and view tool.

1. Use the React framework to create your interface. √
2. The main interface will be a grid view with a search bar. √
3. When you search for a term in the search bar, the grid view will show at least the first 10 photo thumbnails of the results that are returned through the Flickr API (https://www.flickr.com/services/api).
4. Clicking into each photo should take you to a separate view where you can view a larger version of the photo.
5. In the main interface, create a dropdown √ somewhere where you can sort the image by Date (asc/desc) and other key indicators as you find appropriate.
6. We care about design, so give the user interface some thought. Don't go overboard, but consider what real users would find acceptable. √

## Deliverables

You should deliver your code in 1 zip file. Your program should run in a web browser either through an index.html file or a localhost server. If you choose to use a packager or some other toolchain for compiling Javascript, please provide the necessary instructions to install everything (for example, `npm install`, `npm start`).

## Tips

If you haven't used the React library before, try to start this challenge early. React may take a few days to fully sink in.

## Resources

### Getting Started with React

Facebook's de-facto tutorial on React is simple to follow: https://facebook.github.io/react/docs/tutorial.html.

Pete Hunt wrote a great article on what order to learn the technologies that are related to React: https://github.com/petehunt/react-howto.

### Getting Started Boilerplate

If you're new to React, we recommend getting your feet wet with a single html page boilerplate. The Facebook team has an example here: https://facebook.github.io/react/docs/getting-started.html#quick-start-without-npm.

### Going Further

At Edusight, we write in a Javascript standard called ES2015 (Sometimes also called ES6). Since most browsers don't support most of these language features yet, we use a combination of Babel (a transpiler) and Webpack (a static asset packager) to "compile" our Javascript code into something that a browser can understand. These are both very powerful tools that, while not necessary to complete the challenge, may be fun for you to learn more about. You can learn more about ES2015 here: https://babeljs.io/docs/learn-es2015. There is a great introduction to Webpack here: https://github.com/petehunt/webpack-howto.

A bit part of thinking in React is figuring out where to store application state data. We won't discriminate against the many methods out there, but we think redux is a library worth having a look at. This is how we manage application state in Edusight and is very insightful even beyond its own API. Have a look here, http://redux.js.org/.

We highly recommend using react-router (https://github.com/rackt/react-router) to organize your views.

## Questions

Please let us know if you have any questions. While we cannot clarify the challenge text, as it is a measure of comprehension, we will certainly try our best to help you out.

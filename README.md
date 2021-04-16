# Asthma Alert Case Study for Sana Benefits

To get started, make sure you have Parcel installed on your machine.
- `npm install -g parcel-bundler` 

Then run the following commands from the root of this directory:
- `npm install` - This will install the applications dependencies.
- `npm start` — This will spawn a development server with a default port of `1234`.

You can use the `-p` flag to specify a port for development. To do this, you can run `npm start` with an additional flag:

```
npm start -- -p 3000
```


If you'd like to see what the production build looks like you can run:
- `npm run build` — This will output a production build in the `dist` directory.

# Implementation Details

I bootstrapped the project using `nano-react-app`, an ulta lightweight alternative to `create-react-app` that utilizes
parcel, a zero-config alternative to webpack. This was a quick and simple setup and ideal for such a small project.    

To support multiple users, I used a library `fake-auth` that mocks up an authentication backend using local storage. 
The users details, a token, and the users preferences are all saved in local storage.  This is not safe or recommended 
but for the purposes of the project, hopefully suffices. This library isn't perfect, and you may notice some console errors
when the app is looking for the `currentUser` but none exists (i.e. you've logged out).   

It is not a perfect implementation and you will likely encounter bugs, but it is perfectly functional and satisfies the requirements
laid out in the included `Air quality.txt` file.  I look forward to getting some feedback on my code and implementation.  Thanks!

# Potential Future improvements

- [ ] create a proper backend with a database connection and secure authentication
- [ ] add caching layer to client side to improve performance (I like `react-query`)
- [ ] improve behavior of private routes, prevent redirect to sign in on refresh
- [ ] create better location input with autocomplete and validation from the AQI api

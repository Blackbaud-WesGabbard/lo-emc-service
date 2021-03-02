# Luminate Event Manager Center API
Event Manager Center has no product API available. This project provides basic API endpoints in order to execute updates in Luminate EMC by using Puppeteer to run a headless browser and perform updates. Thus, these endpoints can be used to allow for things like in-line editing from a TeamRaiser Greeting page.

# TODO
- make web content more dynamic, allow to pass target and have open up correct page


## Getting Started

Install the necessary dependencies
```shell
yarn install
```

Then run the development server:
```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## API
All API endpoints are located in this application at */pages/api/* and each at a minimum take the following required params:
```javascript
{
  sessionId, // pass valid JSESSION ID string, this is the value that is saved as a cookie when logging into LO
  env, // options are dev, qa, or defaults to prod
  frId // Event Id for the EMC that will be accessed
}
```

In addition each api method takes additional params as listed below.

### Event Properties
Updates to the Event Properties tab also take the following endpoint and params:

```
/api/event-properties

```

```javascript
{
  target, // The field to update, this based of the inputs id attribute in the EMC
  content // string of text to use for update
}
```

### Update Website Page Content
```
/api/website-content

```

```javascript
{
  username,
  password, // temporary workaround, pass username and password because when passing session id page elements are not avaliable
  target, // The TeamRaiser page selected to be edited. This value is represented by the query string param in the url for 'pg='. So for Greeting Page the value would be 'entry' - STILL TO DO, FOR NOW JUST GOES TO ENTRY
  sid, //Optional param for updating TeamRaiser Custom Pages. If the target value is 'informational', then you will also need to pass the sid parameter as well - STILL TO DO
  content // string of html to use for updates
}
```

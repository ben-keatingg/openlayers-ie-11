# Demo Repo to reproduce IE11 SVG point rendering issue

## To run 
- clone this repo
- install dependancies `npm install`
- `npm start` will transpile the to browser friendly Js and serve on `localhost:1234`

## To reproduce the issue
- run `npm start` and go to `localhost:1234` in IE11
- an `IndexSizeError` will be thrown on map render
- no issues opening in any other browser


### Context
I have kept the code as simple as possible whilst trying to keep the usage as similar to the app we are working on as possible.
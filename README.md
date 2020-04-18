# a message board

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


npm run noteapp  // local backend
ng serve // local front

API deploy
0 use becryptjs // precompiled
1 upload contents inside backend folder in a zipped form
2 npm server.js // start command 
3 whitelist hosting ip in database // not just local
 locate : created EIP

 angular deploy. (not deployed anywhere yet)
 1 set apiUrl in env.prod.ts
 2 ng build --prod
 3 pick up dist folder & upload contents only

 deploy as single app
 _______________________________________ 
 0 keep angular code in a folder named angular
 1 point output path to inside backend. backned/angular
 2 all unrecognized route go to angular
 ---- angular path ---
 api.user("req,res,next")=>{
   res.sendFile (path.jpin(--dirname, angular,index.html)) // dirname is abs path to dist
 } 
4 static access to images & angular folder
 app.use ("/",express.static(path.join(__dirname,"angulat")));
 test with npm run start: server 
 5 always need to rubild app, upload zipped folder 


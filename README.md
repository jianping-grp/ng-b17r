# NgChembl

This is the frontend of Bioactivity-explorer and the corresponding backend (based on django-rest-framework) can be found 
[here](https://github.com/jianping-grp/b17r). After setup of the backend, please set the backend parameter
`REST_HOST` at `settings.ts`, default is `http://localhost:8000/api`.

## Announcement

**We are very sorry to inform users that our web server (http://cadd.pharmacy.nankai.edu.cn/b17r)
 is temporarily not available because of the 
meeting of the first session of the 13th National People's Congress held in Beijing from March 5 (- -!). 
It will be back after the congress, this would take about two weeks (March 20). We apologized for 
this inconvenience again and recommend build your local server.**

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

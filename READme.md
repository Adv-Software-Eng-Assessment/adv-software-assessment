# SWEA Bank App (Software Engineering Assessment)

## Deliverables for Assessment
#### User Stories - located in user-stories folder
#### UML Diagrams (class and sequence diagrams) - located in uml-diagrams folder
#### Gannt Chart (for two iterations in project) - located in gannt-chart folder
#### Web App Screenshots - located in app-screenshots folder
#### Test Cases - located in test-cases folder
Two iterations were performed for the testing phase, the first iteration details some pass and fail cases

The second iteration details the pass cases after fixing issues/bugs in the code

#### Figma Designs Iterations - located in figma-designs folder
The first system design iteration produced a Figma document which had too many pages that resulted in too many clicks to perform a task (SWEA-WebDesign-Initial-Draft-ver1.pdf)

Adopting a simplicity approach in UX design in the second iteration, a UI design final draft was produced (SWEA-WebDesign-FinalDraft-ver2.pdf)

#### Final Figma UI Designs can also be found in the URL - [Banking App Final Figma Designs](https://www.figma.com/file/bQk4TIEbEjfCyA4FCpPhDp/Draf2?node-id=0-1)


#### React Front-End - located in src and public folder

#### React Project Dependencies - located in package.json file

#### React Environment Variables - located in .env file

#### Python Back-End and Database - located in sweabankapp folder

## Development Stack Versions
Python 3.11.2

Django 4.1.7

--------------------------------------------------
JavaScript ES6+

React 18.1.0

## To run the front-end application 
Clone the project from [Github Repo](https://github.com/Adv-Software-Eng-Assessment/adv-software-assessment.git)

Change directory to root folder of project

Run npm install to install project dependencies

Run npm start to run project Node server

Open https://localhost:3000 to view the application

You can also remove BROWSER=none from the .env file and re-run npm start to automatically open the browser with https://localhost:3000

## (Optional) You can run the project in a virtual environment by following below
### (Optional) Create a virtual environment to isolate our package dependencies locally
python3 -m venv env

Run activate.bat file (if on Windows environment)

## To run the back-end application
Change directory to sweabankapp 

## Install Django and Django REST framework
pip install django

pip install djangorestframework

python -m pip install django-cors-headers

python manage.py runserver

Http requests are proxied to http::/localhost:8000

[Django Foreign Key Docs](https://docs.djangoproject.com/en/4.1/intro/tutorial02/)

[Django CORS Header Solution](https://github.com/adamchainz/django-cors-headers)
# SWEA Bank App (SOftware Engineering Assessment)

## Deliverables for Assessment
### User Stories - located in user-stories folder
### UML Diagrams - located in uml-diagrams folder
### Gannt Chart (for two iterations in project) - located in gannt-chart folder
### Web App Screenshots - located in app-screenshots folder
### Test Cases - located in test-cases folder
### Figma Designs - located in figma-designs folder

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
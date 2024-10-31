# HOME TEST with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run Project Locally

- Clone project to your local: `git clone https://github.com/htn0810/hometest.git`
- Install all packages: `npm install`
- Start project: `npm start`

## Explanation

- Prepare dummy data.
- Setup a JSON server with dummy data and deploy on Render: [BE server](https://jsonserverec.onrender.com)
- Setup FE project with **Create React App**, **TailwindCss**, **TypeScript**, **React Router Dom**, **React Context API**.
- Build all components without any UI Library.
- Use Context API to store global state and store cart's products on LocalStorage.
- Splitting Cart page and Products page.
- Responsive UI to compatible with desktop and mobile devices.
- Pagination products.
- Lazy loading image and show skeleton to improve UX.
- Search product on search bar will show results on a popup.
- Sorting as requirement.
- Filter as requirement. (but categories and rating is single choice because limitation of API)
- Haven't apply testing library.

## Production Deployment

[Production Deployment](htn-hometest.vercel.app)

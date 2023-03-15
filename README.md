# Web Application allowing to find Option RICs

Example Code Disclaimer: ALL EXAMPLE CODE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS FOR ILLUSTRATIVE PURPOSES ONLY. REFINITIV MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE EXAMPLE CODE, OR THE INFORMATION, CONTENT, OR MATERIALS USED IN CONNECTION WITH THE EXAMPLE CODE. YOU EXPRESSLY AGREE THAT YOUR USE OF THE EXAMPLE CODE IS AT YOUR SOLE RISK.

## Project Overview

Currently one cannot directly access expired options through a single API call. To get historical data on options, one will need to reconstruct options Refinitiv Identification Codes (RIC) following the logic of RIC construction rules and the rules specified by the exchange where the option is traded.
The current project is a React Web app which allows to reconstruct/find option RICs on equities and indices, including the ones which are expired. 

The current version covers the following exchanges:
* **US OPRA** - refer to RULES7, RULES2, RULES3, RULES4 in Workspace, and Guideline for strikes above 10000 in [MyRefinitiv](https://my.refinitiv.com/content/mytr/en/datanotification/DN099473.html).
* **EUREX** - refer to RULES2, RULES3, RULES4 in Workspace, and general option RIC structure in [MyRefinitiv](https://my.refinitiv.com/content/mytr/en/faqs/2016/09/000195632.html). 
* **Osaka Exchange** - refer to RULES2, RULES3, RULES4 in Workspace, and RIC structure for Osaka exchange in [MyRefinitiv](https://my.refinitiv.com/content/mytr/en/faqs/2014/10/000189842.html).
* **Stock Exchange of Hong Kong** - refer to RULES2, RULES3, RULES4 in Workspace, and RIC structure for HK exchange in [MyRefinitiv](https://my.refinitiv.com/content/mytr/en/faqs/2021/04/000198505.html).
* **Hong Kong Future Exchange** - refer to RULES2, RULES3, RULES4 in Workspace, and RIC structure for HK exchange in [MyRefinitiv](https://my.refinitiv.com/content/mytr/en/faqs/2021/04/000198505.html).
* **Intercontinental Exchange (ICE)** - refer to RULES2, RULES3, RULES4 in Workspace, and general option RIC structure in [MyRefinitiv](https://my.refinitiv.com/content/mytr/en/faqs/2016/09/000195632.html). 


In the scope of this project we use the [Refinitiv Data Library for Typescript](https://developers.refinitiv.com/en/api-catalog/refinitiv-data-platform/refinitiv-data-library-for-typescript) in the Backend to retrieve options data and prices. In the Frontend we use [Refinitiv Element Framework](https://ui.refinitiv.com/) for Refinitiv UI elements and [Workspace SDK](https://developers.refinitiv.com/en/api-catalog/workspace-sdk/workspace-sdk) to ensure the interoperability between our Web App and Refinitiv Workspace.

## Supported Web Browsers

The example supports Chrome/Microsoft Edge (Chrome-based version), Firefox, and IE11 (based on the WebSocket and Web Workers browser supported platform).

## Prerequisite
This example requires the following dependencies software.
1. [Node.js](https://nodejs.org/en/) runtime which also includes[npm](https://www.npmjs.com/) package manager - tested on 18.15.0, 
2. [MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/) - tested on 6.0.5.

The project is build using [Node.js](https://nodejs.org/en/) in backend and [React.js](https://reactjs.org) the frontend. We are using [MongoDB](https://www.mongodb.com) to store reconstructed options RICs and metadata. The project includes complete TypeScript source codes, a simple Express.js web server application file, CSS files, and all required static dependencies. All dynamic dependencies for compiling and building source files are defined in package.json files respectively for backend and for the frontent. These dependencies can be installed via ```npm install``` command.

## Project Structure

The project includes the following files and folders:

* backend/folder
   * src/folder
     * APIRequests/folder - folder includes functions for requesting data from Refinitiv APIs, particularly it uses the historical pricing, symbol conversion and search (with navigators) capabilities of RD Library for Typescript.
     * Common/folder - folder contains the session.ts file which will allow the creating and opening API sessions for data requests.
     * getRICExchanges/folder - folder includes separate functions to construct RICs from the abovementioned 6 exchanges.
     * helper/folder - folder contains helper functions for getting experation month for OPRA traded options and check the reconstructed RICs.
     * models/folder - folder includes a function which defines mongoose schema for storing reconstructed RICs and metadata.
     * routes/folder - folder contains express routes for the web application.
     * schemas/folder - folder contains a Joi schema for the form we are using to construct option RIC.
     * utils/folder - folder contains utility functions for catching async requests and handling express errors.
     * ***app.ts*** - application file to connect to MongoDb and run the server
     * ***getOptionRIC.ts*** - main function which is called after submitting RIC constructer request. This function first checks in which exchanges options on the required asset are traded and calls the respective exchange specific functions for RIC construction.
     * ***session.config.json*** - file to store API credentials for opening API session.
   * ***package.json*** - project's NPM dependencies file for the backend
   * ***rdplibconfig.prod.json*** - rdp configuration file
   * ***tsconfig.json*** - typescript configuration file for the backend
* frontent/folder
  * public/folder - folder contains public html file
  * src/folder
    * components/folder - folder contains web application pages, including the main pages and footer, header.
    * helper/folder - folder contains helper functions to create datatables, charts and handle click, delete events. Additionally, it contains ***workspace-sdk-services.ts*** file which initializes side by side service and defines functions to open and/or broadcast Refinitiv Workspace pages.
    * ***app.css*** - CSS file for the project
    * ***index.tsx*** - file to create the React root element and render React pages.
    * ***reportWebVitals.ts***
    * ***session.config.json*** - file to store API credentials for opening API SxSSession.
  * ***package.json*** - project's NPM dependencies file for the frontend 
  * ***tsconfig.json*** - typescript configuration file for the frontend
      
 
## How to run this example application
1. Make sure you have installed the dependency software, such as Node JS and Mongo DB.
1. Unzip or download the example project folder into a directory of your choice 
2. Run ```$> npm install``` in the command prompt to install all the dependencies required to run the sample in a subdirectory called *node_modules/*. Please note that you may need to run ```$> npm install``` in both backend and frontend folders to install dependencies for thw backend and frontend respectively.

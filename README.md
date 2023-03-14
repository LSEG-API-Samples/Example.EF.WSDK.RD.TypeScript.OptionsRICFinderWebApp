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

1. [Node.js](https://nodejs.org/en/) runtime
2. [npm](https://www.npmjs.com/) package manager (included in Node.js)
3. [TypeScript](https://www.typescriptlang.org) compiler (will be installed via ```npm install``` command)
4. https://reactjs.org/docs/getting-started.html

The project includes complete TypeScript source codes, a simple Express.js web server application file, CSS files, and all required static dependencies. All dynamic dependencies for compiling and building source files are defined in package.json files respectively for backend and for the frontent. These dependencies can be installed via npm install command.

## Project Structure

The project includes the following files and folders:

* backend/folder
  * src/folder
    * APIRequests/folder
      * getExchanges.ts
      * getHistPrices.ts
      * getSymbol.ts
    * Common
      * session.ts
      * 

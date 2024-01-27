

# Bhavcopy BSE Website Node.js

## Overview

This Node.js project is designed to fetch Bhavcopy data from the Bombay Stock Exchange (BSE) website. Bhavcopy is a daily snapshot of the trading activities in the stock market, providing information about the opening, closing, high, and low prices of various securities.

## Features

- **Web Scraping**: Utilizes web scraping techniques to extract Bhavcopy data from the BSE website.
- **Node.js and Axios**: Powered by Node.js for server-side JavaScript execution and Axios for making HTTP requests.
- **CSV Export**: Saves the fetched data in CSV format for easy analysis and integration with other tools.

## Prerequisites

Make sure you have Node.js and npm installed on your machine.

## Installation
please run all api in postman api development tool
1. first download the zip format of the code from github
2. 2.install all npm package install in this project by running the command "npm i" in terminal
3. then in terminal type the command npm start to start the server so that we can perform the following api's.
4. the first api have to run is "http:/localhost:3000/loadStocksData" so the file is download from bse website and get stored the data of it stores in monodb server
5. then wde can find the top 10 stock from that list by using this querry
   api is ="http:/localhost:3000/top_10_stocks" it is an get api.
6. the next is post  API  to find the stock from the database by supply stockname in body and its format is raw in json format
7. api is ="http://localhost:3000/search_by_name"
   eg;{
    "stockname": "ANSAL INFRAS"
}
then you will get the information regarding the stock

6.the next is post  API  for add stocks in favorite  from the database by supply stockname in body and its format is raw in jason format
   eg;the next is post  API  to find the stock from the database by supply stockname in body and its format is raw in json format
    api is="http://localhost:3000/add_stock_in_favourite"
   eg;{
    "name": "ABB LTD."
}

then you will get the information that
 "msg": "Stock Added to Favourite Stock Successfully",
    "status": true

    7.the next is get  API  for finding all favourites stocks that we added in our favorite database  
    api is="http://localhost:3000/all_favourite_stocks"
   

then you will get the data of all favourite added stocks 
8.the next is post  API  for delete the  favorite  from the database by supply stockname in body and its format is raw in jason format
   eg;the next is post  API  to find the stock from the database by supply stockname in body and its format is raw in json format
    api is="http://localhost:3000/delete_stock_from_favourite"
   eg;{
    "name": "ABB LTD."
}

then you will get the information that
 {
    "msg": "Stock Deleted from Favourite Stock Successfully",
    "data": {
        "acknowledged": true,
        "deletedCount": 1
    },
    "status": true
}
so it is all about how to run the project
than you.


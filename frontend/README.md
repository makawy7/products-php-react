# Products App

This frontend application is built with React and TypeScript. It serves as the user interface for the Products API.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features

- List all products
- Create new products
- View product details
- Delete products

## Installation

1. Clone the repository to your local machine:
   `git clone https://github.com/makawy7/products-php-react.git`
2. Navigate to the project directory:
   `cd products-php-react/frontend`
3. Install the dependencies using npm:
   `npm install`
4. Copy the .env.example file as .env and update the API base URI:
   `cp .env.example .env`

```int
REACT_APP_API_BASE_URL=http://localhost:1000/api

```

5. Make sure the backend API is up and running. (Follow the instructions in the backend API repository's README.md)

## Usage

1. Start the development server:
   `npm start`
2. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the application.

## Project Structure

The main components of the project are organized as follows:

- `src/components`: Contains reusable UI components
- `src/constants`: Contains constant values and configurations
- `src/pages`: Contains the main pages of the application
- `src/types`: Contains TypeScript type definitions
- `src/utils`: Contains utility functions

# User Management System Frontend

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)


This project is a user and access permission management system built with React, Next.js, and TypeScript. It serves as the frontend for managing user profiles and permissions. The application consumes the [QQ Management API](https://github.com/emanuelmarcolongo/qq-management-api) and is part of a full-stack solution.

## Features

- User authentication and authorization.
- Management of user profiles and roles.
- Dynamic permission assignment.
- Responsive design for various devices.
- Integration with the QQ Management API.

## Technologies Used

- **React**: For building the user interface.
- **Next.js**: For server-side rendering and routing.
- **TypeScript**: For type safety and improved developer experience.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/emanuelmarcolongo/qq-management-front.git
cd qq-management-front
```

### Connect with the API

Run the API in [QQ Management API](https://github.com/emanuelmarcolongo/qq-management-api)

### Environment Variables

Create a .env.local file in the root directory and add the following variables:

NEXT_PUBLIC_API_URL=https://api.example.com

Where `https://api.example.com´ is the address from the API.


### Install de depencies

```bash
npm install
or
yarn install
```

### Run the Project

```bash
npm run dev
```

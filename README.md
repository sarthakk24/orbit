# Orbit Problems

## Introduction

Orbit Problems is a web application built using Node.js, TypeScript, and Express framework. It provides a platform for hosting and solving coding problems related. The application allows users to register, login, solve coding problems, and track their progress.

## Submission Files

-   [GitHub Repository](https://github.com/sarthakk24/orbit)
-   [Postman Documentation Link](https://documenter.getpostman.com/view/11197946/2s946eADbv)

## Technology Implemented

-   Node.js
-   TypeScript
-   Express (Framework)
-   MongoDB (Database)
-   Sphere Engine (Compiler and problems Hosting)
-   AWS SES (Mailing)
-   AWS EC2 (Hosting)
-   AWS ALB (Load Balancing)
-   Docker (Containerizing)
-   Json Web Token (Authentication)
-   Axios (REST API)
-   Yup (Validation)

## Socials

-   LinkedIn - [Sarthak Sachdeva](https://www.linkedin.com/in/sarthakk24/)
-   GitHub - [sarthakk24](https://github.com/sarthakk24)
-   Twitter - [sarthakk73](https://twitter.com/sarthakk73)
-   Resume - [Sarthak_Sachdeva_Resume.pdf](https://sarthakk24.s3.ap-south-1.amazonaws.com/Sarthak_Sachdeva_Resume.pdf)

## Local Setup

### To start the project locally without Docker:

1. Clone the GitHub repository:

    ```bash
    git clone https://github.com/sarthakk24/orbit
    cd orbit
    ```

2. Install dependencies:

    ```bash
    yarn | npm run install
    ```

3. Create a .env file and provide the following environment variables:

    ```dotenv
    PORT=5050
    MONGODB_URI=""
    MONGODB_NAME=""
    JWT_SECRET=""
    AWS_ACCESS_KEY_ID=""
    AWS_SECRET_ACCESS_KEY=""
    AWS_DEFAULT_REGION="ap-south-1"
    EMAIL_REPLY_TO=""
    EMAIL_FROM=""
    SPHERE_ACCOUNT_ID=""
    SPHERE_PROBLEM_API_KEY=""
    SPHERE_COMPILERS_API_KEY=""

    ```

4. Start the server::
    ```bash
    yarn start
    ```

### To start the project locally without Docker:

1. Clone the GitHub repository:

    ```bash
    git clone https://github.com/sarthakk24/orbit
    cd orbit
    ```

2. Build the Docker container::

    ```bash
    docker build . -t orbit
    ```

3. Run the Docker container:

    ```bash
    docker run -d --name orbit -e MONGODB_URI="" -e JWT_SECRET="" -e AWS_ACCESS_KEY="" -e AWS_SECRET_ACCESS_KEY="" -e AWS_DEFAULT_REGION="ap-south-1" -e EMAIL_REPLY_TO="" -e EMAIL_FROM="" -e SPHERE_ACCOUNT_ID="" -e SPHERE_PROBLEM_API_KEY="" -e SPHERE_COMPILERS_API_KEY="" -p 8080:8080 orbit
    ```

4. server will start at port 8080

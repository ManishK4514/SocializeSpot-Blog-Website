    Last updated on: 16th March 2024

![Screenshot (566)](https://github.com/ManishK4514/SocioDot/assets/108109935/511eb8f0-530f-4731-aa80-87dc396ae21e)
![Screenshot 2024-03-16 183935](https://github.com/ManishK4514/SocioDot/assets/108109935/11388e5d-c077-4c3c-a282-954389dff70d)

# [SocializeSpot: A Blog Web-App](https://socializespot.vercel.app/)

![line]

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack Used](#tech-stack-used)
- [Installation](#installation)
- [Preview](#preview)

![line]

## Introduction

- SocializeSpot is a full-stack blog application that allows users to connect with others, and share posts, with titles, thumbnails, and content that contains images, and text editors with a rich interface, allows users to comment on blogs, view other's blogs, and view your created blogs. The project utilizes and incorporates full-stack authentication and authorization.

![line]

## Features

- **User Authentication**: Users can create an account, log in, and log out securely. This ensures that user data and interactions are protected.

- **User Authorization**: Proper authorization mechanisms are implemented to ensure that users can only access and modify their data. This prevents unauthorized access and protects user privacy.

- **Post Creation**: Users can create and publish posts, including titles, thumbnails, and content that will contain images, and text in different format structures like heading, paragraph, bold text, italic, different alignment and many more with rich text editor interface. This allows users to share their thoughts, experiences, and media content with others.

- **Image Upload**: Users can upload images to accompany their posts. The application handles image uploads securely and efficiently, allowing users to enrich their posts with visuals.

- **Comment Functionality**: Users can comment on blogs to engage in conversations and show appreciation for shared content. This fosters social interaction and community engagement within the application.

![line]

## Tech Stack Used

- MongoDB: Database
- Next.js: Framework 
- NextAuth: Authentication
- Thumbnail Upload: Cloudinary API
- Tiny MCE: Text editor
- Formik: Form validation and inputs
- Git & Github: Version Control
- Vercel: Hosting

 ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)  ![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) 


![line]

## Installation

To set up and run the SocioDot application locally, follow these steps:

- Clone the repository:

      git clone [https://github.com/ManishK4514/SocializeSpot-Blog-Website.git]
    
- Install the dependencies:

      npm install
  
- Configuration 

Create a .env file in the server directory and provide the necessary environment variables, such as the MongoDB connection URL and the desired port number:

      PORT= your-port (e.g: 3001)
      GOOGLE_CLIENT_ID = 'Your_google_client_id'
      GOOGLE_CLIENT_SECRET = 'Your_google_client_secret'
      GITHUB_CLIENT_ID = 'Your_github_client_id'
      GITHUB_CLIENT_SECRET = 'Your_github_client_secret'
      MONGODB_URI = 'Your_mongodb_uri'
      NEXT_PUBLIC_BASE_URL = 'Your_base_url'


- Starting the Application ▶️

      npm run dev

- Access the application 🌍

Open your web browser and visit `http://localhost:your_port(e.g: 3000)` to access the SocializeSpot

Please refer to the project's documentation or README files for detailed instructions on setting up and running the application locally.

![line]


## Preview
![Screenshot (566)](https://github.com/ManishK4514/SocioDot/assets/108109935/511eb8f0-530f-4731-aa80-87dc396ae21e)
![Screenshot 2024-03-16 183935](https://github.com/ManishK4514/SocioDot/assets/108109935/11388e5d-c077-4c3c-a282-954389dff70d)
![Screenshot 2024-03-16 183817](https://github.com/ManishK4514/SocioDot/assets/108109935/80ba8c25-2911-4580-bad0-4631108258b8)
![Screenshot (567)](https://github.com/ManishK4514/SocioDot/assets/108109935/7a667ca0-bc60-4959-a7db-f88e24f9fb64)
![Screenshot (568)](https://github.com/ManishK4514/SocioDot/assets/108109935/501a5f09-565d-4c5e-876b-33fd6c9df5fd)
![Screenshot (572)](https://github.com/ManishK4514/SocioDot/assets/108109935/fe25d24a-27a6-4983-b6cb-98148f7ffbc0)
![Screenshot (571)](https://github.com/ManishK4514/SocioDot/assets/108109935/423e1983-56f3-4027-88c9-6433b6f7bbab)


[line]: https://user-images.githubusercontent.com/75939390/137615281-3a875960-92cc-407f-97fe-fd2319bdb252.png
[badges]: https://github.com/Ileriayo/markdown-badges

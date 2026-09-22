# URL Shortener

A simple full-stack URL Shortener built with the MERN stack.

The application allows users to convert long URLs into short, easy-to-share links. Each short URL redirects to the original URL while also tracking the number of clicks.

##  Features

- Shorten long URLs
- Generate unique 6-character short codes
- Redirect users to the original URL
- Track click counts
- View all created short URLs
- Copy short URLs to clipboard
- Open short URLs in a new tab
- Delete shortened URLs
- URL validation
- Supports HTTP and HTTPS URLs
- REST API architecture
- MongoDB database integration

---

##  Tech Stack

### Frontend

- React.js
- Vite
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Development Tools

- Git
- GitHub
- VS Code
- Postman

---

##  Project Structure

```text
url-shortener/
│
├── backend/
│   ├── src/
│   │   ├── controller/
│   │   │   └── url.controller.js
│   │   │
│   │   ├── models/
│   │   │   └── url.models.js
│   │   │
│   │   ├── routes/
│   │   │   └── url.route.js
│   │   │
│   │   ├── utils/
│   │   │   └── generateCode.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
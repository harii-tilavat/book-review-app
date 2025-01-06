# Book Review App 📚

A full-stack **Book Review App** built with modern technologies. The app allows users to add books, upload covers, write reviews, and manage their book collection. The project is divided into two parts: `client` (frontend) and `backend`.

Live URL: https://bookreviewhub.netlify.app/
---

## 🚀 Features

- **User Authentication**: Secure login and signup functionality.
- **Book Management**: Add, update, and view books with cover images.
- **Reviews**: Add and manage reviews for each book.
- **Pagination**: Paginated list of books for better performance.
- **Cloudinary Integration**: For secure image uploads.
- **Error Handling**: Consistent and centralized error responses.

---

## 🛠️ Tech Stack

### **Frontend (Client)**
- **React** (with Vite): Fast and modern React setup.
- **Tailwind CSS**: For beautiful and responsive styling.
- **Headless UI**: Accessible and reusable UI components.

### **Backend**
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Lightweight and fast web framework.
- **Prisma**: ORM for seamless database management.
- **MySQL**: Relational database for storing book and review data.
- **Cloudinary**: For image upload and storage.

## 🛠️ Backend Routes

### Authentication
- **`POST /api/register`**: Register a new user.  
- **`POST /api/login`**: Login an existing user.  

---

### Books
- **`GET /api/books`**: Get a paginated list of books.  
- **`POST /api/books`**: Add a new book.  
- **`PUT /api/books/:id`**: Update an existing book.  
- **`DELETE /api/books/:id`**: Delete a book by ID.  

---

### Reviews
- **`GET /api/reviews`**: Get all reviews for a book.  
- **`POST /api/reviews`**: Add a review for a book.  
- **`PUT /api/reviews/:id`**: Update a review by ID.  
- **`DELETE /api/reviews/:id`**: Delete a review by ID.  

---
### Drafts
- **`GET /api/drafts`**: Get list of drafts.
- **`POST /api/drafts`**: Create a new draft.
- **`GET /api/drafts/:id`**: Get a specific draft by ID.
- **`PUT /api/drafts/:id`**: Update a draft by ID.  
- **`DELETE /api/drafts/:id`**: Delete a draft by ID.  

---
### Genres
- **`GET /api/genres`**: Get all available genres.  

---

### Note
- Ensure you include the `Authorization` header with your access token for protected routes.
- Use appropriate HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) for each endpoint.


### ⚙️ Setup Instructions
 
---
### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies:
npm install

# Configure the .env file:
# Create a .env file in the backend directory with the following content:

PORT=8080
DATABASE_URL="postgresql-db-connection-url"
JWT_SECRET="your-secret-key"

CLOUD_NAME='cloudinary-cloud-name'
CLOUD_API_KEY='cloudinary-api-key'
CLOUD_API_SECRET='cloudinary-api-secret'

# Run prisma setup:
npm run dev:prisma

# Start the backend server:
npm start

```

### Frontend Setup

```bash
# Navigate to the client directory:
cd client

# Install dependencies:
npm install
# or
npm install -f

# Start the development server:
npm run dev
```
You're now ready to launch the Book Review App! 🚀
---

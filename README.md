# MegaBlog

A modern blogging platform built with React, Vite, Redux Toolkit, Appwrite, and Tailwind CSS. Features user authentication, post creation/editing, and a beautiful responsive UI. Ready for deployment on Vercel or Netlify.

## Tech Stack
- **React** – UI library
- **Vite** – Fast build tool
- **Redux Toolkit** – State management
- **React Router** – Routing
- **Tailwind CSS** – Styling
- **Appwrite** – Auth, database, file storage
- **React Hook Form** – Form management

## Features
- User authentication (sign up, login, logout)
- Create, edit, and delete blog posts
- Responsive and modern UI
- File/image upload for posts
- Protected routes for authenticated users

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd 12MegaBlog
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root and add your Appwrite credentials:
```
VITE_APPWRITE_URL=your-appwrite-endpoint
VITE_APPWRITE_PROJECT_ID=your-appwrite-project-id
VITE_APPWRITE_DATABASE_ID=your-appwrite-database-id
VITE_APPWRITE_BUCKET_ID=your-appwrite-bucket-id
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

### 6. Preview production build
```bash
npm run preview
```

## Deployment

### Deploy on Vercel or Netlify
- Connect your GitHub repo.
- Set the build command: `npm run build`
- Set the output directory: `dist`
- Add environment variables in the dashboard.
- Deploy!

## License
[MIT](LICENSE)

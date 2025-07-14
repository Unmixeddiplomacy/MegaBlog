# MegaBlog Setup Guide

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
VITE_APPWRITE_URL=your_appwrite_url_here
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=your_database_id_here
VITE_APPWRITE_COLLECTION_ID=your_collection_id_here
VITE_APPWRITE_BUCKET_ID=your_bucket_id_here
```

## Appwrite Setup

1. **Create an Appwrite Project**
   - Go to [Appwrite Console](https://console.appwrite.io/)
   - Create a new project
   - Copy the Project ID

2. **Create a Database**
   - In your project, go to Databases
   - Create a new database
   - Copy the Database ID

3. **Create a Collection**
   - In your database, create a new collection
   - Add the following attributes:
     - `title` (String, required)
     - `content` (String, required)
     - `featuredImage` (String, required)
     - `status` (String, required)
     - `userId` (String, required)
   - Copy the Collection ID

4. **Create a Storage Bucket**
   - Go to Storage in your project
   - Create a new bucket for images
   - Set appropriate permissions
   - Copy the Bucket ID

5. **Configure Authentication**
   - Go to Auth in your project
   - Enable Email/Password authentication
   - Configure any additional providers as needed

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the provided URL

## Features

- ✅ Modern, responsive UI with Tailwind CSS
- ✅ User authentication with Appwrite
- ✅ Create, read, update, and delete blog posts
- ✅ Rich text editor for post content
- ✅ Image upload and preview
- ✅ Mobile-friendly design
- ✅ Loading states and error handling
- ✅ Smooth animations and transitions

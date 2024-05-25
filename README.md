# TracknGo

## Introduction

TracknGo is a simple and effective system designed for bus operators to manage their buses, trips, drivers, and documents.

## Key Features

- **Bus Management:** Enables operators to add, track, and manage bus fleets.
- **Trip Scheduling:** Assists in the planning and management of bus schedules.
- **Driver Management:** Manages driver records and trip assignments.
- **Document Management:** Provides a secure method for storing and handling essential documents.
- **Reporting:** Offers the ability to generate comprehensive reports on bus usage and trip details.
- **Real-time Updates:** Delivers live updates on bus locations and operational status.

## Prerequisites

Before installation, ensure you have the following software installed:

- Node.js (LTS version)
- Yarn or npm

## Installation

Follow these steps to set up the project on your local machine:

1. **Fork the repository:** Start by forking the repository to your GitHub account.
2. **Clone the repository:** `git clone https://github.com/yourusername/trackngo.git`
3. **Navigate to the directory:** `cd trackngo`
4. **Set up environment variables:**
   - Copy the sample environment file: `cp .env.example .env`
   - Modify `.env` with necessary credentials:
     - `DATABASE_URL`: Connect to your PostgreSQL database.
     - `NEXTAUTH_SECRET`: A secure random string.
     - `NEXTAUTH_URL`: Your local or production domain.
     - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: For Google OAuth (setup via Google Developer Console).
5. **Database setup:** Run `npx prisma migrate dev` to set up your database schema.
6. **Install dependencies:** `npm install`
7. **Run the development server:** `npm run dev`

## Tech Stack

- **Frontend:** Next.js
- **Authentication:** NextAuth.js
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Styling:** Tailwind CSS and Shadow UI

Feel free to contribute to this project by submitting pull requests or suggesting new features, Thank you.

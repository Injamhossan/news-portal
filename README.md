# Daily Latest News (দৈনিক সর্বশেষ সংবাদ)

A dynamic and responsive news portal application built with Next.js, focusing on delivering the latest news across various categories with a clean, modern interface and a dedicated admin panel.

## 🚀 Features

-   **Dynamic News Content:** Read the latest news in categories like World, Politics, Sports, Technology, Business, Entertainment, Health, Education, and Crime.
-   **Breaking News Ticker:** Real-time scrolling ticker for urgent updates.
-   **Interactive Gallery:** Swipeable image galleries for news articles using Swiper.js.
-   **Admin Dashboard:** Secure admin panel to Add, Edit, and Delete news articles.
    -   Rich text content support (HTML).
    -   Image gallery management.
    -   Review "Breaking News" status and visibility.
-   **Social Sharing:** Integrated sharing buttons for Facebook, Twitter, LinkedIn, and more.
-   **Custom Typography:** Beautiful Bengali typography using the local `AnekBangla` font.
-   **Google Analytics & GTM:** Integrated tracking for user insights.
-   **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.

## 🛠️ Tech Stack

-   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Database:** [MongoDB](https://www.mongodb.com/)
-   **ODM:** [Mongoose](https://mongoosejs.com/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Carousel:** [Swiper](https://swiperjs.com/)
-   **Analytics:** Google Analytics & Google Tag Manager

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or pnpm
-   MongoDB Account (Atlas) or local instance

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Injamhossan/doiniksorboshesh.git
    cd doiniksorboshesh
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and add the following variables:

    ```env
    # Database Connection
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/doiniksorboshesh

    # API Configuration (Optional for localhost, required for separate backend)
    NEXT_PUBLIC_API_URL=http://localhost:3000

    # Admin Authentication (If using NextAuth or custom token)
    # NEXTAUTH_SECRET=your_super_secret_key
    # NEXTAUTH_URL=http://localhost:3000
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
doiniksorboshesh/
├── app/
│   ├── admin/          # Admin dashboard and CRUD pages
│   ├── api/            # Backend API routes (Next.js server)
│   ├── fonts/          # Local font files
│   ├── news/           # Public news details page
│   ├── layout.tsx      # Root layout with Fonts & Analytics
│   └── page.tsx        # Homepage
├── components/         # Reusable UI components (Navbar, Footer, Gallery, etc.)
├── lib/                # Utility functions (DB connection, etc.)
├── models/             # Mongoose database models
├── public/             # Static assets
└── style/              # Global CSS
```

## 📜 Scripts

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Runs ESLint for code quality.

## 🖼️ Image Configuration

The application is configured to allow images from the following external domains (in `next.config.ts`):
-   `i.ibb.co` / `i.ibb.co.com`
-   `drive.google.com`
-   `lh3.googleusercontent.com`
-   `docs.google.com`
-   `placehold.co`

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.

# BYU Basketball Roster 2025-26

An unofficial fan page tracking the BYU Cougars Basketball roster for the 2025-26 season. This application provides real-time updates on player commitments, transfers, and team depth chart.

🔗 **Live Site**: [byu.christianfurr.dev](http://byu.christianfurr.dev/)

## Features

- 📋 **Complete Roster Management**: View and manage current players, transfers, and former players
- 🏀 **Depth Chart**: Interactive depth chart showing starters and backups by position (PG, SG, SF, PF, C)
- 🔄 **Player Status Tracking**: Track player statuses including commitments, transfers, and departures
- 👤 **Player Profiles**: Detailed player information including:
  - Jersey number
  - Position
  - Height
  - Year/Class
  - Hometown
  - Previous school/high school
  - Statistics
- 🔐 **Admin Dashboard**: Secure admin panel for managing players and roster data
- 📱 **Responsive Design**: Fully responsive UI that works on all devices
- 🌙 **Dark Mode**: Built-in theme switching support
- 🔍 **SEO Optimized**: Enhanced with structured data and meta tags for better search visibility
- 📊 **Analytics**: Integrated with Google Analytics, PostHog, and Vercel Analytics

## Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

### Backend
- **Database**: PostgreSQL via [Prisma ORM](https://www.prisma.io/)
- **Authentication**: JWT-based authentication with bcrypt
- **API**: Next.js API Routes

### Analytics & Monitoring
- **Analytics**: Google Analytics, Vercel Analytics
- **Product Analytics**: PostHog
- **Performance**: Vercel Speed Insights

### Deployment
- **Platform**: [Vercel](https://vercel.com/)
- **Runtime**: Bun

## Prerequisites

Before you begin, ensure you have the following installed:
- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- PostgreSQL database
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/christianfurr/byu-basketball.git
   cd byu-basketball
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/byu_basketball"
   DIRECT_URL="postgresql://user:password@localhost:5432/byu_basketball"
   
   # Authentication
   JWT_SECRET="your-secret-key-here"
   
   # Analytics (Optional)
   NEXT_PUBLIC_GA_ID="your-google-analytics-id"
   NEXT_PUBLIC_POSTHOG_KEY="your-posthog-key"
   NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
   
   # SEO (Optional)
   GOOGLE_SITE_VERIFICATION="your-google-verification-code"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   bunx prisma generate
   
   # Run migrations
   bunx prisma migrate dev
   
   # Seed the database (optional)
   bun run db:seed
   ```

5. **Run the development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run db:seed` - Seed database with initial data

## Project Structure

```
byu-basketball/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── privacy/           # Privacy policy page
│   ├── terms/             # Terms of service page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── lib/                   # Utility functions and configurations
│   ├── auth.ts           # Authentication utilities
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema and migrations
│   └── schema.prisma     # Prisma schema definition
├── public/               # Static assets
└── styles/               # Global styles
```

## Database Schema

The application uses two main models:

### Player Model
Stores information about basketball players including:
- Personal details (name, height, year, hometown)
- Jersey number and position
- Status (current/former player)
- Transfer information
- Statistics
- Profile images

### DepthChart Model
Manages the team depth chart with:
- Position assignments (PG, SG, SF, PF, C)
- Starter and backup players (up to 2 backups per position)
- Timestamps for updates

## Admin Features

The admin dashboard (`/admin`) provides:
- Player CRUD operations
- Depth chart management
- Former players tracking
- Dashboard statistics
- Bulk player management tools

Access is protected by JWT authentication. Default credentials can be set up during database seeding.

## Deployment

This application is optimized for deployment on Vercel:

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**
   - Import your repository in Vercel
   - Configure environment variables
   - Deploy!

Alternatively, you can deploy using:
```bash
vercel deploy
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `DIRECT_URL` | Direct PostgreSQL connection (for migrations) | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | No |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog API key | No |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host URL | No |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification | No |

## Contributing

This is a personal fan project, but contributions are welcome! Please feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License

This is an unofficial fan page and is not affiliated with BYU Athletics or Brigham Young University.

## Author

**Christian Furr**
- Website: [christianfurr.dev](https://christianfurr.dev)
- Twitter: [@christianfurr](https://twitter.com/christianfurr)

## Acknowledgments

- BYU Athletics for inspiration
- The BYU Basketball community
- All contributors and supporters

---

**Note**: This is an unofficial fan project created to track and share BYU Basketball roster information. It is not endorsed by or affiliated with Brigham Young University or BYU Athletics.

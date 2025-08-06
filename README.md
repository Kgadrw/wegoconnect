# WegoConnect - Starlink Internet Provider Rwanda

A modern, responsive website for WegoConnect, Rwanda's premier Starlink internet service provider. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Responsive Design**: Optimized for all devices and screen sizes
- **Fast Performance**: Built with Vite for lightning-fast development and builds
- **TypeScript**: Full type safety for better development experience
- **Tailwind CSS**: Utility-first CSS framework for consistent styling

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Build Tool**: Vite
- **Routing**: React Router
- **State Management**: TanStack Query
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd connect-rwanda-hub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navigation.tsx  # Main navigation
│   ├── Hero.tsx        # Hero section
│   ├── Products.tsx    # Products showcase
│   ├── Services.tsx    # Services section
│   ├── About.tsx       # About section
│   ├── Footer.tsx      # Footer component
│   └── ...
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

### Recommended Hosting

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- **Company**: WegoConnect
- **Email**: info@wegoconnect.rw
- **Location**: Kigali, Rwanda

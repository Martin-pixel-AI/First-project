# Task Board

A Trello-like task management platform for small teams, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Project management with vertical project layout
- Task organization in horizontal columns
- Subtasks support
- Comments and user mentions
- Deadlines and reminders
- Tags/categories
- Drag & drop functionality
- Google Calendar and Slack integrations
- Real-time editing
- OAuth authentication (Google & GitHub)
- Multilingual support
- Responsive design
- Dark mode

## Tech Stack

- Frontend: Next.js 14 with App Router
- UI: Tailwind CSS, shadcn/ui
- State Management: Zustand
- Real-time: Socket.io
- Authentication: NextAuth.js
- Database: PostgreSQL
- Deployment: Netlify

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-board.git
cd task-board
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable UI components
├── lib/             # Utility functions and configurations
├── store/           # Zustand store definitions
├── types/           # TypeScript type definitions
└── styles/          # Global styles and Tailwind config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
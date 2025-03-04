# Event Capture

Event Capture is a web application that enables users to collect lossless images from events through multiple perspectives. By utilizing QR code sharing, guests can effortlessly upload their photos, which are then organized within an intuitive dashboard.

## Highlights

- **Multi-Perspective Image Collection**: Guests can upload photos from various viewpoints, ensuring comprehensive event coverage.
- **QR Code Sharing**: Simplifies the photo submission process for attendees.
- **User-Friendly Dashboard**: Provides organizers with an organized view of all submitted images.

## Tech Stack

| Category       | Technology                       |
| -------------- | -------------------------------- |
| Framework      | Next.js 14                       |
| Language       | TypeScript                       |
| Styling        | Tailwind CSS                     |
| UI Components  | Shadcn/ui                        |
| Code Quality   | ESLint, Prettier                 |
| Database       | PostgreSQL, Drizzle ORM          |
| Authentication | NextAuth.js with Drizzle Adapter |
| Storage        | Cloudflare R2                    |
| Email          | React Email                      |

## Core Features

- **Image Uploads**: Guests can submit photos via QR code links.
- **Dashboard**: Organizers can view and manage uploaded images.
- **Secure Authentication**: Ensures only authorized access to event data.

## Architecture Overview

Event Capture utilizes a modern architecture with a unified codebase:

- **Application Layer**: Built entirely with Next.js 14, serving both frontend and backend functionalities through API routes and server-side logic.
- **Database**: PostgreSQL with Drizzle ORM for efficient data management.
- **Storage**: Cloudflare R2 for reliable image storage.
- **Authentication**: NextAuth.js with Drizzle Adapter for secure user sessions.

## Challenges & Solutions

- **Scalability**: Implemented efficient data handling to manage large volumes of images.
- **User Experience**: Designed an intuitive interface for both guests and organizers.
- **Security**: Ensured data protection through robust authentication and storage practices.

## Contributing

While MyGPT is currently a private project, contributions and feedback are always welcome. Feel free to reach out if you're interested in collaborating.

## License

This project is private and not available for public use without permission.

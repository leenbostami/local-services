# Mobile App

A cross-platform mobile application built with **React Native, Expo, and TypeScript**. The application is designed to connect with local services and provide users with a seamless mobile experience on iOS and Android.

## Tech Stack

### Core

- **React Native 0.88** – Cross-platform mobile development.
- **React 19** – UI development.
- **Expo SDK 58** – Development and native application tooling.
- **TypeScript 6** – Static typing and type safety.
- **Expo Router** – File-based navigation and routing.

### UI & Styling

- **Expo Image** – Optimized image rendering.
- **Expo Linear Gradient** – Gradient backgrounds and visual effects.
- **React Native SVG** – SVG graphics and custom illustrations.
- **React Native Safe Area Context** – Safe area handling.
- **Expo Symbols** – Native-style icons and symbols.
- **Google Fonts**
  - Cairo
  - Plus Jakarta Sans

### Storage & Native Features

- **Expo Secure Store** – Secure local data storage.
- **Expo Constants** – Access application configuration.
- **Expo Linking** – Deep linking and URL handling.
- **Expo Splash Screen** – Splash screen management.
- **Expo Status Bar** – Status bar customization.

### Development Tools

- ESLint 9
- Prettier 3
- TypeScript 6
- eslint-config-expo
- eslint-config-prettier

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- pnpm / npm
- Expo Go (for physical device testing)
- Android Studio (for Android development)
- Xcode (for iOS development on macOS)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the mobile directory:

   ```bash
   cd mobile
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

   Alternatively:

   ```bash
   npm install
   ```

### Run the Application

Start the Expo development server:

```bash
pnpm start
```

Run on Android:

```bash
pnpm android
```

Run on iOS:

```bash
pnpm ios
```

Run on Web:

```bash
pnpm web
```

## Available Scripts

| Script              | Description                                    |
| ------------------- | ---------------------------------------------- |
| `pnpm start`        | Start the Expo development server.             |
| `pnpm android`      | Run the application on Android.                |
| `pnpm ios`          | Run the application on iOS.                    |
| `pnpm web`          | Run the application in a web browser.          |
| `pnpm lint`         | Run ESLint to check code quality.              |
| `pnpm format`       | Format the codebase using Prettier.            |
| `pnpm format:check` | Check code formatting without modifying files. |

## Project Structure

The application uses **Expo Router** for file-based navigation.

```text
mobile/
├── app/                  # Application routes and screens
├── assets/               # Images, fonts, and static assets
├── components/           # Reusable UI components
├── constants/            # Application constants
├── hooks/                # Custom React hooks
├── services/             # API and external service integrations
├── types/                # TypeScript types and interfaces
├── utils/                # Helper functions and utilities
├── app.json              # Expo application configuration
├── eslint.config.js      # ESLint configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
└── README.md
```

_Note: Adjust the structure above to match the actual repository directories._

## Code Quality

The project uses ESLint and Prettier to maintain consistent code quality and formatting.

Run linting:

```bash
pnpm lint
```

Format the code:

```bash
pnpm format
```

Check formatting:

```bash
pnpm format:check
```

## Application Configuration

Expo application settings are managed through `app.json` or `app.config.ts`.

Make sure to configure the application name, package identifiers, icons, splash screen, and other platform-specific settings before building production releases.

## Platform Support

- Android
- iOS
- Web

## License

This project is private and intended for internal use.

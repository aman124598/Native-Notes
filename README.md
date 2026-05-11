# Native Notes App

A beautifully designed, responsive React Native (Expo) notes application. Built with a focus on immersive UI, seamless local persistence, and fluid navigation.

## Features

- **Immersive UI:** A unified abstract header using ImageBackground and custom styling across all screens.
- **Custom Color Palette:** Beautiful, responsive light and dark themes featuring our signature Accent Blue (#4E33FF) and Accent Yellow (#FFD633).
- **Floating Action Button (FAB):** Quick and easy one-tap access to note creation straight from the clean list view.
- **Persistent Data:** Leverages @react-native-async-storage/async-storage so you never lose a thought.
- **Responsive Layout:** Dynamic horizontal padding that adapts to tablet and larger screen sizes organically.
- **Routing:** Powered by Expo Router using a seamless Stack-based navigation flow, providing a true native feel without the clutter of tab bars.

## Getting Started

1. **Install Dependencies:**
   ``bash
   npm install
   ``

2. **Start the Development Server:**
   ``bash
   npx expo start
   ``

Open the app using Expo Go on your physical device, or run it on an iOS Simulator or Android Emulator.

## Project Structure

Developed without the overhead of unused boilerplate, ensuring a clean and focused codebase:

- /src/app/index.tsx - The home screen displaying the grid of notes and the FAB.
- /src/app/create_notes.tsx - The editor screen to write, edit, and save notes.
- /src/app/view_note.tsx - The read-only full-screen view for your thoughts.
- /src/constants/theme.ts - Centralized aesthetic values and dark/light color configuration.

## Technologies Used

- React Native
- Expo & Expo Router
- React Native Async Storage
- Feather Icons

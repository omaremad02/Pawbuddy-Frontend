# Pawbuddy Frontend

Pawbuddy Frontend is a dynamic and intuitive user interface for managing pet shelters. It empowers administrators to manage pets, settings, and user support through a clean, responsive, and visually appealing dashboard.

## Technology Stack
- **React:** Component-based structure for modular and scalable UI.
- **React Router:** For seamless navigation between pages.
- **Framer Motion:** Smooth page transitions and animations.
- **CSS Modules:** Scoped styling for components to ensure clean and maintainable code.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pawbuddy-frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd pawbuddy-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Navbar.jsx
│   │   ├── Table.jsx
│   └── pages/
│       ├── HomePage/
│       ├── LoginPage/
│       ├── ApplyPage/
│       ├── ShelterDashboard/
│       │   ├── ShelterDashboard.jsx
│       │   ├── ShelterDashboard.module.css
│       │   ├── SettingsPage.jsx
│       │   ├── SettingsPage.module.css
│       │   ├── HelpPage.jsx
│       │   ├── HelpPage.module.css
├── App.js
```

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your preferred hosting platform (e.g., Netlify, Vercel).
   
3. Navigate to src folder:
   cd src
   
4. Run the application:
   npm start


// src/app/Document.tsx
import styles from "./styles.css?url";
import React from "react";

export const Document: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="no">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Flexroom</title>
      <link rel="modulepreload" href="/src/client.tsx" />
      <link rel="stylesheet" href={styles} />
    </head>
    <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
      {/* 🌟 Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
            Flexroom
          </a>
          <div className="flex gap-6 text-sm font-medium">
            <a href="/" className="hover:text-blue-600">Hjem</a>
            <a href="/rooms" className="hover:text-blue-600">Rom</a>
            <a href="/login" className="hover:text-blue-600">Logg inn</a>
            <a href="/admin" className="hover:text-blue-600">Admin</a>
          </div>
        </nav>
      </header>

      {/* 💡 Sideinnhold */}
      <main className="flex-grow">{children}</main>

      {/* 🧭 Footer */}
      <footer className="mt-10 border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Flexroom — laget med ❤️ og Tailwind CSS
        </div>
      </footer>

      <script type="module">import("/src/client.tsx")</script>
    </body>
  </html>
);

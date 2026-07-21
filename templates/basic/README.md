# Kirie Basic

A minimal Kirie project using GDScript, Vite, and the text IPC lane.

## Setup

Install JavaScript dependencies and check the local Godot environment:

```sh
pnpm install
pnpm kirie doctor
```

Start a development session:

```sh
pnpm dev
```

Build the web application into `src-web/dist`:

```sh
pnpm build
```

This template does not include C#, export presets, Godot CEF, or another
optional desktop WebView backend. Add platform export presets and optional
backends only when the project needs them.

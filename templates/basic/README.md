# Kirie Basic

A minimal Kirie project using GDScript, Vite, and the text IPC lane.

## Setup

Install JavaScript dependencies and check the local Godot environment:

```sh
pnpm install
pnpm kirie doctor
```

For desktop development, install the pinned Godot CEF backend:

```sh
pnpm kirie doctor --fix godot-cef
```

Start a development session:

```sh
pnpm dev
```

Build the web application into `src-web/dist`:

```sh
pnpm build
```

This template commits no C#, no Godot CEF, and no other optional desktop WebView
backend. It commits presets for `Windows Desktop`, `macOS`, `Linux/X11`,
`Android`, and `iOS`; the desktop ones need Godot CEF, which the setup step above
installs.

## Export

The desktop presets package the built web application from `src-web/dist`, so
build it first:

```sh
pnpm build
mkdir -p dist/windows
godot --headless --export-release "Windows Desktop" dist/windows/KirieBasic.exe
```

Godot does not create the export directory, so create it first. `Linux/X11`
works the same way, and `macOS` writes a `.app` bundle inside a zip.

The macOS preset signs the bundle with the system `codesign` tool and an ad-hoc
identity, which is Godot's macOS default, so it needs the Xcode command line
tools on the machine that exports; without them the export fails instead of
falling back. The result launches locally and passes
`codesign --verify --deep --strict`, and Godot embeds the entitlements Chromium
Embedded Framework needs. An ad-hoc signature still does not satisfy Gatekeeper
elsewhere: set `codesign/identity` to a Developer ID identity and enable
notarization before distributing the app. Exporting from a Windows or Linux
editor cannot sign at all, because those builds have no code-signing modes.

`Android` export also needs an Android SDK, a JDK, and the Android build
template. Pass `--install-android-build-template` together with the export flags
in one command, or let `kirie export --platform android` do it. The preset
enables Gradle builds for the Kirie plugin and requests `INTERNET`, which
`kirie dev android` requires. `iOS` export requires macOS and a signing team, so
fill in `application/app_store_team_id`; the App Store icon comes from
`icons/icon_1024x1024`.

The template ships Godot's official logo as `icon.png`. It is a placeholder for
the project icon, the iOS App Store icon, and the Android launcher fallback:
replace it before shipping anything, and keep the file at 1024×1024 for the App
Store. Godot's logo is licensed CC BY 4.0.

Replace the placeholder identifier `com.example.kirie.basic` before shipping: it
is the Android package name and the macOS and iOS bundle identifier, and Godot
does not rewrite it when the project is renamed.

Keep every preset's `platform` value as written. Godot identifies an export
platform by that display name and silently drops a preset that uses another name
(for example `Windows` instead of `Windows Desktop`).

The presets exclude the installed addon's `csharp/` sources, which this
GDScript-only template does not use; Godot otherwise reports a missing solution
for them on every export. Remove that filter when the project adds C#.

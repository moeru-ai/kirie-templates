# Kirie Templates

Official project templates for [Kirie](https://github.com/moeru-ai/godot-kirie).

Templates live under `templates/`. Each direct child is a template name accepted
by `kirie init`:

```sh
npx kirie init my-app basic
```

The initializer downloads a template from a commit pinned by the matching Kirie
CLI release, then installs the same-version `kirie-addon.zip` release asset into
the generated project. Templates therefore do not contain Kirie addon binaries
or optional desktop WebView backends.

## Templates

- `basic`: a minimal GDScript and Vite project demonstrating Kirie text IPC.

Generated files, dependency directories, native binaries, and repository-local
symlinks must not be committed to a template.

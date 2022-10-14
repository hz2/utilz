
## UtilZ 💻

A simple collection of tools, using :sauropod: Deno with TypeScript

## Usage

- Locally

 1. get [Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) [background image](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image) from the CSS and written to an SVG file

```bash
deno run  --allow-read --allow-write ./main.ts --input=./example/ms.css
```
 
 2. Extract files from css and download
```bash
deno run  --allow-read --allow-net --allow-write  ./src/css-bgi-download.ts --input=./example/ms3.css
```


- Remote

```bash
deno run  --allow-read --allow-write https://deno.land/x/utilz/main.ts --input=./example/ms.css
```

## License

MIT

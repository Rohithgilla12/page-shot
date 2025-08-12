# Page-Shot

A high-performance Cloudflare Worker service that renders HTML to PNG images using server-side rendering. Built with Hono framework and provides OpenAPI 3.1 compliant REST API documentation.

## Features

- 🚀 **Fast HTML to PNG conversion** - Powered by workers-og library
- 📝 **OpenAPI 3.1 compliant** - Auto-generated API documentation with Swagger UI
- ⚡ **Edge computing** - Runs on Cloudflare Workers for global low-latency
- 🎨 **Customizable output** - Configure image dimensions and content
- 🔧 **Type-safe** - Built with TypeScript and Zod validation

## API Endpoints

### POST `/api/render`

Converts HTML content to PNG images.

**Request:**
- **Body**: HTML string or JSON with parameters
- **Query Parameters** (optional):
  - `width`: Image width in pixels (default: 1200)
  - `height`: Image height in pixels (default: 630)

**Response:**
- **Content-Type**: `image/png`
- Binary PNG image data

**Examples:**

HTML request:
```bash
curl -X POST http://localhost:8787/api/render \
  -H "Content-Type: text/html" \
  -d "<h1>Hello World</h1>" \
  --output image.png
```

JSON request:
```bash
curl -X POST http://localhost:8787/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<div style=\"display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-family: sans-serif;\"><h1 style=\"font-size: 4rem; margin: 0;\">Page Shot</h1><p style=\"font-size: 1.5rem;\">HTML to PNG Service</p></div>",
    "width": 1920,
    "height": 1080
  }' \
  --output image.png
```

With query parameters:
```bash
curl -X POST "http://localhost:8787/api/render?width=800&height=600" \
  -H "Content-Type: text/html" \
  -d "<h2>Custom Size Image</h2>" \
  --output image.png
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier works)
- Wrangler CLI (installed with npm)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rohithgilla12/page-shot.git
cd page-shot
```

2. Install dependencies:
```bash
npm install
```

3. Login to Cloudflare:
```bash
wrangler login
```

### Development

Start the local development server:
```bash
npm run dev
```

The service will be available at:
- **API**: `http://localhost:8787/api/render`
- **Swagger UI**: `http://localhost:8787/`

Hot reload is enabled - changes in `src/` will automatically restart the server.

### Deployment

Deploy to Cloudflare Workers:
```bash
npm run deploy
```

Your service will be deployed to `https://page-shot.<your-subdomain>.workers.dev`

## Project Structure

```
page-shot/
├── src/
│   ├── index.ts          # Main application entry and router
│   ├── endpoints/
│   │   └── render.ts     # Image rendering endpoint
│   └── types.ts          # TypeScript types and Zod schemas
├── wrangler.jsonc        # Cloudflare Workers configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Configuration

### Wrangler Configuration

Edit `wrangler.jsonc` to customize:
- Worker name
- Compatibility date
- Environment variables
- Routes and domains

### TypeScript Configuration

The project uses strict TypeScript settings:
- Target: ES2022
- Module: ESNext with bundler resolution
- Strict mode enabled
- No unchecked indexed access

## Tech Stack

- **Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **Framework**: [Hono](https://hono.dev/) - Lightweight web framework
- **API Docs**: [Chanfana](https://chanfana.pages.dev/) - OpenAPI 3.1 generator
- **Image Generation**: [workers-og](https://github.com/cloudflare/workers-og) - HTML to image rendering
- **Validation**: [Zod](https://zod.dev/) - Schema validation
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run deploy` | Deploy to Cloudflare Workers |
| `npm run cf-typegen` | Generate TypeScript types for Workers |

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

[Rohith Gilla](https://github.com/Rohithgilla12)

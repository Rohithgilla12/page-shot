# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Page-shot is a Cloudflare Worker service that renders HTML to PNG images using the workers-og library. It's built with Hono framework and uses chanfana for OpenAPI 3.1 documentation generation.

## Development Commands

```bash
# Install dependencies
npm install

# Start local development server (port 8787)
npm run dev
# or
wrangler dev

# Deploy to Cloudflare Workers
npm run deploy
# or
wrangler deploy

# Generate TypeScript types for Cloudflare Workers
npm run cf-typegen
```

## Architecture

### Core Stack
- **Runtime**: Cloudflare Workers
- **Framework**: Hono (lightweight web framework)
- **API Documentation**: chanfana (OpenAPI 3.1 generator)
- **Image Generation**: workers-og (HTML to PNG rendering)
- **Validation**: Zod schemas

### Project Structure
- `src/index.ts`: Main application entry point and router configuration
- `src/endpoints/`: API endpoint implementations
  - `render.ts`: Image rendering endpoint that converts HTML to PNG
- `src/types.ts`: Shared TypeScript types and Zod schemas
- `wrangler.jsonc`: Cloudflare Workers configuration

### Key Functionality

The service exposes a single endpoint:
- **POST `/api/render`**: Accepts HTML content or parameters to generate PNG images
  - Supports both JSON and plain text request bodies
  - Configurable width/height via query params or request body
  - Falls back to default template if no HTML provided
  - Default dimensions: 1200x630px

### Local Development

The development server runs at `http://localhost:8787/` and provides:
- Swagger UI interface at the root path for API testing
- Hot reload on file changes in `src/` directory

## TypeScript Configuration

The project uses strict TypeScript settings with:
- Target: ES2022
- Module resolution: Bundler mode
- Strict mode enabled with `noUncheckedIndexedAccess`
- No implicit any (disabled), but strict null checks enabled
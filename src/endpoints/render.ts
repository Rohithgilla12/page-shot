import { Num, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import type { AppContext } from "../types";
import { ImageResponse } from "workers-og";

export class RenderImage extends OpenAPIRoute {
  schema = {
    tags: ["Render"],
    summary: "Render HTML to PNG",
    request: {
      query: z.object({
        width: Num({ required: false }),
        height: Num({ required: false }),
        title: Str({ required: false }),
      }),
      body: {
        content: {
          "application/json": {
            schema: z.object({
              html: z.string().optional(),
              width: z.number().int().positive().optional(),
              height: z.number().int().positive().optional(),
              title: z.string().optional(),
            }),
          },
          // Note: For non-JSON bodies (e.g. text/html) we will read raw text in handler
        },
      },
    },
    responses: {
      "200": {
        description: "Returns a PNG image",
        content: {
          "image/png": {
            // OpenAPI schema for binary; leaving as any
            schema: z.any(),
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    const data = await this.getValidatedData<typeof this.schema>();

    const defaultWidth = 1200;
    const defaultHeight = 630;

    const parseNumber = (value: unknown, fallback: number): number => {
      const n = typeof value === "string" ? parseInt(value, 10) : Number(value);
      return Number.isFinite(n) && n > 0 ? n : fallback;
    };

    const params = new URL(c.req.url).searchParams;
    const contentType = c.req.header("content-type") || "";

    let html: string | null = null;
    let bodyWidth: number | null = null;
    let bodyHeight: number | null = null;

    try {
      if (contentType.includes("application/json") && data.body) {
        const body = data.body as unknown as {
          html?: string;
          width?: number;
          height?: number;
          title?: string;
        };
        html = body.html ?? null;
        bodyWidth = body.width ?? null;
        bodyHeight = body.height ?? null;

        if (!html) {
          const title =
            body.title ??
            data.query.title ??
            params.get("title") ??
            "Lorem ipsum";
          html = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; width: 100vw; font-family: sans-serif; background: #160f29">
            <div style="display: flex; width: 100vw; padding: 40px; color: white;">
              <h1 style="font-size: 60px; font-weight: 600; margin: 0; font-family: 'Bitter'; font-weight: 500">${title}</h1>
            </div>
          </div>`;
        }
      } else {
        const textBody = await c.req.text();
        html = textBody && textBody.trim().length > 0 ? textBody : null;
        if (!html) {
          const title =
            data.query.title ?? params.get("title") ?? "Lorem ipsum";
          html = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; width: 100vw; font-family: sans-serif; background: #160f29">
            <div style="display: flex; width: 100vw; padding: 40px; color: white;">
              <h1 style="font-size: 60px; font-weight: 600; margin: 0; font-family: 'Bitter'; font-weight: 500">${title}</h1>
            </div>
          </div>`;
        }
      }
    } catch (err) {
      const title = data.query.title ?? params.get("title") ?? "Lorem ipsum";
      html = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; width: 100vw; font-family: sans-serif; background: #160f29">
        <div style="display: flex; width: 100vw; padding: 40px; color: white;">
          <h1 style="font-size: 60px; font-weight: 600; margin: 0; font-family: 'Bitter'; font-weight: 500">${title}</h1>
        </div>
      </div>`;
    }

    const finalWidth = parseNumber(
      bodyWidth ?? data.query.width ?? params.get("width"),
      defaultWidth
    );
    const finalHeight = parseNumber(
      bodyHeight ?? data.query.height ?? params.get("height"),
      defaultHeight
    );

    return new ImageResponse(html!, {
      width: finalWidth,
      height: finalHeight,
    });
  }
}

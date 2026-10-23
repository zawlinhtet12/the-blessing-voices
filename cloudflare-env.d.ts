declare namespace Cloudflare {
  interface Env {
    ADMIN_EMAIL?: string;
    ADMIN_PASSWORD?: string;
    SESSION_SECRET?: string;
    SITE_URL?: string;
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}

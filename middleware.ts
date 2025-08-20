// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LANGS = ['en', 'de'];
const DEFAULT_LANG = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip if it's an API route or static file
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if first segment is a supported language
  const firstSegment = pathname.split('/')[1];
  const hasLangPrefix = SUPPORTED_LANGS.includes(firstSegment);

  // If no language prefix (including root path)
  if (!hasLangPrefix) {
    const userLang = request.headers
      .get('accept-language')
      ?.split(',')[0]
      .split('-')[0];

    const lang = SUPPORTED_LANGS.includes(userLang || '') ? userLang : DEFAULT_LANG;
    
    // For root path, redirect to /lang
    if (pathname === '/') {
      return NextResponse.redirect(new URL(`/${lang}`, request.url));
    }
    // For other paths without lang prefix
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url));
  }

  return NextResponse.next();
}

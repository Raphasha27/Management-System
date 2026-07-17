import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const adminEmail = process.env.ADMIN_EMAIL || '';
  const adminPassword = process.env.ADMIN_PASSWORD || '';
  if (email === adminEmail && password === adminPassword) {
    const response = NextResponse.json({ success: true });
    
    // Set a secure, httpOnly cookie for the session
    // In a real app, this would be a JWT or session ID
    response.cookies.set('kirov_session', 'authenticated_admin_session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}

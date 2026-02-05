import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Clear the session cookie
  response.cookies.set('kivoc_session', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}

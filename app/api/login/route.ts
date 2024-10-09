import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Here you would typically validate the user credentials against your database
    // For this example, we'll just mock a successful login
    const response = await fetch('http://localhost:3222/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: result.message }, { status: 401 });
    }

    // Set the cookie
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 1); // 1 day
    cookies().set('accessToken', result?.data.accessToken, {
      expires,
      httpOnly: true,
    });

    return NextResponse.json(
      { data: result?.data, message: 'Login successful' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

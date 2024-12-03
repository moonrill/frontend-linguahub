import { config } from '#/config/app';
import { decrypt } from '#/utils/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const response = await fetch(`${config.baseUrl}/auth/login`, {
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
    const accessToken = result?.data.accessToken;
    cookies().set('accessToken', accessToken, {
      expires,
      httpOnly: true,
    });

    const { payload } = await decrypt(accessToken);

    return NextResponse.json(
      { accessToken, role: payload.role, message: 'Login successful' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: 'Something went wrong. Please try again later', error },
      { status: 500 }
    );
  }
}

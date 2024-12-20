import { NextApiRequest } from 'next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: NextApiRequest) {
  cookies().set('accessToken', '', {
    expires: new Date(0),
  });

  return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
}

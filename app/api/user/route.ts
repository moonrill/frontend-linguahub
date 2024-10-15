import { getUser } from '#/utils/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const user = await getUser();
    const accessToken = cookies().get('accessToken')?.value;

    return NextResponse.json({ ...user, accessToken });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

import { getUser } from '#/utils/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const user = await getUser();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function GET(req: Request) {
  try {
    const token = req.headers
      .get('cookie')
      ?.split('auth-token=')?.[1]
      ?.split(';')?.[0];

    if (!token) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const payload = await verifyToken(token);

    if (!payload?.email) {
      return NextResponse.json(
        { error: 'Недействительный токен' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      include: {
        wheels: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    const {
      password: _password,
      verificationToken: _verificationToken,
      resetPasswordToken: _resetPasswordToken,
      ...safeUserData
    } = user;

    return NextResponse.json(safeUserData);
  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении данных профиля' },
      { status: 500 }
    );
  }
}

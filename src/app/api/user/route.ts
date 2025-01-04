import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

// Добавляем экспорт для GET метода
export const GET = async (req: Request) => {
  try {
    // Получаем токен из cookies
    const token = req.headers
      .get('cookie')
      ?.split('auth-token=')?.[1]
      ?.split(';')?.[0];

    if (!token) {
      return NextResponse.json(
        { error: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    // Проверяем токен
    const payload = await verifyToken(token);

    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: 'Недействительный токен' },
        { status: 401 }
      );
    }

    // Получаем данные пользователя с активными рулетками
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        email: true,
        role: true,
        wheels: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            name: true,
            type: true,
            maxSpins: true,
            spinsUsed: true,
            isActive: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        email: user.email,
        role: user.role,
      },
      wheels: user.wheels,
    });
  } catch (error) {
    console.error('Get user data error:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении данных пользователя' },
      { status: 500 }
    );
  }
};

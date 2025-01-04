import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    // Сначала проверяем пользователя
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    // Затем получаем рулетку со всеми связанными данными
    const wheel = await prisma.wheel.findUnique({
      where: {
        id: params.id,
      },
      include: {
        spinHistory: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!wheel) {
      return NextResponse.json(
        { error: 'Рулетка не найдена' },
        { status: 404 }
      );
    }

    if (wheel.userId !== user.id) {
      return NextResponse.json(
        { error: 'Нет доступа к рулетке' },
        { status: 403 }
      );
    }

    return NextResponse.json(wheel);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error('Get wheel error:', errorMessage);

    return NextResponse.json(
      { error: 'Ошибка при получении рулетки' },
      { status: 500 }
    );
  }
}

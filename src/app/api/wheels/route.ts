import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function POST(req: Request) {
  try {
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

    const payload = await verifyToken(token);

    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: 'Недействительный токен' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, options, type, background } = body;

    // Проверяем обязательные поля
    if (!name || !options || !type) {
      return NextResponse.json(
        { error: 'Не все обязательные поля заполнены' },
        { status: 400 }
      );
    }

    // Проверяем пользователя
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      include: {
        wheels: {
          where: {
            isActive: true,
            type: type,
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

    // Для пробной версии проверяем лимит
    if (type === 'TRIAL' && user.wheels.length > 0) {
      return NextResponse.json(
        { error: 'У вас уже есть активная пробная рулетка' },
        { status: 400 }
      );
    }

    // Создаем рулетку
    const wheel = await prisma.wheel.create({
      data: {
        userId: user.id,
        name,
        type,
        options,
        maxSpins: type === 'TRIAL' ? 3 : -1,
        spinsUsed: 0,
        customization: type === 'PAID',
        background: background || 'standard',
        expiresAt:
          type === 'TRIAL'
            ? new Date(Date.now() + 24 * 60 * 60 * 1000)
            : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json({
      message: 'Рулетка успешно создана',
      wheelId: wheel.id,
    });
  } catch (error) {
    // Безопасно логируем ошибку
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Create wheel error:', errorMessage);

    return NextResponse.json(
      { error: 'Ошибка при создании рулетки' },
      { status: 500 }
    );
  }
}

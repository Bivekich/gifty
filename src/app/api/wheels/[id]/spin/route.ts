import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const wheel = await prisma.wheel.findUnique({
      where: { id: params.id },
    });

    if (!wheel) {
      return NextResponse.json(
        { error: 'Рулетка не найдена' },
        { status: 404 }
      );
    }

    if (!wheel.isActive) {
      return NextResponse.json({ error: 'Рулетка неактивна' }, { status: 400 });
    }

    if (wheel.maxSpins !== -1 && wheel.spinsUsed >= wheel.maxSpins) {
      return NextResponse.json(
        { error: 'Достигнут лимит прокруток' },
        { status: 400 }
      );
    }

    if (new Date(wheel.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'Срок действия рулетки истек' },
        { status: 400 }
      );
    }

    // Увеличиваем счетчик прокруток
    await prisma.wheel.update({
      where: { id: params.id },
      data: { spinsUsed: { increment: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Wheel spin error:', errorMessage);
    return NextResponse.json(
      { error: 'Ошибка при прокрутке рулетки' },
      { status: 500 }
    );
  }
}

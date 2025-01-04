import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const wheelId = params.id;
    if (!wheelId) {
      return NextResponse.json(
        { error: 'ID рулетки не указан' },
        { status: 400 }
      );
    }

    // Получаем IP пользователя для отслеживания уникальных спинов
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    // Проверяем существование рулетки
    const wheel = await prisma.wheel.findUnique({
      where: { id: wheelId },
      select: {
        id: true,
        isActive: true,
        expiresAt: true,
        spinsUsed: true,
        maxSpins: true,
      },
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

    if (new Date(wheel.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'Срок действия рулетки истек' },
        { status: 400 }
      );
    }

    if (wheel.maxSpins !== -1 && wheel.spinsUsed >= wheel.maxSpins) {
      return NextResponse.json(
        { error: 'Достигнут лимит прокруток' },
        { status: 400 }
      );
    }

    // Проверяем, крутил ли уже этот IP данную рулетку
    const existingSpin = await prisma.guestSpin.findFirst({
      where: {
        wheelId: wheelId,
        ip: ip,
      },
    });

    if (existingSpin) {
      return NextResponse.json(
        { error: 'Вы уже использовали свою попытку' },
        { status: 400 }
      );
    }

    // Используем транзакцию для атомарных операций
    await prisma.$transaction([
      // Создаем запись о спине гостя
      prisma.guestSpin.create({
        data: {
          wheelId: wheelId,
          ip: ip,
        },
      }),
      // Увеличиваем счетчик прокруток
      prisma.wheel.update({
        where: { id: wheelId },
        data: {
          spinsUsed: {
            increment: 1,
          },
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Guest spin error:', errorMessage);
    return NextResponse.json(
      { error: 'Ошибка при прокрутке рулетки' },
      { status: 500 }
    );
  }
}

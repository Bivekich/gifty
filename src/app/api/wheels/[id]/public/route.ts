import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const wheelId = params.id;
  if (!wheelId) {
    return NextResponse.json(
      { error: 'ID рулетки не указан' },
      { status: 400 }
    );
  }

  try {
    const wheel = await prisma.wheel.findUnique({
      where: { id: wheelId },
      select: {
        id: true,
        name: true,
        type: true,
        options: true,
        maxSpins: true,
        spinsUsed: true,
        isActive: true,
        expiresAt: true,
        background: true,
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

    return NextResponse.json(wheel);
  } catch (error) {
    console.error('Get public wheel error:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении рулетки' },
      { status: 500 }
    );
  }
}

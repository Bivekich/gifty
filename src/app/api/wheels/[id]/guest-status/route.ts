import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    const existingSpin = await prisma.guestSpin.findFirst({
      where: {
        wheelId: params.id,
        ip: ip,
      },
    });

    return NextResponse.json({
      hasSpun: !!existingSpin,
      spinTime: existingSpin?.createdAt,
    });
  } catch (error) {
    console.error('Get guest status error:', error);
    return NextResponse.json(
      { error: 'Ошибка при проверке статуса' },
      { status: 500 }
    );
  }
}

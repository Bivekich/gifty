import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { selectedOption } = await req.json();

    await prisma.spinHistory.create({
      data: {
        wheelId: params.id,
        result: selectedOption,
        isGuest: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save guest spin result error:', error);
    return NextResponse.json(
      { error: 'Ошибка при сохранении результата' },
      { status: 500 }
    );
  }
}

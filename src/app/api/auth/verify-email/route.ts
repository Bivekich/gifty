import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Токен не предоставлен' },
        { status: 400 }
      );
    }

    const payload = await verifyToken(token);

    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: 'Недействительный токен' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    // Проверяем, не подтвержден ли уже email
    if (user.isEmailVerified) {
      return NextResponse.json({
        message: 'Email уже подтвержден',
        alreadyVerified: true,
      });
    }

    // Проверяем, совпадает ли токен
    if (user.verificationToken !== token) {
      return NextResponse.json(
        { error: 'Недействительный токен подтверждения' },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        verificationToken: null,
      },
    });

    return NextResponse.json({
      message: 'Email успешно подтвержден',
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Ошибка при подтверждении email' },
      { status: 500 }
    );
  }
}

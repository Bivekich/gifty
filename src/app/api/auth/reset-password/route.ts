import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Отсутствуют необходимые данные' },
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
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Токен сброса пароля недействителен или истек' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return NextResponse.json({
      message: 'Пароль успешно изменен',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Ошибка при сбросе пароля' },
      { status: 500 }
    );
  }
}

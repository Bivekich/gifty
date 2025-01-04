import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log('Login attempt for email:', email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { error: 'Неверный email или пароль' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      console.log('Invalid password');
      return NextResponse.json(
        { error: 'Неверный email или пароль' },
        { status: 401 }
      );
    }

    if (!user.isEmailVerified) {
      console.log('Email not verified');
      return NextResponse.json(
        { error: 'Пожалуйста, подтвердите ваш email' },
        { status: 403 }
      );
    }

    const token = await generateToken({
      userId: user.id,
      email: user.email,
    });
    console.log('Generated token:', token);

    const response = NextResponse.json({
      message: 'Вход выполнен успешно',
      token,
    });

    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    console.log('Cookie set in response with token:', token);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Ошибка при входе' }, { status: 500 });
  }
}

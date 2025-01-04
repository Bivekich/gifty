import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Проверяем подключение при старте приложения
transporter.verify(function (error, _success) {
  if (error) {
    console.log('Ошибка подключения к SMTP:', error);
  } else {
    console.log('SMTP сервер готов к отправке писем');
  }
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Подтвердите ваш email',
    html: `
      <div>
        <h1>Подтверждение email</h1>
        <p>Для подтверждения вашего email перейдите по ссылке:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Gifty" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Сброс пароля',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #9333ea;">Сброс пароля</h1>
        <p>Вы запросили сброс пароля. Перейдите по ссылке ниже для создания нового пароля:</p>
        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(to right, #9333ea, #db2777);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin: 16px 0;
          "
        >
          Сбросить пароль
        </a>
        <p style="color: #666;">
          Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.
        </p>
      </div>
    `,
  });
}

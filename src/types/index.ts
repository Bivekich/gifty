export interface User {
  id: string;
  email: string;
  name: string | null;
  password: string;
  verificationToken: string | null;
  resetPasswordToken: string | null;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WheelOption {
  id: number;
  text: string;
  color: string;
  weight?: number;
  image?: string;
}

export interface Wheel {
  id: string;
  name: string;
  background: string;
  type: 'basic' | 'premium';
  options: WheelOption[];
  maxSpins: number;
  spinsUsed: number;
  customization: boolean;
  isActive: boolean;
  expiresAt: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  user: {
    id: string;
    email: string;
    name: string | null;
  };
  expires: string;
}

export interface ApiError {
  message: string;
}

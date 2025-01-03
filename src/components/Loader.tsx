'use client';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative">
        <div className="w-16 h-16 border-purple-500 border-4 rounded-full animate-spin border-t-transparent" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-2xl animate-pulse">🎁</span>
        </div>
      </div>
    </div>
  );
}

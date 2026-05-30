import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        action={async (formData) => {
          'use server';
          await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo: '/dashboard',
          });
        }}
        className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border p-2"
            defaultValue="user@nextmail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-md border p-2"
            defaultValue="123456"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
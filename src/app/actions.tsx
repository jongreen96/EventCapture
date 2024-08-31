'use server';

import { signIn } from '@/auth';

// export async function signUpForm(formData: FormData) {
//   'use server';

//   const email = formData.get('email') as string;

//   if (z.string().email().safeParse(email).success === false)
//     redirect('/?error=invalid_email');

//   return redirect('/?success=true');
// }

export async function signUpForm(formData: FormData) {
  'use server';

  await signIn('resend', formData);
}

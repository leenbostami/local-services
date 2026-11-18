import { useState } from 'react';

import { ApiError } from '@/auth/api';
import { useAuth } from '@/auth/AuthProvider';
import { useReturnAfterAuth } from '@/auth/returnAfterAuth';
import { AuthForm } from '@/components/auth/AuthForm';
import { Field } from '@/components/auth/Field';
import { useLocale } from '@/i18n/LocaleProvider';

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const { copy } = useLocale();
  const returnAfterAuth = useReturnAfterAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!name.trim() || !email.trim() || !password) {
      setError(copy.authRequired);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await signUp({ name: name.trim(), email: email.trim(), password });
      returnAfterAuth();
    } catch (caught) {
      const code = caught instanceof ApiError ? caught.code : 'network';
      setError(messageFor(code, copy));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthForm
      title={copy.signUpTitle}
      subtitle={copy.signUpSubtitle}
      submitLabel={copy.createAccount}
      alternateHref="/login"
      alternatePrompt={copy.haveAccount}
      alternateLabel={copy.login}
      error={error}
      submitting={submitting}
      onSubmit={() => {
        void submit();
      }}
    >
      <Field
        label={copy.fullName}
        placeholder={copy.namePlaceholder}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <Field
        label={copy.email}
        placeholder={copy.emailPlaceholder}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Field
        label={copy.password}
        placeholder={copy.passwordPlaceholder}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    </AuthForm>
  );
}

function messageFor(
  code: string,
  copy: {
    authName: string;
    authEmail: string;
    authPassword: string;
    authEmailTaken: string;
    authNetwork: string;
  },
) {
  if (code === 'name') return copy.authName;
  if (code === 'email') return copy.authEmail;
  if (code === 'password') return copy.authPassword;
  if (code === 'email_taken') return copy.authEmailTaken;
  if (code === 'network') return copy.authNetwork;
  return copy.authNetwork;
}

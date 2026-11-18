import { useState } from 'react';

import { ApiError } from '@/auth/api';
import { useAuth } from '@/auth/AuthProvider';
import { useReturnAfterAuth } from '@/auth/returnAfterAuth';
import { AuthForm } from '@/components/auth/AuthForm';
import { Field } from '@/components/auth/Field';
import { useLocale } from '@/i18n/LocaleProvider';

export default function LoginScreen() {
  const { logIn } = useAuth();
  const { copy } = useLocale();
  const returnAfterAuth = useReturnAfterAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!email.trim() || !password) {
      setError(copy.authRequired);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await logIn({ email: email.trim(), password });
      returnAfterAuth();
    } catch (caught) {
      const code = caught instanceof ApiError ? caught.code : 'network';
      setError(code === 'network' ? copy.authNetwork : copy.authInvalid);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthForm
      title={copy.loginTitle}
      subtitle={copy.loginSubtitle}
      submitLabel={copy.login}
      alternateHref="/signup"
      alternatePrompt={copy.needAccount}
      alternateLabel={copy.signUp}
      error={error}
      submitting={submitting}
      onSubmit={() => {
        void submit();
      }}
    >
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

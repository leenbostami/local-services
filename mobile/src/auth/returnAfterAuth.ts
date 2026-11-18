import { useNavigation, useRouter } from 'expo-router';

export function useReturnAfterAuth() {
  const router = useRouter();
  const navigation = useNavigation();

  return () => {
    const previous = navigation.getState()?.routes.at(-2)?.name;

    if (previous === 'login' || previous === 'signup') {
      router.dismiss(2);
      return;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  };
}

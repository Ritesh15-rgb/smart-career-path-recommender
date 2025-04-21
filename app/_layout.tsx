import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "./error-boundary";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, userId, name, email } = useAuthStore();
  const { profile, initializeProfile } = useUserStore();

  useEffect(() => {
    // Initialize user profile if authenticated but no profile exists
    if (isAuthenticated && userId && name && email && !profile) {
      initializeProfile(userId, name, email);
    }

    // Check if the user is authenticated and redirect accordingly
    const inAuthGroup = segments[0] === "auth";
    
    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to the sign-in page if not authenticated and not already in auth group
      router.replace("/auth/login");
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to the home page if authenticated and in auth group
      router.replace("/");
    }
  }, [isAuthenticated, segments, userId, name, email, profile]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
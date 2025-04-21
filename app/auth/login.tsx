import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { Mail, Lock, ArrowRight } from "lucide-react-native";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/authStore";

export default function LoginScreen() {
  const { login, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleLogin = async () => {
    if (validateForm()) {
      await login(email, password);
    }
  };

  const validateForm = () => {
    setTouched({ email: true, password: true });
    return email.trim() !== "" && password.trim() !== "";
  };

  const handleDemoLogin = async () => {
    setEmail("demo@example.com");
    setPassword("password");
    await login("demo@example.com", "password");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" }}
            style={styles.logo}
          />
          <Text style={styles.title}>Smart Career Path</Text>
          <Text style={styles.subtitle}>
            Discover your ideal career path based on your unique profile
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Welcome Back</Text>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              clearError();
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={colors.textSecondary} />}
            error={touched.email && email.trim() === "" ? "Email is required" : ""}
            touched={touched.email}
            onBlur={() => setTouched({ ...touched, email: true })}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              clearError();
            }}
            leftIcon={<Lock size={20} color={colors.textSecondary} />}
            isPassword
            error={
              touched.password && password.trim() === ""
                ? "Password is required"
                : ""
            }
            touched={touched.password}
            onBlur={() => setTouched({ ...touched, password: true })}
          />

          <Button
            title="Login"
            onPress={handleLogin}
            loading={isLoading}
            style={styles.button}
            fullWidth
            icon={<ArrowRight size={18} color="white" />}
            iconPosition="right"
          />

          <Button
            title="Use Demo Account"
            onPress={handleDemoLogin}
            variant="outline"
            style={styles.demoButton}
            fullWidth
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Link href="/auth/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 24,
  },
  errorContainer: {
    backgroundColor: "#FFEBEE",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
  },
  button: {
    marginTop: 8,
  },
  demoButton: {
    marginTop: 12,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  signupText: {
    color: colors.textSecondary,
    marginRight: 4,
  },
  signupLink: {
    color: colors.primary,
    fontWeight: "600",
  },
});
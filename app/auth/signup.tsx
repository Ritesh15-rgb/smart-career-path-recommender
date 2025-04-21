import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { Mail, Lock, User, ArrowRight } from "lucide-react-native";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/authStore";

export default function SignupScreen() {
  const { signup, isLoading, error, clearError } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleSignup = async () => {
    if (validateForm()) {
      await signup(name, email, password);
    }
  };

  const validateForm = () => {
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (name.trim() === "") return false;
    if (email.trim() === "") return false;
    if (password.trim() === "") return false;
    if (password !== confirmPassword) return false;

    return true;
  };

  const getPasswordError = () => {
    if (!touched.password) return "";
    if (password.trim() === "") return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const getConfirmPasswordError = () => {
    if (!touched.confirmPassword) return "";
    if (confirmPassword.trim() === "") return "Please confirm your password";
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Sign up to discover your ideal career path
          </Text>
        </View>

        <View style={styles.formContainer}>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              clearError();
            }}
            leftIcon={<User size={20} color={colors.textSecondary} />}
            error={touched.name && name.trim() === "" ? "Name is required" : ""}
            touched={touched.name}
            onBlur={() => setTouched({ ...touched, name: true })}
          />

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
            placeholder="Create a password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              clearError();
            }}
            leftIcon={<Lock size={20} color={colors.textSecondary} />}
            isPassword
            error={getPasswordError()}
            touched={touched.password}
            onBlur={() => setTouched({ ...touched, password: true })}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              clearError();
            }}
            leftIcon={<Lock size={20} color={colors.textSecondary} />}
            isPassword
            error={getConfirmPasswordError()}
            touched={touched.confirmPassword}
            onBlur={() => setTouched({ ...touched, confirmPassword: true })}
          />

          <Button
            title="Create Account"
            onPress={handleSignup}
            loading={isLoading}
            style={styles.button}
            fullWidth
            icon={<ArrowRight size={18} color="white" />}
            iconPosition="right"
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Link href="/auth/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Login</Text>
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
    marginBottom: 32,
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
  },
  formContainer: {
    width: "100%",
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  loginText: {
    color: colors.textSecondary,
    marginRight: 4,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: "600",
  },
});
import 'package:flutter/material.dart';

/// Google Stitch Design System Color Palette for PartnerFinder AI
class AppColors {
  AppColors._();

  // Primary Brand Colors
  static const Color primary = Color(0xFF630ED4);
  static const Color primaryVariant = Color(0xFF7C3AED);
  static const Color primaryLight = Color(0xFF8B5CF6);
  static const Color primaryGradientEnd = Color(0xFF3B82F6);

  // Backgrounds & Surfaces
  static const Color backgroundLight = Color(0xFFF8F9FF);
  static const Color surfaceLowest = Color(0xFFFFFFFF);
  static const Color surfaceContainer = Color(0xFFF1F5F9);
  static const Color surfaceContainerLow = Color(0xFFF8FAFC);
  static const Color surfaceContainerHigh = Color(0xFFE2E8F0);

  // Dark App Shell & Navigation
  static const Color darkHeader = Color(0xFF0B1C30);
  static const Color darkNavRail = Color(0xFF0F172A);
  static const Color darkCard = Color(0xFF1E293B);

  // Accents & Tints
  static const Color accentTint = Color(0xFFEFF4FF);
  static const Color borderTint = Color(0xFFDCE9FF);
  static const Color purpleTint = Color(0xFFF3E8FF);

  // Text Colors
  static const Color textPrimary = Color(0xFF0F172A);
  static const Color textSecondary = Color(0xFF64748B);
  static const Color textMuted = Color(0xFF94A3B8);
  static const Color textLight = Color(0xFFF8FAFC);
  static const Color textLink = Color(0xFF630ED4);

  // Borders & Dividers
  static const Color border = Color(0xFFE2E8F0);
  static const Color borderLight = Color(0xFFF1F5F9);

  // Status & Feedback
  static const Color success = Color(0xFF10B981);
  static const Color successBg = Color(0xFFECFDF5);
  static const Color warning = Color(0xFFF59E0B);
  static const Color warningBg = Color(0xFFFFFBEB);
  static const Color error = Color(0xFFEF4444);
  static const Color errorBg = Color(0xFFFEF2F2);
  static const Color info = Color(0xFF3B82F6);
  static const Color infoBg = Color(0xFFEFF6FF);

  // Rating Stars
  static const Color starFilled = Color(0xFFF59E0B);
  static const Color starEmpty = Color(0xFFCBD5E1);

  // Primary Gradient
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [primaryVariant, primary],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient buttonGradient = LinearGradient(
    colors: [Color(0xFF7C3AED), Color(0xFF3B82F6)],
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
  );

  static const LinearGradient heroGradient = LinearGradient(
    colors: [Color(0xFF0B1C30), Color(0xFF1E1B4B)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );
}

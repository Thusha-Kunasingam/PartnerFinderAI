import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../constants/app_styles.dart';

enum ButtonVariant { primary, gradient, outline, secondary, text }

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final ButtonVariant variant;
  final IconData? icon;
  final bool isLoading;
  final double? width;
  final double height;
  final EdgeInsetsGeometry padding;

  const CustomButton({
    super.key,
    required this.text,
    this.onPressed,
    this.variant = ButtonVariant.primary,
    this.icon,
    this.isLoading = false,
    this.width,
    this.height = 46,
    this.padding = const EdgeInsets.symmetric(horizontal: 18),
  });

  factory CustomButton.primary({
    required String text,
    VoidCallback? onPressed,
    IconData? icon,
    bool isLoading = false,
    double? width,
    double height = 46,
  }) {
    return CustomButton(
      text: text,
      onPressed: onPressed,
      variant: ButtonVariant.primary,
      icon: icon,
      isLoading: isLoading,
      width: width,
      height: height,
    );
  }

  factory CustomButton.gradient({
    required String text,
    VoidCallback? onPressed,
    IconData? icon,
    bool isLoading = false,
    double? width,
    double height = 46,
  }) {
    return CustomButton(
      text: text,
      onPressed: onPressed,
      variant: ButtonVariant.gradient,
      icon: icon,
      isLoading: isLoading,
      width: width,
      height: height,
    );
  }

  factory CustomButton.outline({
    required String text,
    VoidCallback? onPressed,
    IconData? icon,
    bool isLoading = false,
    double? width,
    double height = 46,
  }) {
    return CustomButton(
      text: text,
      onPressed: onPressed,
      variant: ButtonVariant.outline,
      icon: icon,
      isLoading: isLoading,
      width: width,
      height: height,
    );
  }

  factory CustomButton.secondary({
    required String text,
    VoidCallback? onPressed,
    IconData? icon,
    bool isLoading = false,
    double? width,
    double height = 46,
  }) {
    return CustomButton(
      text: text,
      onPressed: onPressed,
      variant: ButtonVariant.secondary,
      icon: icon,
      isLoading: isLoading,
      width: width,
      height: height,
    );
  }

  @override
  Widget build(BuildContext context) {
    if (variant == ButtonVariant.gradient || variant == ButtonVariant.primary) {
      final gradient = variant == ButtonVariant.gradient
          ? AppColors.buttonGradient
          : AppColors.primaryGradient;

      return Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          gradient: onPressed != null ? gradient : null,
          color: onPressed == null ? AppColors.surfaceContainerHigh : null,
          borderRadius: AppStyles.roundedMd,
          boxShadow: onPressed != null && variant == ButtonVariant.gradient
              ? AppStyles.shadowGlowPurple
              : null,
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: isLoading ? null : onPressed,
            borderRadius: AppStyles.roundedMd,
            child: Padding(
              padding: padding,
              child: Center(
                child: isLoading
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.white,
                        ),
                      )
                    : Row(
                        mainAxisSize: MainAxisSize.min,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          if (icon != null) ...[
                            Icon(icon, size: 18, color: Colors.white),
                            const SizedBox(width: 8),
                          ],
                          Text(
                            text,
                            style: AppStyles.buttonText,
                          ),
                        ],
                      ),
              ),
            ),
          ),
        ),
      );
    }

    if (variant == ButtonVariant.outline) {
      return SizedBox(
        width: width,
        height: height,
        child: OutlinedButton(
          onPressed: isLoading ? null : onPressed,
          style: OutlinedButton.styleFrom(
            side: const BorderSide(color: AppColors.border),
            shape: RoundedRectangleBorder(borderRadius: AppStyles.roundedMd),
            backgroundColor: Colors.white,
          ),
          child: isLoading
              ? const SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: AppColors.primary,
                  ),
                )
              : Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    if (icon != null) ...[
                      Icon(icon, size: 18, color: AppColors.textPrimary),
                      const SizedBox(width: 8),
                    ],
                    Text(
                      text,
                      style: const TextStyle(
                        color: AppColors.textPrimary,
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
        ),
      );
    }

    // Secondary
    return SizedBox(
      width: width,
      height: height,
      child: TextButton(
        onPressed: isLoading ? null : onPressed,
        style: TextButton.styleFrom(
          backgroundColor: AppColors.accentTint,
          shape: RoundedRectangleBorder(borderRadius: AppStyles.roundedMd),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) ...[
              Icon(icon, size: 18, color: AppColors.primary),
              const SizedBox(width: 8),
            ],
            Text(
              text,
              style: const TextStyle(
                color: AppColors.primary,
                fontWeight: FontWeight.w600,
                fontSize: 14,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

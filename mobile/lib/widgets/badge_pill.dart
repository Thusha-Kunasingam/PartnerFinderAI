import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../constants/app_styles.dart';

class BadgePill extends StatelessWidget {
  final String text;
  final IconData? icon;
  final Color backgroundColor;
  final Color textColor;
  final Color? borderColor;
  final double fontSize;
  final EdgeInsetsGeometry padding;

  const BadgePill({
    super.key,
    required this.text,
    this.icon,
    this.backgroundColor = AppColors.accentTint,
    this.textColor = AppColors.primary,
    this.borderColor = AppColors.borderTint,
    this.fontSize = 12,
    this.padding = const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
  });

  factory BadgePill.matchScore(int score) {
    Color bg;
    Color text;
    Color border;

    if (score >= 90) {
      bg = const Color(0xFFEFF4FF);
      text = const Color(0xFF630ED4);
      border = const Color(0xFFDCE9FF);
    } else if (score >= 80) {
      bg = const Color(0xFFECFDF5);
      text = const Color(0xFF059669);
      border = const Color(0xFFA7F3D0);
    } else {
      bg = const Color(0xFFFFFBEB);
      text = const Color(0xFFD97706);
      border = const Color(0xFFFDE68A);
    }

    return BadgePill(
      text: '$score% Match',
      icon: Icons.auto_awesome,
      backgroundColor: bg,
      textColor: text,
      borderColor: border,
      fontSize: 12,
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
    );
  }

  factory BadgePill.verified() {
    return const BadgePill(
      text: 'Verified Match',
      icon: Icons.verified,
      backgroundColor: Color(0xFFEFF4FF),
      textColor: AppColors.primary,
      borderColor: AppColors.borderTint,
      fontSize: 11,
      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
    );
  }

  factory BadgePill.skill(String skill) {
    return BadgePill(
      text: skill,
      backgroundColor: AppColors.surfaceContainer,
      textColor: AppColors.textPrimary,
      borderColor: AppColors.border,
      fontSize: 12,
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding,
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: AppStyles.roundedFull,
        border: borderColor != null ? Border.all(color: borderColor!) : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: fontSize + 2, color: textColor),
            const SizedBox(width: 4),
          ],
          Text(
            text,
            style: TextStyle(
              color: textColor,
              fontSize: fontSize,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}

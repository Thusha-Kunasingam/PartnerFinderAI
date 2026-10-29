import 'package:flutter/material.dart';
import '../constants/app_colors.dart';

class StarRatingBar extends StatelessWidget {
  final double rating;
  final ValueChanged<double>? onRatingChanged;
  final String? label;
  final String? description;
  final double starSize;
  final bool isInteractive;

  const StarRatingBar({
    super.key,
    required this.rating,
    this.onRatingChanged,
    this.label,
    this.description,
    this.starSize = 24,
    this.isInteractive = true,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (label != null) ...[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                label!,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
              Text(
                rating.toStringAsFixed(1),
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: AppColors.primary,
                ),
              ),
            ],
          ),
          if (description != null) ...[
            const SizedBox(height: 2),
            Text(
              description!,
              style: const TextStyle(
                fontSize: 12,
                color: AppColors.textSecondary,
              ),
            ),
          ],
          const SizedBox(height: 8),
        ],
        Row(
          mainAxisSize: MainAxisSize.min,
          children: List.generate(5, (index) {
            final starNumber = index + 1;
            final isFilled = rating >= starNumber;

            Widget star = Icon(
              isFilled ? Icons.star : Icons.star_border,
              color: isFilled ? AppColors.starFilled : AppColors.starEmpty,
              size: starSize,
            );

            if (isInteractive && onRatingChanged != null) {
              return GestureDetector(
                onTap: () => onRatingChanged!(starNumber.toDouble()),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 2),
                  child: star,
                ),
              );
            }

            return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 1),
              child: star,
            );
          }),
        ),
      ],
    );
  }
}

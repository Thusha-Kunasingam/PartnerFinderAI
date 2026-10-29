# PartnerFinder AI — Flutter Mobile Application

A cross-platform native **Flutter** mobile application for **PartnerFinder AI**, reproducing the complete Google Stitch design system, 21 application screens, interactive workflows, and multi-factor matching algorithms.

---

## 📱 Mobile Screen Inventory (All 21 Screens)

| # | Route | Screen Name | Component |
| :-: | :--- | :--- | :--- |
| 1 | `/` | Marketing Landing Page | `LandingScreen` |
| 2 | `/register` | Account Registration | `RegisterScreen` |
| 3 | `/login` | User Login | `LoginScreen` |
| 4 | `/onboarding/profile` | Onboarding Step 1: Profile Information | `OnboardingScreen(initialStep: 1)` |
| 5 | `/onboarding/skills` | Onboarding Step 2: Add Skills | `OnboardingScreen(initialStep: 2)` |
| 6 | `/onboarding/learn` | Onboarding Step 3: Skills to Learn | `OnboardingScreen(initialStep: 3)` |
| 7 | `/onboarding/partner-type` | Onboarding Step 4: Choose Partner Type | `OnboardingScreen(initialStep: 4)` |
| 8 | `/requirements/new` | Project Partner Requirements | `RequirementFormScreen` |
| 9 | `/matching/processing` | AI Match Processing | `MatchProcessingScreen` |
| 10 | `/matches` | Potential Partners / Results | `MatchesScreen` |
| 11 | `/candidates/:candidateId` | Candidate Profile Deep Dive | `CandidateProfileScreen` |
| 12 | `/matches/:candidateId/explanation` | AI Match Explanation | `MatchExplanationScreen` |
| 13 | `/connections/request/:candidateId` | Connection Request Modal | `ConnectionRequestScreen` |
| 14 | `/connections/success/:candidateId` | Connection Successful | `ConnectionSuccessScreen` |
| 15 | `/connections/requests` | Connection Requests Hub | `ConnectionRequestsScreen` |
| 16 | `/dashboard` | User Dashboard | `DashboardScreen` |
| 17 | `/messages` | Direct Messaging / Chat Page | `ChatScreen` |
| 18 | `/workspace/:projectId` | Collaboration Workspace | `WorkspaceScreen` |
| 19 | `/workspace/:projectId/progress` | Project Progress & Milestone Tracking | `ProjectProgressScreen` |
| 20 | `/workspace/:projectId/review/:userId` | Teammate Rating — Detailed View | `TeammateRatingDetailedScreen` |
| 21 | `/workspace/:projectId/rate/:userId` | Teammate Rating — Simplified Modal View | `TeammateRatingModalScreen` |

---

## 🎨 Design System Fidelity (Google Stitch)

* **Primary Purple:** `#630ED4` / Variant `#7C3AED`
* **Dark Top Bar:** `#0B1C30`
* **Light Surface:** `#F8F9FF` / Card Surface: `#FFFFFF`
* **Accent Tints:** `#EFF4FF` (Light Blue) / `#DCE9FF` (Border)
* **Star Ratings:** `#F59E0B` (Amber)
* **Success Emerald:** `#10B981` (Background `#ECFDF5`)
* **Typography:** Google Fonts Inter (`w400`, `w500`, `w600`, `w700`, `w800`)

---

## ⚡ Matching Engine Formula

The mobile application implements the exact Stitch 4-factor matching algorithm:

$$\text{MatchScore} = 0.40 \times \text{Skills} + 0.25 \times \text{Availability} + 0.20 \times \text{Interests} + 0.15 \times \text{Location}$$

---

## 🛠️ Getting Started & Running the App

### 1. Prerequisites
* [Flutter SDK](https://flutter.dev/docs/get-started/install) (version 3.0.0 or higher)
* Android Studio / Android SDK (command-line tools and platform-tools)
* A physical Android device or Android Emulator

### 2. Install Dependencies
```bash
cd mobile
flutter pub get
```

### 3. Run the App
To run on a connected Android phone or emulator:
```bash
flutter run
```

To run on Chrome / Web for instant preview:
```bash
flutter run -d chrome
```

### 4. Build Release APK
```bash
flutter build apk --release
```
The output APK will be generated at:
`build/app/outputs/flutter-apk/app-release.apk`

---

## 📂 Architecture Overview

```
mobile/
├── pubspec.yaml             # Flutter project dependencies
├── android/                 # Native Android gradle and manifest configuration
└── lib/
    ├── main.dart            # MultiProvider entrypoint & theme setup
    ├── router.dart          # GoRouter covering all 21 screens
    ├── constants/           # AppColors and AppStyles (Stitch tokens)
    ├── theme/               # ThemeData with Inter typography
    ├── models/              # User, Candidate, Connection, Workspace, Review, Chat models
    ├── data/                # Rich mock data matching web store
    ├── providers/           # State management (Auth, Onboarding, Matching, Chat, Workspace)
    ├── widgets/             # AppHeader, BottomNavBar, CandidateCard, StarRatingBar, Buttons
    └── screens/             # 21 screens categorized by workflow
```

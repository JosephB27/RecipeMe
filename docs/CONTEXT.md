# RecipeMe

## Problem Statement
Social media platforms like TikTok, Instagram Reels, and YouTube Shorts are flooded with recipe videos. While these platforms are great for discovering new recipes, they present several challenges for users who want to actually cook these recipes:

- Constant pausing and unpausing of videos
- Difficulty in finding specific sections
- Need to rewatch parts multiple times
- Inconvenient methods of saving recipes (e.g., screenshotting captions)

## Project Objective
Create a mobile application that transforms social media recipe videos into user-friendly, written recipes. The app will allow users to:
- Import recipes from TikTok, Instagram, and YouTube Shorts
- Convert video content into mobile-friendly, written format
- Access and manage their recipe collection efficiently

## User Flows

### Onboarding
1. User creates an account
2. Completes initial setup

### Recipe Import
1. User inputs recipe via:
   - Copy/paste link
   - Direct share to RecipeMe
2. System processes video into written format
3. Recipe appears in user's cookbook

## Application Screens

### Homepage
- Welcome message
- User analytics
- Quick access to key features

### Add Recipe (+)
- Link input interface
- Processing status indicator

### Cookbook
- Collection of all imported recipes
- Organized recipe management

## Data Models

### User
- First Name
- Last Name
- Email
- Phone Number

### Recipe
- Name
- Meal Type
- Cuisine
- Ingredients
- Prep Time
- Recipe Steps

## Technical Stack

### Frontend
- React Native (Expo)
- TypeScript

### Database
- Supabase

## Database Schema

# 📚 RecipeMe – Supabase Schema (v1)

---

## ENUM Types

| Name            | Values                                  | Notes                                     |
|-----------------|-----------------------------------------|-------------------------------------------|
| `recipe_status` | `pending`, `processing`, `ready`, `error` | Tracks async‑pipeline state of each recipe |
| `text_src_type` | `asr`, `caption`, `ocr`                 | Identifies where a raw text snippet came from |

---

## Tables

### `public.recipes`

| Column        | Type / Default                              | Constraints / Notes                                  |
|---------------|---------------------------------------------|------------------------------------------------------|
| `id`          | `uuid` `PRIMARY KEY` `DEFAULT gen_random_uuid()` | |
| `user_id`     | `uuid` `REFERENCES auth.users ON DELETE CASCADE` | Owner of the recipe                                  |
| `video_url`   | `text` `NOT NULL`                           | Original video link                                  |
| `platform`    | `text` `NOT NULL`                           | `tiktok`, `instagram`, `youtube`                     |
| `creator`     | `text` `NOT NULL`                           | Handle / channel name                                |
| `title`       | `text`                                      | Filled by LLM or video metadata                      |
| `cuisine`     | `text`                                      | (optional)                                           |
| `prep_time`   | `text`                                      | e.g. `15 min`                                        |
| `ingredients` | `jsonb`                                     | Array of `{quantity, unit, item}` ‑ nullable         |
| `steps`       | `jsonb`                                     | Array of strings ‑ nullable                          |
| `tips`        | `text`                                      | Freeform notes                                       |
| `status`      | `recipe_status` `DEFAULT 'pending'`         | Workflow state                                       |
| `error_msg`   | `text`                                      | Populated if status = `error`                        |
| `created_at`  | `timestamptz` `DEFAULT now()`               | |
| `updated_at`  | `timestamptz` `DEFAULT now()`               | |

**Indexes**

```sql
create index recipes_user_idx   on recipes(user_id);
create index recipes_status_idx on recipes(status);
```

**RLS Policy – single "owner access" policy**
```sql
create policy "recipes – owner access"
on public.recipes
as permissive
for all
to authenticated
using     ( user_id = auth.uid() )
with check ( user_id = auth.uid() );
```

### `public.processing_jobs` (optional queue / audit)

| Column          | Type / Default                                    | Notes                           |
| --------------- | ------------------------------------------------- | ------------------------------- |
| `id`            | `uuid` `PK` `DEFAULT gen_random_uuid()`           |                                 |
| `recipe_id`     | `uuid` `REFERENCES recipes(id) ON DELETE CASCADE` |                                 |
| `started_at`    | `timestamptz` `DEFAULT now()`                     |                                 |
| `finished_at`   | `timestamptz`                                     |                                 |
| `current_stage` | `text`                                            | `download`, `asr`, `ocr`, `llm` |
| `error_msg`     | `text`                                            |                                 |

## Project Structure

```
recipeme/
├── mobile/                      # React Native (Expo) frontend
│   ├── src/
│   │   ├── assets/             # Images, fonts, etc.
│   │   │   ├── common/         # Shared components (buttons, inputs, etc.)
│   │   │   └── recipe/         # Recipe-specific components
│   │   ├── constants/          # App constants and configuration
│   │   │   ├── theme.ts        # UI theme configuration
│   │   │   └── config.ts       # App configuration
│   │   ├── hooks/              # Custom React hooks
│   │   ├── navigation/         # Navigation configuration
│   │   ├── screens/            # Screen components
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── AddRecipeScreen.tsx
│   │   │   └── CookbookScreen.tsx
│   │   ├── services/           # API and external services
│   │   │   ├── api.ts          # API client
│   │   │   └── supabase.ts     # Supabase client
│   │   ├── store/              # State management
│   │   ├── types/              # TypeScript types/interfaces
│   │   └── utils/              # Helper functions
│   ├── App.tsx
│   └── package.json
│
└── docs/                      # Documentation
    └── CONTEXT.md

## Implementation Plan

### Phase 1: Setup
- Database connection
- Project structure setup
- Development environment configuration

### Phase 2: MVP Development
1. Frontend Development
   - Create main screens
   - Implement user interface
   - Set up navigation

2. Integration
   - Connect frontend with Supabase
   - Implement recipe import functionality
   - Enable cookbook management

### Phase 3: Video-to-Recipe Engine (AI-Powered)
1. Video Link Intake
   - Accept TikTok, Instagram Reels, or YouTube Shorts links from the frontend.
   - Validate and store the link in the processing queue.

2. Video Download & Preprocessing
   - Download the video using a robust open-source library (e.g., yt-dlp).
   - Extract audio and key video frames for analysis.
   - Store raw assets in a temporary storage bucket (e.g., Supabase Storage).

3. Transcription & Scene Segmentation
   - Use a state-of-the-art speech-to-text model (e.g., DeepSeek API or OpenAI Whisper) to transcribe the audio.
   - Segment the video into scenes/steps using audio cues and visual changes.

4. Recipe Information Extraction (AI)
   - Use DeepSeek API (latest version) to:
     - Identify and extract ingredients (quantities, units, names) from transcript and video overlays.
     - Parse out step-by-step instructions, including timings and actions.
     - Detect cuisine, meal type, and prep time if possible.
     - Optionally, extract creator/author and social metadata.

5. Data Structuring & Validation
   - Structure extracted data into the Recipe, Ingredient, and Step models.
   - Validate for completeness (e.g., at least 1 step, 1 ingredient, title present).
   - Flag for manual review if confidence is low or data is incomplete.

6. Recipe Creation & Storage
   - Store the parsed recipe, ingredients, and steps in the database (Supabase).
   - Link the recipe to the original video URL and platform.
   - Store thumbnails and key images for UI display.

7. Progress & Error Handling
   - Update processing status in real-time for the frontend (via polling or websockets).
   - Handle errors gracefully (e.g., unsupported video, failed extraction, etc.).
   - Allow retry or manual intervention if needed.

8. Integration & Testing
   - Integrate the engine with the frontend import flow.
   - Test with a variety of real TikTok, IG, and YouTube recipe videos.
   - Optimize for speed, accuracy, and reliability.

### Success Criteria
- Ability to import recipes from social media
- Successful conversion of videos to written format
- Functional recipe management in cookbook section

### Success Criteria (Phase 3)
- User can submit a TikTok/IG/YouTube link and receive a structured, accurate recipe in their cookbook.
- System handles common video formats and errors gracefully.
- Recipes are high quality and require minimal manual correction.
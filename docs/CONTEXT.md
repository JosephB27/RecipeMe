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

### 🗄️ **Overview**
RecipeMe uses a Supabase PostgreSQL database with 3 core tables designed for efficient recipe processing and management.

---

### 📋 **Custom Types**

| **Type Name**     | **Values**                                    | **Purpose**                                       |
|-------------------|-----------------------------------------------|---------------------------------------------------|
| `recipe_status`   | `pending`, `processing`, `ready`, `error`     | Tracks the AI processing pipeline state          |
| `text_src_type`   | `asr`, `caption`, `ocr`                      | Identifies the source of extracted text content  |

---

### 🔗 **Table Relationships**

```
auth.users (Supabase Auth)
    ↓ (user_id)
recipes
    ↓ (recipe_id)
processing_jobs & raw_text_sources
```

---

### 📊 **Table Definitions**

#### **`recipes`** - Core recipe storage
*Stores processed recipes from social media videos*

| **Column**      | **Type**           | **Constraints**                  | **Description**                           |
|-----------------|-------------------|----------------------------------|-------------------------------------------|
| `id`            | `uuid`            | PRIMARY KEY, auto-generated      | Unique recipe identifier                  |
| `user_id`       | `uuid`            | FK → `auth.users`, NOT NULL      | Recipe owner (Supabase Auth)             |
| `video_url`     | `text`            | NOT NULL                         | Original social media video link         |
| `platform`      | `text`            | NOT NULL                         | Source platform (tiktok/instagram/youtube) |
| `creator`       | `text`            | NOT NULL                         | Content creator handle/username           |
| `title`         | `text`            | nullable                         | Recipe title (AI-generated or manual)    |
| `cuisine`       | `text`            | nullable                         | Cuisine type (e.g., "Italian", "Thai")   |
| `prep_time`     | `text`            | nullable                         | Preparation time (e.g., "15 min")        |
| `ingredients`   | `jsonb`           | nullable                         | Structured ingredient list                |
| `steps`         | `jsonb`           | nullable                         | Cooking instructions array                |
| `tips`          | `text`            | nullable                         | Additional cooking tips                   |
| `status`        | `recipe_status`   | DEFAULT 'pending'                | Current processing state                  |
| `error_msg`     | `text`            | nullable                         | Error details if processing fails         |
| `created_at`    | `timestamptz`     | DEFAULT now()                    | Record creation timestamp                 |
| `updated_at`    | `timestamptz`     | DEFAULT now()                    | Last modification timestamp               |

**Security & Performance:**
- ✅ Row Level Security (RLS) enabled
- ✅ Users can only access their own recipes
- ✅ Indexed on `user_id` and `status` for fast queries

---

#### **`processing_jobs`** - AI pipeline tracking
*Tracks the status of video-to-recipe conversion jobs*

| **Column**       | **Type**          | **Constraints**                    | **Description**                           |
|------------------|-------------------|-----------------------------------|-------------------------------------------|
| `id`             | `uuid`            | PRIMARY KEY, auto-generated       | Unique job identifier                     |
| `recipe_id`      | `uuid`            | FK → `recipes(id)`, CASCADE       | Associated recipe                         |
| `started_at`     | `timestamptz`     | DEFAULT now()                     | Job start time                           |
| `finished_at`    | `timestamptz`     | nullable                          | Job completion time                       |
| `current_stage`  | `text`            | nullable                          | Current processing stage                  |
| `error_msg`      | `text`            | nullable                          | Error details if job fails               |

**Stages:** `download` → `asr` → `ocr` → `llm` → `complete`

---

#### **`raw_text_sources`** - Extracted content storage
*Stores raw text extracted from videos during processing*

| **Column**      | **Type**           | **Constraints**                   | **Description**                           |
|-----------------|-------------------|-----------------------------------|-------------------------------------------|
| `id`            | `int8`            | PRIMARY KEY, auto-increment       | Unique source identifier                  |
| `recipe_id`     | `uuid`            | FK → `recipes(id)`, CASCADE       | Associated recipe                         |
| `src_type`      | `text_src_type`   | NOT NULL                          | Text extraction method                    |
| `content`       | `text`            | NOT NULL                          | Raw extracted text content               |

**Source Types:**
- `asr` - Audio speech recognition
- `caption` - Video overlay text
- `ocr` - Optical character recognition

---

### 🔒 **Security Policies**

```sql
-- Users can only access their own recipes
CREATE POLICY "recipes_owner_access" ON recipes
  FOR ALL TO authenticated 
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Processing jobs inherit recipe access
CREATE POLICY "processing_jobs_owner_access" ON processing_jobs
  FOR ALL TO authenticated
  USING (recipe_id IN (
    SELECT id FROM recipes WHERE user_id = auth.uid()
  ));
```

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
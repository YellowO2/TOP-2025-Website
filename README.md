# CCDS 2025 Orientation Website

## Overview
A website + telegram management system used for managing and displaying realtime leaderboard and activities for NTU CCDS 2025 Orientation. The system supported the orientation event reliably for OGLs/GameMasters managing OG activities.

## Features

<table>
<tr>
<td align="center"><strong>Home Page</strong></td>
<td align="center"><strong>Real-time Leaderboard</strong></td>
<td align="center"><strong>Management via Telegram</strong></td>
</tr>
<tr>
<td><img src="./.github/images/homepage.png" alt="Homepage UI interface"></td>
<td><img src="./.github/images/leaderboard.png" alt="Live leaderboard updates"></td>
<td><img src="./.github/images/telegram-bot.png" alt="GL using bot commands to update scores"></td>
</tr>
</table>

---

## My Experience
As the backend tech lead, my goal was to design a system that helps Game Leaders/OGLs manage orientation game scores, with a real leaderboard for everyone to view throughout the orientation. I was also responsible for deployment and making sure the system could handle the high traffic during orientation.

### Learning From Seniors Mistakes
The previous year's website had crashed during the event. I wanted to see what I can learn to prevent this from happening to us.
I asked for the old code (and thankfully obtained it) and looked through it. It was built on a standard MongoDB/AWS stack, so the server crash was likely due to unhandled server-side errors rather than deployment or overload issues. The main problems I identified were an overly complex login system and management interface that created:
- Unnecessary complexity that made the system unstable
- A clunky management interface and login system that is impractical to use for Game Leaders during orientation

### My Solution
Our system needed to be simple, convenient and reliable. After some thinking, I came up with the idea of using a Telegram bot to manage, instead of a clunky web interface. This made sense since everyone already uses Telegram, and we could leverage its authentication naturally, eliminating extra setup steps. For deployment, I went with standard Next.js API routes on Vercel, which is simple to set up and quite reliable.

### Outcome
Despite repeated testing, I was still quite anxious before and during orientations. It's quite a new thing to use telegram bots for orientation (and also it's an event with hundreds of people), and I was responsible for how well it worked. 
And... thankfully, everything did went smoothly and nothing unexpected happened :), phew.
I was glad my idea worked out, and I got to see it actually helping people, which is rare for projects I've worked on so far.

---

## Tech Stack

- **Framework:** Next.js (React)
- **Backend:** Next.js API Routes
- **Database:** JSONBin API
- **Bot:** grammY framework (via Telegram Webhooks)
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites
- **Node.js** 
- **Git** 

### Installing Dependencies

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/CCDS-TOP/TOP-2025-Website.git
   ```

2. Navigate to the project directory:

   ```bash
   cd TOP-2025-Website
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. To start the development server, run:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
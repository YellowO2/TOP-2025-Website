# CCDS 2025 Orientation Website

## Overview
A website + telegram management system used for managing and displaying realtime leaderboard and activities for NTU CCDS 2025 Orientation. The system supported the orientation event reliably for 40+ GLs managing OG activities.

## Features & Architecture

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

- **Home Page & Event Info**: Overview of the orientation and Displays schedules for games and activities.
- **Leaderboard**: Real-time updates showing OG standings.
- **Telegram Bot**: Enables GLs to update scores in real-time using simple commands like `/add` and `/remove`.

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
# 🏃‍♂️ Gamification för löpning

En mobilapp för att logga löprundor, följa sin utveckling i form av levels och tävla mot vänner för titlar! 

---

## 🧰 Tech Stack

| Teknik | Användning |
|--------|------------|
| **React Native** | Mobilapp för iOS & Android |
| **TypeScript** | Typning och robust kodstruktur |
| **React Navigation** | Navigering (stack + tabbar) |
| **React Context API** | Global state för användare och rundor |
| **AsyncStorage** | Persistent lokal lagring |
| **react-native-paper** | UI-komponentbibliotek |
| **uuid** | Unika ID:n för run-entries |
| **react-native-get-random-values** | UUID-stöd i React Native |
| **Date-funktioner** | Streak, nivåer, helglogik m.m. |

---

## ✨ Features

### 👤 Användarhantering
- Flera användare (ex: Kipchoge, Joel)
- Profilväxling via ikon i header
- Alla visas i leaderboard

### 🏃‍♂️ Run-logging
- Lägg till runda (distans + datum)
- XP genereras baserat på streak
- Automatisk UUID på varje run
- Redigera eller ta bort rundor
- Sparas i AsyncStorage

### 🔁 Streak-system
- Räkning av nuvarande och längsta streak
- Påverkar XP-multiplikator
- Visas i profil, leaderboard och titlar

### 📊 XP & Levelsystem
- XP ökar baserat på distans × streak
- Dynamiska nivåer:
  - XP-bar
  - Level-visning
  - Level-rank i leaderboard

### 🏅 Titlar
- Automatiska titlar:
  - **Längsta rundan** – min 12 km
  - **Totalt antal km** – min 100 km
  - **Helgsnitt** – min 9 km/helg
  - **Längsta streak** – min 20 dagar
- Endast en titelhållare per kategori
- Runner-up visas om man är tvåa

### 📖 Historik
- Lista med alla loggade rundor
- Redigera rundor med modal
- XP räknas om vid ändring

### 🏆 Leaderboard
- Rangordnar användare efter:
  - Level
  - XP (sekundärt)
- Visar:
  - Namn, nivå, titlar
  - Streak, snitt, senaste runda

### 📱 Navigering
- **Bottom tab bar**:
  - Hem (Leaderboard)
  - Logga runda (med plusikon)
  - Profil
- **Stack navigation**:
  - Stats, streak, titlar m.m.
- **Profilswitcher**:
  - Ikon i övre högra hörnet
  - Byt mellan användare

---

## 📦 Kommande förbättringar (struktur)
- Custom hooks för logik (t.ex. XP, streak)
- Fler separata services och utils
- Renare och mer DRY screens

---

## 🤝 Kontakt

Projekt av Joel Lindberg(https://www.linkedin.com/in/joel-lindberg2/)  
🔗 [LinkedIn-profil](https://www.linkedin.com/in/joel-lindberg2/)
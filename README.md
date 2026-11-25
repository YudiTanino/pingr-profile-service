# Pingr: Profile service

Profile microservice of **Pingr**, a Twitter-like microblog system designed for *MAC0475 - Laboratory of Complex Computer Systems* (IME-USP, 2021). The architecture was proposed by the course professors, and each team built one microservice. This repository contains the **Profile** service, built by a 6-person team.

📖 Course documentation: https://pingr-complexos.netlify.app/

🔗 Original repositories: https://gitlab.com/pingr-complexos-2021

## Structure

- `frontend/`: Nuxt 2 (Vue.js, Vuex), Axios, Tailwind CSS.
- `backend/`: Node.js, Express, MongoDB, NATS Streaming, JWT. Based on the course API template by Renato Cordeiro Ferreira (MIT License).

## My contribution

I worked mainly on the **front-end**, in a pair within the team:

- **Profile page:** built the dynamic profile page, loaded by username, which hides private fields (birth date, location, account creation date) when the profile is not public.
- **State and API:** set up the Axios API client and the Vuex store, fetching the user from the back-end on page load.
- **Components:** created the profile field components (name, username, location, description, birth date and account creation date), connected to the Vuex store, and started a reusable label/value component.

On the **back-end**, I implemented the **profile update endpoint** (`PATCH /users/:id`): token-based authorization check, validation of each field (types, lengths, dates, URLs) and publishing the changes as events to NATS Streaming.

## Running locally

- **Back-end:** `npm install` and `npm run start:dev` in `backend/` (requires MongoDB and NATS Streaming).
- **Front-end:** `npm install` and `npm run dev` in `frontend/`.

The service depends on other Pingr microservices, which are not included here. Configuration variables are listed in `backend/.env.example`.

## Credits

Developed for MAC0475 (IME-USP, 2021). Architecture and specification by the course professors. The commit history preserves each author's contributions.

# Woodworking Website



## Table of contents

- [About](#about)
- [Deployment](#deployment)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Creators](#creators)


## About
#### This website lets users share and sell woodworking plans. You can upload an image of your furniture and attach a document with the plans. Other users can purchase these plans to create the furniture themselves.

This project uses the following:
- React
- Docker
- prisma
- middleware
- routing
- JWT Access
- SQL

## Deployment

* You will need to create a .env file within the react folder that looks like this:
```
NEXT_PUBLIC_DATABASE_URL="postgresql://postgres:password@localhost:5432/mydatabase?schema=public"

ADMIN_USERNAME=admin
HASHED_ADMIN_PASSWORD=sQnzu7wkTrgkQZF+0G1hi5AI3Qmzvv0bXgc5THBqi7mAsdd4Xll27ASbRt9fEyavWi6m0QP9B8lThf+rDKy8hg== #This is password
NEXT_PUBLIC_STRIPE_SECRET_KEY=[YOUR SECRET STRIPE KEY]
NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET=[YOUR PRIVATE STRIPE WEBHOOK KEY]
NEXT_PUBLIC_RESEND_API_KEY=[API KEY FOR RESEND]
NEXT_PUBLIC_SENDER_EMAIL=onboarding@resend.dev

NEXT_PUBLIC_STRIPE_PUBLIC_KEY=[YOUR PUBLIC STRIPE KEY]
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```
1. After you install npm, navigate to:
```
frontend/
└── react/
```
2. Install the node modules with 
```
npm install
```
3. Navigate to the root directory and run the docker compose file with
```
docker compose up
```
4. Run the react website with
```
npm run dev
```

Open http://localhost:3000 with your browser to see the result.
Note that when testing purchases you can use 4242424242424242 as a test card.

## What's included

All the files for react pages can be found in:

```text
frontend/
└── react/
    └── src/
```

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://reponame/blob/master/CONTRIBUTING.md) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://reponame/issues/new).

## Contributing

You can contribute to this project with no license but I ask that credit be given to me.

## Creators

**Creator**

- <https://github.com/richard-voragen>
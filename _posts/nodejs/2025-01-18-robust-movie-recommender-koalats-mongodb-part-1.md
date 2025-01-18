---
layout: post
title: Building a Robust Movie Recommender Using KoalaTs and MongoDB - Part 1 🐨 🎬
categories: [ "nodejs" ]
image: /assets/img/koala.jpg
image_alt: 'A sleeping koala'
image_source: 'https://unsplash.com/photos/koala-sleeping-on-tree-branch-EerxztHCjM8'
---

Last week, I wanted to try out KoalaTs in a real-world project to see how it would perform, and to get some insights
into what should be the next improvement. I decided to build a simple movie recommender
using [KoalaTs](https://koala-ts.github.io/docs/) and MongoDB. Once,
I had the simple version working, I decided to dive deeper into the project and make it more powerful and robust.

Today, I will show you the simple version of the movie recommender, and next week, I will discuss how to make it more
powerful. You can find the code for this project on
my [GitHub repository](https://github.com/imdhemy/koala-recommender). Let's get started!

## Overview

The basic idea is to store the movies into a MongoDB database and get advantage of MongoDB Atlas search `moreLikeThis`
query to get similar movies. The better movie attributes you have, the better recommendations you will get.
Needless to say that the amount of data also plays a big role in the quality of the recommendations.

## Project setup

First, you need to create a new KoalaTs project. You can do this by running the following command:

```bash
npx @koala-ts/cli create koala-recommender
```

Then, we need to dockerize the project to make it easier to run. You can find
the [Dockerfile](https://github.com/imdhemy/koala-recommender/blob/main/Dockerfile)
and [docker-compose.yml](https://github.com/imdhemy/koala-recommender/blob/main/docker-compose.yml) in
the GitHub repository.

## MongoDB setup

We are using the `mongodb/mongodb-atlas-local:8` image to run a local MongoDB Atlas instance. Unfortunately, seeding the
search index with the container startup is not supported yet. So, we need to do it ourselves. You can do this manually
if you are running MongoDB Compass. I have created a script to do this for my unit tests.

KoalaTs comes with [Vitest](https://vitest.dev/) by default, which we will use to write out unit tests. You still can
use any other testing library you like, but KoalaTs is built with Vitest in mind, because everyone should! 😄

The script is located in
the [tests/_setup/global.ts](https://github.com/imdhemy/koala-recommender/blob/0b6903e7c79baef6143bffef19e1f806eced7f78/tests/_setup/global.ts#L14-L28)

The basic idea is to create a `movies` collection and insert a temporary document, then create a search index with a
dynamic mapping, and finally delete the temporary document. The temporary document is not necessary, but it helped to
debug the search index creation.

Talking about testing is beyond the scope of this article, but you can find the tests in the GitHub repository.

## Connecting to MongoDB

KoalaTs is a database-agnostic, but it recommends using the native MongoDB driver. I used the powerful KoalaTs `.env`
configuration files to store the MongoDB connection string.

Let's install the MongoDB driver:

```bash
npm install mongodb
```

Then update our environment variables:

```
# .env
MONGODB_URI=mongodb://mongod:27017?directConnection=true
MONGODB_DB=koala
```

And for testing, I used a different database:

```
# .env.test
MONGODB_URI=mongodb://mongod:27017?directConnection=true
MONGODB_DB=koala_test
```

Now, we can connect to MongoDB using the following code:

```typescript
import {Db, MongoClient} from 'mongodb';
import * as process from 'node:process';

export let db: Db;
export let client: MongoClient;

export async function connectToDb(): Promise<void> {
    // I used here the `process.env` to get the environment variables directly
    // but as a best practice, you should extract them to a configuration file under the `/src/config` directory
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
    db = client.db(process.env.MONGODB_DB as string);
}
````

This code will connect to the MongoDB instance and monkey-patch the `db` and `client` variables to be used in other
parts of the application. We need to call this function in the `index.ts` file before starting the server, to ensure
that the database connection is established only once.

```diff
// src/index.ts

import {create} from '@koala-ts/framework';
import {appConfig} from './config/app';
+ import {connectToDb} from './infrastructure/database';

const app = create(appConfig);

// The top-level await works like a charm because KoalaTs was built with ES modules in mind
+ await connectToDb();
app.listen(3000);

console.log('Server is running on http://localhost:3000');
```

## The Movie document

As mentioned earlier, I started with a simple version, but once again, the better the attributes, the better the
recommendations. Here is an example of a movie document:

```json
{
  "_id": {
    "$oid": "6786c3566e2c67647853df7d"
  },
  "title": "The Godfather",
  "genre": [
    "Crime",
    "Drama",
    "Thriller"
  ],
  "plot": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  "releaseDate": {
    "$date": "1972-03-24T00:00:00.000Z"
  }
}
```

## Creating the movie endpoint

We need to create an endpoint to add a movie to the database. We will use the `POST` method to create a new movie. This
can be done by creating a new controller under the `src/controllers` directory.

```typescript
// src/controllers/MovieController.ts
import {type IScope, Route} from '@koala-ts/framework';

export class MovieController {
    @Route({method: 'POST', path: '/movies'})
    async store(scope: IScope) {
        scope.response.status = 201; // Added for now, because the default is 404!
    }
}
```

Don't forget to add the controller to the `controllers` array in the `src/config/app.ts` file.

```diff
// src/config/app.ts
import { HomeController } from '../controller/HomeController';
import { type IKoalaConfig } from '@koala-ts/framework';
+import { MovieController } from '../controller/MovieController';

export const appConfig: IKoalaConfig = {
    controllers: [
        HomeController,
+       MovieController,
    ]
};
```

Then we need to implement the `createMovie` service. This service will be responsible for creating a new movie in the
database.

```typescript
// src/application/movie/creat-movie.ts
import {IMovie, IMovieProps} from './types';
import {db} from '../../infrastructure/database';

export async function createMovie(props: IMovieProps): Promise<IMovie> {
    const doc: Partial<IMovie> = {...props, releaseDate: new Date(props.releaseDate)};

    const result = await db.collection('movies').insertOne({...doc});
    doc.id = result.insertedId.toString();

    return doc as IMovie;
}
```

Then we need to call this service in the controller:

```diff
// src/controllers/MovieController.ts
import { type IScope, Route } from '@koala-ts/framework';
+ import { createMovie, IMovieProps } from '../application/movie';

export class MovieController {
    @Route({ method: 'POST', path: '/movies' })
    async store(scope: IScope) {
+        scope.response.body = await createMovie(scope.request.body as IMovieProps);
         scope.response.status = 201;
    }
}
```

## Recommendations

Now, the time has come to get the recommendations. We will create a new endpoint to get the recommendations for a movie.

```typescript
// src/controllers/MovieController.ts
import {type IScope, Route} from '@koala-ts/framework';
import {createMovie, IMovieProps, recommendMovie} from '../application/movie';

export class MovieController {
    @Route({method: 'POST', path: '/movies'})
    async store(scope: IScope) {
        scope.response.body = await createMovie(scope.request.body as IMovieProps);
        scope.response.status = 201;
    }

    @Route({method: 'POST', path: '/movies:recommend'})
    async recommend(scope: IScope) {
        scope.response.body = await recommendMovie(scope.request.body as IMovieProps);
    }
}
```

The `recommendMovie` function will receive a movie object and return the top 5 recommended movies. Here is the code for
the service:

```typescript
// src/application/movie/recommend-movie.ts
import {IMovie, IMovieProps} from './types';
import {db} from '../../infrastructure/database';

export async function recommendMovie(props: Partial<IMovieProps>): Promise<IMovie[]> {
    const cursor = db.collection('movies').aggregate([
        {$search: {moreLikeThis: {like: props}}},
        {$limit: 5},
        {$addFields: {score: {$meta: 'searchScore'}}}
    ]);

    const result: IMovie[] = [];
    for await (const movie of cursor) {
        result.push({...movie, id: movie._id.toString()} as IMovie);
    }

    return result;
}
```

## Takeaways

### MongoDB Atlas Search

MongoDB Atlas is using Lucene under the hood to provide the search capabilities. The `moreLikeThis` query to work, you
need to seed the Database with many documents, in other words, if you tried recommending a movie with only one or two
movies most likely you will get no results.

### KoalaTs

While building this project, I was impressed myself with how easy it was to build a REST API using KoalaTs. There is
always room for improvement, and below is a list of things I will improve in KoalaTs:

- [Add templates for vitest setup files in the generated project.](https://github.com/koala-ts/cli/issues/10)
- [Improve Typescript configuration](https://github.com/koala-ts/cli/issues/11).
- [Add the `PORT` environment variable to the generated project](https://github.com/koala-ts/cli/issues/12).

### Next steps

In the next article, I will discuss how to make the movie recommender more powerful, stay tuned! Let the KoalaTs be with
you! 🐨

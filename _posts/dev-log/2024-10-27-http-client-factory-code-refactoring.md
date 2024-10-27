---
layout: post
title: HTTP Client Factory Code Refactoring
categories: [ "dev-log" ]
---

I'm working on a Proxy/Adapter project, let's call it "Banana". Banana is developed in TypeScript and uses Axios for
HTTP requests. It should be able to communicate with different APIs, each with different authentication methods and
configurations.

The system started with a single API "PeelAPI", where we provided a `createClient` function that returned an Axios
instance with the correct configuration. When the second API "BunchAPI" was added, we created a new function called the
same `createClient` but in a different subdomain. It wasn't different for the third API "SplitAPI". For each Axios
instance, we wrapped the errors in a custom error class, so we could identify the source of the error. This was done by
a response interceptor.

The problem is that we have a lot of duplicated code, and the `createClient` functions breaks the Single Responsibility
Principle, as it is responsible for creating the client and authenticating it. I'm still not sure if it is a good idea
to keep the Error wrapping in the same function or if it should be done in a separate module after the client is
created.

To add more complexity, since the client tokens are cached in Redis, we need to pass the Cache service to the
`createClient` function and not all Clients needs to cache tokens. This results in different signatures for each
`createClient` function.

I'm considering a Factory pattern to create the clients. The plan is to Unify or to standardize the client creation
functions to have the same signature, then we can replace it with a single Factory function that will create the
clients based on the configuration.

I found out that the `baseURL` is the only configuration that changes between the clients so far. I'm not sure if it's
convenient to accept a configuration object or `baseURL` as a parameter. I went for the `baseURL` parameter, as doing it
when is needed is easier than creating a configuration object with a single property.

Last week I started refactoring the "PeelAPI" client ended up with a `createClient(baseURL: string): AxiosInstance` that
returns an Axios instance with the correct configuration. Then I moved to the "BunchAPI", and it wasn't straightforward
because the "PeelAPI" didn't require authentication, but the "BunchAPI" does. I had to extract the authentication logic
to a separate function. I didn't change the Signature of the `createClient` function, I decided to do that in the next
merge request.

The first merge request is already merged, but I'm still waiting for the second one to be reviewed. Once it is merged, I
will start working on standardizing the `createClient` functions, ensuring that the first two API clients have the same
signature. Then the third API client will be refactored in two steps, first for authentication and then for the standard
signature.

Once all the `createClient` functions are standardized, I will create the Factory function that will create the clients
based on the configuration. I still need to figure out how to handle authentication in a clean way.

---
layout: post
title: HTTP Client Factory Code Refactoring
categories: [ "dev-log" ]
---

I'm working on a Proxy/Adapter project, which we'll call "Banana." Banana is developed in TypeScript and uses Axios for
HTTP requests. It’s designed to communicate with different APIs, each with distinct authentication methods and
configurations.

The system started with a single API, "PeelAPI," for which we provided a `createClient` function that returned an Axios
instance with the correct configuration. When we added a second API, "BunchAPI," we created another `createClient`
function for it, but in a different subdomain. The same was done for the third API, "SplitAPI." For each Axios instance,
we wrapped errors in a custom error class to identify the source of the error, accomplished by a response interceptor.

<div class="tip" markdown="1">
One API, one `createClient`—simple, right? Fast forward to three APIs, and now it's like juggling bananas 🍌🍌🍌 with TypeScript.
</div>

The issue is that we now have a lot of duplicated code, and the `createClient` functions break the Single Responsibility
Principle, as they are responsible for both creating the client and handling authentication. I'm uncertain whether it's
best to keep error wrapping within the same function or move it to a separate module after the client is created.

To add complexity, since client tokens are cached in Redis, we need to pass the Cache service to the `createClient`
function, although not all clients require token caching. This results in different signatures for each `createClient`
function.

I'm considering using a Factory pattern for client creation. The plan is to unify or standardize the client creation
functions so they have a consistent signature, allowing us to replace them with a single Factory function that creates
clients based on configuration.

I discovered that `baseURL` is the only configuration that varies between clients so far. I'm unsure whether it’s best
to accept a configuration object or just `baseURL` as a parameter. I chose `baseURL`, as it’s easier to handle only when
needed than creating a configuration object with a single property.

Last week, I began refactoring the "PeelAPI" client and ended up with a `createClient(baseURL: string): AxiosInstance`
function, which returns an Axios instance with the correct configuration. I then moved on to "BunchAPI," which was less
straightforward because, unlike "PeelAPI," "BunchAPI" requires authentication. I had to extract the authentication logic
into a separate function. I didn’t change the signature of the `createClient` function, planning to address that in the
next merge request.

<div class="tip" markdown="1">
Once standardized, Factory Pattern will take the wheel. But the question remains: what’s the cleanest way to handle authentication? 🤔 #CodeDesign
</div>

The first merge request is already merged, but I'm waiting for the second one to be reviewed. Once it's merged, I will
standardize the `createClient` functions, ensuring that the first two API clients have a consistent signature. Then, the
third API client will be refactored in two steps: first to address authentication, then to standardize the signature.

After all `createClient` functions are standardized, I'll create the Factory function to generate clients based on
configuration. I still need to determine a clean way to handle authentication. Do you have any suggestions?

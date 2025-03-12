
# Angular SSR (Server Side Rendering) with AWS Cloudfront 

This project allows you to deploy a fully functional Angular SSR on AWS using CDK.

I talk about this in details [here](https://www.linkedin.com/pulse/deploy-angular-ssr-server-side-rendering-app-aws-seo-davide-fruci-jfitf/?trackingId=KfBOlJZA6IESn8rDs7cTtg%3D%3D).

## Why Use SSR?

Server-Side Rendering (SSR) is beneficial for:

- SEO Optimization: Search engines can crawl and index server-rendered pages more effectively.
- Faster Initial Load Time: SSR improves perceived performance by sending pre-rendered HTML to the client.
- Enhanced Performancez on Slow Networks: Reduces JavaScript execution time on the client side, making applications more responsive.

## Why Use CloudFront?

AWS CloudFront is a fast, secure, and scalable Content Delivery Network (CDN) that helps improve application performance by:

- Caching Static Content: Reduces latency and offloads traffic from the origin server.
- Global Distribution: Serves content from edge locations closer to users, reducing load times.
- Cost Efficiency: Reduces data transfer costs by leveraging caching mechanisms.

## Run angular app locally

### Requirements

- VSCode with Dev Container extension
- Docker
- An AWS account


#### No SSR

```sh
cd angular
npm i
npm run start --configuration=development
```

## Deploy aws stack

from your container run

```sh
make deploy/dev
```

## destroy aws stack

from your container run

```sh
make destroy/dev
```
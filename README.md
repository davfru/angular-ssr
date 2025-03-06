
# Angular SSR (Server Side Rendering) with AWS Cloudfront 

This project allows you to deploy a fully functional Angular SSR on AWS using CDK.

## Why Use SSR?

Server-Side Rendering (SSR) is beneficial for:

- SEO Optimization: Search engines can crawl and index server-rendered pages more effectively.
- Faster Initial Load Time: SSR improves perceived performance by sending pre-rendered HTML to the client.
- Enhanced Performancez on Slow Networks: Reduces JavaScript execution time on the client side, making applications more responsive.

## Requirements

- VSCode with Dev Container extension
- Docker
- An AWS account

## Part 1 - Serve static content through Cloudfront

### Why Use CloudFront?

AWS CloudFront is a fast, secure, and scalable Content Delivery Network (CDN) that helps improve application performance by:

- Caching Static Content: Reduces latency and offloads traffic from the origin server.
- Global Distribution: Serves content from edge locations closer to users, reducing load times.
- Cost Efficiency: Reduces data transfer costs by leveraging caching mechanisms.

### Run angular app locally 

#### No SSR

```sh
cd angular
npm i
npm run start --configuration=development
```

#### With SSR

First of all we need to deploy the AWS stack running from the project root: 

```sh
make deploy/dev
```

then we need to update *CDN_URL* in ```angular/src/server.ts``` with the cdn url just deployed.

Finally we can run the Angular server locally running:

```sh
cd angular
npm i
npm run serve:ssr:angular-ssr
```

##### improvements

- handle env var using dotenv inside ```angular/src/server.ts```

##### destroy aws stack

```sh
make destroy/dev
```

## Part 2 - Deploy the Angular Server on AWS 

... *upcoming*
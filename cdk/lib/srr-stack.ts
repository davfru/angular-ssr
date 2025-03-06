import {
  Duration,
  CfnOutput,
  CfnParameter,
  Stack,
  StackProps,
  RemovalPolicy,
} from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_headers from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import { Construct } from "constructs";

export class SsrStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const mySiteBucketName = new CfnParameter(this, "mySiteBucketName", {
      type: "String",
      description: "The name of S3 bucket to upload react application",
    });
    
    const mySiteBucket = new s3.Bucket(this, "ssr-site", {
      bucketName: mySiteBucketName.valueAsString,
      websiteIndexDocument: "index.csr.html",
      websiteErrorDocument: "index.csr.html",
      publicReadAccess: false,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET],
          allowedOrigins: ["*"],
        }
      ],
      removalPolicy: RemovalPolicy.DESTROY, // Only for demo, not for production
    });

    new CfnOutput(this, "Bucket", { value: mySiteBucket.bucketName });

    new s3deploy.BucketDeployment(this, "Client-side Angular app", {
      sources: [s3deploy.Source.asset("../angular/dist/angular-ssr/browser")],
      destinationBucket: mySiteBucket,
    });

    const distribution = new cloudfront.Distribution(this, "ssr-cdn", {
      defaultBehavior: {
        origin: cloudfront_origins.S3BucketOrigin.withOriginAccessControl(mySiteBucket),
        responseHeadersPolicy: cloudfront_headers.ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS_WITH_PREFLIGHT,
      },
      additionalBehaviors: {},
      defaultRootObject: "index.csr.html"
    });

    new CfnOutput(this, "CF URL", {
      value: `https://${distribution.distributionDomainName}`,
    });
  }
}

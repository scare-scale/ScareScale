import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import {
  Distribution,
  OriginAccessIdentity,
  ViewerProtocolPolicy,
  ErrorResponse,
  Function,
  FunctionAssociation,
  FunctionCode,
  FunctionEventType
} from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { GlobalStackProps } from "../bin/infrastructure";

export class WebsiteHostingStack extends Stack {
  constructor(scope: Construct, id: string, props: WebsiteHostingStackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, `bucket`, {
      accessControl: s3.BucketAccessControl.PRIVATE,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      `originAccessIdentity`
    );

    bucket.grantRead(originAccessIdentity);

    const errorResponse: ErrorResponse = {
      httpStatus: 404,
      responsePagePath: "/404.html"
    };

    // Function to remove .html from page route - https://stackoverflow.com/a/74356989
    const cloudfrontFunction = new Function(this, `function`, {
      code: FunctionCode.fromInline('function handler(r){var e=r.request,i=e.uri;return i.endsWith("/")?e.uri+="index.html":i.includes(".")||(e.uri+=".html"),e}')
    });

    const functionAssociation: FunctionAssociation = {
      eventType: FunctionEventType.VIEWER_REQUEST,
      function: cloudfrontFunction,
    };

    const distribution = new Distribution(this, `distribution`, {
      defaultRootObject: "index.html",
      errorResponses: [errorResponse],
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessIdentity(bucket, { originAccessIdentity }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [functionAssociation]
      },
      domainNames: [props.domainName],
      certificate: props.cert,
    });

    new s3Deployment.BucketDeployment(this, `bucketDeployment`, {
      destinationBucket: bucket,
      sources: [s3Deployment.Source.asset("../dist")],
      distribution: distribution,
    });
  }
}

interface WebsiteHostingStackProps extends StackProps, GlobalStackProps {
  cert: Certificate;
}

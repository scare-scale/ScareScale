import { RemovalPolicy, Stack, StackProps ***REMOVED*** from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import { Construct ***REMOVED*** from "constructs";
import {
  Distribution,
  OriginAccessIdentity,
  ViewerProtocolPolicy,
  ErrorResponse,
  Function,
  FunctionAssociation,
  FunctionCode,
  FunctionEventType
***REMOVED*** from "aws-cdk-lib/aws-cloudfront";
import { S3Origin ***REMOVED*** from "aws-cdk-lib/aws-cloudfront-origins";
import { Certificate ***REMOVED*** from "aws-cdk-lib/aws-certificatemanager";
import { GlobalStackProps ***REMOVED*** from "../bin/infrastructure";

export class WebsiteHostingStack extends Stack {
  constructor(scope: Construct, id: string, props: WebsiteHostingStackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, `bucket`, {
      accessControl: s3.BucketAccessControl.PRIVATE,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    ***REMOVED***);

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      `originAccessIdentity`
    );

    bucket.grantRead(originAccessIdentity);

    const errorResponse: ErrorResponse = {
      httpStatus: 404,
      responsePagePath: "/404.html"
    ***REMOVED***;

    // Function to remove .html from page route - https://stackoverflow.com/a/74356989
    const cloudfrontFunction = new Function(this, `function`, {
      code: FunctionCode.fromInline('function handler(r){var e=r.request,i=e.uri;return i.endsWith("/")?e.uri+="index.html":i.includes(".")||(e.uri+=".html"),e***REMOVED***')
    ***REMOVED***);

    const functionAssociation: FunctionAssociation = {
      eventType: FunctionEventType.VIEWER_REQUEST,
      function: cloudfrontFunction,
    ***REMOVED***;

    const distribution = new Distribution(this, `distribution`, {
      defaultRootObject: "index.html",
      errorResponses: [errorResponse],
      defaultBehavior: {
        origin: new S3Origin(bucket, { originAccessIdentity ***REMOVED***),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [functionAssociation]
      ***REMOVED***,
      domainNames: [props.domainName],
      certificate: props.cert,
    ***REMOVED***);

    new s3Deployment.BucketDeployment(this, `bucketDeployment`, {
      destinationBucket: bucket,
      sources: [s3Deployment.Source.asset("../dist")],
      distribution: distribution,
    ***REMOVED***);
  ***REMOVED***
***REMOVED***

interface WebsiteHostingStackProps extends StackProps, GlobalStackProps {
  cert: Certificate;
***REMOVED***

import * as cdk from 'aws-cdk-lib';
import { StackProps ***REMOVED*** from 'aws-cdk-lib';
import { CertificateStack ***REMOVED*** from '../lib/certificate-stack';
import { WebsiteHostingStack ***REMOVED*** from '../lib/website-hosting-stack';

const app = new cdk.App();

const domainName = "scarescale.com";
const sanitisedDomainName = domainName.replace(/\./g,"-");

// Need to create a seperate stack as certificates can only be created in us-east-1
const certificateStack = new CertificateStack(app, `certificate-stack-${sanitisedDomainName***REMOVED***`, {
    crossRegionReferences: true,
    env: {
        region: 'us-east-1',
        account: process.env.CDK_DEFAULT_ACCOUNT,
    ***REMOVED***,
    domainName: domainName
***REMOVED***);

new WebsiteHostingStack(app, `website-hosting-stack-${sanitisedDomainName***REMOVED***`, {
    crossRegionReferences: true,
    env: {
        region: 'eu-west-1',
        account: process.env.CDK_DEFAULT_ACCOUNT,
    ***REMOVED***,
    cert: certificateStack.cert,
    domainName: domainName
***REMOVED***);

export interface GlobalStackProps extends StackProps {
    domainName: string;
***REMOVED***
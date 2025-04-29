import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { CertificateStack } from '../lib/certificate-stack';
import { WebsiteHostingStack } from '../lib/website-hosting-stack';

const app = new cdk.App();

const domainName = "scarescale.com";
const sanitisedDomainName = domainName.replace(/\./g,"-");

// Need to create a seperate stack as certificates can only be created in us-east-1
const certificateStack = new CertificateStack(app, `certificate-stack-${sanitisedDomainName}`, {
    crossRegionReferences: true,
    env: {
        region: 'us-east-1',
        account: process.env.CDK_DEFAULT_ACCOUNT,
    },
    domainName: domainName
});

new WebsiteHostingStack(app, `website-hosting-stack-${sanitisedDomainName}`, {
    crossRegionReferences: true,
    env: {
        region: 'eu-west-1',
        account: process.env.CDK_DEFAULT_ACCOUNT,
    },
    cert: certificateStack.cert,
    domainName: domainName
});

export interface GlobalStackProps extends StackProps {
    domainName: string;
}
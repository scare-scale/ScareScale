import { Stack, StackProps ***REMOVED*** from "aws-cdk-lib";
import { Construct ***REMOVED*** from "constructs";
import { Certificate, CertificateValidation ***REMOVED*** from "aws-cdk-lib/aws-certificatemanager";
import { HostedZone ***REMOVED*** from "aws-cdk-lib/aws-route53";
import { GlobalStackProps ***REMOVED*** from "../bin/infrastructure";

export class CertificateStack extends Stack {
  public readonly cert: Certificate;

  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, id, props);

    const cert = new Certificate(this, 'certificate', {
      domainName: props.domainName,
      validation: CertificateValidation.fromDns(),
    ***REMOVED***);

    this.cert = cert;
  ***REMOVED***
***REMOVED***

interface CertificateStackProps extends StackProps, GlobalStackProps {***REMOVED***
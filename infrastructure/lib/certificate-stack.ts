import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { GlobalStackProps } from "../bin/infrastructure";

export class CertificateStack extends Stack {
  public readonly cert: Certificate;

  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, id, props);

    const cert = new Certificate(this, 'certificate', {
      domainName: props.domainName,
      validation: CertificateValidation.fromDns(),
    });

    this.cert = cert;
  }
}

interface CertificateStackProps extends StackProps, GlobalStackProps {}
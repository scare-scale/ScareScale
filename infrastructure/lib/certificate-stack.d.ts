import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { GlobalStackProps } from "../bin/infrastructure";
export declare class CertificateStack extends Stack {
    readonly cert: Certificate;
    constructor(scope: Construct, id: string, props: CertificateStackProps);
}
interface CertificateStackProps extends StackProps, GlobalStackProps {
}
export {};

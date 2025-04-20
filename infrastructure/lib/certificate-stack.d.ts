import { Stack, StackProps ***REMOVED*** from "aws-cdk-lib";
import { Construct ***REMOVED*** from "constructs";
import { Certificate ***REMOVED*** from "aws-cdk-lib/aws-certificatemanager";
import { GlobalStackProps ***REMOVED*** from "../bin/infrastructure";
export declare class CertificateStack extends Stack {
    readonly cert: Certificate;
    constructor(scope: Construct, id: string, props: CertificateStackProps);
***REMOVED***
interface CertificateStackProps extends StackProps, GlobalStackProps {
***REMOVED***
export {***REMOVED***;

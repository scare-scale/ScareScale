import { Stack, StackProps ***REMOVED*** from "aws-cdk-lib";
import { Construct ***REMOVED*** from "constructs";
import { Certificate ***REMOVED*** from "aws-cdk-lib/aws-certificatemanager";
import { GlobalStackProps ***REMOVED*** from "../bin/infrastructure";
export declare class WebsiteHostingStack extends Stack {
    constructor(scope: Construct, id: string, props: WebsiteHostingStackProps);
***REMOVED***
interface WebsiteHostingStackProps extends StackProps, GlobalStackProps {
    cert: Certificate;
***REMOVED***
export {***REMOVED***;

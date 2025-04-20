import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { GlobalStackProps } from "../bin/infrastructure";
export declare class WebsiteHostingStack extends Stack {
    constructor(scope: Construct, id: string, props: WebsiteHostingStackProps);
}
interface WebsiteHostingStackProps extends StackProps, GlobalStackProps {
    cert: Certificate;
}
export {};

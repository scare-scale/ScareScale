import { StackProps } from 'aws-cdk-lib';
export interface GlobalStackProps extends StackProps {
    domainName: string;
}

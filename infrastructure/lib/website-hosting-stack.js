"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteHostingStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const s3Deployment = require("aws-cdk-lib/aws-s3-deployment");
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const aws_cloudfront_origins_1 = require("aws-cdk-lib/aws-cloudfront-origins");
class WebsiteHostingStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const bucket = new s3.Bucket(this, `bucket`, {
            accessControl: s3.BucketAccessControl.PRIVATE,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });
        const originAccessIdentity = new aws_cloudfront_1.OriginAccessIdentity(this, `originAccessIdentity`);
        bucket.grantRead(originAccessIdentity);
        const errorResponse = {
            httpStatus: 404,
            responsePagePath: "/404.html"
        };
        // Function to remove .html from page route - https://stackoverflow.com/a/74356989
        const cloudfrontFunction = new aws_cloudfront_1.Function(this, `function`, {
            code: aws_cloudfront_1.FunctionCode.fromInline('function handler(r){var e=r.request,i=e.uri;return i.endsWith("/")?e.uri+="index.html":i.includes(".")||(e.uri+=".html"),e}')
        });
        const functionAssociation = {
            eventType: aws_cloudfront_1.FunctionEventType.VIEWER_REQUEST,
            function: cloudfrontFunction,
        };
        const distribution = new aws_cloudfront_1.Distribution(this, `distribution`, {
            defaultRootObject: "index.html",
            errorResponses: [errorResponse],
            defaultBehavior: {
                origin: new aws_cloudfront_origins_1.S3Origin(bucket, { originAccessIdentity }),
                viewerProtocolPolicy: aws_cloudfront_1.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                functionAssociations: [functionAssociation]
            },
            domainNames: [props.domainName],
            certificate: props.cert,
        });
        new s3Deployment.BucketDeployment(this, `bucketDeployment`, {
            destinationBucket: bucket,
            sources: [s3Deployment.Source.asset("../dist")],
            distribution: distribution,
        });
    }
}
exports.WebsiteHostingStack = WebsiteHostingStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic2l0ZS1ob3N0aW5nLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2Vic2l0ZS1ob3N0aW5nLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUErRDtBQUMvRCx5Q0FBeUM7QUFDekMsOERBQThEO0FBRTlELCtEQVNvQztBQUNwQywrRUFBOEQ7QUFJOUQsTUFBYSxtQkFBb0IsU0FBUSxtQkFBSztJQUM1QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQStCO1FBQ3ZFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQzNDLGFBQWEsRUFBRSxFQUFFLENBQUMsbUJBQW1CLENBQUMsT0FBTztZQUM3QyxhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1lBQ3BDLGlCQUFpQixFQUFFLElBQUk7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLHFDQUFvQixDQUNuRCxJQUFJLEVBQ0osc0JBQXNCLENBQ3ZCLENBQUM7UUFFRixNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFdkMsTUFBTSxhQUFhLEdBQWtCO1lBQ25DLFVBQVUsRUFBRSxHQUFHO1lBQ2YsZ0JBQWdCLEVBQUUsV0FBVztTQUM5QixDQUFDO1FBRUYsa0ZBQWtGO1FBQ2xGLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSx5QkFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDeEQsSUFBSSxFQUFFLDZCQUFZLENBQUMsVUFBVSxDQUFDLDZIQUE2SCxDQUFDO1NBQzdKLENBQUMsQ0FBQztRQUVILE1BQU0sbUJBQW1CLEdBQXdCO1lBQy9DLFNBQVMsRUFBRSxrQ0FBaUIsQ0FBQyxjQUFjO1lBQzNDLFFBQVEsRUFBRSxrQkFBa0I7U0FDN0IsQ0FBQztRQUVGLE1BQU0sWUFBWSxHQUFHLElBQUksNkJBQVksQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQzFELGlCQUFpQixFQUFFLFlBQVk7WUFDL0IsY0FBYyxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQy9CLGVBQWUsRUFBRTtnQkFDZixNQUFNLEVBQUUsSUFBSSxpQ0FBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLG9CQUFvQixFQUFFLENBQUM7Z0JBQ3RELG9CQUFvQixFQUFFLHFDQUFvQixDQUFDLGlCQUFpQjtnQkFDNUQsb0JBQW9CLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzthQUM1QztZQUNELFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7WUFDL0IsV0FBVyxFQUFFLEtBQUssQ0FBQyxJQUFJO1NBQ3hCLENBQUMsQ0FBQztRQUVILElBQUksWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUMxRCxpQkFBaUIsRUFBRSxNQUFNO1lBQ3pCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLFlBQVksRUFBRSxZQUFZO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWxERCxrREFrREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZW1vdmFsUG9saWN5LCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0ICogYXMgczMgZnJvbSBcImF3cy1jZGstbGliL2F3cy1zM1wiO1xuaW1wb3J0ICogYXMgczNEZXBsb3ltZW50IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtczMtZGVwbG95bWVudFwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbmltcG9ydCB7XG4gIERpc3RyaWJ1dGlvbixcbiAgT3JpZ2luQWNjZXNzSWRlbnRpdHksXG4gIFZpZXdlclByb3RvY29sUG9saWN5LFxuICBFcnJvclJlc3BvbnNlLFxuICBGdW5jdGlvbixcbiAgRnVuY3Rpb25Bc3NvY2lhdGlvbixcbiAgRnVuY3Rpb25Db2RlLFxuICBGdW5jdGlvbkV2ZW50VHlwZVxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3VkZnJvbnRcIjtcbmltcG9ydCB7IFMzT3JpZ2luIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jbG91ZGZyb250LW9yaWdpbnNcIjtcbmltcG9ydCB7IENlcnRpZmljYXRlIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jZXJ0aWZpY2F0ZW1hbmFnZXJcIjtcbmltcG9ydCB7IEdsb2JhbFN0YWNrUHJvcHMgfSBmcm9tIFwiLi4vYmluL2luZnJhc3RydWN0dXJlXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJzaXRlSG9zdGluZ1N0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogV2Vic2l0ZUhvc3RpbmdTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBidWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsIGBidWNrZXRgLCB7XG4gICAgICBhY2Nlc3NDb250cm9sOiBzMy5CdWNrZXRBY2Nlc3NDb250cm9sLlBSSVZBVEUsXG4gICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICBhdXRvRGVsZXRlT2JqZWN0czogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IG9yaWdpbkFjY2Vzc0lkZW50aXR5ID0gbmV3IE9yaWdpbkFjY2Vzc0lkZW50aXR5KFxuICAgICAgdGhpcyxcbiAgICAgIGBvcmlnaW5BY2Nlc3NJZGVudGl0eWBcbiAgICApO1xuXG4gICAgYnVja2V0LmdyYW50UmVhZChvcmlnaW5BY2Nlc3NJZGVudGl0eSk7XG5cbiAgICBjb25zdCBlcnJvclJlc3BvbnNlOiBFcnJvclJlc3BvbnNlID0ge1xuICAgICAgaHR0cFN0YXR1czogNDA0LFxuICAgICAgcmVzcG9uc2VQYWdlUGF0aDogXCIvNDA0Lmh0bWxcIlxuICAgIH07XG5cbiAgICAvLyBGdW5jdGlvbiB0byByZW1vdmUgLmh0bWwgZnJvbSBwYWdlIHJvdXRlIC0gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzc0MzU2OTg5XG4gICAgY29uc3QgY2xvdWRmcm9udEZ1bmN0aW9uID0gbmV3IEZ1bmN0aW9uKHRoaXMsIGBmdW5jdGlvbmAsIHtcbiAgICAgIGNvZGU6IEZ1bmN0aW9uQ29kZS5mcm9tSW5saW5lKCdmdW5jdGlvbiBoYW5kbGVyKHIpe3ZhciBlPXIucmVxdWVzdCxpPWUudXJpO3JldHVybiBpLmVuZHNXaXRoKFwiL1wiKT9lLnVyaSs9XCJpbmRleC5odG1sXCI6aS5pbmNsdWRlcyhcIi5cIil8fChlLnVyaSs9XCIuaHRtbFwiKSxlfScpXG4gICAgfSk7XG5cbiAgICBjb25zdCBmdW5jdGlvbkFzc29jaWF0aW9uOiBGdW5jdGlvbkFzc29jaWF0aW9uID0ge1xuICAgICAgZXZlbnRUeXBlOiBGdW5jdGlvbkV2ZW50VHlwZS5WSUVXRVJfUkVRVUVTVCxcbiAgICAgIGZ1bmN0aW9uOiBjbG91ZGZyb250RnVuY3Rpb24sXG4gICAgfTtcblxuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbiA9IG5ldyBEaXN0cmlidXRpb24odGhpcywgYGRpc3RyaWJ1dGlvbmAsIHtcbiAgICAgIGRlZmF1bHRSb290T2JqZWN0OiBcImluZGV4Lmh0bWxcIixcbiAgICAgIGVycm9yUmVzcG9uc2VzOiBbZXJyb3JSZXNwb25zZV0sXG4gICAgICBkZWZhdWx0QmVoYXZpb3I6IHtcbiAgICAgICAgb3JpZ2luOiBuZXcgUzNPcmlnaW4oYnVja2V0LCB7IG9yaWdpbkFjY2Vzc0lkZW50aXR5IH0pLFxuICAgICAgICB2aWV3ZXJQcm90b2NvbFBvbGljeTogVmlld2VyUHJvdG9jb2xQb2xpY3kuUkVESVJFQ1RfVE9fSFRUUFMsXG4gICAgICAgIGZ1bmN0aW9uQXNzb2NpYXRpb25zOiBbZnVuY3Rpb25Bc3NvY2lhdGlvbl1cbiAgICAgIH0sXG4gICAgICBkb21haW5OYW1lczogW3Byb3BzLmRvbWFpbk5hbWVdLFxuICAgICAgY2VydGlmaWNhdGU6IHByb3BzLmNlcnQsXG4gICAgfSk7XG5cbiAgICBuZXcgczNEZXBsb3ltZW50LkJ1Y2tldERlcGxveW1lbnQodGhpcywgYGJ1Y2tldERlcGxveW1lbnRgLCB7XG4gICAgICBkZXN0aW5hdGlvbkJ1Y2tldDogYnVja2V0LFxuICAgICAgc291cmNlczogW3MzRGVwbG95bWVudC5Tb3VyY2UuYXNzZXQoXCIuLi9kaXN0XCIpXSxcbiAgICAgIGRpc3RyaWJ1dGlvbjogZGlzdHJpYnV0aW9uLFxuICAgIH0pO1xuICB9XG59XG5cbmludGVyZmFjZSBXZWJzaXRlSG9zdGluZ1N0YWNrUHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzLCBHbG9iYWxTdGFja1Byb3BzIHtcbiAgY2VydDogQ2VydGlmaWNhdGU7XG59XG4iXX0=
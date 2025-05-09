"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_certificatemanager_1 = require("aws-cdk-lib/aws-certificatemanager");
class CertificateStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const cert = new aws_certificatemanager_1.Certificate(this, 'certificate', {
            domainName: props.domainName,
            validation: aws_certificatemanager_1.CertificateValidation.fromDns(),
        });
        this.cert = cert;
    }
}
exports.CertificateStack = CertificateStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydGlmaWNhdGUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjZXJ0aWZpY2F0ZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBZ0Q7QUFFaEQsK0VBQXdGO0FBSXhGLE1BQWEsZ0JBQWlCLFNBQVEsbUJBQUs7SUFHekMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUE0QjtRQUNwRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLElBQUksR0FBRyxJQUFJLG9DQUFXLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUNoRCxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7WUFDNUIsVUFBVSxFQUFFLDhDQUFxQixDQUFDLE9BQU8sRUFBRTtTQUM1QyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0NBQ0Y7QUFiRCw0Q0FhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuaW1wb3J0IHsgQ2VydGlmaWNhdGUsIENlcnRpZmljYXRlVmFsaWRhdGlvbiB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2VydGlmaWNhdGVtYW5hZ2VyXCI7XG5pbXBvcnQgeyBIb3N0ZWRab25lIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1yb3V0ZTUzXCI7XG5pbXBvcnQgeyBHbG9iYWxTdGFja1Byb3BzIH0gZnJvbSBcIi4uL2Jpbi9pbmZyYXN0cnVjdHVyZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2VydGlmaWNhdGVTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgcHVibGljIHJlYWRvbmx5IGNlcnQ6IENlcnRpZmljYXRlO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBDZXJ0aWZpY2F0ZVN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGNlcnQgPSBuZXcgQ2VydGlmaWNhdGUodGhpcywgJ2NlcnRpZmljYXRlJywge1xuICAgICAgZG9tYWluTmFtZTogcHJvcHMuZG9tYWluTmFtZSxcbiAgICAgIHZhbGlkYXRpb246IENlcnRpZmljYXRlVmFsaWRhdGlvbi5mcm9tRG5zKCksXG4gICAgfSk7XG5cbiAgICB0aGlzLmNlcnQgPSBjZXJ0O1xuICB9XG59XG5cbmludGVyZmFjZSBDZXJ0aWZpY2F0ZVN0YWNrUHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzLCBHbG9iYWxTdGFja1Byb3BzIHt9Il19
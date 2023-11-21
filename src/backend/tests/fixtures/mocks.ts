import rewiremock from "rewiremock";
import * as nodemailerMock from "nodemailer-mock";

rewiremock.overrideEntryPoint(module); // this is important. This command is "transfering" this module parent to rewiremock
rewiremock("nodemailer").with(nodemailerMock);
rewiremock.enable();

export { nodemailerMock };

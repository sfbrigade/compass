import mockery from "mockery";
import * as nodemailerMock from "nodemailer-mock";
mockery.enable({
  warnOnUnregistered: false,
});
mockery.registerMock("nodemailer", nodemailerMock);

export { nodemailerMock };

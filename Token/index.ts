import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CommunicationIdentityClient } from "@azure/communication-administration";
const { resourceConnectionString } = require("./config");

const connectionString = process.env.resourceConnectionString || resourceConnectionString;

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    
    let tokenClient = new CommunicationIdentityClient(connectionString);

    const user = await tokenClient.createUser();

    const userToken = await tokenClient.issueToken(user, ["voip"]);

    const response = {
        "User" : userToken.user,
        "Token": userToken.token,
        "ExpiresOn": userToken.expiresOn
    }

    context.res = {
        body: response
    };

};

export default httpTrigger;
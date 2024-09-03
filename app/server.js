const oauthClient = require("client-oauth2")
const express = require("express");
const app = express();
const axios = require('axios');
const xenv = require('@sap/xsenv');
const PORT = process.env.PORT || 3000;
const approuter = require("@sap/approuter");
const hdbext = require('@sap/hdbext');
const Schema = JSON.parse(process.env.VCAP_SERVICES).hana[0].credentials.schema;
// const callDestination = require('sap-cf-destination');
app.use(express.json())
const uaa_service = xenv.getServices({
    uaa: {
        tag: 'xsuaa'
    }
}).uaa;
const spa_service = xenv.getServices({
    auto: {
        tag: 'automation'
    }
}).auto.uaa

// const wf_service = xenv.getSer
console.log("spa_service : " + JSON.stringify(spa_service));
let base = spa_service.url;
let CLIENT_ID = spa_service.clientid;
let APP_SECRET = spa_service.clientsecret;
// const dest_service = xenv.getServices({
//     dest: {
//         tag: 'destination'
//     }
// }).dest;
app.get("/User", (req, res, next) => {
    // res.send("Welcome to employee dashboard");
    var hanaConfig = xenv.cfServiceCredentials({
        tag: 'hana'
    });
    console.log("***Get Query***");
    hdbext.createConnection(hanaConfig, function (error, client) {
            if (error) {
                return console.error("error while creating connection :" + error);
            }
            client.exec('SELECT * FROM"' + Schema + '"."SAP_COM_COMAU_ENTITIES_BPMUSERS"',
                (err, result) => {
                    if (err) {
                        console.log("error on insert:" + err);
                    } else if(result) {
                        console.log("result:" + JSON.stringify(result));
                        res.send(result);
                    }
                });
    });
});

async function generateAccessToken() {
    const response = await axios({
        url: base + "/oauth/token",
        method: "post",
        data: "grant_type=client_credentials",
        auth: {
            username: CLIENT_ID,
            password: APP_SECRET,
        },
    });
    return response.data;
}

async function createWorkflow(payload, oAuthToken) {
    console.log("create workflow called");
    let url = "https://spa-api-gateway-bpi-eu-prod.cfapps.eu10.hana.ondemand.com/workflow/rest/v1/workflow-instances";
    const headers = {
        'Authorization': 'Bearer ' + oAuthToken
    };
    console.log(JSON.stringify(headers));
    const response = await axios.post(url, payload, {
        headers
    }).then(console.log("workflow instance created"));
    console.log(JSON.stringify(response.data));
    return response.data;
}


app.post('/createBPM', async (req,res) => {
    const token = await generateAccessToken();
    var oAuthToken = token.access_token;
    console.log("OauthToken" + JSON.stringify(oAuthToken));
    var oPayLoad = {
        "definitionId": "eu10.p001-comau-dev.bpmappworkflow.bPMprocess"
    }
    oPayLoad.context = req.body;
    var wfInstanceResp = await createWorkflow(oPayLoad, oAuthToken);
    console.log("instance id new:" + JSON.stringify(wfInstanceResp));
    res.send(wfInstanceResp);
})

app.get('/getCountry', async(req,res) => {
    // res.send("Country API called");
    var hanaConfig = xenv.cfServiceCredentials({
        tag: 'hana'
    });
    console.log("***Get Query***");
    hdbext.createConnection(hanaConfig, function (error, client) {
            if (error) {
                return console.error("error while creating connection :" + error);
            }
            client.exec('SELECT * FROM"' + Schema + '"."SAP_COM_COMAU_ENTITIES_DOCUMENT_SELECTION"',
                (err, result) => {
                    if (err) {
                        console.log("error on insert:" + err);
                    } else if(result) {
                        console.log("result:" + JSON.stringify(result));
                        res.send(result);
                    }
                });
    });
})

app.get('/getProject', async(req,res) => {
    // res.send("Country API called");
    var hanaConfig = xenv.cfServiceCredentials({
        tag: 'hana'
    });
    var CountryID = req.query.CountryId;
    var LegalEntityID = req.query.LegalEntityID;
    var BuoriginID = req.query.BuoriginID;
    var BudestID = req.query.BudestID;
    var Leasing = req.query.Leasing;
    var Realestate = req.query.Realestate;
    var response = {};
    console.log("***Get Query***" + req.query.CountryId);
    hdbext.createConnection(hanaConfig, function (error, client) {
            if (error) {
                return console.error("error while creating connection :" + error);
            }
            client.exec('SELECT * FROM"' + Schema + '"."SAP_COM_COMAU_ENTITIES_PROJECT_LIST" WHERE COUNTRYID = ? AND LEGALENTITYID = ? AND BU_ORIGIN_ID = ? AND BU_DEST_ID = ? AND LEASING = ? AND REALESTATE = ?',
            [CountryID.toString(), LegalEntityID.toString(), BuoriginID.toString(), BudestID.toString(), Leasing.toString(), Realestate.toString()],
                (err, result) => {
                    if (err) {
                        console.log("error on insert:" + err);
                    } else if(result) {
                        console.log("result:" + JSON.stringify(result));
                        res.send(result);
                    }
                });
    });
})

app.get('/getExchangeRate', async(req,res) => {
    // res.send("Country API called");
    var hanaConfig = xenv.cfServiceCredentials({
        tag: 'hana'
    });
    var CountryID = req.query.CountryId;
    var Year = req.query.Year;
    var response = {};
    console.log("***Get Query***" + req.query.CountryId);
    hdbext.createConnection(hanaConfig, function (error, client) {
            if (error) {
                return console.error("error while creating connection :" + error);
            }
            client.exec('SELECT * FROM"' + Schema + '"."SAP_COM_COMAU_ENTITIES_EXCHANGE_RATE" WHERE COUNTRYID = ? AND YEAR = ?',
            [CountryID.toString(), Year.toString()],
                (err, result) => {
                    if (err) {
                        console.log("error on select:" + err);
                    } else if(result) {
                        console.log("result:" + JSON.stringify(result));
                        res.send(result);
                    }
                });
    });
})

app.get('/getProjectCount', async(req,res) => {
    var hanaConfig = xenv.cfServiceCredentials({
        tag: 'hana'
    });
    hdbext.createConnection(hanaConfig, function (error, client) {
        if (error) {
            return console.error("error while creating connection :" + error);
        }
        client.exec('SELECT  Count(*) FROM"' + Schema + '"."SAP_COM_COMAU_ENTITIES_PROJECT_LIST"',
            (err, result) => {
                if (err) {
                    console.log("error on insert:" + err);
                } else if(result) {
                    console.log("result:" + JSON.stringify(result));
                    res.send(result);
                }
            });
    });
})

app.get('/getInvestmentReason', async(req,res) => {
    var hanaConfig = xenv.cfServiceCredentials({
        tag: 'hana'
    });
    hdbext.createConnection(hanaConfig, function (error, client) {
        if (error) {
            return console.error("error while creating connection :" + error);
        }
        client.exec('SELECT  * FROM"' + Schema + '"."SAP_COM_COMAU_ENTITIES_INVESTMENT_REASON"',
            (err, result) => {
                if (err) {
                    console.log("error on select:" + err);
                } else if(result) {
                    console.log("result:" + JSON.stringify(result));
                    res.send(result);
                }
            });
    });
})

// app.get('/current-user', async (req, res) => {
//     // res.send("called header API");
//     try {
//         const data = await getCurrentUserData();
//         console.log("response data " + data);
//         res.send({"test": "test"});
//     } catch(err) {
//         console.log("error from bigger scope :" + err.message)
//         res.send(err);
//     }
// });

// async function getCurrentUserData() {
//     console.log("Current user data called" + uaa_service.url);
//     // const bpmAppRouter = "https://comau-dev-comaubpmcap-approuter.cfapps.eu10.hana.ondemand.com";
//     var api = "/user-api/currentUser";
//     const response = await axios({
//         url: api,
//         method: 'GET'
//     });
//     console.log("response" + response.data);
//     return response;
// }

app.listen(PORT, console.log(`Listening on port ${PORT}`));
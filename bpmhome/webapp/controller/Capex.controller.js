sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("com.dev.comau.bpmhome.controller.Capex", {
            onInit: function () {
                this.addMagnitudeColumns();
                this.addProfitablityColumns();
                this.addCountryData();
                this.addInvestmentReasonData();
                this.getUserData();
                this.getView().byId("idForecastGroup").fireSelect(); 
                console.log("initial screen created");
                this.oProjectModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(this.oProjectModel, "project");
                this.oCountryModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(this.oCountryModel, "country");
                this.fileModel = new sap.ui.model.json.JSONModel([]);
                this.getView().setModel(this.fileModel, "FileDetails");
                // var resData = this.oSelectedProject.SCALABLE == "X" ? this.oSelectedProject.RESIDUALVALUE : 0;

                //Budget table addition
                var oBudgetModel = new sap.ui.model.json.JSONModel();
                var aBudget = [
                    {
                        title: "Budget",
                        amount: "",
                        euro : "",
                        capex : false
                    },
                    {
                        title: "Residual",
                        amount: "",
                        euro : "",
                        capex : false
                    },
                    {
                        title: "Capex Request",
                        amount: "",
                        euro : "",
                        capex : true
                    },
                    {
                        title: "Operative Leasing Request",
                        amount: "",
                        euro : "",
                        capex : true
                    }]
                oBudgetModel.setData(aBudget);
                this.getView().setModel(oBudgetModel, "budget");

                //investment table addition
                this.oInvestmentSummaryModel = new sap.ui.model.json.JSONModel();
                this.oInvestmentSummaryModel.setData([
                    {
                        title:"Project Investment Amount(CAPEX)",
                        amount: "",
                        euro:"",
                        opex: false
                    },
                    {
                        title: "First 12 months expenses(OPEX)",
                        amount: "",
                        euro : "",
                        opex : true
                    },
                    {
                        title:"TOTAL TO BE APPROVED",
                        amount: "",
                        euro:"",
                        opex: false
                    },
                ])
                this.getView().setModel(this.oInvestmentSummaryModel, "investmentSummary");
                
                // Profitablity table addition
                this.oProfitabilityModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(this.oProfitabilityModel, "profitablity");
                this.oProfitabilityModel.setData([
                        {
                            title: "Benefits (+)",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: false,
                            y2:0,
                            y2enabled: false,
                            y3:0,
                            y3enabled: false,
                            y4:0,
                            y4enabled: false,
                            y5:0,
                            y5enabled: false,
                            y6:0,
                            y6enabled: false,
                        },
                        {
                            title: "Expenses(-)",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: false,
                            y2:0,
                            y2enabled: false,
                            y3:0,
                            y3enabled: false,
                            y4:0,
                            y4enabled: false,
                            y5:0,
                            y5enabled: false,
                            y6:0,
                            y6enabled: false,
                        },
                        {
                            title: "Depreciation (-)",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: false,
                            y2:0,
                            y2enabled: true,
                            y3:0,
                            y3enabled: true,
                            y4:0,
                            y4enabled: true,
                            y5:0,
                            y5enabled: true,
                            y6:0,
                            y6enabled: true,
                        },
                        {
                            title: "Other (+/-)",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: true,
                            y2:0,
                            y2enabled: true,
                            y3:0,
                            y3enabled: true,
                            y4:0,
                            y4enabled: true,
                            y5:0,
                            y5enabled: true,
                            y6:0,
                            y6enabled: true,
                        },
                        {
                            title: "Trading Profit",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: false,
                            y2:0,
                            y2enabled: false,
                            y3:0,
                            y3enabled: false,
                            y4:0,
                            y4enabled: false,
                            y5:0,
                            y5enabled: false,
                            y6:0,
                            y6enabled: false
                        },
                        {
                            title: "Depreciation (+)",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: false,
                            y2:0,
                            y2enabled: false,
                            y3:0,
                            y3enabled: false,
                            y4:0,
                            y4enabled: false,
                            y5:0,
                            y5enabled: false,
                            y6:0,
                            y6enabled: false
                        },
                        {
                            title: "Investments (-)",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: true,
                            y2:0,
                            y2enabled: true,
                            y3:0,
                            y3enabled: true,
                            y4:0,
                            y4enabled: true,
                            y5:0,
                            y5enabled: true,
                            y6:0,
                            y6enabled: true,
                        },
                        {
                            title: "Disposals (+/-)",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: true,
                            y2:0,
                            y2enabled: true,
                            y3:0,
                            y3enabled: true,
                            y4:0,
                            y4enabled: true,
                            y5:0,
                            y5enabled: true,
                            y6:0,
                            y6enabled: true,
                        },
                        {
                            title: "Change of Gross Working Capital (-)",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: true,
                            y2:0,
                            y2enabled: true,
                            y3:0,
                            y3enabled: true,
                            y4:0,
                            y4enabled: true,
                            y5:0,
                            y5enabled: true,
                            y6:0,
                            y6enabled: true,
                        },
                        {
                            title: "Extraordinary Cash Expenses and one-off items (-)",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: true,
                            y2:0,
                            y2enabled: true,
                            y3:0,
                            y3enabled: true,
                            y4:0,
                            y4enabled: true,
                            y5:0,
                            y5enabled: true,
                            y6:0,
                            y6enabled: true,
                        },
                        {
                            title: "Residual value (+)",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: true,
                            y2:0,
                            y2enabled: true,
                            y3:0,
                            y3enabled: true,
                            y4:0,
                            y4enabled: true,
                            y5:0,
                            y5enabled: true,
                            y6:0,
                            y6enabled: true,
                        },
                        {
                            title: "Tax expenses(%)",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: false,
                            y2:0,
                            y2enabled: false,
                            y3:0,
                            y3enabled: false,
                            y4:0,
                            y4enabled: false,
                            y5:0,
                            y5enabled: false,
                            y6:0,
                            y6enabled: false,
                        },
                        {
                            title: "Cash Flow",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: false,
                            y2:0,
                            y2enabled: false,
                            y3:0,
                            y3enabled: false,
                            y4:0,
                            y4enabled: false,
                            y5:0,
                            y5enabled: false,
                            y6:0,
                            y6enabled: false,
                        },
                        {
                            title: "WACC (%)",
                            value: "",
                            valEnabled: true,
                            y1:0,
                            y1enabled: false,
                            y2:0,
                            y2enabled: false,
                            y3:0,
                            y3enabled: false,
                            y4:0,
                            y4enabled: false,
                            y5:0,
                            y5enabled: false,
                            y6:0,
                            y6enabled: false,
                        },
                        {
                            title: "Discounted Cash Flow",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: false,
                            y2:0,
                            y2enabled: false,
                            y3:0,
                            y3enabled: false,
                            y4:0,
                            y4enabled: false,
                            y5:0,
                            y5enabled: false,
                            y6:0,
                            y6enabled: false,
                        },
                        {
                            title: "Cumulated Discounted Cash Flow ",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: false,
                            y2:0,
                            y2enabled: false,
                            y3:0,
                            y3enabled: false,
                            y4:0,
                            y4enabled: false,
                            y5:0,
                            y5enabled: false,
                            y6:0,
                            y6enabled: false,
                        },
                        {
                            title: "Discounted Residual Value ",
                            value: "",
                            valEnabled: false,
                            y1:0,
                            y1enabled: false,
                            y2:0,
                            y2enabled: false,
                            y3:0,
                            y3enabled: false,
                            y4:0,
                            y4enabled: false,
                            y5:0,
                            y5enabled: false,
                            y6:0,
                            y6enabled: false,
                        }
                    ]);   
                    this.oProfitabilityModel.updateBindings();

                    //Evaluation table data
                    this.oEvaluationModel = new sap.ui.model.json.JSONModel();
                    this.getView().setModel(this.oEvaluationModel, "evaluation");
                    this.oEvaluationModel.setData([
                        {
                            title: "NPV 3 years",
                            withres: 0,
                            withoutres : 0
                        },
                        {
                            title: "NPV 5 years",
                            withres: 0,
                            withoutres : 0
                        },
                        {
                            title: "DISCOUNTED PAY BACK",
                            withoutres : 0
                        }
                    ]);

                    //Magnitudo table data added
                    this.oMagnitudoModel = new sap.ui.model.json.JSONModel();
                    this.getView().setModel(this.oMagnitudoModel, "magnitude");
                    this.oMagnitudoModel.setData([
                        {
                            title: "Investments(-)",
                            input1:"",
                            input2:"",
                            input3:"",
                            input4:"",
                            input5:"",
                            input6:"",
                            total: 0
                        },
                        {
                            title: "Expenses(-)",
                            input1:"",
                            input2:"",
                            input3:"",
                            input4:"",
                            input5:"",
                            input6:"",
                            total: 0
                        },
                        {
                            title: "Disposals(+/-)",
                            input1:"",
                            input2:"",
                            input3:"",
                            input4:"",
                            input5:"",
                            input6:"",
                            total: 0
                        },
                        {
                            title: "Benefits(+)",
                            input1:"",
                            input2:"",
                            input3:"",
                            input4:"",
                            input5:"",
                            input6:"",
                            total: 0
                        }
                    ]); 
                    this.getView().getModel("magnitude").updateBindings();
            },

            onLiveChange: function(oEvent) {
                // var aBudgetData = this.getView().getModel("budget").getData();
                // for(var i in aBudgetData){
                if(oEvent.getSource().getBindingContext("budget").getObject().title == "Capex Request"){
                    this.oInvestmentSummaryModel.getData()[0].amount = oEvent.getSource().getValue()/1000;
                    this.oInvestmentSummaryModel.getData()[0].euro = this.oExchangeRateData.RATE1 * this.oInvestmentSummaryModel.getData()[0].amount;
                }
                // }
                this.getView().getModel("budget").getData()[2].euro = oEvent.getSource().getValue() * this.oExchangeRateData.RATE1;
                this.getView().getModel("budget").updateBindings();
                this.oInvestmentSummaryModel.updateBindings();
            },

            onLiveOpexChange: function(oEvent) {
                this.oInvestmentSummaryModel.getData()[1].euro = oEvent.getSource().getValue() * this.oExchangeRateData.RATE1;
                this.oInvestmentSummaryModel.getData()[2].amount = parseInt(this.oInvestmentSummaryModel.getData()[0].amount) + parseInt(oEvent.getSource().getValue());  
                this.oInvestmentSummaryModel.getData()[2].euro = this.oInvestmentSummaryModel.getData()[2].amount * this.oExchangeRateData.RATE1; 
                this.oInvestmentSummaryModel.updateBindings();
            }, 

            onLeaseChange: function(oEvent) {
                if(oEvent.getSource().getSelectedKey() !== "Operative"){
                    this.getView().byId("idBudgetTable").getItems()[3].setVisible(false);
                    this.operativeSelect = false;
                } else {
                    this.getView().byId("idBudgetTable").getItems()[3].setVisible(true);
                    this.operativeSelect = true;
                }
                this.getView().byId("idBenefits").fireSelectionChange();
                this.getView().byId("idProfitablityTable").getItems()[0].getCells()[2].fireChange()
            },

            onBenefitsChange: function(oEvent) {
                var oSelectedItem = oEvent.getSource().getSelectedKey();
                if(oSelectedItem == "Qualitative") { 
                    this.getView().byId("idProfitablityTable").getItems()[0].setVisible(false);
                    this.getView().byId("idMagnitudeTable").getItems()[3].setVisible(false);
                    this.quantSelective = false;
                    if(this.getView().byId("idLeasing").getSelectedKey() == "Operative") {
                        this.getView().byId("idProfitablityTable").getItems()[2].setVisible(false);
                        this.getView().byId("idProfitablityTable").getItems()[5].setVisible(false);
                        this.getView().byId("idMagnitudeTable").getItems()[0].setVisible(false);
                        this.getView().byId("idMagnitudeTable").getItems()[2].setVisible(false);
                    } else {
                        this.getView().byId("idProfitablityTable").getItems()[2].setVisible(true);
                        this.getView().byId("idProfitablityTable").getItems()[5].setVisible(true);
                        this.getView().byId("idMagnitudeTable").getItems()[0].setVisible(true);
                        this.getView().byId("idMagnitudeTable").getItems()[2].setVisible(true);
                    }   
                } else if(oSelectedItem == "Quantitative") {
                    this.getView().byId("idProfitablityTable").getItems()[0].setVisible(true)
                    this.getView().byId("idMagnitudeTable").getItems()[3].setVisible(true);
                    this.quantSelective = true;
                    if(this.getView().byId("idLeasing").getSelectedKey() == "Operative") {
                        this.getView().byId("idProfitablityTable").getItems()[2].setVisible(false);
                        this.getView().byId("idProfitablityTable").getItems()[5].setVisible(false);
                        this.getView().byId("idMagnitudeTable").getItems()[0].setVisible(false);
                        this.getView().byId("idMagnitudeTable").getItems()[2].setVisible(false);
                    }  else {
                        this.getView().byId("idProfitablityTable").getItems()[2].setVisible(true);
                        this.getView().byId("idProfitablityTable").getItems()[5].setVisible(true);
                        this.getView().byId("idMagnitudeTable").getItems()[0].setVisible(true);
                        this.getView().byId("idMagnitudeTable").getItems()[2].setVisible(true);
                    }
                }
                this.getView().byId("idProfitablityTable").getItems()[0].getCells()[2].fireChange();
            },

            onMagnitudeChange: function(oEvent) {
                var magObject = oEvent.getSource().getBindingContext("magnitude").getObject();
                var currentyear =  magObject.input1 == "" ? 0 : parseInt(magObject.input1);
                var firstyear =  magObject.input2 == "" ? 0 : parseInt(magObject.input2);
                var secondyyear =  magObject.input3 == "" ? 0 : parseInt(magObject.input3);
                var thirdyear =  magObject.input4 == "" ? 0 : parseInt(magObject.input4);
                var fourthyear =  magObject.input5 == "" ? 0 : parseInt(magObject.input5);
                var fifthyear =  magObject.input6 == "" ? 0 : parseInt(magObject.input6);
                magObject.total = currentyear + firstyear + secondyyear + thirdyear + fourthyear + fifthyear; 
                this.getView().getModel("magnitude").updateBindings();

                //filling up profitablity model
                if(magObject.title == "Expenses(-)"){
                    this.getView().getModel("profitablity").getData()[1].y1 = currentyear;
                    this.getView().getModel("profitablity").getData()[1].y2 = firstyear;
                    this.getView().getModel("profitablity").getData()[1].y3 = secondyyear;
                    this.getView().getModel("profitablity").getData()[1].y4 = thirdyear;
                    this.getView().getModel("profitablity").getData()[1].y5 = fourthyear;
                    this.getView().getModel("profitablity").getData()[1].y6 = fifthyear
                }
                if(magObject.title == "Investments(-)"){
                    this.getView().getModel("profitablity").getData()[6].y1 = currentyear;
                    this.getView().getModel("profitablity").getData()[6].y2 = firstyear;
                    this.getView().getModel("profitablity").getData()[6].y3 = secondyyear;
                    this.getView().getModel("profitablity").getData()[6].y4 = thirdyear;
                    this.getView().getModel("profitablity").getData()[6].y5 = fourthyear;
                    this.getView().getModel("profitablity").getData()[6].y6 = fifthyear
                }
                if(magObject.title == "Disposals(+/-)"){
                    this.getView().getModel("profitablity").getData()[7].y1 = currentyear;
                    this.getView().getModel("profitablity").getData()[7].y2 = firstyear;
                    this.getView().getModel("profitablity").getData()[7].y3 = secondyyear;
                    this.getView().getModel("profitablity").getData()[7].y4 = thirdyear;
                    this.getView().getModel("profitablity").getData()[7].y5 = fourthyear;
                    this.getView().getModel("profitablity").getData()[7].y6 = fifthyear
                }
                this.getView().getModel("profitablity").updateBindings(); 
            },

            onProfitChange: function(oEvent) {
                // this.oProfitabilityModel = this.getView().getModel("profitablity");
                var oProfitObject = oEvent.getSource().getBindingContext("profitablity").getObject();
                //Depreciation(-)
                if(oProfitObject.title == "Depreciation (-)") {
                    oProfitObject.y1 = parseInt(oProfitObject.y2)/2;
                }
                //Depreciation(+)
                this.oProfitabilityModel.getData()[5].y1 = -1 * this.oProfitabilityModel.getData()[2].y1;
                this.oProfitabilityModel.getData()[5].y2 = -1 * this.oProfitabilityModel.getData()[2].y2;
                this.oProfitabilityModel.getData()[5].y3 = -1 * this.oProfitabilityModel.getData()[2].y3;
                this.oProfitabilityModel.getData()[5].y4 = -1 * this.oProfitabilityModel.getData()[2].y4;
                this.oProfitabilityModel.getData()[5].y5 = -1 * this.oProfitabilityModel.getData()[2].y5;
                this.oProfitabilityModel.getData()[5].y6 = -1 * this.oProfitabilityModel.getData()[2].y6
                //TradingProfit
                this.oProfitabilityModel.getData()[4].y1 = parseInt(this.oProfitabilityModel.getData()[1].y1) + parseInt(this.oProfitabilityModel.getData()[3].y1);
                this.oProfitabilityModel.getData()[4].y2 = parseInt(this.oProfitabilityModel.getData()[1].y2) + parseInt(this.oProfitabilityModel.getData()[3].y2);
                this.oProfitabilityModel.getData()[4].y3 = parseInt(this.oProfitabilityModel.getData()[1].y3) + parseInt(this.oProfitabilityModel.getData()[3].y3);
                this.oProfitabilityModel.getData()[4].y4 = parseInt(this.oProfitabilityModel.getData()[1].y4) + parseInt(this.oProfitabilityModel.getData()[3].y4);
                this.oProfitabilityModel.getData()[4].y5 = parseInt(this.oProfitabilityModel.getData()[1].y5) + parseInt(this.oProfitabilityModel.getData()[3].y5);
                this.oProfitabilityModel.getData()[4].y6 = parseInt(this.oProfitabilityModel.getData()[1].y6) + parseInt(this.oProfitabilityModel.getData()[3].y6);
                if(this.quantSelective ) {
                    this.oProfitabilityModel.getData()[4].y1 = parseInt(this.oProfitabilityModel.getData()[4].y1) + parseInt(this.oProfitabilityModel.getData()[0].y1);
                    this.oProfitabilityModel.getData()[4].y2 = parseInt(this.oProfitabilityModel.getData()[4].y2) + parseInt(this.oProfitabilityModel.getData()[0].y2);  
                    this.oProfitabilityModel.getData()[4].y3 = parseInt(this.oProfitabilityModel.getData()[4].y3) + parseInt(this.oProfitabilityModel.getData()[0].y3);
                    this.oProfitabilityModel.getData()[4].y4 = parseInt(this.oProfitabilityModel.getData()[4].y4) + parseInt(this.oProfitabilityModel.getData()[0].y4);
                    this.oProfitabilityModel.getData()[4].y5 = parseInt(this.oProfitabilityModel.getData()[4].y5) + parseInt(this.oProfitabilityModel.getData()[0].y5);
                    this.oProfitabilityModel.getData()[4].y6 = parseInt(this.oProfitabilityModel.getData()[4].y6) + parseInt(this.oProfitabilityModel.getData()[0].y6);
                }
                if(!this.operativeSelect) {
                    this.oProfitabilityModel.getData()[4].y1 = parseInt(this.oProfitabilityModel.getData()[4].y1) + parseInt(this.oProfitabilityModel.getData()[2].y1);
                    this.oProfitabilityModel.getData()[4].y2 = parseInt(this.oProfitabilityModel.getData()[4].y2) + parseInt(this.oProfitabilityModel.getData()[2].y2);  
                    this.oProfitabilityModel.getData()[4].y3 = parseInt(this.oProfitabilityModel.getData()[4].y3) + parseInt(this.oProfitabilityModel.getData()[2].y3);
                    this.oProfitabilityModel.getData()[4].y4 = parseInt(this.oProfitabilityModel.getData()[4].y4) + parseInt(this.oProfitabilityModel.getData()[2].y4);
                    this.oProfitabilityModel.getData()[4].y5 = parseInt(this.oProfitabilityModel.getData()[4].y5) + parseInt(this.oProfitabilityModel.getData()[2].y5);
                    this.oProfitabilityModel.getData()[4].y6 = parseInt(this.oProfitabilityModel.getData()[4].y6) + parseInt(this.oProfitabilityModel.getData()[2].y6);
                } 
                //Tax expense(%)
                this.oProfitabilityModel.getData()[11].y1 = (-1 * parseInt(this.oProfitabilityModel.getData()[4].y1)) * parseInt(this.oExchangeRateData.TAX);
                this.oProfitabilityModel.getData()[11].y2 = (-1 * parseInt(this.oProfitabilityModel.getData()[4].y2)) * parseInt(this.oExchangeRateData.TAX);
                this.oProfitabilityModel.getData()[11].y3 = (-1 * parseInt(this.oProfitabilityModel.getData()[4].y3)) * parseInt(this.oExchangeRateData.TAX);
                this.oProfitabilityModel.getData()[11].y4 = (-1 * parseInt(this.oProfitabilityModel.getData()[4].y4)) * parseInt(this.oExchangeRateData.TAX);                   
                this.oProfitabilityModel.getData()[11].y5 = (-1 * parseInt(this.oProfitabilityModel.getData()[4].y5)) * parseInt(this.oExchangeRateData.TAX);
                this.oProfitabilityModel.getData()[11].y6 = (-1 * parseInt(this.oProfitabilityModel.getData()[4].y6)) * parseInt(this.oExchangeRateData.TAX);
                //Cashflow
                this.oProfitabilityModel.getData()[12].y1 = parseInt(this.oProfitabilityModel.getData()[4].y1) + parseInt(this.oProfitabilityModel.getData()[5].y1) + parseInt(this.oProfitabilityModel.getData()[6].y1) + parseInt(this.oProfitabilityModel.getData()[7].y1) + parseInt(this.oProfitabilityModel.getData()[8].y1) + parseInt(this.oProfitabilityModel.getData()[9].y1) + parseInt(this.oProfitabilityModel.getData()[10].y1) + parseInt(this.oProfitabilityModel.getData()[11].y1);
                this.oProfitabilityModel.getData()[12].y2 = parseInt(this.oProfitabilityModel.getData()[4].y2) + parseInt(this.oProfitabilityModel.getData()[5].y2) + parseInt(this.oProfitabilityModel.getData()[6].y2) + parseInt(this.oProfitabilityModel.getData()[7].y2) + parseInt(this.oProfitabilityModel.getData()[8].y2) + parseInt(this.oProfitabilityModel.getData()[9].y2) + parseInt(this.oProfitabilityModel.getData()[10].y2) + parseInt(this.oProfitabilityModel.getData()[11].y2);  
                this.oProfitabilityModel.getData()[12].y3 = parseInt(this.oProfitabilityModel.getData()[4].y3) + parseInt(this.oProfitabilityModel.getData()[5].y3) + parseInt(this.oProfitabilityModel.getData()[6].y3) + parseInt(this.oProfitabilityModel.getData()[7].y3) + parseInt(this.oProfitabilityModel.getData()[8].y3) + parseInt(this.oProfitabilityModel.getData()[9].y3) + parseInt(this.oProfitabilityModel.getData()[10].y3) + parseInt(this.oProfitabilityModel.getData()[11].y3);
                this.oProfitabilityModel.getData()[12].y4 = parseInt(this.oProfitabilityModel.getData()[4].y4) + parseInt(this.oProfitabilityModel.getData()[5].y4) + parseInt(this.oProfitabilityModel.getData()[6].y4) + parseInt(this.oProfitabilityModel.getData()[7].y4) + parseInt(this.oProfitabilityModel.getData()[8].y4) + parseInt(this.oProfitabilityModel.getData()[9].y4) + parseInt(this.oProfitabilityModel.getData()[10].y4) + parseInt(this.oProfitabilityModel.getData()[11].y4);
                this.oProfitabilityModel.getData()[12].y5 = parseInt(this.oProfitabilityModel.getData()[4].y5) + parseInt(this.oProfitabilityModel.getData()[5].y5) + parseInt(this.oProfitabilityModel.getData()[6].y5) + parseInt(this.oProfitabilityModel.getData()[7].y5) + parseInt(this.oProfitabilityModel.getData()[8].y5) + parseInt(this.oProfitabilityModel.getData()[9].y5) + parseInt(this.oProfitabilityModel.getData()[10].y5) + parseInt(this.oProfitabilityModel.getData()[11].y5);
                this.oProfitabilityModel.getData()[12].y6 = parseInt(this.oProfitabilityModel.getData()[4].y6) + parseInt(this.oProfitabilityModel.getData()[5].y6) + parseInt(this.oProfitabilityModel.getData()[6].y6) + parseInt(this.oProfitabilityModel.getData()[7].y6) + parseInt(this.oProfitabilityModel.getData()[8].y6) + parseInt(this.oProfitabilityModel.getData()[9].y6) + parseInt(this.oProfitabilityModel.getData()[10].y6) + parseInt(this.oProfitabilityModel.getData()[11].y6);
                // Discounted Cash flow
                this.oProfitabilityModel.getData()[14].y1 = parseInt(this.oProfitabilityModel.getData()[12].y1) * this.oProfitabilityModel.getData()[13].y1;
                this.oProfitabilityModel.getData()[14].y2 = parseInt(this.oProfitabilityModel.getData()[12].y2) * this.oProfitabilityModel.getData()[13].y2;
                this.oProfitabilityModel.getData()[14].y3 = parseInt(this.oProfitabilityModel.getData()[12].y3) * this.oProfitabilityModel.getData()[13].y3;
                this.oProfitabilityModel.getData()[14].y4 = parseInt(this.oProfitabilityModel.getData()[12].y4) * this.oProfitabilityModel.getData()[13].y4;
                this.oProfitabilityModel.getData()[14].y5 = parseInt(this.oProfitabilityModel.getData()[12].y5) * this.oProfitabilityModel.getData()[13].y5;
                this.oProfitabilityModel.getData()[14].y6 = parseInt(this.oProfitabilityModel.getData()[12].y6) * this.oProfitabilityModel.getData()[13].y6;
                // Cumulated Discount Cash Flow
                this.oProfitabilityModel.getData()[15].y1 = 0 + this.oProfitabilityModel.getData()[14].y1;
                this.oProfitabilityModel.getData()[15].y2 = parseInt(this.oProfitabilityModel.getData()[15].y1) + this.oProfitabilityModel.getData()[14].y2;
                this.oProfitabilityModel.getData()[15].y3 = parseInt(this.oProfitabilityModel.getData()[15].y2) + this.oProfitabilityModel.getData()[14].y3;
                this.oProfitabilityModel.getData()[15].y4 = parseInt(this.oProfitabilityModel.getData()[15].y3) + this.oProfitabilityModel.getData()[14].y4;
                this.oProfitabilityModel.getData()[15].y5 = parseInt(this.oProfitabilityModel.getData()[15].y4) + this.oProfitabilityModel.getData()[14].y5;
                this.oProfitabilityModel.getData()[15].y6 = parseInt(this.oProfitabilityModel.getData()[15].y5) + this.oProfitabilityModel.getData()[14].y6;
                //Discounted Residual Value
                this.oProfitabilityModel.getData()[16].y1 = parseInt(this.oProfitabilityModel.getData()[10].y1) * this.oProfitabilityModel.getData()[13].y1;
                this.oProfitabilityModel.getData()[16].y2 = parseInt(this.oProfitabilityModel.getData()[10].y2) * this.oProfitabilityModel.getData()[13].y2;
                this.oProfitabilityModel.getData()[16].y3 = parseInt(this.oProfitabilityModel.getData()[10].y3) * this.oProfitabilityModel.getData()[13].y3;
                this.oProfitabilityModel.getData()[16].y4 = parseInt(this.oProfitabilityModel.getData()[10].y4) * this.oProfitabilityModel.getData()[13].y4;
                this.oProfitabilityModel.getData()[16].y5 = parseInt(this.oProfitabilityModel.getData()[10].y5) * this.oProfitabilityModel.getData()[13].y5;
                this.oProfitabilityModel.getData()[16].y6 = parseInt(this.oProfitabilityModel.getData()[10].y6) * this.oProfitabilityModel.getData()[13].y6;
                this.oProfitabilityModel.updateBindings();
                //Financial Evaluation
                this.oEvaluationModel.getData()[0].withres = this.oProfitabilityModel.getData()[15].y4;
                this.oEvaluationModel.getData()[0].withoutres = this.oProfitabilityModel.getData()[15].y4 - this.oProfitabilityModel.getData()[16].y4;
                this.oEvaluationModel.getData()[1].withres = this.oProfitabilityModel.getData()[15].y6;
                this.oEvaluationModel.getData()[1].withoutres = this.oProfitabilityModel.getData()[15].y6 - this.oProfitabilityModel.getData()[16].y6;
                this.oEvaluationModel.getData()[2].withoutres = 0;
                this.oEvaluationModel.updateBindings();
            },

            handleUploadPress: function() {
                var oFileUploader = this.byId("fileUploader");  
                oFileUploader.setSendXHR(true);
                oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                        name: "X-CSRF-Token", 
                        value: this.getOwnerComponent()._fetchToken()
                   })
                );             
                this.fileModel.getData().push(
                {
                    name : oFileUploader.oFileUpload.files[0].name,
                    FileSize : oFileUploader.oFileUpload.files[0].size,
                    uploadDate : new Date(),
                    Owner : "gaspare.patti@accenture.com" //Get username from FLP
                });
                this.fileModel.updateBindings();
                oFileUploader.checkFileReadable().then(function() {
                    oFileUploader.upload();
                }, function(error) {
                    MessageToast.show("The file cannot be read. It may have changed.");
                }).then(function() {
                    oFileUploader.clear();
                });
            },

            handleUploadComplete: function(oEvent) {
                var sResponse = oEvent.getParameter("response"),
                    aRegexResult = /\d{4}/.exec(sResponse),
                    iHttpStatusCode = aRegexResult && parseInt(aRegexResult[0]),
                    sMessage;
    
                if (sResponse) {
                    sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
                    MessageToast.show(sMessage);
                }
            },

            getUserData: function() {
                this.oUserModel = new sap.ui.model.json.JSONModel();
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                var url = appModulePath + "/User";
                var that = this;
                jQuery.ajax({
                    url:url,
                    method:"GET",
                    contentType: 'application/json',
                    headers: {
                        "X-CSRF-Token": this.getOwnerComponent()._fetchToken(),
                    },
                    success: function(result) {
                        that.oUserModel.setData(result);
                    },
                    error: function(e) {
                        // log error in browser
                        console.log("app history failed :" +e.message);
                        this.getView().setBusy(false);
                    }
                });
                this.getView().setModel(this.oUserModel, "user");
            },

            ShowSelectedUser(oEvent) {
                var oSelectedUser = oEvent.getParameters().selectedItem.getBindingContext("user").getObject();
                this.getView().byId("idSponsorMail").setText(oSelectedUser.EMAIL);
            },

            addInvestmentReasonData: function() {
                this.oInvestmentModel = new sap.ui.model.json.JSONModel();
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                var url = appModulePath + "/getInvestmentReason";
                var that = this;
                jQuery.ajax({
                    url:url,
                    method:"GET",
                    contentType: 'application/json',
                    headers: {
                        "X-CSRF-Token": this.getOwnerComponent()._fetchToken(),
                    },
                    success: function(result) {
                        that.oInvestmentModel.setData(result);
                    },
                    error: function(e) {
                        // log error in browser
                        console.log("app history failed :" +e.message);
                        this.getView().setBusy(false);
                    }
                });
                this.getView().setModel(this.oInvestmentModel, "investment");
            },
        
            addMagnitudeColumns: function() {
                var magnitudeTable = this.getView().byId("idMagnitudeTable");
                for(var i=0; i<=6; i++) {
                    var yearCol = new sap.m.Column();
                    var hdr = new sap.m.Text();
                    if(i == 6) {
                        hdr.setText("Total");
                    } else {
                        hdr.setText((new Date().getFullYear() + i).toString());
                    }
                    yearCol.setHeader(hdr);
                    magnitudeTable.addColumn(yearCol);
                }
            },

            countrySelection: function(oEvent) {
                this.countryID = oEvent.getSource().getSelectedItem().getBindingContext("country").getObject().COUNTRYID;
                this.country = oEvent.getSource().getSelectedItem().getBindingContext("country").getObject().COUNTRY;
                // var oCountry = oEvent.getSource().getBindings();
                var oEntity = [];
                var oEntityModel = new sap.ui.model.json.JSONModel();
                // for(var i in this.oCountryModel.getData()){
                //     if(this.oCountryModel.getData()[i].COUNTRYID == this.countryID){
                //         oEntity.push(this.oCountryModel.getData()[i])
                //     }
                // }
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                var url = appModulePath + "/getEntity";
                var that = this;
                jQuery.ajax({
                    url:url,
                    method:"GET",
                    contentType: 'application/json',
                    headers: {
                        "X-CSRF-Token": this.getOwnerComponent()._fetchToken(),
                    },
                    data: { 
                        CountryId: that.countryID
                    },
                    success: function(result) {
                        oEntityModel.setData(result);
                        that.getView().byId("idLegalEntity").setValue(result[0].LEGALENTITYDESC);
                        that.getView().setModel(oEntityModel, "entity");
                        that.onExchangeRateAdd();
                    },
                    error: function(e) {
                        // log error in browser
                        console.log("app history failed :" +e.message);
                        this.getView().setBusy(false);
                    }
                });   
            },

            onForecastselect: function(oEvent){
                var oSelectedIndex = oEvent.getSource().getSelectedIndex();
                var oForecastModel = new sap.ui.model.json.JSONModel();
                if(oSelectedIndex == 0){
                    oForecastModel.setData(
                        {
                            operative : false
                        }
                    );
                } else if(oSelectedIndex == 1){
                    oForecastModel.setData(
                        {
                            operative : true
                        }
                    );
                }
                this.getView().setModel(oForecastModel, "forecast");
            },

            onValueHelpRequest: function() {
                var that = this;
                if (!this._leValueHelpDialog) {
				    this._leValueHelpDialog = Fragment.load({
					    id: that.getView().getId(),
					    name: "com.dev.comau.bpmhome.view.LegalEntity",
					    controller: that
				    }).then(function (oDialog) {
					    that.getView().addDependent(oDialog);
					    return oDialog;
				    });
			    }
                this._leValueHelpDialog.then(function(oDialog) {
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open();
                });
            },

            onProjectValueHelpRequest: function() {
                var that = this;
                if (!this._ProValueHelpDialog) {
				    this._ProValueHelpDialog = Fragment.load({
					    id: that.getView().getId(),
					    name: "com.dev.comau.bpmhome.view.ProjectList",
					    controller: that
				    }).then(function (oDialog) {
					    that.getView().addDependent(oDialog);
					    return oDialog;
				    });
			    }
                this._ProValueHelpDialog.then(function(oDialog) {
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open();
                });
            },

            onProjectValueHelpClose: function(oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                this.oSelectedProject = oSelectedItem.getBindingContext("project").getObject();
                var oProjectName = this.oSelectedProject.PROJECTDESC + " - " + this.getView().byId("IDBuOrigin").getSelectedItem().getText() + " - " + this.getView().byId("IDBuDestn").getSelectedItem().getText();
                this.getView().byId("projectName").setValue(oProjectName);
                var scalable = this.oSelectedProject.SCALABLE == "X" ? "SCALABLE" : "NOT SCALABLE";
                this.getView().byId("idScalable").setText(scalable);
                var lastNumber = this.projectCount + 1;
                var oProjectId = new Date().getFullYear() + "_COM_" + this.country.substring(0,2) + "_" + this.getView().byId("IDBuOrigin").getSelectedItem().getText() + "_" + lastNumber.toString();
                this.getView().byId("projectId").setText(oProjectId); 
                // this.onBudgetDataAdd();
            },

            // onBudgetDataAdd: function() {
            //     var oBudgetModel = new sap.ui.model.json.JSONModel();
            //     this.getView().setModel(oBudgetModel, "budget");
            //     var resData = this.oSelectedProject.SCALABLE == "X" ? this.oSelectedProject.RESIDUALVALUE : 0;
            //     var aBudget = [
            //         {
            //             title: "Budget",
            //             amount: this.oSelectedProject.TOTALVALUE,
            //             euro : this.oSelectedProject.TOTALVALUE * this.oExchangeRateData.RATE1,
            //             capex : false
            //         },
            //         {
            //             title: "Residual",
            //             amount: resData,
            //             euro : resData * this.oExchangeRateData.RATE1,
            //             capex : false
            //         },
            //         {
            //             title: "Capex Request",
            //             amount: "",
            //             euro : "",
            //             capex : true
            //         }]
            //     if(this.getView().byId("idLeasing").getSelectedKey() == "Operative"){
            //         aBudget.push({
            //             title: "Operative Leasing Request",
            //             amount: "",
            //             euro : "",
            //             capex : true
            //         });
            //     }
            //     oBudgetModel.setData(aBudget);
            // },

            onExchangeRateAdd: function() {
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                var url = appModulePath + "/getExchangeRate";
                var that = this;
                // this.oExchangeRateModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(this.oExchangeRateModel, "exchange");
                jQuery.ajax({
                    url:url,
                    method:"GET",
                    contentType: 'application/json',
                    data: { 
                        CountryId: that.countryID,
                        Year: new Date().getFullYear().toString()
                    },
                    headers: {
                        "X-CSRF-Token": this.getOwnerComponent()._fetchToken(),
                    },
                    success: function(result) {
                        that.oExchangeRateData = result[0];
                        that.getView().byId("idLeasing").fireSelectionChange();
                        for(var i in that.getView().getModel("profitablity").getData()){
                            if(that.getView().getModel("profitablity").getData()[i].title == "WACC (%)"){
                                that.getView().getModel("profitablity").getData()[i].y1 =  1/Math.pow(1+parseInt(that.oExchangeRateData.WACC),1);
                                that.getView().getModel("profitablity").getData()[i].y2 =  1/Math.pow(1+parseInt(that.oExchangeRateData.WACC),2);
                                that.getView().getModel("profitablity").getData()[i].y3 =  1/Math.pow(1+parseInt(that.oExchangeRateData.WACC),3);
                                that.getView().getModel("profitablity").getData()[i].y4 =  1/Math.pow(1+parseInt(that.oExchangeRateData.WACC),4);
                                that.getView().getModel("profitablity").getData()[i].y5 =  1/Math.pow(1+parseInt(that.oExchangeRateData.WACC),5);
                                that.getView().getModel("profitablity").getData()[i].y6 =  1/Math.pow(1+parseInt(that.oExchangeRateData.WACC),6);
                            }
                        }
                        that.getView().getModel("profitablity").updateBindings();
                    },
                    error: function(e) {
                        // log error in browser
                        console.log("app history failed :" +e.message);
                        this.getView().setBusy(false);
                    }
                }); 
            },



            onValueHelpClose: function(oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                this.oSelectedEntity = oSelectedItem.getBindingContext("entity").getObject().LEGALENTITYID;
                var oSelectedEntityDesc = oSelectedItem.getBindingContext("entity").getObject().LEGALENTITYDESC;
                // var oSelectedCountryID = oEvent.getSource().getSelectedItem().getBindingContext("country").getObject().COUNTRYID;

                //Creating model for bu as per selected country and entity
                var bu = [];
                for(var i in this.oCountryModel.getData()){
                    if(this.oCountryModel.getData()[i].COUNTRYID == this.countryID && 
                    this.oCountryModel.getData()[i].LEGALENTITYID == this.oSelectedEntity){
                        bu.push(this.oCountryModel.getData()[i])
                    }
                }
                var oBuModel = new sap.ui.model.json.JSONModel();
                oBuModel.setData(bu);
                this.getView().setModel(oBuModel, "bu");

                //set the selected entity in the input box
                this.getView().byId("idLegalEntity").setValue(oSelectedEntityDesc);
                // this._leValueHelpDialog.close()
            },

            addProfitablityColumns: function() {
                var profitablity = this.getView().byId("idProfitablityTable");
                for(var i=0; i<=5; i++) {
                    var yearCol = new sap.m.Column();
                    var hdr = new sap.m.Text();
                    hdr.setText((new Date().getFullYear() + i).toString());
                    yearCol.setHeader(hdr);
                    profitablity.addColumn(yearCol);
                }               
            },

            addCountryData: function() {
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                var url = appModulePath + "/getCountry";
                var that = this;
                jQuery.ajax({
                    url:url,
                    method:"GET",
                    contentType: 'application/json',
                    headers: {
                        "X-CSRF-Token": this.getOwnerComponent()._fetchToken(),
                    },
                    success: function(result) {
                        that.oCountryModel.setData(result);
                        that.oCountryModel.updateBindings();
                        that.getView().byId("_IDGenComboBox1").setSelectedItem(that.getView().byId("_IDGenComboBox1").getItems()[0]);
                        that.getView().byId("_IDGenComboBox1").fireSelectionChange();
                    },
                    error: function(e) {
                        // log error in browser
                        console.log("app history failed :" +e.message);
                        this.getView().setBusy(false);
                    }
                });    
            },

            onPress: function(oEvent) {
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                var url = appModulePath + "/getProjectCount";
                var realestate = this.getView().byId("idRealEstateGroup").getSelectedIndex() == 0 ? "Yes" : "No";
                var that = this;
                jQuery.ajax({
                    url:url,
                    method:"GET",
                    contentType: 'application/json',
                    headers: {
                        "X-CSRF-Token": this.getOwnerComponent()._fetchToken(),
                    },
                    success: function(result) {
                        that.projectCount = result[0]["COUNT(*)"]
                    },
                    error: function(e) {
                        // log error in browser
                        console.log("app history failed :" +e.message);
                        this.getView().setBusy(false);
                        alert("Project Load Failed");
                    }
                });    
                var url = appModulePath + "/getProject";            
                jQuery.ajax({
                    url:url,
                    method:"GET",
                    data: { 
                        CountryId: that.countryID, 
                        LegalEntityID: that.oSelectedEntity, 
                        BuoriginID: that.getView().byId("IDBuOrigin").getSelectedKey(),
                        BudestID: that.getView().byId("IDBuDestn").getSelectedKey(),
                        Leasing: that.getView().byId("idLeasing").getSelectedKey(),
                        Realestate: realestate
                    },
                    contentType: 'application/json',
                    headers: {
                        "X-CSRF-Token": this.getOwnerComponent()._fetchToken(),
                    },
                    success: function(result) {
                        that.oProjectModel.setData(result);
                        alert("Project Loaded Successfully");
                        // that.oCountryModel.setData(result);
                    },
                    error: function(e) {
                        // log error in browser
                        console.log("app history failed :" +e.message);
                        this.getView().setBusy(false);
                        alert("Project Load Failed");
                    }
                });                
            }
        });
    });

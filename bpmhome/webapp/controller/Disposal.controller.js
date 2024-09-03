sap.ui.define([
    "./BaseController",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController , Fragment) {
        "use strict";

        return BaseController.extend("com.dev.comau.bpmhome.controller.Disposal", {
            onInit: function () {
                var oBudgetModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oBudgetModel, "budget");
                var oProjectModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oProjectModel, "project");
                this.oDisposalModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(this.oDisposalModel, "disposalkind");
                this.oDisposalItemModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(this.oDisposalItemModel, "Disposal");
                this.oDisposalModel.setData({
                    visiblity : "scrap"
                })
                oBudgetModel.setData([
                    {
                        title: "Disposal Amount",
                        amount: "00",
                        euro : "00"
                    }
                ])
                oProjectModel.setData([
                    {
                        name: "",
                        description:""
                    }
                ])
                this.oDisposalItemModel.setData({
                    AssetSubNumber: "",
                    Description:"",
                    Yop:"",
                    GBV:"",
                    Depreciation:"",
                    netValue:"",
                    spnovat:"",
                    Gain:"",
                    Others:""
                })

                 this.aCountryModel = new sap.ui.model.json.JSONModel();
                 this.getView().setModel(this.aCountryModel, "countries");
                 this.addCountryData();
            },

            onSelectDisposalKind: function(oEvent) {
                var radioButton = oEvent.getSource().getSelectedButton().getText();
                if(radioButton == "IP DISMISSAL" || radioButton == "SCRAP"){
                    this.oDisposalModel.setData({
                        visiblity : "scrap"
                    })
                } else if(radioButton == "SALE" || radioButton == "IP SALE(excl. Dismissal Patents)"){
                    this.oDisposalModel.setData({
                        visiblity : "sale"
                    })
                }
            },

            CallWorkflow: function(oEvent) {
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                var url = appModulePath + "/createBPM";
                var that = this;
                var disposalItem = {
                    "disposal": {
                        "Items": {
                            "DisposalKind": "SALE",
                            "Value": 90,
                            "Typology": "",
                            "CapitalLoss": "YES",
                            "BPMCreator": "CreateDR"
                        }
                    }
                }
                jQuery.ajax({
                    url:url,
                    method:"POST",
                    contentType: 'application/json',
                    data: JSON.stringify(disposalItem),
                    headers: {
                        "X-CSRF-Token": this.getOwnerComponent()._fetchToken(),
                    },
                    success: function(result) {
                        alert("success:" + jsonStringify(result));
					},
					error: function(e) {
						// log error in browser
						console.log("app history failed :" +e.message);
                        this.getView().setBusy(false);
					}
                });
            },

            onSelectCountry: function(oEvent) {
                this.oCountry = oEvent.getSource().getSelectedKey();
                this.countryID = oEvent.getSource().getSelectedItem().getBindingContext("countries").getObject().COUNTRYID;
                this.country = oEvent.getSource().getSelectedItem().getBindingContext("countries").getObject().COUNTRY;
                // var oCountry = oEvent.getSource().getBindings();
                var oEntity = [];
                for(var i in this.aCountryModel.getData()){
                    if(this.aCountryModel.getData()[i].COUNTRYID == this.countryID){
                        oEntity.push(this.aCountryModel.getData()[i])
                    }
                }
                //this.getView().byId("_IDLegalEntity").setValue(oEntity[0].LEGALENTITYDESC);
                var oEntityModel = new sap.ui.model.json.JSONModel();
                oEntityModel.setData(oEntity);
                this.getView().setModel(oEntityModel, "entity");
               // this.onExchangeRateAdd();

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

            onValueHelpClose: function(oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                this.oSelectedEntity = oSelectedItem.getBindingContext("entity").getObject().LEGALENTITYID;
                var oSelectedEntityDesc = oSelectedItem.getBindingContext("entity").getObject().LEGALENTITYDESC;
                // var oSelectedCountryID = oEvent.getSource().getSelectedItem().getBindingContext("country").getObject().COUNTRYID;

                //Creating model for bu as per selected country and entity
                var bu = [];
                for(var i in this.aCountryModel.getData()){
                    if(this.aCountryModel.getData()[i].COUNTRYID == this.countryID && 
                    this.aCountryModel.getData()[i].LEGALENTITYID == this.oSelectedEntity){
                        bu.push(this.aCountryModel.getData()[i])
                    }
                }
                var oBuModel = new sap.ui.model.json.JSONModel();
                oBuModel.setData(bu);
                this.getView().setModel(oBuModel, "bu");

                //set the selected entity in the input box
                this.getView().byId("_IDLegalEntity").setValue(oSelectedEntityDesc);
                // this._leValueHelpDialog.close()
            },
            onSelectBU : function(oEvent){
                this.oBU = oEvent.getSource().getSelectedKey();
            },
            genProjID : function(oEvent) {
                let countryPrefix = this.oCountry.substring(0,3).toUpperCase();
                let buPrefix = this.oBU.substring(0,3).toUpperCase();
                let projLabel = "COM_"+countryPrefix+"_"+buPrefix+"_"+"1";
                this.getView().byId("_IDprojlabel").setText(projLabel);
            },

            handleAddItemPressed: function() {
                if(!this._oAddDisposalDialog){
                    this._oAddDisposalDialog = sap.ui.xmlfragment("addDisposal", "com.dev.comau.bpmhome.view.AddDisposalItem", this);
                    this.getView().addDependent(this._oAddDisposalDialog);
                }
                this._oAddDisposalDialog.open();
            },

            _closeDialog: function() {
                this._oAddDisposalDialog.close();
            },

            onAddDisposalItem: function(oEvent){
                this._oAddDisposalDialog.close();
                var oView = this.getView();
                var table = oView.byId("idSaleTable").getItems();
                var desubNoRef = Fragment.byId("addDisposal","astSubNo").getValue();                
			    var yop = Fragment.byId("addDisposal","yop").getValue();
			    var gbv = Fragment.byId("addDisposal","gbv").getValue();
			    var deprec = Fragment.byId("addDisposal","deprec").getValue();
                var netVal = Fragment.byId("addDisposal","netVal").getValue();
                var spnoVat = Fragment.byId("addDisposal","spnoVat").getValue();
                var gain = Fragment.byId("addDisposal","gain").getValue();
                var others = Fragment.byId("addDisposal","others").getValue();
                
                if(table.length < 1){                   
                this.disposalModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(this.disposalModel, "sale");
                this.disposalModel.setData([
                    {
                        input1:desubNoRef,
                        input2:yop,
                        input3:gbv,
                        input4:deprec,
                        input5:netVal,
                        input6:spnoVat,
                        input6:gain,
                        input6:others
                    }])
                }
                else{
                  var aSalData = this.getView().getModel("sale").getData();
                  var newLine = {
                        input1:desubNoRef,
                        input2:yop,
                        input3:gbv,
                        input4:deprec,
                        input5:netVal,
                        input6:spnoVat,
                        input6:gain,
                        input6:others
                  }
                  aSalData.unshift(newLine);
                  this.getView().getModel("sale").refresh();
                }
                //table[1].getAggregation("cells")[1].setText(desc);
                //oView.byId("idSaleTable").getItems()[0].setCells()[1].setText(desubNoRef);
            },

            deleteRow: function (oEvent) {
                let sPath = oEvent.getSource().getBindingContext("sale").getPath();
                let aModel = this.getView().getModel("sale"); 
                let aTabdata = aModel.getData();
                let iIndex = parseInt(sPath.split("/").pop(),10);
                aTabdata.splice(iIndex,1);
                aModel.setData(aTabdata);
                aModel.refresh();
                //oEvent.getSource().getBindingContext("sale").getPath();

                       }
        });
    });

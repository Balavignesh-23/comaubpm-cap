sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.dev.comau.bpmhome.controller.Main", {
            onInit: function () {
                var that = this;
                $.ajax({
                    method: "GET",
                    // url: "https://comau-dev-comaubpmcap-approuter.cfapps.eu10.hana.ondemand.com/user-api/currentUser",
                    url:"/user-api/currentUser",
                    async: false,
                    dataType: "JSON",
                    success: function (data) {
                        // var myuser = data.name;
                        if (data !== null && data !== undefined) {
                            data.firstNameCaps = data.firstname.toUpperCase();
                            data.lastNameCaps = data.lastname.toUpperCase();
                        } else {
                            data = {};
                            data.firstNameCaps = "";
                            data.lastNameCaps = "";
                        }
                        var userModel = new sap.ui.model.json.JSONModel(data);
                        that.getView().setModel(userModel, "user");
                    },
                    error: function (data) {
                        var AlarmText = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("userAlarmText");
                        var AlarmTitle = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("userAlarmTitle");
                        MessageBox.show(
                            AlarmText, {
                                icon: MessageBox.Icon.WARNING,
                                title: AlarmTitle
                            }
                        );
                    }
                });
            
            },

            onCapex: function() {
                var router = this.getOwnerComponent().getRouter();
                router.navTo("Capex");
            },

            onDisposal: function() {
                var router = this.getOwnerComponent().getRouter();
                router.navTo("Disposal");
            },

            menuButtonNameFormatting: function (oEntry) {
				var oMenuButtonText = "";				
				oMenuButtonText = oEntry.firstname + " " + oEntry.lastname;
				return oMenuButtonText;
			}
        });
    });

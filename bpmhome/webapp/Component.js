/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "com/dev/comau/bpmhome/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("com.dev.comau.bpmhome.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },

            _getWorkflowRuntimeBaseURL: function () {
              var appId = this.getManifestEntry("/sap.app/id");
              var appPath = appId.replaceAll(".", "/");
              var appModulePath = jQuery.sap.getModulePath(appPath);
              return appModulePath + "/bpmworkflowruntime/v1";
            },

            _fetchToken: function(){
              var fetchedToken;
              jQuery.ajax({
                url: this._getWorkflowRuntimeBaseURL() + "/xsrf-token",
                method: "GET",
                async: false,
                headers: {
                  "X-CSRF-Token": "Fetch",
                },
                success(result, xhr, data) {
                  fetchedToken = data.getResponseHeader("X-CSRF-Token");
                },
              });
              return fetchedToken;            
            }
        });
    }
);
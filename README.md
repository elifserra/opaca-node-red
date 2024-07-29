# opaca-node-red
Node-red custom nodes and subflows for creating flows on OPACA actions

nodes module

## about
`nodes` module contains packages for custom nodes. The module provides the custom node palette for ZEKI Reallabor services.

`subflows` module contains a `flows.json` file that can be deployed on node-red and contains two flows that use two other "subflows".
Subflows are alternatives for custom nodes. The ones included here are for testing and trying purposes in general. Are not related to the Reallabor Services.

`examples` module contains a couple of example flows created using the custom opaca/reallabor nodes.


## quick start
1) Running Node-RED:
   On terminal, run `$ node-red` command (if you have node red locally deployed)
   If using Docker, starting the Docker container should be enough.
2) Deploying the custom nodes:
   * Navigate to the `$ .node-red` directory on your terminal and run the following command: `npm install <directory_of_the_repository>`.
     
     `<directory_of_the_repository>` is the directory where the `package.json` file is located, i.e. the cloned project directory.
   * Then navigate to `$ <directory_of_the_repository>/API` and run the following 3 commands to start a local API used in the background:
   	$ npm install express body-parser
    $ npm install cors
	$ node server js 
   * Restart node red
   * On the node red workspace, connect the inject node to the `opaca-actions` node, provide username and password (the url is not actively used currently, you are free not to pass any url), deploy and inject the default msg.
     Note that it is important to run the `opaca-actions` node first to provide authentication for the further uses of the reallabor services.
	 After authentication, you can freely create and test subflows.
3) Testing the subflows and example flows:
   * On the upper right corner of the node-red workspace navigate to the menu
   * Click "import" and import the `flows.json` for the subflows and `examples.json` for reallabor service examples in the workspace. The example flows should immediately be deployed on the workspace.


Note that the subflows are using a locally deployed OPACA Runtime Platform using the demo services, hence the platform should be active in the background and running on localhost:8000 if you want to test the subflows.

In the subflows, while testing the actions with the "Action Result" subflow, action name should be passed as name and the parameters should be passed in the payload as a json object (in the inject node).

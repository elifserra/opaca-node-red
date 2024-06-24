# opaca-node-red
Node-red custom nodes and subflows for creating flows on OPACA actions

nodes module

## about
`nodes` package contains two packages for custom nodes:
* `load-actions-node`: loads all actions with their attributes (parameters, result etc.)
* `invoke-action-node`: invokes an action given the name and parameters (not functioning yet)

Please note that the `invoke-action-node` currently is not functioning. It is only a prototype and is being developed. Hence it does not provide any functionality about OPACA yet.

`subflows` package contains a `flows.json` file that can be deployed on node-red and contains two flows that use two other "subflows":
* First subflow "List All Services" functions the same way as the custom `load-actions-node` but using multiple nodes that are provided by node-red.
* Second subflow "Action Result" is for invoking actions in the OPACA Platform.


## quick start
1) To deploy the custom nodes:
   * Navigate to the $.node-red on your terminal and run the following command: npm install <directory_of_the_repository>
   * Restart node red
   * On the UI, use the inject node to see the result of the `load-actions-node`

2) To test the subflows:
   * On the upper right corner of the node-red UI navigate to the menu
   * Click "import" and import the `flows.json` file in the workspace



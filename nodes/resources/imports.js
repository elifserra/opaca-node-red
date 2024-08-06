// Importing all the required modules and files in one place to avoid redundancy
// Here is usefull to import all the modules and files that are used in the project
// Main purpose is to make repository more organized and clean and to be used in other computer without any changes in the code

const path= require('path');                                                                             // Importing path module to work with file and directory paths
const current_directory = path.join(__dirname);                                                          // Getting the current directory path                                                                     
const two_levels_up = path.resolve(current_directory, '..', '..');                                       // Getting the path of the parent directory of the current directory 
const common_methods_path = two_levels_up + '/nodes/resources/common_methods.js';                        // Getting the path of the common_methods.js file   
const html_common_methods_path_import = two_levels_up + '/nodes/resources/html_common_methods.js';       // Getting the path of the html_common_methods.js file
const common_html_template_path_import = two_levels_up + '/nodes/resources/common_html_template.html';   // Getting the path of the common_html_template.html file
const apiUrl_import = "http://10.42.6.107:8000/agents";                                                  // Defining the API URL
const loginUrl_import = "http://10.42.6.107:8000/login";                                                 // Defining the login URL

const js_common_methods_import = require(common_methods_path);                                           // Importing the common_methods.js file

const file_system_import = require('fs');                                                                // Importing the fs module to work with the file system

// Exporting all the modules and files
module.exports = {           
    js_common_methods_import,
    html_common_methods_path_import,
    common_html_template_path_import,
    file_system_import,
    loginUrl_import,
    apiUrl_import
}

const path= require('path');
const current_directory = path.join(__dirname);
const two_levels_up = path.resolve(current_directory, '..', '..');
const common_methods_path = two_levels_up + '/nodes/resources/common_methods.js';
const html_common_methods_path_import = two_levels_up + '/nodes/resources/html_common_methods.js';
const common_html_template_path_import = two_levels_up + '/nodes/resources/common_html_template.html';
const apiUrl_import = "http://10.42.6.107:8000/agents"; 
const loginUrl_import = "http://10.42.6.107:8000/login";  

const js_common_methods_import = require(common_methods_path);

const file_system_import = require('fs');
module.exports = {
    js_common_methods_import,
    html_common_methods_path_import,
    common_html_template_path_import,
    file_system_import,
    loginUrl_import,
    apiUrl_import
}

class Parameter{
    constructor(name, type, value = "") {
        this.name = name;
        this.type = type;
        this.value = value;
    }

    toString(){
        return `ParameterName: ${this.name}, ParameterType: ${this.type}, ParameterValue: ${this.value}`;
    }
}
class Factory {
    static createObject(object: any): any {
        switch (object.type) {
            case 'meta_function':
                return new MetaFunction(object);
            case 'constant':
                return new Constant(object);
            case 'number_compare_oper':
                return new NumberCompareOperator(object);
            case 'string_compare_oper':
                return new StringCompareOperator(object);
            case 'boolean_compare_oper':
                return new BooleanCompareOperator(object);
            case 'float_compare_oper':
                return new FloatCompareOperator(object);
            case 'condition_oper':
                return new ConditionOperator(object);
            case 'addNode':
                return '???';
            default:
                console.log(object.type);
                throw new Error('invalid type');
        }
    }
}

class ConditionOperator {
    operator: string;
    left: any;
    right: any;

    constructor({ type, value, left, right }: any) {
        if (type !== 'condition_oper') {
            throw new Error('invalid type');
        }
        this.operator = value;
        this.left = Factory.createObject(left);
        this.right = Factory.createObject(right);
    }

    toString(): string {
        return `${this.left} ${this.operator === "AND" ? "&&" : "||"} ${this.right}`;
    }
}

class MetaFunction {
    functionName: string;
    attributeName: any;

    constructor({ type, functionName, attributeName }: any) {
        if (type !== 'meta_function') {
            throw new Error('invalid type');
        }
        this.functionName = functionName;
        this.attributeName = Factory.createObject(attributeName);
    }

    toString(): string {
        return `${this.functionName}(${this.attributeName})`;
    }
}

class Constant {
    dataType: string;
    value: any;

    constructor({ type, dataType, value }: any) {
        if (type !== 'constant') {
            throw new Error('invalid type');
        }
        this.dataType = dataType;
        this.value = ['string'].includes(dataType) ? `'${value}'` : value;
    }

    toString(): string {
        return `${this.value}`;
    }
}

class NumberCompareOperator {
    operator: string;
    left: any;
    right: any;

    constructor({ type, value, left, right }: any) {
        if (type !== 'number_compare_oper') {
            throw new Error('invalid type');
        }
        this.operator = value;
        this.left = Factory.createObject(left);
        this.right = Factory.createObject(right);
    }

    toString(): string {
        return `${this.left} ${this.operator} ${this.right}`;
    }
}

class StringCompareOperator {
    operator: string;
    left: any;
    right: any;

    constructor({ type, value, left, right }: any) {
        if (type !== 'string_compare_oper') {
            throw new Error('invalid type');
        }
        this.operator = value;
        this.left = Factory.createObject(left);
        this.right = Factory.createObject(right);
    }

    toString(): string {
        return `${this.left} ${this.operator} ${this.right}`;
    }
}

class BooleanCompareOperator {
    operator: string;
    left: any;
    right: any;

    constructor({ type, value, left, right }: any) {
        if (type !== 'boolean_compare_oper') {
            throw new Error('invalid type');
        }
        this.operator = value;
        this.left = Factory.createObject(left);
        this.right = Factory.createObject(right);
    }

    toString(): string {
        return `${this.left} ${this.operator} ${this.right}`;
    }
}

class FloatCompareOperator {
    operator: string;
    left: any;
    right: any;

    constructor({ type, value, left, right }: any) {
        if (type !== 'float_compare_oper') {
            throw new Error('invalid type');
        }
        this.operator = value;
        this.left = Factory.createObject(left);
        this.right = Factory.createObject(right);
    }

    toString(): string {
        return `${this.left} ${this.operator} ${this.right}`;
    }
}


export {
    Factory,
    MetaFunction,
    Constant,
    NumberCompareOperator,
    StringCompareOperator,
    BooleanCompareOperator,
    FloatCompareOperator,
    ConditionOperator,
};
